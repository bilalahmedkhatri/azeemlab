import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { validateDocument, documentHeadings, documentText } from '../src/lib/blog/document';
import { BlogContent } from '../src/lib/blog/renderer';
import { postView } from '../src/lib/blog/adapter';
import type { Asset, PostRow } from '../src/lib/blog/types';

test('configured media origin renders the cover and asset-backed inline image', () => {
  const previous = process.env.BLOG_MEDIA_ORIGINS;
  try {
    process.env.BLOG_MEDIA_ORIGINS = 'https://media.example.com';
    const asset: Asset = { id: 5, public_url: 'https://media.example.com/article.png', media_type: 'image/png', original_filename: 'article.png', alt_text: 'Workflow diagram', caption: 'Four steps', width: 2172, height: 724 };
    const post: PostRow = { id: 1, locale: 'en', title: 'Automation', slug: 'automation', excerpt: 'Guide', content_schema_version: 1, metadata_json: {}, author_name: 'Author', author_designation: null, author_avatar_url: null, published_at: new Date('2026-10-25'), updated_at: new Date('2026-10-25'), category_name: null, category_slug: null, cover: asset };
    const document = validateDocument({ type: 'doc', content: [{ type: 'customImage', attrs: { asset_id: 5, src: 'https://untrusted.example.com/ignored.png' } }] }, 1);
    assert.ok(document);
    assert.equal(postView(post).visual?.src, asset.public_url);
    const html = renderToStaticMarkup(React.createElement(BlogContent, { document, assets: [asset] }));
    assert.match(html, /<img[^>]+src="https:\/\/media.example.com\/article.png"/);
    assert.match(html, /alt="Workflow diagram"/);
    assert.match(html, /<figcaption[^>]*>Four steps<\/figcaption>/);
    assert.doesNotMatch(html, /untrusted.example.com/);
    assert.doesNotMatch(renderToStaticMarkup(React.createElement(BlogContent, { document, assets: [] })), /<img/);
    process.env.BLOG_MEDIA_ORIGINS = '';
    assert.equal(postView(post).visual, null);
    assert.doesNotMatch(renderToStaticMarkup(React.createElement(BlogContent, { document, assets: [asset] })), /<img/);
  } finally {
    if (previous === undefined) delete process.env.BLOG_MEDIA_ORIGINS;
    else process.env.BLOG_MEDIA_ORIGINS = previous;
  }
});

const paragraph = (text: string) => ({ type: 'paragraph', content: [{ type: 'text', text }] });
const cell = (text: string) => ({ type: 'tableCell', attrs: { colspan: 1, rowspan: 1, colwidth: null, align: null }, content: [paragraph(text)] });
const table = () => ({ type: 'table', content: [
  { type: 'tableRow', content: [{ ...cell('Platform'), type: 'tableHeader' }, { ...cell('Use case'), type: 'tableHeader' }] },
  { type: 'tableRow', content: [cell('n8n'), cell('Workflow automation')] },
] });

test('saved image credits render once inside the image caption, including images in tables', () => {
  const previous = process.env.BLOG_MEDIA_ORIGINS;
  try {
    process.env.BLOG_MEDIA_ORIGINS = 'https://media.example.com';
    const asset: Asset = { id: 5, public_url: 'https://media.example.com/article.png', media_type: 'image/png', original_filename: 'article.png', alt_text: 'Diagram', caption: 'Saved image caption', width: 1200, height: 800 };
    const image = { type: 'image', attrs: { src: asset.public_url } };
    const credit = { type: 'paragraph', content: [
      { type: 'text', text: 'Image credit: ' },
      { type: 'text', text: 'Photographer', marks: [{ type: 'link', attrs: { href: 'https://example.com/source' } }] },
      { type: 'text', text: ' · License: ' },
      { type: 'text', text: 'CC BY', marks: [{ type: 'link', attrs: { href: 'https://example.com/license' } }] },
    ] };
    for (const content of [
      [image, credit, paragraph('Article continues.')],
      [{ type: 'table', content: [{ type: 'tableRow', content: [{ type: 'tableCell', content: [image, credit, paragraph('Article continues.')] }] }] }],
    ]) {
      const document = validateDocument({ type: 'doc', content }, 1);
      assert.ok(document);
      const html = renderToStaticMarkup(React.createElement(BlogContent, { document, assets: [asset] }));
      const figure = html.match(/<figure\b[^>]*>([\s\S]*?)<\/figure>/)?.[1];
      assert.ok(figure);
      assert.match(figure, /<figcaption[^>]*>Saved image caption/);
      assert.match(figure, /Image credit:/);
      assert.match(figure, /href="https:\/\/example.com\/source"/);
      assert.match(figure, /href="https:\/\/example.com\/license"/);
      assert.equal((html.match(/Image credit:/g) || []).length, 1);
      assert.ok(html.indexOf('Article continues.') > html.indexOf('</figure>'));
    }
    const missing = validateDocument({ type: 'doc', content: [image, credit] }, 1);
    const missingHtml = renderToStaticMarkup(React.createElement(BlogContent, { document: missing, assets: [] }));
    assert.match(missingHtml, /Image credit:/);
    assert.doesNotMatch(missingHtml, /<figure/);
  } finally {
    if (previous === undefined) delete process.env.BLOG_MEDIA_ORIGINS;
    else process.env.BLOG_MEDIA_ORIGINS = previous;
  }
});

