export interface Certification {
  name: string;
  short: string;
  category: "Architect" | "Developer" | "Specialist" | "Foundation" | "AI";
  logo?: string;
  issued?: string;
  url?: string;
  organization?: string;
}

export const certifications: Certification[] = [
  // Salesforce Certifications
  {
    name: "Salesforce Certified Application Architect",
    short: "Application Architect",
    category: "Architect",
    organization: "Salesforce",
    issued: "Dec 2018",
    url: "https://www.salesforce.com/trailblazer/shri-harsha-gangi-reddy",
    logo: "/images/certifications/application-architect.png",
  },
  {
    name: "Salesforce Certified Integration Architect",
    short: "Integration Architect",
    category: "Architect",
    organization: "Salesforce",
    issued: "Dec 2018",
    url: "https://www.salesforce.com/trailblazer/shri-harsha-gangi-reddy",
    logo: "/images/certifications/integration-architect.png",
  },
  {
    name: "Salesforce Certified Data Architect",
    short: "Data Architect",
    category: "Architect",
    organization: "Salesforce",
    issued: "Nov 2018",
    url: "https://www.salesforce.com/trailblazer/shri-harsha-gangi-reddy",
    logo: "/images/certifications/data-architect.png",
  },
  {
    name: "Salesforce Certified Sharing & Visibility Architect",
    short: "Sharing & Visibility",
    category: "Architect",
    organization: "Salesforce",
    issued: "Dec 2018",
    url: "https://www.salesforce.com/trailblazer/shri-harsha-gangi-reddy",
    logo: "/images/certifications/sharing-visibility-architect.png",
  },
  {
    name: "Salesforce Certified Platform Developer II",
    short: "Platform Developer II",
    category: "Developer",
    organization: "Salesforce",
    issued: "Aug 2018",
    url: "https://www.salesforce.com/trailblazer/shri-harsha-gangi-reddy",
    logo: "/images/certifications/platform-developer-ii.png",
  },
  {
    name: "Salesforce Certified Platform Developer I",
    short: "Platform Developer I",
    category: "Developer",
    organization: "Salesforce",
    issued: "Feb 2017",
    url: "https://www.salesforce.com/trailblazer/shri-harsha-gangi-reddy",
    logo: "/images/certifications/platform-developer-i.png",
  },
  {
    name: "Salesforce Certified App Builder",
    short: "App Builder",
    category: "Developer",
    organization: "Salesforce",
    issued: "Dec 2018",
    url: "https://www.salesforce.com/trailblazer/shri-harsha-gangi-reddy",
    logo: "/images/certifications/app-builder.png",
  },
  {
    name: "Salesforce Certified CPQ Specialist",
    short: "CPQ Specialist",
    category: "Specialist",
    organization: "Salesforce",
    issued: "Jan 2024",
    url: "https://www.salesforce.com/trailblazer/shri-harsha-gangi-reddy",
    logo: "/images/certifications/cpq-specialist.png",
  },
  {
    name: "Salesforce Certified Salesforce Associate",
    short: "Salesforce Associate",
    category: "Foundation",
    organization: "Salesforce",
    issued: "Apr 2023",
    url: "https://www.salesforce.com/trailblazer/shri-harsha-gangi-reddy",
    logo: "/images/certifications/salesforce-associate.png",
  },
  // Anthropic Certifications
  {
    name: "Introduction to Model Context Protocol",
    short: "Model Context Protocol",
    category: "AI",
    organization: "Anthropic",
    issued: "May 2026",
    url: "https://verify.skilljar.com/c/huxih44qzbcc",
    logo: "/images/certifications/anthropic.png",
  },
  {
    name: "Building with the Claude API",
    short: "Claude API",
    category: "AI",
    organization: "Anthropic",
    issued: "May 2026",
    url: "https://verify.skilljar.com/c/i7gwcmbomjx9",
    logo: "/images/certifications/anthropic.png",
  },
  {
    name: "Claude Code in Action",
    short: "Claude Code",
    category: "AI",
    organization: "Anthropic",
    issued: "May 2026",
    url: "https://verify.skilljar.com/c/6w7onxomfk6v",
    logo: "/images/certifications/anthropic.png",
  },
  {
    name: "Certificate of completion: Claude code 101",
    short: "Claude Code 101",
    category: "AI",
    organization: "Anthropic",
    issued: "May 2026",
    url: "https://verify.skilljar.com/c/w3xjd3cbgk2f",
    logo: "/images/certifications/anthropic.png",
  },
  {
    name: "Certificate of completion: Claude 101",
    short: "Claude 101",
    category: "AI",
    organization: "Anthropic",
    issued: "May 2026",
    url: "https://verify.skilljar.com/c/uvto3r29xpt6",
    logo: "/images/certifications/anthropic.png",
  },
];
