export type ProjectTag =
  | "AI"
  | "CPQ"
  | "Sales Cloud"
  | "Service Cloud"
  | "Experience Cloud"
  | "Field Service"
  | "Integration"
  | "Performance"
  | "Platform"
  | "DevOps"
  | "Data"
  | "Security";

export interface Project {
  slug: string;
  title: string;
  company: string;
  period: string;
  role: string;
  tags: ProjectTag[];
  summary: string;
  problem: string;
  architecture: string[];
  techStack: string[];
  outcome: string[];
}

export const projects: Project[] = [
  // ─────────────────────────────────────────────────────────────────────
  // Confluent
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "ai-native-gtm-architecture",
    title:
      "AI-Native GTM Architecture: Agentforce, LLM Integrations & Data Cloud",
    company: "Confluent",
    period: "2024 – Present",
    role: "Senior Salesforce Technical Architect",
    tags: ["AI", "Integration", "Sales Cloud", "Platform"],
    summary:
      "End-to-end AI strategy for the GTM platform — a production LWC that surfaces LLM-generated prospect insights on Opportunity records, a POC reference architecture for AI-native GTM on Agentforce + Data Cloud + Einstein Trust Layer, and a self-initiated productivity agent that triages engineering work across Jira, Slack, and GitHub. Unified by a shared governance pattern: prompt templates in Custom Metadata, PII masking, audit logging, and per-user rate limits.",
    problem:
      "Account Executives spent ~30 minutes per Opportunity manually researching prospects across multiple sources. Customer 360 data was fragmented across CRM, billing, support, and product telemetry — making any AI recommendation either ungrounded or dependent on bespoke integration. Meanwhile, engineering triage across multiple agile tracks was drowning in noise.",
    architecture: [
      "Lightning Web Component on the Opportunity record page triggers an Apex Continuation that orchestrates a multi-step enrichment pipeline via Workato (iPaaS) — pulling prospect data from third-party enrichment APIs, merging it with internal CRM context, and passing the combined payload to an LLM for grounded talking points, account briefings, and competitive context. Workato handles the multi-source orchestration and retry logic outside Salesforce governor limits; results are cached with a TTL refresh policy plus manual regenerate.",
      "Unified 360° customer model in Data Cloud — ingestion connectors for CRM, billing, support, and product-usage telemetry; identity-resolution rules; calculated insights for ARR, propensity, and account health.",
      "Agentforce agents grounded in Data Cloud + curated Salesforce metadata via prompt templates; topic-action design, ground-rule guardrails, and a shared agent action library. Prediction Builder + Prompt Builder pipelines for next-best-action recommendations.",
      "Einstein Trust Layer governance applied end-to-end across all AI surfaces: zero-data-retention contract with the model provider, PII masking at the gateway, prompt templates in Custom Metadata, full prompt/response audit logging, and prompt-injection mitigations.",
      "Self-initiated productivity agent (Python/FastAPI + Claude + FAISS) pulls deltas from Jira, Slack, and GitHub hourly, embeds into a vector store, and produces a cited triage digest — snooze/promote feedback loop trains the ranker over time.",
      "Per-user rate limiting and circuit breakers protect LLM spend; cross-cloud Platform Events publish agent decisions back to downstream systems.",
    ],
    techStack: [
      "Agentforce",
      "Data Cloud",
      "Prompt Builder + Prediction Builder",
      "Einstein Trust Layer",
      "Lightning Web Components",
      "Apex (Queueable + Continuation)",
      "Named Credentials",
      "Workato (iPaaS)",
      "Platform Events",
      "Python (FastAPI)",
      "Anthropic Claude",
      "Vector store (FAISS)",
    ],
    outcome: [
      "Reduced pre-call prep from ~30 minutes per Opportunity to seconds for the Account Executive team.",
      "Delivered working POC agents (deal summarizer, account health scorer) and a go/no-go recommendation — pending budget allocation and security review for production rollout.",
      "Established the governed, async LLM callout pattern (cached, audited, rate-limited) reused across all subsequent AI integrations on the platform.",
      "Replaced ~30 minutes of daily engineering triage with a 2-minute scan via the self-initiated productivity agent.",
      "Defined the Trust Layer governance pattern proposed as the org-wide standard for any AI initiative.",
    ],
  },
  {
    slug: "salesforce-kafka-bridge",
    title: "Salesforce ↔ Kafka Event Bridge",
    company: "Confluent",
    period: "2024 – Present",
    role: "Senior Salesforce Technical Architect",
    tags: ["Integration", "Performance", "Platform"],
    summary:
      "Real-time, event-driven integration layer that streams GTM lifecycle events (Opportunity close, account updates, license provisioning, subscription changes) between Salesforce and downstream cloud services via Apache Kafka on Confluent Cloud — replacing scheduled batch syncs with a replayable, contract-governed event backbone that multiple teams consume independently.",
    problem:
      "Critical GTM events — deal closures triggering license provisioning, account-tier changes driving billing adjustments, subscription amendments updating the data warehouse — were synced via scheduled batch jobs and direct synchronous Apex callouts. This created three compounding problems: (1) downstream services like provisioning waited up to 24 hours for Salesforce data, delaying customer onboarding after deal close; (2) synchronous callouts during peak hours hit Apex governor limits, causing transaction failures and SOQL-row errors that required manual intervention; (3) any batch failure meant an entire sync window was lost with no replay path — ops had to re-run full extracts and manually reconcile.",
    architecture: [
      "Outbound: Salesforce Change Data Capture and custom Platform Events capture GTM lifecycle changes (Opportunity stage transitions, Account field updates, License record mutations) and publish them via the Pub/Sub API (gRPC) to a lightweight relay service that produces to Kafka topics on Confluent Cloud.",
      "Confluent Cloud as the central event bus — dedicated topics per domain (gtm.opportunities, gtm.accounts, gtm.licenses); downstream consumers (provisioning service, billing sync, data warehouse ingestion, analytics) each maintain their own consumer group and read at their own pace.",
      "Inbound: Kafka Connect sink connector (or a dedicated producer service for complex transforms) publishes events from Confluent Cloud back to Salesforce via the Pub/Sub API (gRPC) — events land as Platform Events that Apex subscribers consume, with idempotency keys on the event payload to safely absorb at-least-once delivery duplicates.",
      "Schema Registry enforces event contracts across producers and consumers — breaking schema changes are caught at publish time, not at runtime. Dead-letter topics capture poison messages; replay tooling can re-drive any window of events from Kafka retention without re-running batch extracts.",
      "Apex-side event subscribers run via Queueable chains with Platform Cache for deduplication state, keeping all subscriber work off the synchronous transaction path and within governor limits.",
    ],
    techStack: [
      "Apache Kafka",
      "Confluent Cloud",
      "Kafka Connect",
      "Confluent Schema Registry",
      "Pub/Sub API (gRPC)",
      "Platform Events",
      "Change Data Capture",
      "Apex (Queueable + Platform Cache)",
      "Java / Spring Boot",
    ],
    outcome: [
      "Cut downstream data latency from up to 24 hours (batch) to seconds — license provisioning now triggers within moments of deal close, directly improving customer onboarding speed.",
      "Eliminated chronic Apex governor-limit failures during peak hours by replacing synchronous callouts with async event publishing.",
      "Gave every downstream team (provisioning, billing, analytics, data warehouse) an independent, replayable consumption path — new integrations plug into the same bus without touching the Salesforce side.",
    ],
  },
  {
    slug: "license-management-platform",
    title: "License Management & Token Generation Platform",
    company: "Confluent",
    period: "2024 – 2025",
    role: "Senior Salesforce Technical Architect",
    tags: ["Integration", "Sales Cloud", "Performance"],
    summary:
      "Re-architected the Salesforce-side license management and JWT-token generation platform that issues product entitlements at deal close — license tokens are generated entirely within Salesforce, routed through an Order Management approval workflow, and then synced to downstream systems via Platform Events through Confluent Cloud (Kafka) and delivered to the customer via email.",
    problem:
      "License generation was scattered across legacy Apex, an aging managed package, and ad-hoc Process Builders. Token structure changes from the platform team forced repeated breaking releases, temp-license requests had no governed workflow, and addon licenses (e.g., CSFLE) drifted out of sync with the parent license — every change request became a regression risk.",
    architecture: [
      "Centralized License Manager Apex service generates JWT license tokens entirely within Salesforce, mediating all token-generation requests from Opportunity / Quote / Order objects with a strategy pattern per SKU class so addon and base licenses follow distinct generation rules.",
      "Custom-metadata-driven token schema — when the token structure evolves, business systems adopt the new shape via metadata configuration, not code releases.",
      "Post-generation approval workflow: generated license tokens route to the Order Management team for approval before distribution. Approval thresholds and routing rules are driven by Custom Metadata.",
      "Temp-license workflow on Opportunity: Product Manager–initiated request flow, eligibility validation, configurable duration (up to 270 days), and a closed-loop notification when the license is provisioned downstream.",
      "AddonLicenseManager handler keeps addon licenses (CSFLE and others) consistent with parent-license lifecycle events — issued, refreshed, suspended, revoked.",
      "Outbound distribution: approved license tokens publish as Platform Events, flow through the Salesforce ↔ Kafka Event Bridge (Confluent Cloud) to downstream systems (provisioning, entitlement registries), and are delivered to the customer via automated email notification.",
      "Comprehensive QA harness: deterministic test data builders, regression suite covering every license/addon combination, and a license-event audit trail used by support to debug customer issues.",
    ],
    techStack: [
      "Apex (Service Layer + Strategy Pattern)",
      "Custom Metadata Types",
      "Platform Events",
      "Confluent Cloud (Kafka)",
      "JWT",
      "Lightning Web Components",
      "Flow Orchestration",
      "Trigger Framework",
    ],
    outcome: [
      "Surfaced and recovered misclassified-license revenue through the cleaner product hierarchy that fell out of the rebuild.",
      "Cut the regression cost of upstream token-schema changes from a multi-day code release to a metadata config change.",
      "Gave PMs a self-service temp-license path for eligible Opportunities, removing a recurring deal-desk bottleneck.",
    ],
  },
  {
    slug: "gtm-motion-architecture",
    title:
      "GTM Motion Architecture: Sales Plays, Partner Program & Slack Integration",
    company: "Confluent",
    period: "2024 – 2025",
    role: "Senior Salesforce Technical Architect",
    tags: ["Sales Cloud", "Integration", "Security", "Platform"],
    summary:
      "Three interconnected GTM-motion initiatives on a single platform: a measurable Sales Play framework replacing slide-deck plays, a strategic-partner Opportunity program with isolated sharing and MEDDPICC-aligned approval workflows, and an end-to-end Salesforce ↔ Slack integration (Sales Elevate + curated Slack Workflows) — letting Sales Strategy, Partner Ops, and RevOps all execute from the same system of record.",
    problem:
      "Sales plays were authored in slide decks with no execution tracking. Partner-sourced deals were either co-mingled with direct opportunities (forecast pollution, visibility leaks) or run off-platform in spreadsheets. Operational alerts were email-based and ignored. Sellers context-switched constantly between Salesforce and Slack.",
    architecture: [
      "Sales Play custom object with target persona, product, motion, lifecycle stage, and owning team; Opportunity-to-Sales-Play junction object for multi-play attribution without forecast double-counting; rep-facing tagging LWC with type-ahead search scoped by segment and region.",
      "Sales Play lifecycle automation — record-triggered Flows promote plays through Draft → Active → Wind-down stages on schedule; Slack notifications prompt rep adoption.",
      "Strategic-Partner Opportunity record type with tailored Lightning record page, sales path, and validation rules distinct from the direct-sale motion; restrictive OWD plus criteria-based sharing rules plus Apex managed sharing for isolated partner-deal visibility.",
      "MEDDPICC qualification fields with progressive disclosure by stage; multi-step Advanced Approvals driven by deal size, discount depth, partner tier, and competitive presence — thresholds in Custom Metadata.",
      "Slack Sales Elevate connected via per-user OAuth so Salesforce-side sharing rules govern what surfaces in Slack; AI-assisted deal recaps and pipeline insights in rep DMs and team channels.",
      "Slack Workflow Builder templates for deal-won notifications, approval-pending pings, SLA-breach alerts, and day-of-renewal nudges — governed by a quarterly-reviewed notification catalog.",
      "CRM Analytics dashboards measure play attach rate, pipeline influenced, win-rate lift, and ASP impact across all three motions.",
    ],
    techStack: [
      "Sales Cloud",
      "Custom Objects + Junction Objects",
      "Lightning Web Components",
      "Lightning App Builder + Sales Path",
      "Record-Triggered Flows",
      "Apex Managed Sharing",
      "Advanced Approvals",
      "Validation Rules",
      "Custom Metadata Types",
      "Slack Sales Elevate",
      "Slack Workflow Builder",
      "Permission Set Groups",
      "CRM Analytics",
    ],
    outcome: [
      "Replaced slide-deck plays with a measurable system Sales Strategy can launch end-to-end in days — first credible numbers on play attach rate, pipeline influenced, and win-rate lift.",
      "Stood up a partner-deal motion without spawning a separate org — eliminated forecast pollution, gave partner-program managers a single governed pipeline view.",
      "Cut seller context-switching — deal collaboration in Slack, Salesforce as system of record; replaced ignored email alerts with actionable, scoped Slack notifications.",
    ],
  },
  {
    slug: "revenue-operations-architecture",
    title:
      "Revenue Operations Architecture: CPQ Optimization, ARR/MRR Rollup & Field-History Framework",
    company: "Confluent",
    period: "2024 – 2025",
    role: "Senior Salesforce Technical Architect",
    tags: ["CPQ", "Performance", "Sales Cloud", "Platform"],
    summary:
      "Revenue-operations architecture spanning CPQ optimization (bundle refactoring, calculator performance, NPI playbook, Revenue Cloud POC), a scheduled-batch ARR/MRR rollup framework that aggregates subscription revenue to Account across a multi-object hierarchy, and a custom-metadata-driven field-history tracker that captures the why of every change — renewal lift vs. amendment vs. churn.",
    problem:
      "CPQ had grown organically — bundles were dense, quote calculation was slow on large carts, approvals fired inconsistently, and every NPI launch was a frantic sprint. Account-level ARR/MRR could not be computed via native rollup summaries due to the cross-object hierarchy. Existing field-history captured what changed but not why, breaking audit conversations every close.",
    architecture: [
      "Refactored product bundle hierarchy and option constraints; normalized attribute-based pricing; moved Price Rule condition parameters into Lookup Queries so RevOps can tune pricing without editing formulas.",
      "Quote-calculator performance work — eliminated redundant rollup queries, batched price-rule evaluation, and added pre-warmed Platform Cache for catalog metadata.",
      "Standardized NPI playbook — templated metadata, validation rules, and approval-chain configs for faster product launches.",
      "Revenue Cloud POC: modeled a representative subscription-with-amendment-and-renewal flow on the new RLM object stack, benchmarked against equivalent CPQ flow, and produced a migration heuristic.",
      "Approval-flow consolidation — replaced overlapping legacy approval chains with a single custom-metadata-driven Advanced Approvals chain.",
      "Scheduled Apex batch (Database.Batchable + Database.Stateful) walks the subscription/asset hierarchy with tuned scope size, aggregates ARR/MRR with multi-currency normalization, and writes back to Account.",
      "Custom-metadata-driven field-history framework — each tracked field declares its trigger source, classification rule, and downstream topic; a trigger handler diffs old vs. new and emits a Field-History record annotated with reason code and source transaction.",
      "Big Object overflow archive keeps multi-year history queryable without bloating standard Field History tables.",
    ],
    techStack: [
      "Salesforce CPQ",
      "Revenue Cloud (RLM) — POC",
      "Apex (Batchable + Schedulable + Stateful)",
      "Custom Metadata Types",
      "Advanced Approvals",
      "Platform Cache",
      "Trigger Framework",
      "Big Objects",
      "CRM Analytics",
      "Multi-Currency",
    ],
    outcome: [
      "Materially faster quote calculation on large multi-product carts — sellers stopped abandoning the quote screen mid-build.",
      "Cut NPI time-to-launch by templatizing the metadata config into a repeatable playbook.",
      "Delivered a Revenue Cloud POC with a clear go/no-go recommendation and migration heuristic.",
      "A single, audited ARR/MRR number on every Account, refreshed on a deterministic schedule.",
      "Finance and RevOps can answer “why did this Account move?” without filing an engineering ticket.",
    ],
  },
  {
    slug: "psa-implementation",
    title: "PSA + Subscription Commit Estimator",
    company: "Confluent",
    period: "2024 – 2025",
    role: "Senior Salesforce Technical Architect",
    tags: ["Sales Cloud", "Integration"],
    summary:
      "Built out the Salesforce-side Professional Services Automation (PSA) on FinancialForce/Certinia plus a Commit Estimator integration that lets sellers and CSMs project subscription consumption against contracted commits — bringing services delivery, project burn-down, and commit forecasting onto the same platform as the deal.",
    problem:
      "Services engagements were tracked in a separate tool with no link to the originating Opportunity, so revenue recognition, utilization, and project staffing required manual reconciliation. On the consumption side, sellers had no in-CRM way to project usage against contracted commits, so renewal-conversation prep started from scratch every time.",
    architecture: [
      "PSA (FF-PSA / Certinia) configured against the Salesforce Account/Opportunity model — Project, Project Task, Resource, Time Card, Milestone — with revenue-recognition rules wired into the Billing schedule.",
      "Opportunity → Project hand-off automation: when a services-bearing Opportunity closes, a record-triggered Flow provisions the Project, attaches the SOW, and notifies the staffing manager.",
      'Commit Estimator integration: a custom LWC on the Account/Opportunity surfaces consumption telemetry, projects burn against contracted commits, and surfaces "at-risk" and "over-pace" signals for renewal motion.',
      "Estimator data path: a scheduled Workato recipe pulls aggregated consumption metrics from the internal usage-telemetry data warehouse, normalizes usage data to the Salesforce SKU model, and upserts daily commit-estimation rollups to a custom object on Account — keeping the integration decoupled from Salesforce governor limits and batch-scheduling constraints.",
      'Governance: validation rules prevent stale commit data from driving renewal pricing, and a "freshness" indicator on the LWC tells the seller exactly when the estimate was last refreshed.',
    ],
    techStack: [
      "PSA (FF-PSA / Certinia)",
      "Lightning Web Components",
      "Workato (iPaaS)",
      "Record-Triggered Flows",
      "Custom Objects",
      "CRM Analytics",
    ],
    outcome: [
      "Brought services-delivery, project burn-down, and revenue recognition onto the same platform as the originating deal.",
      "Gave sellers and CSMs an in-CRM consumption-vs-commit view that drives renewal conversation prep.",
      "Eliminated the manual reconciliation between the services tool and Salesforce reporting at month-end.",
    ],
  },
  {
    slug: "platform-modernization",
    title:
      "Platform Modernization: Tech-Debt Reduction & Business-Rules Engine",
    company: "Confluent",
    period: "2024 – 2025",
    role: "Senior Salesforce Technical Architect",
    tags: ["Performance", "Platform"],
    summary:
      "Multi-quarter platform-hygiene program pairing tech-debt reduction (25+ Workflow/Process Builder → Flow migrations, trigger refactoring, LWC consolidation, 39+ field deprecations) with a configurable, custom-metadata-driven business-rules engine that lets non-engineers author complex conditional logic — notification rules, field-locking rules, eligibility rules — without code releases.",
    problem:
      "Years of incremental delivery left the org with overlapping automations firing redundantly, triggers scattered across competing patterns, and dozens of unused fields still being indexed. CPU governor limits were a daily incident. Separately, complex business logic was jammed into validation rules, Process Builders, and ad-hoc Apex with no consistent authoring surface or audit trail — every new rule was an engineering ticket.",
    architecture: [
      "Inventory-first approach — built a custom-metadata catalog of every automation (Workflow, Process Builder, Flow, trigger) keyed to the object it fires on, so the team could see fan-out before touching anything.",
      "Workflow Rules and Process Builders consolidated into a single record-triggered Flow per object, with explicit ordering and entry criteria.",
      "Apex triggers refactored onto a single trigger framework (one-trigger-per-object + handler classes + recursion guard) with a deprecation plan for each legacy variant.",
      "LWC consolidation: merged duplicative components into a shared library with slot-based composition; retired Aura ancestors.",
      "39+ unused Account fields deprecated via a controlled retirement workflow — referenced-field scan, dependency replacement, then physical delete.",
      "Business-rules engine: Rule definitions in Custom Metadata (predicate, action, severity, owning team, effective dates, versioning); Apex evaluates predicates declaratively and dispatches actions (notify, lock field, route record, fire Platform Event).",
      "LWC + Flow callable wrappers expose the rules engine to any record page or Flow. Audit log captures every evaluation and action emitted.",
    ],
    techStack: [
      "Record-Triggered Flows",
      "Apex Trigger Framework",
      "Lightning Web Components",
      "SLDS",
      "Custom Metadata Types",
      "Flow (callable actions)",
      "Platform Events",
      "CRM Analytics",
      "Apex PMD + SonarQube",
    ],
    outcome: [
      "~25% reduction in average Apex CPU time per record-save on the highest-volume objects.",
      "Reduced chronic CPU governor-limit incidents from a daily occurrence to rare edge cases.",
      "Cut the time from “RevOps wants a new rule” to production from a code-release cycle to a metadata edit.",
      "Centralized authoring and audit of complex business logic that previously sprawled across triggers, validations, and Process Builders.",
      "Pattern extended to trigger external sanctions-screening checks, enforce new-logo type locking, and govern several other regulated rule families.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // LegalZoom
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "cpq-billing-platform",
    title: "End-to-End CPQ & Billing Platform",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["CPQ", "Sales Cloud", "Platform"],
    summary:
      "Greenfield Salesforce Revenue Cloud (CPQ + Billing) implementation enabling subscription monetization across the consumer-legal product portfolio — guided quoting, deal-desk approvals, mid-term amendments, co-terminus renewals, invoicing with Stripe, and revenue scheduling — built from an empty org to production.",
    problem:
      "The legacy quoting and billing process could not support the new subscription product strategy. Sales lacked guided quoting, approvals were manual and inconsistent, contracts were tracked in spreadsheets, and revenue recognition required heavy off-platform reconciliation every month-end.",
    architecture: [
      "Designed the product catalog and pricing model from scratch — bundles, options, attribute-based pricing, tiered/volume pricing, and option-constraint rules to prevent invalid configurations.",
      "Implemented Advanced Approvals with smart approval chains driven by discount depth, term length, deal size, and product mix; approval thresholds defined in Custom Metadata so deal-desk could tune them without code.",
      "Modeled contract amendments and co-terminus renewals end-to-end; integrated Salesforce Billing for invoice generation, tax engine integration, and revenue-recognition scheduling.",
      "Custom PaymentGateway adapter wrapping Stripe's API — handles tokenized payment methods on the Account, scheduled charge-and-retry flow tied to the Billing schedule, and webhook callbacks materialized as Payment records for reconciliation. Built as a gateway adapter (rather than raw REST callouts) so Salesforce Billing's native payment lifecycle (capture, refund, void) routes through the same framework.",
      "Salesforce ↔ Adobe Sign integration for automated legal-agreement generation, with status callbacks driving the Quote workflow (sent → viewed → signed → counter-signed).",
      "Institutionalized engineering hygiene — trigger framework, service layer, selector layer, Apex test-data builders — and ran the deploy pipeline on GitHub Actions with SFDX-Git-Delta and a promotion-branching strategy, gated by PMD and SonarQube.",
    ],
    techStack: [
      "Salesforce CPQ",
      "Salesforce Billing",
      "Apex",
      "Lightning Web Components",
      "Flow Orchestration",
      "Stripe API",
      "Adobe Sign",
      "GitHub Actions + SFDX-Git-Delta",
      "SonarQube + Apex PMD",
    ],
    outcome: [
      "Architected the CPQ & Billing platform that enabled subscription monetization across the consumer-legal portfolio.",
      "Cut manual document effort by 30% via Adobe Sign automation.",
      "Established repeatable design patterns adopted across the broader engineering team.",
    ],
  },
  {
    slug: "amazon-connect-cti-integration",
    title: "Amazon Connect CTI + Chat Integration (Built From Scratch)",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["Service Cloud", "Integration"],
    summary:
      "Built the Amazon Connect ↔ Salesforce telephony and chat integration end-to-end — Connect contact flows, Open CTI adapter on the Service Console, and AWS Lambda functions that relay Connect events to Salesforce via Platform Events in real time so agents get a sub-second screen-pop the moment a call arrives.",
    problem:
      "The contact center on Amazon Connect lived outside Salesforce — agents toggled between consoles, screen-pops were unreliable, and conversation history was fragmented across systems. There was no direct bridge between the two, so a custom real-time event-relay had to be built before the integration could even start.",
    architecture: [
      "Designed Amazon Connect contact flows from scratch — IVR menu, queue routing, whisper/quality announcements, callback handling, and a clean handoff to Service Console screen-pop.",
      "Open CTI adapter on the Salesforce Service Console for inbound and outbound calling, mute, transfer, and click-to-dial — single pane for the agent.",
      "Amazon EventBridge captures Connect lifecycle events (call started, queued, answered, ended) and routes them to purpose-built Lambda handlers — decoupling event routing from processing logic so new event types can be added without rewiring the pipeline.",
      "Lambda handlers transform Contact Trace Records and publish them to Salesforce as Platform Events via the REST API, enabling sub-second screen-pops on the Service Console.",
      "Bidirectional sync of Contact, Case, and Voice Call records — every call lands on the right Account/Contact with attached transcript and recording link.",
      "Embedded Service Chat (Snap-In) on the consumer site uses the same identity-resolution rules so a single Case spans voice, chat, and email.",
      "CloudWatch alarms and a Lambda dead-letter queue ensure no Connect event is silently dropped; failed events are re-driven automatically.",
    ],
    techStack: [
      "Service Cloud",
      "Open CTI",
      "Amazon Connect (contact flows)",
      "AWS Lambda",
      "Amazon EventBridge",
      "Platform Events",
      "Embedded Service Chat (Snap-In)",
      "CloudWatch",
    ],
    outcome: [
      "Single console for agents — call, chat, and case in one pane.",
      "Sub-second screen-pop with full conversation history attached.",
      "Eliminated manual reconciliation between Connect and Salesforce reporting — all telephony events flow through a single, auditable Lambda pipeline.",
    ],
  },
  {
    slug: "order-sync-spring-boot-kafka",
    title: "Real-Time Order Sync — Spring Boot + Kafka → Salesforce",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["Integration", "Data"],
    summary:
      "Built a Java/Spring Boot microservice that consumes order events from Apache Kafka and upserts them into Salesforce in near-real-time — replacing a brittle nightly batch ETL with a streaming pipeline that keeps Salesforce order data current within seconds of a purchase on the e-commerce platform.",
    problem:
      'Order data originated in an external e-commerce platform and was synced to Salesforce via a nightly CSV batch job. Agents spent the first hours of every day working from stale data, customers calling about an order placed minutes ago got "I don\'t see it yet," and any batch failure meant an entire day of missing orders that had to be manually reconciled.',
    architecture: [
      "E-commerce platform publishes order-lifecycle events (created, updated, fulfilled, refunded) to dedicated Kafka topics with guaranteed ordering per order ID (partition key = order ID).",
      "Spring Boot consumer service with @KafkaListener consumes from the order topics, deserializes Avro payloads via Confluent Schema Registry, and maps them to Salesforce Order / OrderItem / Asset object shapes.",
      "Idempotent upsert logic keys on external order ID — safe to replay any message without creating duplicates. Composite API batches up to 25 sub-requests per call to stay within Salesforce API-call limits.",
      "Dead-letter topic captures any message that fails after configurable retries (transient Salesforce errors, schema-mismatch, data-quality issues); a small Spring Boot admin UI lets ops inspect, edit, and replay dead-lettered events.",
      "Consumer-group lag monitoring via Prometheus + Grafana dashboards; PagerDuty alerts if lag exceeds the SLA threshold (configurable, default 60 s).",
      "Schema evolution handled via Avro backward-compatible schemas registered in Schema Registry — producer can add fields without breaking the consumer.",
    ],
    techStack: [
      "Java / Spring Boot",
      "Apache Kafka",
      "Confluent Schema Registry (Avro)",
      "Salesforce REST & Composite API",
      "Prometheus + Grafana",
      "Docker / ECS",
    ],
    outcome: [
      "Order data available in Salesforce within seconds of purchase — agents always see the latest order state.",
      "Eliminated the nightly batch job and the daily morning reconciliation scramble.",
      "Dead-letter replay tooling reduced ops incident resolution from hours to minutes.",
    ],
  },
  {
    slug: "legalzoom-frontend-modernization",
    title: "Aura → LWC Modernization + Continuation-Pattern Page Optimization",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["Performance", "Platform"],
    summary:
      "Migrated the order-management surface from Aura to Lightning Web Components and re-architected the page's API-fetch path using the Apex Continuation pattern to fan out three external callouts in parallel — cutting the order page load time by ~50%.",
    problem:
      "The order-management page was an Aura component making three sequential REST callouts to external services on render — a pricing API, an entitlement API, and a fulfillment API. Page load took several seconds, sellers complained constantly, and adding any new data source made it worse.",
    architecture: [
      "Migrated the page to Lightning Web Components — slimmer DOM, native @wire reactivity, lazy-loaded sub-components for the heavy panels.",
      "Apex Continuation pattern fans the three external callouts out in parallel rather than sequentially; the LWC waits on a single combined Promise instead of three serial round-trips.",
      "Lightweight in-memory cache layer keyed on order context absorbs intra-session re-renders so navigating between order tabs doesn't re-fetch from the upstream APIs.",
      "Skeleton loading states on every panel keep the page visually responsive even when one upstream service is slow.",
      "Client-side error boundaries degrade gracefully — if the entitlement API is down, the rest of the page still renders with a clear partial-data warning.",
    ],
    techStack: [
      "Lightning Web Components",
      "Apex Continuation",
      "Apex (Service Layer)",
      "Lightning Data Service",
      "Platform Cache",
    ],
    outcome: [
      "~50% reduction in order page load time.",
      'Removed the daily flow of "page is slow" tickets from the operations team.',
      "Established the Continuation + LWC pattern as the standard for any page that fans out to multiple external services.",
    ],
  },
  {
    slug: "discount-engine-aws",
    title: "Discount Calculation Engine on AWS Lambda",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["Integration", "CPQ"],
    summary:
      "Off-platform discount-calculation engine on AWS Lambda integrated with Salesforce CPQ — moved a complex, frequently-changing pricing-discount algorithm out of Apex (where governor limits and release cadence were a problem) and into a serverless function that CPQ calls on every quote calculation.",
    problem:
      "Discount calculation logic was complex (multi-product baskets, customer-tier rules, promotion stacking, time-windowed offers), changed weekly, and was eating Apex CPU time on every quote-calculator run. Releasing pricing logic on the Salesforce release cadence couldn't keep up with marketing's promo cadence.",
    architecture: [
      "AWS Lambda (Node.js) hosts the discount-calculation engine, deployable independently of Salesforce on the marketing-promo cadence.",
      "CPQ Price Rule with a custom Apex callout action invokes the Lambda via API Gateway during quote calculation, sending the cart shape (product mix, quantities, customer tier) and receiving applied discounts with audit metadata. The callout fires once per calculation cycle, not per line item.",
      "Named Credentials manage the API Gateway endpoint and rotated API keys; per-environment configuration via Custom Metadata.",
      "Circuit breaker pattern: if the Lambda is unreachable or exceeds the timeout threshold, the quote calculates without promotional discounts and surfaces a warning banner on the Quote — sellers can still quote at list price and re-apply promos once the service recovers. Platform Cache holds the last-known discount response as a stale-cache fallback for transient failures.",
      "Caching layer on the Lambda side (DynamoDB-backed) absorbs repeat lookups within a quote-calc burst; Salesforce-side Platform Cache absorbs same-quote re-evaluation.",
      "Audit-trail custom object on Salesforce captures every discount application — input cart, output discounts, rule version that fired — so finance can audit any pricing dispute.",
    ],
    techStack: [
      "AWS Lambda (Node.js)",
      "AWS API Gateway",
      "AWS DynamoDB",
      "Salesforce CPQ",
      "Apex",
      "Named Credentials",
      "Platform Cache",
    ],
    outcome: [
      "Decoupled pricing-rule release cadence from the Salesforce release calendar — marketing could push new promos in hours, not weeks.",
      "Removed the Apex CPU pressure that was throttling quote calculation on large carts.",
      "Gave finance a clean audit trail of every applied discount, with the rule version that fired.",
    ],
  },
  {
    slug: "apex-graphql-framework",
    title: "Apex GraphQL Client Framework",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["Integration", "Platform"],
    summary:
      "A reusable Apex framework for consuming external GraphQL APIs from Salesforce — query builder, schema-aware response binding, error handling, and pagination — letting Salesforce talk to GraphQL services as cleanly as it talks to REST.",
    problem:
      "Several internal services had moved to GraphQL, and Apex had no first-class GraphQL client. Teams were hand-rolling string-concatenated query payloads, parsing untyped JSON, and re-implementing error handling on every integration. Every GraphQL integration was a rewrite of the same plumbing.",
    architecture: [
      "Fluent Apex query builder lets callers compose typed GraphQL queries (operation, fields, fragments, variables) without string-concatenating the query body.",
      "Schema-aware response binder maps the JSON response into typed Apex DTOs based on a generated schema, so callers get strongly-typed results instead of Map<String, Object> spaghetti.",
      "Centralized HTTP client with Named Credentials, retry-with-backoff, configurable timeouts, and structured GraphQL-error parsing (separates transport errors from query-result errors).",
      "Pagination helper with both cursor-based and offset-based modes; consumers iterate without re-implementing paging logic.",
      "Built-in observability — every call logged with operation name, latency, response size, and error class to a custom log object for dashboarding.",
    ],
    techStack: [
      "Apex",
      "Named Credentials",
      "Custom Metadata (schema config)",
      "Apex Test Mocks",
      "Platform Cache",
    ],
    outcome: [
      'New GraphQL integrations went from "weeks of plumbing" to "hours of business logic" once the framework existed.',
      "Eliminated a class of bugs from hand-rolled JSON parsing.",
      "Adopted org-wide as the canonical way to consume any external GraphQL API.",
    ],
  },
  {
    slug: "heroku-archival-pipeline",
    title: "Heroku Connect + Postgres Data Archival Pipeline",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["Data", "Integration", "Performance"],
    summary:
      "Continuous archival pipeline using Heroku Connect to mirror cold Salesforce data into Postgres on Heroku — keeping the Salesforce org lean and within data-storage limits while preserving full queryable history for analytics, audit, and customer-service lookup.",
    problem:
      "The org was bumping up against data-storage limits, large objects were slowing down reports and SOQL queries, and the cost of buying more Salesforce storage was punitive. But raw deletion was off the table — finance, support, and analytics all needed historical records on demand.",
    architecture: [
      "Heroku Connect syncs designated objects from Salesforce to a Postgres database on Heroku, with field-level mapping and a configurable polling cadence — configured for one-way replication in this archival use case.",
      "Archival policy expressed in Apex + Custom Metadata — records are eligible for archival based on object-specific rules (closed status + age + no recent activity); a scheduled batch tags eligible records and deletes them from Salesforce after a quarantine window, processing in dependency order (child records before parents) and skipping any record with active relationships (open Cases, in-flight Opportunities) to prevent referential-integrity violations.",
      "Read-back path: a Salesforce Connect external object surface re-exposes archived data inside the Salesforce UI on demand, so support agents can look up archived cases without leaving the console.",
      "Postgres serves as the analytics store for downstream BI — joinable with other warehouse data without re-querying Salesforce.",
      "Reconciliation job runs nightly to confirm row counts and checksums between Salesforce and Postgres; any drift fires an alert.",
    ],
    techStack: [
      "Heroku Connect",
      "PostgreSQL on Heroku",
      "Apex (Batchable + Schedulable)",
      "Custom Metadata Types",
      "Salesforce Connect (external object read-back)",
    ],
    outcome: [
      "Brought storage usage well under platform limits and avoided punitive storage upgrade costs.",
      "Sped up reports and SOQL on the archived objects materially.",
      "Preserved full historical record for audit, analytics, and on-demand agent lookup.",
    ],
  },
  {
    slug: "legalzoom-devops-strategy",
    title: "End-to-End Salesforce DevOps Strategy",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["DevOps", "Platform"],
    summary:
      "Designed and rolled out an end-to-end Salesforce DevOps strategy — GitHub source-of-truth, GitHub Actions CI/CD, SFDX Delta-based deployments, a clean trunk-and-feature branching strategy, and quality gates — replacing tribal-knowledge change-set deploys with a repeatable, auditable pipeline.",
    problem:
      "Releases were manual change-set deploys with informal review, no consistent branching strategy, and no automated test gates. Hot-fixes regularly broke other in-flight work, and re-creating production state in a sandbox required hours of detective work.",
    architecture: [
      "GitHub as source of truth for all metadata; SFDX scratch orgs for short-lived feature work; long-lived dev/QA/UAT/prod sandboxes for shared integration testing.",
      "Branching strategy: trunk-based with short-lived feature branches; release branches cut from trunk on a fixed cadence with cherry-pick discipline for hot-fixes.",
      "GitHub Actions CI: on every PR, run Apex PMD, SonarQube, unit tests in a scratch org, and an SFDX validate-deploy against the next-promoted sandbox.",
      "SFDX Delta deployments: only changed metadata is packaged and deployed — fast, predictable, and avoids the destructive-overwrite hazards of full-org deploys.",
      "Promotion automation: PR merges to release branches trigger automated deploys through dev → QA → UAT → prod with required approvals at each gate.",
      "Rollback playbook: every deploy produces a metadata backup snapshot and a destructiveChanges manifest so any release can be reversed deterministically.",
    ],
    techStack: [
      "GitHub",
      "GitHub Actions",
      "Salesforce DX (sf CLI)",
      "SFDX-Git-Delta plugin",
      "Apex PMD",
      "SonarQube",
      "Scratch Orgs",
    ],
    outcome: [
      "Cut deploy time and removed the change-set-coordination tax from every release.",
      "Made every release auditable — git diff, CI run, deploy log, all in one place.",
      "Reduced regression incidents on hot-fix releases by enforcing the same pipeline gates as scheduled releases.",
    ],
  },
  {
    slug: "legalzoom-identity-security-hardening",
    title: "Identity & Security Hardening: OAuth, JWT, Profile Reduction",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["Security", "Platform"],
    summary:
      "Multi-track security and identity hardening program — moved every external integration from username/password authentication to OAuth 2.0 (Client Credentials and JWT Bearer) with per-user Named Credentials, collapsed 40+ Profiles down to 10 base profiles + Permission Set Groups, and tightened OWD from Public Read/Write to Private with explicit sharing rules.",
    problem:
      "External integrations were authenticating with stored username/password — every credential rotation was a coordination nightmare and any leak meant a full org reset. Profile sprawl (40+) made permission audits impossible. OWD was Public Read/Write across most objects, so least-privilege was a fiction.",
    architecture: [
      "Migrated every external integration to OAuth 2.0 — Client Credentials flow for service-to-service, JWT Bearer flow for headless backend integrations — with Named Credentials managing endpoint and credential rotation.",
      "Per-user Named Credentials for external attorney API consumers so each attorney's API calls authenticate as themselves with scoped access, not via a shared service principal.",
      'Profile reduction from 40+ to 10 base profiles — minimum-access baseline plus Permission Set Groups composed for each persona, with a documented map from "old profile" to "new baseline + permission sets" for the migration.',
      "OWD tightening: moved sensitive objects from Public Read/Write to Private; criteria-based sharing rules grant access where needed; Apex managed sharing handles ad-hoc collaborator scenarios.",
      "Identity provider integration: SSO via OAuth/SAML through the corporate IdP; MFA enforced at the IdP layer; session settings tightened in lockstep.",
      "Field-level security audit and tightening — restricted PII fields to roles that legitimately need them; documented field-access rationale.",
    ],
    techStack: [
      "OAuth 2.0 (Client Credentials + JWT Bearer)",
      "Named Credentials (per-user variant)",
      "Permission Set Groups",
      "Apex Managed Sharing",
      "SSO (SAML / OIDC)",
      "Salesforce Shield (audit trail)",
    ],
    outcome: [
      "Eliminated stored username/password credentials for external integrations org-wide.",
      "Cut profiles from 40+ to 10 — permission audits became a possible task again.",
      "Brought OWD to a real least-privilege baseline; sharing decisions are now explicit and auditable.",
    ],
  },
  {
    slug: "attorney-partner-community",
    title: "Attorney Partner Community + TimeTrade Scheduling",
    company: "LegalZoom",
    period: "2022 – 2024",
    role: "Salesforce Technical Architect",
    tags: ["Experience Cloud", "Integration"],
    summary:
      "Branded Experience Cloud portal for the network of independent attorneys, integrated with the TimeTrade scheduling API for self-service consumer-to-attorney consultations — bringing the entire attorney engagement loop (intake, scheduling, casework, document exchange) onto the platform.",
    problem:
      "Independent attorneys engaged manually via email and spreadsheets — case routing, capacity, calendars, and document exchange all lived off-platform. Consumer-to-attorney scheduling was a high-friction back-and-forth that bled conversion at the top of the funnel.",
    architecture: [
      "Experience Cloud site on the Lightning Web Runtime (LWR) stack with attorney-only navigation, branded login, and SSO via OAuth 2.0.",
      "Sharing Sets and account-relationship sharing scope each attorney to their own caseload only — restrictive defaults, explicit grants for collaboration.",
      "TimeTrade API integration for skills-based matching, business-hour calendars, and time-zone resolution; confirmed appointments materialize as records on a custom Appointment object linked to the Account, Contact, and assigned attorney.",
      "Consumer-facing scheduling flow embedded on the marketing site via a headless TimeTrade API call; once confirmed, the appointment writes back through Salesforce so the attorney sees it in their portal.",
      "Notification framework (email + SMS via Marketing Cloud) for confirmations, reminders, and reschedules, all keyed to the same Appointment record.",
      "Connected App + OAuth 2.0 flow authenticates each attorney into the portal as themselves; Experience Cloud sharing sets and account-relationship sharing enforce caseload-scoped data access without a shared service principal.",
    ],
    techStack: [
      "Experience Cloud (LWR)",
      "TimeTrade Scheduling API",
      "Sharing Sets",
      "OAuth 2.0",
      "Lightning Web Components",
      "Marketing Cloud (notifications)",
      "Apex",
      "Connected App",
    ],
    outcome: [
      "Onboarded the attorney network onto a single self-service portal with scoped data access by default.",
      "Cut consumer-to-attorney scheduling friction to a few clicks, lifting top-of-funnel conversion.",
      "Provided a governed extension surface for downstream attorney-facing features without touching the internal org.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Splunk
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "lightning-experience-migration",
    title: "Salesforce Classic → Lightning Experience Migration",
    company: "Splunk",
    period: "2022",
    role: "Senior Salesforce Developer",
    tags: ["Platform", "Performance"],
    summary:
      "Led the platform-wide cutover of a 1,500+ user GTM org from Salesforce Classic to Lightning Experience — page redesigns, JavaScript-button replacement, Visualforce-to-LWC migration, AppExchange compatibility audit, training, and a phased rollout with per-team rollback gates.",
    problem:
      "The org was running productive but legacy Classic UI, blocked from adopting Lightning-only features (Sales Path, Kanban, Einstein, the modern Service Console) and accumulating technical debt in Visualforce pages, S-controls, and unsupported JavaScript buttons. Every new Salesforce release widened the gap.",
    architecture: [
      "Phased cutover plan by business unit with per-team adoption checkpoints and explicit rollback gates so any regression could be contained.",
      "Audit-and-triage of every Visualforce page, S-control, and JavaScript button — converted to Lightning components, Quick Actions, or Flows; deprecated what no longer earned its keep.",
      "Redesigned Lightning record pages per persona using App Builder, Dynamic Forms, and conditional visibility — same record, different views for AE vs. SE vs. CSM.",
      "Compatibility-tested every installed AppExchange package; replaced or upgraded the unsupported ones before cutover.",
      "RevOps-led training, In-App Guidance walkthroughs, and a structured feedback loop driving rapid iteration during the first 30 days post-cutover.",
    ],
    techStack: [
      "Lightning Experience",
      "Lightning App Builder + Dynamic Forms",
      "Lightning Web Components",
      "Aura",
      "Visualforce (legacy)",
      "Quick Actions",
      "Flow",
      "In-App Guidance",
      "Salesforce DX",
    ],
    outcome: [
      "Phased cutover of a 1,500+ user org — rollback gates contained regressions at the team level before they could escalate.",
      "Unlocked Lightning-only feature adoption (Sales Path, Kanban, Einstein, modern Service Console) for downstream teams.",
      "Established a UI design system and persona-based record pages reused across subsequent rollouts.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Twitter
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "recruiting-pipeline",
    title: "End-to-End Recruiting Solution + Offer Letter Engine",
    company: "Twitter",
    period: "2019 – 2021",
    role: "Senior Salesforce Engineer",
    tags: ["Platform", "Integration"],
    summary:
      "Recruiting pipeline platform on Salesforce for a ~1,000-user talent-acquisition organization — Candidates, Requisitions, Stages, Interviews, Offers — paired with a custom offer-letter generation engine on Heroku (Node.js) that handles template management, conditional content rules, and Adobe Sign e-signature delivery. End-to-end from inbound candidate through countersigned offer, with résumé-parser enrichment and a global compensation-calculation engine.",
    problem:
      "The talent-acquisition organization (~1,000 platform users — recruiters, coordinators, and hiring managers) needed a unified candidate pipeline, compliance-aligned compensation planning across multiple geographies (US, EMEA, APAC), and structured interview/offer tracking — none of which existed at scale. Recruiters were stitching together spreadsheets, ATS exports, and email threads. Offer letters were manually assembled in Word, with conditional clauses (geography, role level, comp components, equity grants) copy-pasted between templates — mistakes were frequent, version control was nonexistent, and counter-signed letters had no system of record.",
    architecture: [
      "Salesforce Platform (on a Sales Cloud foundation) with a purpose-built custom-object model — Candidate, Requisition, Stage, Interview, Offer — giving each requisition a single pipeline view with stage gates and audit trail.",
      "Custom compensation-calculation engine in Apex with geography-specific pay bands, leveling, equity refresh, and sign-on bonus rules; HR approval workflows compliant with US, EMEA, and APAC regulations.",
      "Résumé-parser vendor integration for inbound candidate enrichment — auto-populates skills, prior employers, and education on Candidate creation.",
      "Interview scheduling integration into the recruiter's calendar; structured interview-feedback capture with rubric-based scoring.",
      "Offer-letter generation engine on Heroku (Node.js) — pluggable template registry, conditional-content rules, merge-field substitution, and PDF rendering. Template management UI lets HR/legal author and version templates without engineering involvement; rules expressed in a config DSL evaluated at render time.",
      "Salesforce → Heroku trigger: when an Offer record is approved, an Apex callout posts the offer payload to the engine, which renders the PDF and returns a document URL.",
      "Adobe Sign integration handles the e-signature workflow; status callbacks (sent → viewed → signed → counter-signed) materialize on the Offer record and drive downstream candidate-to-employee conversion.",
      "Every generated document, every approved version, and every signed PDF is archived to S3 with a Salesforce-side reference, giving full audit trail per offer. Snapshot-test suite covers every template + condition combination — any rule change immediately surfaces visual diffs.",
      "Bitbucket pipelines and Metadata API release packaging for DevOps; standard test-data builder pattern for repeatable Apex tests.",
    ],
    techStack: [
      "Salesforce Platform (Sales Cloud)",
      "Apex (Service Layer)",
      "Lightning Components",
      "Custom Objects",
      "Heroku",
      "Node.js",
      "PDF rendering library",
      "Adobe Sign",
      "AWS S3",
      "Résumé-Parser API",
      "Bitbucket Pipelines",
    ],
    outcome: [
      "~20% reduction in time-to-hire across the talent-acquisition organization.",
      "Compliance-aligned compensation planning across US, EMEA, and APAC.",
      "Automated the end-to-end offer-letter lifecycle — from template selection through countersigned PDF — via Adobe Sign integration.",
      "Eliminated an entire class of copy-paste errors in offer letters and created a single auditable system of record.",
      "Improved candidate data quality via résumé-parser integration.",
    ],
  },
  {
    slug: "twitter-employee-service-community",
    title:
      "Internal Employee Platforms: Service Community + Back-to-Office on Work.com",
    company: "Twitter",
    period: "2019 – 2021",
    role: "Senior Salesforce Engineer",
    tags: ["Experience Cloud", "Service Cloud"],
    summary:
      "Two complementary internal-employee surfaces on Salesforce: a unified Experience Cloud + Service Cloud self-service community for HR/IT/Benefits/Compensation/Onboarding/tooling-procurement requests (published as a native iOS/Android app via Salesforce Mobile Publisher), and a post-COVID back-to-office solution on Salesforce Work.com + Scheduler covering capacity-controlled desk reservations, health-screening attestations, and contact tracing.",
    problem:
      "Employee support requests were spread across HR email aliases, IT ticketing tools, benefits forms, and ad-hoc Slack messages — nobody could see backlog or SLA across the support surface, and onboarding new employees meant a multi-tab scavenger hunt for the right form. When offices reopened post-COVID, the org additionally needed an end-to-end way to manage capacity (per-floor and per-desk limits), self-service scheduling, health-screening attestations, and contact-tracing — without standing up a dozen disconnected tools under time pressure.",
    architecture: [
      "Experience Cloud site fronts a unified self-service catalog — submit a ticket, browse Knowledge, track open requests — with persona-tailored navigation for engineers, sales, support, etc.",
      "Service Cloud Cases as the system of record for every request, routed via Omni-Channel to the right HR / IT / Benefits / Procurement queue based on category and urgency.",
      "Knowledge base curated by each functional team; recommended-articles surface on the case-submission form to deflect tickets at the source.",
      "Onboarding journey: a Flow-orchestrated checklist auto-creates the new-hire's requests across teams (laptop, accounts, badge, benefits enrollment) with deterministic SLAs.",
      "Salesforce Mobile Publisher packages the community into a branded iOS/Android app published to the App Store and Play Store, with push notifications for case updates.",
      "Back-to-office surface configured on Salesforce Work.com — Floor, Desk/Workspace, Reservation, and Health-Screening objects modeled coherently.",
      "Salesforce Scheduler with capacity rules per floor/desk, business-hour windows, and time-zone resolution; employees self-book through the same Experience Cloud entry point.",
      "Health-screening attestation gates each reservation; failed attestations trigger an operations alert. Contact-tracing query surface returns everyone who shared a workspace within proximity windows for a given employee + date range.",
      "Reporting: utilization, SLA attainment, and deflection-rate dashboards per support team; real-time occupancy and trend dashboards for facilities ops.",
    ],
    techStack: [
      "Experience Cloud",
      "Service Cloud",
      "Salesforce Work.com",
      "Salesforce Scheduler",
      "Omni-Channel",
      "Knowledge",
      "Flow Orchestration",
      "Salesforce Mobile Publisher",
      "Lightning Web Components",
    ],
    outcome: [
      "Single self-service surface for HR, IT, Benefits, Onboarding — replaced a tangle of email aliases and forms.",
      "Deterministic SLAs and reporting across the entire employee-support surface.",
      "Branded mobile app made support accessible from anywhere, on any device.",
      "Stood up a complete back-to-office solution in weeks, on the platform, with no new vendor stack.",
      "Gave operations real-time capacity, attestation, and contact-tracing without spreadsheets.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Dell Technologies
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "dell-service-cloud-siebel-migration",
    title: "Service Cloud Greenfield + Siebel CRM Cutover & Data Migration",
    company: "Dell Technologies",
    period: "2017 – 2019",
    role: "Senior Salesforce Developer",
    tags: ["Service Cloud", "Platform", "Integration", "Data"],
    summary:
      "Greenfield Service Cloud implementation for a 50,000+ user GTM/support organization, fully on Lightning, replacing the legacy Siebel CRM — including the migration of millions of records (Accounts, Contacts, Cases, Assets, Entitlements, Activity history) into the new platform with full referential integrity. End-to-end case management, escalation, omni-channel routing, entitlement & SLA, asset management, multi-channel intake (Web-to-Case, Chat, Social, Email, CTI), Knowledge, Service Console, Macros, and Einstein-assisted classification — all delivered on a high-volume, integration-heavy platform.",
    problem:
      "Dell's legacy Siebel CRM was reaching end-of-life — UI was dated, it couldn't scale to evolving channel mix (chat, social, modern CTI), customizations had calcified, and the integration surface to the rest of the enterprise was brittle. The replacement had to land on Salesforce Lightning, support 50,000+ internal users, survive massive transaction volume from day one, and bring years of historical customer/asset/case data with full referential integrity — all without slipping the cutover window.",
    architecture: [
      "Lightning-only Service Console as the agent surface — case-centric layout, related lists configured per persona, quick actions and Macros for repetitive operations.",
      "Complete Case Management lifecycle: multi-channel intake (Web-to-Case, Email-to-Case, Live Agent / Snap-In Chat, Social-to-Case for Twitter and Facebook, voice via Twilio integrated through the Open CTI framework), Omni-Channel routing on skill + capacity, escalation rules, and entitlement-driven SLA milestones.",
      "Asset Management and Entitlement Management modeling the customer's product footprint and contracted support level — every case linked to the asset and the entitlement that governs SLA.",
      "Knowledge base with article suggestions on case open, agent feedback loop, and multilingual article support.",
      "Einstein AI on Service Cloud — Customer Sentiment scoring on cases and chats, plus Case Classification API auto-suggesting category, priority, and routing on intake.",
      "Async-by-default architecture for scale: heavy work runs in Queueable/Batch Apex, cross-system effects flow via Outbound Messages and Platform Events, and hot logic offloaded to the ESB integration layer to keep the Salesforce platform within governor limits.",
      "Staged ETL data migration: Siebel extract → Postgres staging → cleanse + dedupe + identity-resolve → Salesforce Bulk API 2.0 load. Deterministic match keys (DUNS, customer ID, normalized email) with probabilistic fallback for fuzzy duplicates; all matches kept in an audit table for QA review.",
      "Sequenced loads honoring the Salesforce dependency graph — Accounts → Contacts → Assets → Entitlements → Cases → Activity — with row-level reconciliation reports at each stage and a delta-sync queue for incremental Siebel changes during the cutover freeze.",
      "Cutover playbook: pre-cutover dry runs against full production-volume data in a Full Sandbox, automated reconciliation queries against Siebel after each load, a documented fall-back path, and a 30-day post-cutover audit harness comparing Siebel snapshot vs. Salesforce state to surface any drift.",
      "Copado-managed CI/CD pipeline with promotion gates, automated regression suites, and full deploy traceability.",
    ],
    techStack: [
      "Service Cloud (Lightning)",
      "Omni-Channel",
      "Live Agent / Snap-In Chat",
      "Social-to-Case (Twitter, Facebook)",
      "Email-to-Case + Web-to-Case",
      "Twilio (via Open CTI)",
      "Knowledge",
      "Entitlements & Milestones",
      "Einstein Customer Sentiment + Case Classification API",
      "Apex (Queueable + Batch)",
      "Outbound Messages + Platform Events",
      "Salesforce Bulk API 2.0",
      "PostgreSQL (staging)",
      "Informatica / custom ETL",
      "Copado",
    ],
    outcome: [
      "Contributed to the successful greenfield cutover from Siebel to Salesforce Service Cloud across a 50,000+ user organization — owned the Salesforce-side data model, async architecture, and migration reconciliation.",
      "Migrated millions of records with full referential integrity — staged loads with row-level reconciliation at each stage and a 30-day post-cutover audit harness caught drift before it reached end users.",
      "Unified multi-channel support (voice, chat, email, web, social) onto a single agent console.",
      "Established the async + ESB architectural pattern that kept the platform performant under high transaction volume.",
      "Created a reusable migration playbook applied to subsequent regional rollouts.",
    ],
  },
  {
    slug: "dell-field-service-dispatch",
    title: "Field Service Dispatch + Partner Community",
    company: "Dell Technologies",
    period: "2017 – 2019",
    role: "Senior Salesforce Developer",
    tags: ["Field Service", "Service Cloud", "Experience Cloud"],
    summary:
      "Full Field Service Lightning (FSL) Dispatch Management implementation paired with a Community Cloud (Experience Cloud) portal for Dell's external service partners — bringing internal dispatchers, field engineers, and external partners onto a single SLA-aware, asset-aware work-order platform with scoped data access by partner organization.",
    problem:
      "Field-service work was being scheduled in a legacy dispatcher tool with no link back to the customer's asset footprint, no service-territory awareness, and no SLA enforcement. Parts selection during Work Order creation was a high-touch, error-prone manual process that field engineers were getting wrong on dispatch. External service partners were getting Work Orders via email and updating status by phone — slow, error-prone, and invisible to internal dispatch in real time.",
    architecture: [
      "FSL data model configured against Dell's service domain — Service Territory hierarchy (region → district → zone), Work Type catalog with skill requirements, Resource and Resource-Skill mapping.",
      "Work Order and Work Order Line Item objects driving the dispatch flow; Asset model linked to the customer's product footprint with Entitlements governing SLA.",
      "Custom Aura component for parts selection — searchable parts catalog with availability, compatibility filtering against the target Asset, and inline quantity-and-line-item creation; built because the standard FSL UI couldn't express the compatibility-and-availability matrix.",
      "Custom Aura Work Order creation wizard — guides the agent through customer/asset selection, work-type choice, parts attachment, and territory-aware scheduling in a single guided flow.",
      "Dispatcher Console for the dispatch team — Gantt-based scheduling with skill, territory, and SLA awareness; auto-assignment rules for routine work types.",
      "Mobile workflow for field engineers via the FSL mobile app — work-order acceptance, parts confirmation, completion checklists, and customer signature capture.",
      "Community Cloud site branded for the partner program, with login via partner-account SSO; partner-only navigation tailored to the work-order workflow.",
      "Partner sharing model: account-relationship sharing plus Sharing Sets scope each partner organization to its own assigned Work Orders, Assets, and Cases — broader internal data is invisible by default.",
      "Partner portal exposes Work Order list views, accept/decline actions, status updates, parts confirmation, and completion checklist; updates flow back into the internal FSL dispatch console in real time so dispatchers see partner progress without waiting for a phone call.",
      "Notification framework keeps partners aware of new assignments and approaching SLA milestones; in-community knowledge surfaces for reference material.",
    ],
    techStack: [
      "Field Service Lightning",
      "FSL Dispatcher Console",
      "FSL Mobile",
      "Aura Components",
      "Apex",
      "Service Territories",
      "Work Types",
      "Entitlements & Milestones",
      "Community Cloud / Experience Cloud",
      "Sharing Sets",
      "Account-Relationship Sharing",
      "SSO",
    ],
    outcome: [
      "Replaced the legacy dispatcher tool with an SLA-aware, asset-aware FSL implementation.",
      "Cut parts-selection errors at dispatch by enforcing compatibility-and-availability rules in the UI.",
      "Gave field engineers a mobile-first work-order experience with offline-tolerant completion.",
      "Brought external service partners onto the platform with scoped, audit-friendly data access.",
      "Cut the email-and-phone overhead of partner work-order coordination and gave dispatch real-time visibility into partner work, replacing daily reconciliation calls.",
    ],
  },
  {
    slug: "einstein-case-routing",
    title: "Einstein Intelligent Case Routing",
    company: "Dell Technologies",
    period: "2017 – 2019",
    role: "Senior Salesforce Developer",
    tags: ["AI", "Service Cloud", "Performance"],
    summary:
      "AI-powered intelligent case routing on Service Cloud + Field Service Lightning, improving service-team throughput by ~25%. Einstein Case Classification predicts queue, priority, product area, and required skill from case content; Omni-Channel routing and FSL Dispatch consume those predictions to assign work to the right human, every time.",
    problem:
      "Manual case triage across multiple service queues and dispatch regions resulted in slow first-response times, inconsistent agent utilization, and a steady stream of misrouted cases that bounced between queues before ever reaching a qualified agent.",
    architecture: [
      "Einstein Case Classification model trained on years of historical case metadata to predict queue, priority, product area, and required skill from incoming case content.",
      "Omni-Channel routing rules consume the predictions and assign cases to the optimal agent based on skill, capacity, and live availability.",
      "Field Service (FSL) Dispatch overlay for work that requires field engineers — geo-aware, SLA-aware, and skill-aware scheduling.",
      "Email-to-Case ingestion plus entitlement-driven SLA milestones plug into the same routing pipeline so SLA timers, warnings, and escalations are uniform regardless of channel.",
      "Continuous-improvement loop — classification feedback flows back into model retraining; misroutes are flagged via a one-click custom feedback action so the model learns over time.",
    ],
    techStack: [
      "Einstein Case Classification",
      "Service Cloud",
      "Omni-Channel",
      "Field Service Lightning",
      "Apex",
      "Email-to-Case",
      "Entitlements & Milestones",
    ],
    outcome: [
      "~25% improvement in service-team throughput (cases resolved per agent per day).",
      "Cut average first-response time and improved agent utilization.",
      "Established AI-assisted operations as a repeatable Service Cloud pattern reused on later programs.",
    ],
  },
  {
    slug: "salesforce-connect-odata",
    title: "Salesforce Connect — External Objects via OData 4.0",
    company: "Dell Technologies",
    period: "2017 – 2019",
    role: "Senior Salesforce Developer",
    tags: ["Integration", "Data"],
    summary:
      "Used Salesforce Connect with OData 4.0 to expose data from external systems (ERP, asset registries, parts catalogs) as External Objects inside Salesforce — letting agents query and reference upstream data live, without copying it into the Salesforce database or building a sync pipeline.",
    problem:
      "Several upstream systems held data agents needed in real time — parts inventory, ERP order status, asset registries — but copying it all into Salesforce wasn't viable: the data changed too fast, volumes were too large, and Salesforce storage costs would have been punitive.",
    architecture: [
      "Built OData 4.0 service endpoints in front of each upstream system, exposing the entity sets agents needed (with proper $filter, $select, $expand support).",
      "Salesforce External Data Sources configured for each OData endpoint with cached metadata and Named-Credential-managed authentication.",
      "External Objects materialize as if they were Salesforce records on Lightning record pages, related lists, list views, and SOQL — agents query upstream data without leaving the console.",
      "Indirect Lookup relationships from standard Salesforce objects (Account, Case, Asset) to the External Objects, so the agent can navigate a Case → linked ERP Order → upstream order detail in one click.",
      "Selective server-side caching on the OData layer balances freshness against upstream load; rate-limit guardrails protect upstream systems from query bursts.",
    ],
    techStack: [
      "Salesforce Connect",
      "OData 4.0",
      "External Objects",
      "External Data Sources",
      "Indirect Lookup Relationships",
      "Named Credentials",
    ],
    outcome: [
      "Gave agents real-time access to upstream data without bloating Salesforce storage or building a sync pipeline.",
      "Avoided storage costs and consistency headaches that would have come with replicating high-volume upstream data.",
      'Established External Objects + OData as the default pattern for "read-mostly" upstream data integration.',
    ],
  },
  {
    slug: "dell-copado-devops",
    title: "Copado DevOps Strategy for Service Cloud at Scale",
    company: "Dell Technologies",
    period: "2017 – 2019",
    role: "Senior Salesforce Developer",
    tags: ["DevOps", "Platform"],
    summary:
      "Established a complete DevOps strategy on Copado for the Dell Service Cloud program — source-controlled metadata, environment promotion pipeline, automated regression gates, and rollback discipline — replacing change-set-driven deploys with a repeatable pipeline that could absorb the program's release cadence.",
    problem:
      "A 50,000-user Service Cloud program with multiple parallel work streams couldn't survive on change-set deployments — releases were slow, error-prone, and impossible to audit. Different teams were following different deployment patterns, and rollback was a manual scramble.",
    architecture: [
      "Copado as the orchestration layer for source control, environment promotion, deployment, and rollback — a single pane that every team uses the same way.",
      "Metadata source-controlled in Git; feature work happens on short-lived branches that promote through dev → QA → UAT → prod via Copado pipelines with required approvals.",
      "Static-code-analysis and Apex-test gates enforced at each promotion step; deploys can't advance unless quality gates pass.",
      "Automated regression suite runs on the pre-prod environment before every prod promotion; failures block the release and surface to the responsible team.",
      "Rollback playbook: each deploy generates a restore manifest; rollbacks are a one-click operation, not a manual recovery exercise.",
      "Release-train cadence (predictable cut/test/ship windows) plus a hot-fix lane with the same gates compressed.",
    ],
    techStack: [
      "Copado",
      "Git",
      "Apex PMD",
      "Apex Test Framework",
      "Salesforce DX",
      "Sandbox Strategy (DEV / QA / UAT / Full)",
    ],
    outcome: [
      "Replaced manual change-set deploys with a repeatable, auditable pipeline absorbing the full program release cadence.",
      "Made every release auditable end-to-end — git diff, CI run, Copado deploy log, rollback manifest.",
      "Cut release-incident frequency and made rollback a controlled operation instead of a fire drill.",
    ],
  },
];
