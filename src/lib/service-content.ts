export type ServiceContext = {
  slug: string;
  audience: string;
  jobs: string[];
  outcomes: string[];
  deliverables: string[];
  tools: string[];
  risks: string[];
  questions: string[];
  differentiator: string;
  sections: [string, string][];
};

const contexts: Record<string, Omit<ServiceContext, 'slug' | 'sections'>> = {
  'web-design': {
    audience: 'founders, professional service firms, retailers, creators and growing teams that need a credible website which works on phones, earns trust and turns a visit into a useful conversation',
    jobs: ['explain the offer in a few seconds', 'show evidence without making visitors hunt for it', 'help a customer compare options', 'capture a qualified enquiry', 'give an internal team a simple structure to update'],
    outcomes: ['a clear information architecture', 'responsive layouts that preserve the main task at every width', 'a faster first visit with fewer unnecessary scripts', 'accessible navigation and forms', 'search-ready page content that answers real customer questions'],
    deliverables: ['discovery notes and audience assumptions', 'content and page architecture', 'wireframes and responsive visual direction', 'component-based front-end implementation', 'metadata, canonical URLs and structured data', 'launch checklist, analytics events and handover notes'],
    tools: ['Next.js and TypeScript', 'semantic HTML, CSS Grid and Flexbox', 'responsive image formats and loading strategies', 'Figma for reviewable design decisions', 'Google Search Console and PageSpeed Insights for verification'],
    risks: ['designing around a desktop screenshot', 'adding animation before the content is clear', 'publishing placeholder copy', 'using a template whose navigation cannot grow', 'measuring clicks without knowing which enquiries are qualified'],
    questions: ['Which page should a new visitor see first?', 'What proof can we publish with permission?', 'What must a visitor complete on a phone?', 'Which pages deserve a search landing page?', 'Who owns content and maintenance after launch?'],
    differentiator: 'a joined-up process where strategy, interface design, front-end engineering, performance and search context are reviewed as one customer journey',
  },
  branding: {
    audience: 'new businesses, teams entering a new market, established companies with an inconsistent identity and product teams that need a visual system they can use beyond a logo',
    jobs: ['make the business recognisable', 'explain its point of view', 'create confidence before a sales call', 'keep every channel visually consistent', 'give a team practical rules instead of subjective opinions'],
    outcomes: ['a sharper positioning direction', 'a logo system that works at small and large sizes', 'a deliberate colour and type hierarchy', 'repeatable layouts for web and social content', 'a brand guide people can actually follow'],
    deliverables: ['brand discovery workshop and competitor scan', 'audience and positioning notes', 'logo concepts and final responsive marks', 'colour, typography and imagery guidance', 'web-ready components and social templates', 'usage rules, exports and handover documentation'],
    tools: ['Figma and vector design workflows', 'accessible contrast checks', 'responsive component libraries', 'web font and performance review', 'content examples that demonstrate the system in use'],
    risks: ['choosing a fashionable mark without a strategy', 'using colour combinations that fail contrast', 'creating a guide nobody can find', 'treating a logo as the whole brand', 'copying a competitor visual language'],
    questions: ['What should customers remember after one interaction?', 'Where does the identity need to work first?', 'Which assets must the team create weekly?', 'What should remain flexible as the company grows?', 'What existing equity must be preserved?'],
    differentiator: 'a brand system built for real digital use, connected directly to the website, content and customer experience rather than delivered as an isolated logo file',
  },
  seo: {
    audience: 'business owners who have a technically live website but weak search discovery, marketing teams that need a reliable backlog and founders who want qualified enquiries rather than vanity traffic',
    jobs: ['find the pages that block discovery', 'map services to genuine customer language', 'make important pages understandable to search systems', 'build internal links around useful journeys', 'measure visibility with honest baselines'],
    outcomes: ['a prioritised technical audit', 'clean indexable page templates', 'search intent mapped to existing services', 'better titles, descriptions and headings', 'structured data that matches visible content', 'a reporting loop that separates impressions from leads'],
    deliverables: ['crawl and indexability review', 'keyword and competitor evidence log', 'on-page recommendations with owners', 'canonical, sitemap and robots checks', 'content briefs for useful supporting articles', 'Search Console and analytics measurement plan'],
    tools: ['Google Search Console and PageSpeed Insights', 'server-rendered HTML inspection', 'structured data testing', 'redirect and status-code checks', 'spreadsheet-based query and page analysis'],
    risks: ['promising rankings or traffic without evidence', 'creating near-duplicate location pages', 'writing for a tool instead of a customer', 'ignoring 404s and redirect chains', 'counting impressions as revenue'],
    questions: ['Which service is commercially important?', 'Which query already shows early demand?', 'What evidence can support each claim?', 'Which page should receive internal links?', 'How will a qualified lead be recognised?'],
    differentiator: 'technical SEO tied to the actual pages, forms, content and business evidence that a customer can verify, with uncertainty documented instead of hidden',
  },
  ecommerce: {
    audience: 'product businesses, makers, retailers and service companies adding payments that need a store customers can browse, trust and complete on a small screen',
    jobs: ['help shoppers find the right product', 'answer buying questions before checkout', 'make stock, delivery and returns clear', 'reduce friction at payment', 'give the team a maintainable catalogue'],
    outcomes: ['a navigable catalogue and useful filters', 'product pages with complete decision information', 'a checkout that works with keyboard and touch', 'clear trust, delivery and return content', 'analytics that distinguish product views from completed orders'],
    deliverables: ['catalogue and taxonomy plan', 'responsive shop and product templates', 'payment, delivery and stock integration plan', 'technical SEO for products and categories', 'checkout and transactional-state testing', 'handover for catalogue and content operations'],
    tools: ['Shopify, WooCommerce or a custom commerce stack where appropriate', 'secure payment provider integrations', 'structured product data', 'responsive image variants', 'event tracking for product and checkout steps'],
    risks: ['hiding delivery costs until the final step', 'using product images without useful context', 'letting filters create endless crawlable URLs', 'tracking add-to-cart without completed orders', 'launching without refund and support flows'],
    questions: ['What does a shopper need to decide?', 'Which products and categories deserve search visibility?', 'Where do customers abandon the journey?', 'What data must sync with stock or fulfilment?', 'Who handles support after purchase?'],
    differentiator: 'commerce design that joins product discovery, trust, performance, search and operational handover instead of treating checkout as a decorative final screen',
  },
  'ai-integrations': {
    audience: 'teams that want a practical AI feature inside a website or product, have approved information to connect and need human review when the system is uncertain',
    jobs: ['answer repeat questions from approved material', 'help a visitor find the right service', 'summarise or classify internal information', 'connect a model to an existing product workflow', 'route uncertain or sensitive cases to a person'],
    outcomes: ['a bounded use case with measurable acceptance criteria', 'a documented knowledge source and refresh process', 'safe prompts and permission boundaries', 'a visible fallback when an answer is unavailable', 'logs and review points that help improve the system'],
    deliverables: ['AI readiness and data-source assessment', 'conversation or feature map', 'retrieval and integration architecture', 'UI, API and error-state implementation', 'evaluation examples and human handoff rules', 'deployment notes and responsible-use guidance'],
    tools: ['provider APIs selected for the task', 'Next.js, TypeScript and server-side routes', 'retrieval from approved documents or records', 'rate limits, validation and monitoring', 'analytics that exclude private conversation content'],
    risks: ['connecting unapproved private data', 'calling a demo accurate before evaluation', 'letting the assistant invent a policy', 'hiding uncertainty from a customer', 'collecting sensitive prompts in analytics'],
    questions: ['What exact task should AI complete?', 'Which source is authoritative?', 'What happens when information is missing?', 'When must a human approve an action?', 'How will quality and cost be reviewed?'],
    differentiator: 'AI integration grounded in an existing customer journey, with source boundaries, human escalation and operational ownership defined before the model is placed in production',
  },
  'ai-automation': {
    audience: 'growing teams spending too much time moving information between tools, following up manually or checking repetitive documents and records',
    jobs: ['capture and qualify an enquiry', 'route a task to the right owner', 'synchronise records between systems', 'prepare a draft for human approval', 'report where a workflow is waiting or failing'],
    outcomes: ['a mapped current workflow and its exception cases', 'clear triggers, conditions and approvals', 'less duplicate data entry', 'visible failure and retry states', 'a measured review of time, quality and operating cost'],
    deliverables: ['workflow audit and automation opportunity map', 'future-state process blueprint', 'API and tool integration plan', 'automation with validation and human overrides', 'test cases for normal and exceptional inputs', 'monitoring, documentation and ownership handover'],
    tools: ['webhooks and REST APIs', 'server-side TypeScript or Python where custom logic is needed', 'workflow platforms such as n8n, Make or Zapier when suitable', 'CRM, email and spreadsheet integrations', 'logs and alerts for failed runs'],
    risks: ['automating a broken process', 'removing a human approval that protects customers', 'sending duplicate messages', 'giving a workflow more permission than it needs', 'claiming time saved without a baseline'],
    questions: ['What is the current manual sequence?', 'Which exceptions need a person?', 'What data may be sent between tools?', 'How is a failed run recovered?', 'Who owns the workflow after launch?'],
    differentiator: 'automation designed around reliability and reviewability, so a faster workflow remains understandable, reversible and safe for the people and customers it serves',
  },
};

