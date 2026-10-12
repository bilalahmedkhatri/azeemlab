import React from 'react';

interface JSONLDProps {
  data: Record<string, unknown>;
  id?: string;
}

export const JSONLD: React.FC<JSONLDProps> = ({ data, id = 'json-ld-schema' }) => {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
};