test('published TableKit documents render the complete article and matching TOC targets', () => {
  const document = validateDocument({ type: 'doc', content: [
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Compare tools' }] },
    table(),
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Next steps' }] },
    paragraph('Content after the table must remain visible.'),
  ] }, 1);
  assert.ok(document);
  assert.ok(documentText(document).includes('Workflow automation'));
  const html = renderToStaticMarkup(React.createElement(BlogContent, { document, assets: [] }));
  assert.match(html, /<table\b/);
  assert.match(html, /<tbody><tr/);
  assert.match(html, /<th\b/);
  assert.match(html, /<td\b/);
  assert.match(html, /overflow-x-auto/);
  assert.match(html, /Content after the table must remain visible/);
  assert.doesNotMatch(html, /not available in a supported format/);
  for (const heading of documentHeadings(document)) assert.ok(html.includes(`id="${heading.id}"`));
  assert.equal(documentHeadings(document).length, 2);
});

test('merged table cells preserve safe spans and alignment without passing through HTML', () => {
  const merged = { ...cell('<script>alert(1)</script>'), attrs: { colspan: 2, rowspan: 3, colwidth: [120, 180], align: 'right' } };
  const document = validateDocument({ type: 'doc', content: [{ type: 'table', content: [{ type: 'tableRow', content: [merged] }] }] }, 1);
  assert.ok(document);
  const html = renderToStaticMarkup(React.createElement(BlogContent, { document, assets: [] }));
  assert.match(html, /colSpan="2"/i);
  assert.match(html, /rowSpan="3"/i);
  assert.match(html, /text-align:right/);
  assert.ok(html.includes('&lt;script&gt;'));
  assert.doesNotMatch(html, /<script>/);
});

test('malformed table structure and unsafe attributes remain rejected', () => {
  const doc = (node: unknown) => ({ type: 'doc', content: [node] });
  const withinTable = (node: unknown) => doc({ type: 'table', content: [{ type: 'tableRow', content: [node] }] });
  for (const value of [
    doc(cell('orphan')), doc({ type: 'tableRow', content: [cell('orphan')] }),
    doc({ type: 'table', content: [] }), doc({ type: 'table', content: [paragraph('not a row')] }),
    doc({ type: 'table', attrs: { style: 'color:red' }, content: table().content }),
    doc({ type: 'table', content: [{ type: 'tableRow', content: [paragraph('not a cell')] }] }),
    withinTable({ type: 'tableCell', content: [{ type: 'text', text: 'unwrapped' }] }),
    withinTable({ type: 'tableCell', content: [] }),
    ...[{ colspan: 0 }, { rowspan: 1001 }, { colspan: null }, { colspan: true },
      { colwidth: [20, 30] }, { colwidth: [-1] }, { colwidth: [100001] },
      { align: 'url(javascript:alert(1))' }, { onclick: 'alert(1)' }, { style: 'display:none' },
    ].map(attrs => withinTable({ ...cell('unsafe'), attrs })),
  ]) assert.equal(validateDocument(value, 1), null);
});

test('unsupported versions and the existing document size limits still apply', () => {
  assert.equal(validateDocument({ type: 'doc', content: [table()] }, 2), null);
  assert.equal(validateDocument({ type: 'doc', content: [{ type: 'script', content: [] }] }, 1), null);
  assert.equal(validateDocument({ type: 'doc', content: [paragraph('x'.repeat(200001))] }, 1), null);
  assert.ok(validateDocument({ type: 'doc', content: [paragraph('Plain articles remain supported.')] }, 1));
});


test('author description uses the stored column before legacy metadata', () => {
  const post: PostRow = {
    id: 31, locale: 'nl', title: 'Article', slug: 'article', excerpt: '',
    content_schema_version: 1, metadata_json: { author_description: 'Old metadata biography' },
    author_name: 'Original writer', author_designation: 'Backend Developer', author_avatar_url: null,
    author_description: '  Current writer biography  ',
    published_at: new Date('2026-10-27'), updated_at: new Date('2026-10-27'),
    category_name: null, category_slug: null, cover: null,
  };
  assert.equal(postView(post).authorDescription, 'Current writer biography');
  assert.equal(postView({ ...post, author_description: null }).authorDescription, 'Old metadata biography');
  assert.equal(postView({ ...post, author_description: undefined }).authorDescription, 'Old metadata biography');
  assert.equal(postView({ ...post, author_description: '' }).authorDescription, '');
  assert.equal(postView({ ...post, author_description: null, metadata_json: {} }).authorDescription, '');
  assert.equal(postView(post).author_name, 'Original writer');
});