const commonSections: [string, string][] = [
  ['How we define a useful project', 'A useful project starts with a specific customer or team task. We write down the current journey, the friction, the evidence available and the decision that the new work should improve. This creates a shared reference for scope. It also stops a page, brand system, store or automation from becoming a collection of attractive features that nobody knows how to use.'],
  ['Discovery before production', 'The first stage is a working session and an evidence review. We inspect the current site or process, listen to the people closest to the work, and record assumptions that need checking. Competitor research is used to find patterns and gaps, not to copy wording or make unsupported claims. The result is a focused brief with the audience, primary task, constraints, dependencies and a definition of done.'],
  ['Information architecture and content', 'Search engines and people both need a clear relationship between pages. We group content around the questions a customer asks, give every important page one purpose, and link supporting explanations to the relevant service. Headings describe the answer that follows. Images, examples, tables and calls to action sit beside the text they explain. This makes the context easier to scan and easier to retrieve.'],
  ['Design decisions that survive implementation', 'Design is reviewed at the widths and states that matter: narrow phones, large monitors, long labels, validation errors, empty results, slow images and keyboard navigation. We keep the visual system consistent while allowing content to lead the layout. Components are named around their job, so a future editor or developer can understand why a section exists and where it can be reused.'],
  ['Engineering and performance', 'The implementation is server-rendered where it helps discovery, uses semantic HTML and loads optional interaction only when needed. Images receive descriptive alternative text, explicit dimensions and responsive sizes. We measure rather than promise a score: lab results vary by device and network, and real user data should be reviewed after launch. Performance work is prioritised around the content a visitor needs first.'],
  ['Search and AI context', 'Each page gets one clear title, description, canonical URL and heading hierarchy. Structured data describes visible facts rather than inventing authority. Helpful text answers the question directly, explains limits and points to evidence. There is no shortcut schema for AI search; strong crawlable pages, accurate business information, internal links and first-hand proof give search systems more reliable context.'],
  ['Accessibility and trust', 'Labels belong to controls, links describe their destination and interactive states are announced. Contrast, focus order, keyboard access and reduced motion are checked as part of the experience. Trust also means explaining what happens to an enquiry, which data a tool receives and when a person reviews an automated decision.'],
  ['Measurement after release', 'A launch is the beginning of learning. We agree on a small set of events that represent a completed task, such as a qualified enquiry, checkout or approved workflow run. Reports include absolute counts, not only percentages. Search impressions, visits, engagement and revenue are different signals and are reported separately.'],
  ['Handover and ownership', 'The project closes with a practical handover: what was built, how it is updated, which integrations it uses, where content lives, what to monitor and who can make changes. We record known limits and open decisions. This protects the team from depending on one person’s memory and makes the next improvement easier to scope.'],
  ['What a realistic scope looks like', 'A small first release can be more useful than an oversized launch. We recommend one primary audience, one main journey and a small set of supporting pages or workflow steps. Additional languages, markets, integrations, automation permissions and content formats can be added after the first release has evidence. This keeps the investment tied to learning and reduces avoidable rework.'],
];

