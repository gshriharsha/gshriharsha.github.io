export interface Experience {
  company: string;
  ticker?: string;
  role: string;
  startDate: string;
  endDate: string | null;
  location: string;
  details: string[];
}

export const experience: Experience[] = [
  {
    company: "Confluent Inc.",
    ticker: "NASDAQ: CFLT",
    role: "Senior Salesforce Technical Architect",
    startDate: "July 2024",
    endDate: null,
    location: "Remote · Texas, USA",
    details: [
      "Served as Architect of Record across multiple go-to-market agile teams (Lead-to-Order, CPQ/Quote-to-Order, Forecasting, Professional Services Automation, Marketing Operations, Support, and Partners) for a public enterprise SaaS Salesforce GTM org supporting 1,000+ users.",
      "Drove ~25% reduction in Apex CPU time on high-volume core objects by consolidating triggers onto a single framework and migrating 25+ legacy Workflows/Process Builders to record-triggered Flows.",
      "Recovered misclassified subscription/license revenue by re-architecting license-management and token-generation logic and standardizing the product-hierarchy taxonomy.",
      "Spearheaded an AI-native GTM roadmap on Agentforce, Data Cloud, and the Einstein Trust Layer; delivered working POC agents (deal summarizer, account health scorer) and a production LLM-powered Prospect Insights LWC that reduced seller pre-call preparation from ~30 minutes to seconds.",
      "Architected cloud-native, event-driven integration patterns spanning Apache Kafka, Confluent Cloud, and Salesforce (Platform Events, CDC, Pub/Sub API) to synchronize GTM and product usage data in near real time.",
      "Optimized CPQ by refactoring product-bundle hierarchies, eliminating redundant logic in the quote calculator script and price rules, standardizing an NPI launch playbook and AI agent, and delivering a Revenue Cloud (RLM) proof of concept with a data-driven migration heuristic.",
      "Implemented PSA on FinancialForce/Certinia aligned to the Salesforce Account/Opportunity model and built Opportunity→Project handoff automation; integrated a Commit Estimator LWC surfacing consumption-vs-commit projections from the data warehouse so sellers and CSMs can prep renewal conversations in-CRM.",
      "Architected a strategic-partner Opportunity program with dedicated record types, Lightning record pages, an isolated sharing model, a MEDDPICC-aligned approval workflow, and quote/order validation guardrails.",
      "Eliminated technical debt at scale by deprecating 39+ legacy Account fields and replacing a legacy analytics managed package with CRM Analytics.",
      "Architected and implemented Confluent\’s Salesforce-based Sales Play framework, designing the custom data model, automation, and UX to operationalize targeted go-to-market motions with TAL-based targeting, accept/reject workflows, automatic Opportunity/Streaming Project creation, and end-to-end performance tracking.",
      "Established GTM Salesforce architecture guardrails and review processes (design standards, trigger/Flow patterns, integration guidelines, and naming conventions), improving consistency across multiple agile teams and reducing regression defects.",
      "Acted as a primary Salesforce architecture partner to Sales Ops, Marketing Ops, Customer Success, and Finance, translating GTM strategy into a cohesive multi-year platform roadmap and clear trade-off decisions.",
      "Led targeted data-quality initiatives on Accounts, Opportunities, and custom GTM objects (duplicate management, validation/guardrail design, and reference-data alignment), increasing trust in CRM metrics used for forecasting and executive reporting.",
      "Authored architecture decision records, reference implementations, and developer playbooks (trigger framework, Flow patterns, integration templates) and mentored engineers/admins to scale Salesforce delivery across GTM teams.",
    ],
  },
  {
    company: "LegalZoom",
    ticker: "NASDAQ: LZ",
    role: "Salesforce Technical Architect",
    startDate: "July 2022",
    endDate: "July 2024",
    location: "Remote · Austin, TX, USA",
    details: [
      "Designed and implemented end-to-end Salesforce CPQ from scratch — product catalog, bundle pricing, advanced approvals, contract amendments, co-terminus renewals, Stripe invoicing, revenue recognition, and Adobe Sign agreement automation (cutting manual document effort by ~30%).",
      "Built the Amazon Connect ↔ Salesforce CTI/Chat integration end-to-end on AWS — Connect contact flows, Open CTI adapter, Lambda event relay posting Contact Trace Records as Platform Events for sub-second screen-pops.",
      "Built a Spring Boot + Kafka order-sync pipeline replacing a nightly batch ETL — Avro/Schema Registry, idempotent Composite API upserts, dead-letter replay tooling — order data available in Salesforce within seconds of purchase.",
      "Led a multi-track security hardening program — migrated every external integration from username/password to OAuth 2.0 (Client Credentials + JWT Bearer), collapsed 40+ Profiles to 10 base profiles + Permission Set Groups, and tightened OWD from Public Read/Write to Private with explicit sharing rules.",
      "Migrated the order-management surface from Aura to LWC and re-architected the page's API-fetch path using the Apex Continuation pattern to fan out three external callouts in parallel, cutting page load time by ~50%.",
      "Authored a reusable Apex GraphQL client framework — fluent query builder, schema-aware response binding, retry-with-backoff, pagination helpers — adopted org-wide for all external GraphQL integrations.",
      "Built an off-platform discount-calculation engine on AWS Lambda (Node.js) integrated with CPQ.",
      "Designed a Heroku Connect + Postgres data archival pipeline with Salesforce Connect external-object read-back, keeping the org within storage limits while preserving full queryable history.",
      "Implemented an Experience Cloud portal for the attorney network with self-service consumer-to-attorney scheduling via the TimeTrade API and scoped data access via Sharing Sets & Programmatic Sharing.",
      "Institutionalized Salesforce design patterns — trigger framework, service layer, selector layer, Apex test-data builders, and LWC design system standards.",
      "Owned DevOps governance — CI/CD on GitHub Actions with SFDX-Git-Delta, promotion-branching strategy, sandbox refresh cadence, and quality gates (Apex PMD, SonarQube).",
    ],
  },
  {
    company: "Splunk",
    ticker: "NASDAQ: SPLK",
    role: "Senior Salesforce Developer",
    startDate: "January 2022",
    endDate: "June 2022",
    location: "Remote · Austin, TX, USA",
    details: [
      "Led platform transformation from Salesforce Classic to Lightning Experience for a 1,500+ user enterprise GTM org.",
      "Mentored junior engineers on Apex, LWC, and Salesforce DX best practices.",
    ],
  },
  {
    company: "X (formerly Twitter)",
    role: "Senior Salesforce Engineer",
    startDate: "February 2019",
    endDate: "December 2021",
    location: "Remote · Austin, TX, USA",
    details: [
      "Architected an end-to-end recruiting solution on the Salesforce Platform (Sales Cloud foundation + a purpose-built custom-object model), reducing time-to-hire by ~20% across the talent-acquisition organization (~1,000 platform users).",
      "Built an offer-letter generation engine on Heroku (Node.js) — pluggable template registry, conditional-content rules, PDF rendering, and Adobe Sign e-signature lifecycle (sent → viewed → signed → counter-signed), with S3 archival and snapshot-test coverage for every template combination.",
      "Designed a custom compensation-calculation engine and HR approval workflows for global comp planning across US, EMEA, and APAC geographies.",
      "Built a unified employee self-service community (Experience Cloud + Service Cloud) with Omni-Channel routing, Knowledge deflection, and a Flow-orchestrated onboarding journey; published as a branded iOS/Android app via Salesforce Mobile Publisher.",
      "Integrated Salesforce with third-party résumé-parsing vendors to improve recruitment data quality and search recall.",
      "Stood up a post-COVID back-to-office solution on Salesforce Work.com + Scheduler — capacity-controlled desk reservations, health-screening attestations, and contact-tracing query surface.",
      "Optimized DevOps CI/CD with Git-based source control, Jenkins pipelines, and Metadata API release packaging.",
    ],
  },
  {
    company: "Dell Technologies",
    role: "Senior Salesforce Developer",
    startDate: "January 2017",
    endDate: "February 2019",
    location: "On-site · Austin, TX, USA",
    details: [
      "Owned the Salesforce-side data model, async architecture, and migration reconciliation for a greenfield Service Cloud + Field Service Lightning (FSL) cutover from Siebel CRM across a 50,000+ user support organization.",
      "Implemented Einstein Case Classification for AI-powered case routing — predicted queue, priority, product area, and required skill from case content, improving service-team throughput by ~25%.",
      "Built an FSL Dispatch Management system with custom Aura work-order creation wizard, parts-selection component with asset-compatibility filtering, and a Community Cloud portal giving external service partners scoped, real-time access to assigned work orders.",
      "Streamlined deployments using Copado CI/CD pipelines with source-controlled metadata and automated regression gates, advancing Salesforce DevOps maturity for the service organization.",
      "Executed the staged Siebel → Salesforce data migration — Siebel extract → Postgres staging → cleanse/dedupe/identity-resolve → Bulk API 2.0 load — with row-level reconciliation at each stage and a 30-day post-cutover audit harness.",
      "Implemented Salesforce Connect with OData 4.0 to expose ERP, asset-registry, and parts-catalog data as External Objects — agents queried upstream data live without replicating it into Salesforce.",
      "Implemented Email-to-Case with custom Apex business logic and entitlement-driven SLA milestones across multi-channel intake (Web-to-Case, Chat, Social, Email, CTI).",
    ],
  },
];
