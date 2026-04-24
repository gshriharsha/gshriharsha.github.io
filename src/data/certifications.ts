export interface Certification {
  name: string;
  short: string;
  category: "Architect" | "Developer" | "Specialist" | "Foundation";
  logo?: string;
}

export const certifications: Certification[] = [
  {
    name: "Salesforce Certified Application Architect",
    short: "Application Architect",
    category: "Architect",
    logo: "/images/certifications/application-architect.png",
  },
  {
    name: "Salesforce Certified Integration Architect",
    short: "Integration Architect",
    category: "Architect",
    logo: "/images/certifications/integration-architect.png",
  },
  {
    name: "Salesforce Certified Data Architect",
    short: "Data Architect",
    category: "Architect",
    logo: "/images/certifications/data-architect.png",
  },
  {
    name: "Salesforce Certified Sharing & Visibility Architect",
    short: "Sharing & Visibility",
    category: "Architect",
    logo: "/images/certifications/sharing-visibility-architect.png",
  },
  {
    name: "Salesforce Certified Platform Developer II",
    short: "Platform Developer II",
    category: "Developer",
    logo: "/images/certifications/platform-developer-ii.png",
  },
  {
    name: "Salesforce Certified Platform Developer I",
    short: "Platform Developer I",
    category: "Developer",
    logo: "/images/certifications/platform-developer-i.png",
  },
  {
    name: "Salesforce Certified App Builder",
    short: "App Builder",
    category: "Developer",
    logo: "/images/certifications/app-builder.png",
  },
  {
    name: "Salesforce Certified CPQ Specialist",
    short: "CPQ Specialist",
    category: "Specialist",
    logo: "/images/certifications/cpq-specialist.png",
  },
  {
    name: "Salesforce Certified Salesforce Associate",
    short: "Salesforce Associate",
    category: "Foundation",
    logo: "/images/certifications/salesforce-associate.png",
  },
];