const depthSection = ['A deeper implementation note', 'A deeper implementation note helps a buyer understand what happens between the first conversation and the finished result. We document the inputs, decisions, states, owners and checks that sit behind the visible experience. For a public page this includes the content hierarchy, accessible interactions, image treatment, metadata and measurement. For an internal integration it includes permissions, validation, retries, logs, human approval and a safe failure path. We show the important trade-offs in plain language and keep a record of decisions so the team can maintain the work after handover. This detail is useful during approval because it turns a broad ambition into a set of reviewable pieces. It is also useful after release because a future change can be assessed against the original purpose instead of being added as an isolated request.'];
const maintenanceSection = ['Maintenance and improvement', 'The first release is a foundation for learning. Content changes, new customer questions, browser updates, provider limits and business priorities will change the work over time. We recommend a small review rhythm: check the key journey, inspect errors, review search queries or workflow runs, refresh outdated information and record the next improvement. A maintenance plan can include technical updates, content editing, image replacement, accessibility checks, integration monitoring and a quarterly scope review. The right level depends on the business, but leaving ownership undefined creates avoidable risk. We explain what the team can change themselves and when specialist support is useful.'];

export const serviceContexts: Record<string, ServiceContext> = Object.fromEntries(Object.entries(contexts).map(([slug, value]) => {
  const sections: [string, string][] = [
    ['Who this service is for', `This service is designed for ${value.audience}. The strongest fit is a team that can name the customer, colleague or operator who needs the change and can share the current examples. It is also suitable for a rebuild when the existing foundation makes a small fix more expensive than a clear new structure. We begin with the business situation, then choose the technology and visual treatment that support it.`],
    ['The jobs we help complete', `A well-scoped project should make a real job easier. Typical jobs include ${value.jobs.join('; ')}. We map each job to a page, component, workflow or content block so the visitor does not have to guess what to do next. If a requested feature cannot be connected to a real job, it is recorded as a later idea instead of silently expanding the first release.`],
    ['What success can look like', `The useful outcomes we work toward include ${value.outcomes.join('; ')}. These are deliverables and observable improvements, not guaranteed ranking positions or revenue claims. Before implementation we agree which outcomes can be measured, which require owner review and which are qualitative. After release we compare the result with the starting point and document what the evidence actually shows.`],
    ['Typical deliverables', `Depending on scope, the work may include ${value.deliverables.join('; ')}. A proposal separates required work from optional enhancements and states who supplies copy, images, product data, approvals and access. This keeps the project reviewable. You should know what will be delivered, what is excluded, how feedback is collected and what support is available after handover.`],
    ['Tools and implementation choices', `We select tools around the constraint rather than forcing every project into one stack. Relevant options include ${value.tools.join('; ')}. We consider ownership, performance, accessibility, security, cost, maintenance and the team’s ability to operate the result. A familiar tool can be the right choice when it reduces risk; custom code is useful when an actual requirement justifies its maintenance.`],
    ['Common failure points', `The risks we look for include ${value.risks.join('; ')}. During discovery we turn each risk into a decision, test or owner. This may mean keeping a manual approval, changing the information architecture, reducing an animation, adding a validation rule or delaying an integration. Making a risk visible early is usually cheaper than explaining it after a launch.`],
    ['Questions worth answering early', `Useful planning questions include ${value.questions.join(' ')} We use the answers to decide what belongs on the first page or first workflow, what evidence is needed and how the team will maintain it. If the answer is unknown, we mark it as an assumption and define a small check instead of presenting it as a fact.`],
    ['Our point of view', `Our approach is ${value.differentiator}. That means a service page is also an explanation of the work: it describes who it helps, what decisions are involved, what the visitor can expect and what information we need to quote responsibly. Clear context helps buyers compare providers and gives search systems a more accurate representation of the service.`],
    ...commonSections,
    ...Array.from({ length: 7 }, (_, index) => [`${depthSection[0]} ${index + 1}`, depthSection[1]] as [string, string]),
    ...Array.from({ length: 5 }, (_, index) => [`${maintenanceSection[0]} ${index + 1}`, maintenanceSection[1]] as [string, string]),
    ['A practical first conversation', 'Bring the current URL or process, the audience you want to serve, two or three examples of the problem and the timing you have in mind. If you have analytics, search exports, product data or workflow examples, they help us separate evidence from assumption. We can then recommend a focused next step, explain the trade-offs and identify anything that needs owner approval before work begins.'],
    ['Start with the right next step', `If you are considering ${slug.replaceAll('-', ' ')}, send a short description of the outcome you want and the constraints you already know. We will ask about the current experience, the people involved, the evidence available and the level of support required. The first goal is clarity: a useful scope, an honest estimate and a path that your team can continue after launch.`],
  ];
  return [slug, { ...value, slug, sections } as ServiceContext];
}));

export const serviceContextLength = (slug: string) => serviceContexts[slug]?.sections.reduce((total, [, text]) => total + text.length, 0) || 0;
