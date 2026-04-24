export interface Competency {
  title: string;
  description: string;
}

export const competencies: Competency[] = [
  {
    title: "Enterprise Architecture & Solution Design",
    description:
      "Translate complex business requirements into scalable, secure Salesforce solutions — owning data models, integration blueprints, ARB-grade technical specs, and platform governance aligned with Salesforce Well-Architected best practices.",
  },
  {
    title: "Hands-on Apex, LWC & Flow Development",
    description:
      "Architect and write production-grade Apex (triggers, services, batch / queueable / scheduled), Lightning Web Components, and Flow Orchestration — staying close to the codebase as a player-coach lead developer.",
  },
  {
    title: "AI Architecture & Agentforce",
    description:
      "Architect AI-powered solutions on Einstein 1 — Agentforce, Atlas Reasoning Engine, Prompt Builder, Prediction Builder, Data Cloud, Einstein Trust Layer; design RAG patterns and grounded AI agents for Sales and Service.",
  },
  {
    title: "Revenue Cloud, CPQ & Quote-to-Cash",
    description:
      "Deep expertise designing end-to-end Q2C — pricing & product catalog, advanced approvals, contract amendments, renewals, billing automation, revenue recognition, and finance integrations.",
  },
  {
    title: "Integration Architecture",
    description:
      "Design enterprise integrations between Salesforce and ERP / HRIS / data-warehouse / iPaaS / marketing-automation systems using REST, SOAP, GraphQL, MuleSoft, Workato, Platform Events, Change Data Capture, and Apache Kafka event-driven patterns.",
  },
  {
    title: "Data Architecture & Large Data Volumes",
    description:
      "Manage LDV strategies using Bulk API 2.0, mitigate data skew, design archive/purge patterns, model Customer 360 in Data Cloud, and govern data quality across Snowflake- and BigQuery-adjacent pipelines.",
  },
  {
    title: "Performance Engineering",
    description:
      "Profile and tune Apex, SOQL, and LWC performance; eliminate governor-limit errors; design async patterns and selective queries for high-throughput workloads.",
  },
  {
    title: "DevOps & Release Engineering",
    description:
      "Own CI/CD pipelines on Copado, Gearset, GitHub Actions; SFDX / SF CLI scratch-org & sandbox strategy; static analysis (SonarQube, CodeScan, Apex PMD); release management and environment governance.",
  },
  {
    title: "Security & Compliance",
    description:
      "Implement Salesforce Shield, OAuth 2.0, SAML/SSO, MFA, JWT bearer flow, Permission Set Groups; deliver GDPR, HIPAA, SOX-aligned User Access Review programs.",
  },
  {
    title: "Technical Leadership & Mentoring",
    description:
      "Lead and mentor onshore + offshore engineering pods through full SDLC; chair design reviews and ARB sign-off; coach engineers through certification paths and code-review apprenticeship.",
  },
];
