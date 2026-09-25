import { CandidateProfile, ExtractedJobData } from '../types';

export const USER_ACTUAL_RESUME_TEXT = `Senior Software Engineer

Professional Summary
Results-driven Senior Software Engineer with 15+ years of comprehensive experience in full-cycle software development, system architecture design, and technical team leadership. Proficient in end-to-end development of enterprise-level backend systems, cloud-based applications, and high-concurrency distributed platforms. Equipped with solid expertise in requirement analysis, technical solution formulation, code optimization, and project lifecycle management. Adept at leading cross-functional teams to deliver high-performance, scalable, and low-maintenance software products. Possess strong problem-solving capabilities, rich experience in resolving complex technical bottlenecks, and a customer-centric mindset to drive technical innovation and business value improvement.

Core Technical Skills
GraphQL . Kubernetes ,CI/CD Pipeline
• Programming Languages: Java, Python, Go, JavaScript/TypeScript, C++, SQL
• Frameworks & Libraries: Spring Boot, Spring Cloud, Django, React, Vue, MyBatis, Redis
• Database & Storage: MySQL, PostgreSQL, MongoDB, Redis, Elasticsearch
• Cloud & DevOps: Docker, Kubernetes, Jenkins, AWS/AliCloud, CI/CD Pipeline
• Architecture Design: Microservice Architecture, Distributed System, High Concurrency & High Availability Design, System Refactoring, API Design
• Development Tools & Management: Git, Jira, Swagger, Postman, Unit Testing
• Domain Experience: Enterprise Business System, Financial Software, IoT Platform, Data Analysis System, SaaS Platform

Professional Work Experience

Senior Software Engineer / Technical Lead
Rich company1, Los Angeles | 09 2020 – Present
10 years of core technical and team management experience, responsible for company core business system architecture and R&D management

1. Led the architecture design and iterative upgrade of the enterprise core microservice platform, split the traditional monolithic system into 20+ independent microservices, improved system scalability by 80%, and reduced business iteration cycle from 2 weeks to 3 days.
2. Independently designed and developed high-concurrency transaction processing systems, optimized database indexes and cache strategies, supported 10W+ daily active users and 5000+ concurrent requests, improved system response speed by 60%, and achieved 99.99% system stability.
3. Led a 8-12 person R&D team, responsible for task decomposition, technical review, code standard formulation, and personnel training; standardized development processes, reduced online bug rate by 45%, and improved team R&D efficiency by 35%.
4. Completed multiple system refactoring and technical upgrades, solved long-standing technical debts such as code redundancy and module coupling, improved system maintainability, and reduced subsequent operation and maintenance costs by 40%.
5. Cooperated with product, operation and testing teams to sort out business requirements, transform business demands into feasible technical solutions, and successfully delivered more than 30 key business projects, effectively driving business revenue growth.
6. Introduced DevOps automated deployment process, built CI/CD pipeline and automated testing system, realized one-click deployment of projects, and reduced manual deployment errors and time costs.

Software Engineer / Senior Developer
Previous Company Tech CO. | 09 2011 – 06 2020
5 years of front-line software development experience, engaged in full-stack development and module independent development work

1. Responsible for the full-stack development of enterprise management systems, independently completing the design and coding of backend interface development, database design and front-end functional modules, and successfully launching 15+ functional modules.
2. Optimized SQL query logic and program execution logic for the old business system, solved the problem of system stuttering under big data volume, and improved data query efficiency by 70%.
3. Participated in the development of cloud-based SaaS platform, completed the docking of third-party APIs, message queue processing and data synchronization functions, ensuring the stable interaction of multi-system data.
4. Compiled detailed technical documents, development specifications and operation manuals, accumulated enterprise technical assets, and facilitated rapid onboarding of new team members.
5. Cooperated with the testing team to complete functional testing, stress testing and bug repair, strictly guaranteed online product quality, and accumulated rich experience in high-quality software delivery.

Project Experience

Enterprise Distributed Business Platform Project
Role: Technical Lead & Core Developer
1. Built a complete microservice architecture based on Spring Cloud and Docker, including service registration, discovery, fusing and current limiting functions, ensuring high availability of the platform.
2. Designed distributed database sharding and read-write separation schemes to solve the performance bottleneck of single database under massive data, supporting long-term business data growth.
3. Integrated Redis cache and Elasticsearch full-text search engine, optimized business query scenarios, and greatly improved user operation experience.
4. Realized log monitoring and abnormal alarm mechanism based on cloud monitoring tools, realizing real-time perception and rapid positioning of system faults.

High-Concurrency Financial Transaction System
Role: Senior Developer
1. Participated in the development of financial transaction settlement module, adopted asynchronous processing and message queue mechanism to solve transaction peak pressure, ensuring the consistency and security of transaction data.
2. Completed security optimization of the system, added data encryption, interface anti-tampering and authority verification mechanisms, meeting financial industry data security compliance requirements.
3. Optimized the transaction reconciliation logic, reduced manual reconciliation errors, and improved the automation and accuracy of financial settlement business.

Education Background
Bachelor of Computer Science and Technology

Professional Certifications
• AWS Certified Solutions Architect
• Kubernetes Administrator (CKA)
• Software Engineer Professional Certificate`;

export const DEFAULT_CANDIDATE: CandidateProfile = {
  id: 'cand-senior-swe-01',
  name: 'Senior Software Engineer (User Profile)',
  title: 'Senior Software Engineer / Technical Lead (15+ YOE)',
  yearsOfExperience: 15,
  education: 'Bachelor of Computer Science and Technology',
  certifications: ['AWS Certified Solutions Architect', 'Kubernetes Administrator (CKA)', 'Software Engineer Professional Certificate'],
  rawResumeText: USER_ACTUAL_RESUME_TEXT,
  skills: [
    'Java', 'Python', 'Go', 'JavaScript/TypeScript', 'C++', 'SQL',
    'Spring Boot', 'Spring Cloud', 'Django', 'React', 'Vue', 'Redis',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'Docker',
    'Kubernetes', 'Jenkins', 'AWS', 'AliCloud', 'CI/CD Pipeline',
    'Microservice Architecture', 'Distributed Systems', 'High Concurrency',
    'System Refactoring', 'API Design', 'GraphQL', 'Git', 'Data Analysis System'
  ]
};

// The exact 153 chars truncated snippet that caused the bug in the user's screenshot
export const BUGGY_153_CHAR_SNIPPET = `version of an interview). If you pass, you'll receive an email confirmation, and paid work will become available on our platform. Benefits: Fully remote...`;

// The exact unabridged full 3,248-character Indeed Job Description from user's screenshot
export const FULL_INDEED_AI_TRAINER_JD: ExtractedJobData = {
  title: 'Product Analyst - AI Trainer',
  company: 'DataAnnotation',
  location: 'Newport Beach, CA • Remote',
  salary: '$50 - $100 an hour',
  fullBodyText: `Product Analyst - AI Trainer
DataAnnotation · Newport Beach, CA · Remote · $50 - $100 an hour

Overview:
We are looking for a Product Analyst - AI Trainer to evaluate and improve cutting-edge AI models for quantitative reasoning and software analysis. (This initial assessment is our version of an interview). If you pass, you'll receive an email confirmation, and paid work will become available on our platform.

Benefits:
• Fully remote: work from anywhere in the US, Canada, UK, Ireland, Australia, and New Zealand.
• Flexible schedule: choose which projects you take on and when you work.
• Competitive pay: projects are paid hourly, up to $60 USD per hour. Opportunities for higher-paying projects are available with strong performance ($50 - $100/hr).
• Impact: help shape the future of AI systems built to reason about data and analytics.

Responsibilities:
• Evaluate AI-generated quantitative work, including statistical analysis, predictive modeling, scientific reasoning, and data-driven insights, for technical accuracy and real-world validity.
• Design and solve quantitative problems used to train and benchmark AI systems, spanning areas like forecasting, experimental analysis, optimization, and statistical inference.
• Write clear technical explanations and well-documented analytical code.
• Provide feedback that directly shapes the next generation of AI models built for quantitative reasoning.
• Benchmark code and algorithm generation in Python, SQL, and mathematical computation pipelines.

Qualifications:
• 2+ years of hands-on experience in a quantitative role or research environment — such as data science, statistics, economics, finance, physics, biology, epidemiology, operations research, or any adjacent field.
• Some coding experience required, with comfort writing and reviewing analytical code end-to-end (Python, R, SQL, or algorithmic script).
• Practical experience with statistical methods, predictive modeling, and experiment design (e.g., A/B testing, hypothesis testing, regression, classification, time-series forecasting).
• Fluency in English (native or bilingual level) with strong writing skills.
• A bachelor's degree in a quantitative field is preferred (Statistics, Computer Science, Mathematics, Engineering, or similar); a master's or PhD is a plus.
• Relevant credentials are a plus (e.g., Kaggle Competition ranking, AWS/GCP ML certifications, or equivalent demonstrated expertise).

Note: Payment is made via PayPal. We will never ask for any money from you. This job is only available to those in the US, Canada, UK, Ireland, Australia, and New Zealand.`,
  characterCount: 2364,
  wordCount: 382,
  sections: {
    benefits: [
      'Fully remote: work from anywhere in the US, Canada, UK, Ireland, Australia, and New Zealand.',
      'Flexible schedule: choose which projects you take on and when you work.',
      'Competitive pay: projects are paid hourly, up to $60-$100 USD per hour.',
      'Impact: help shape the future of AI systems built to reason about data and analytics.'
    ],
    responsibilities: [
      'Evaluate AI-generated quantitative work, including statistical analysis, predictive modeling, scientific reasoning, and data-driven insights.',
      'Design and solve quantitative problems used to train and benchmark AI systems (forecasting, experimental analysis, optimization, statistical inference).',
      'Write clear technical explanations and well-documented analytical code.',
      'Provide feedback that directly shapes next generation AI models built for quantitative reasoning.'
    ],
    qualifications: [
      '2+ years experience in quantitative role / research (data science, statistics, economics, finance, math, CS).',
      'Coding experience required, writing/reviewing analytical code (Python, SQL).',
      'Practical experience with statistical methods, predictive modeling, A/B testing, hypothesis testing, regression, classification, time-series forecasting.',
      'Fluency in English with strong writing skills.',
      'Bachelor/Master/PhD in Statistics, CS, Mathematics, or Engineering.',
      'Credentials: Kaggle Competition ranking, AWS/GCP ML certifications.'
    ],
    notes: [
      'Payment via PayPal. Independent contractor platform structure.'
    ]
  },
  extractionSource: 'DOM #jobDescriptionText + Schema.org JSON-LD',
  rawTruncatedSnippet153: BUGGY_153_CHAR_SNIPPET
};

// Another real job preset to demonstrate a direct Senior SWE match vs a pivot match
export const FULL_INDEED_SENIOR_BACKEND_JD: ExtractedJobData = {
  title: 'Staff / Senior Backend Distributed Systems Engineer',
  company: 'CloudScale Technologies',
  location: 'Los Angeles, CA • Hybrid / Remote',
  salary: '$180,000 - $230,000 a year',
  fullBodyText: `Staff / Senior Backend Distributed Systems Engineer
CloudScale Technologies · Los Angeles, CA · Full-time

About The Role:
We are seeking a seasoned Senior Backend / Distributed Systems Engineer with 10+ years of high-concurrency experience to architect and scale our next-generation cloud infrastructure processing millions of daily transactions.

Responsibilities:
• Architect, design, and implement resilient microservices handling 50,000+ RPS with sub-millisecond latencies.
• Lead database sharding, caching strategies (Redis), and distributed indexing using Elasticsearch and PostgreSQL.
• Drive containerization, Kubernetes orchestration, and automated CI/CD deployment pipelines on AWS.
• Mentor junior and mid-level engineers, conduct rigorous code reviews, and champion architectural best practices.
• Decompose legacy architectures into event-driven microservices.

Requirements & Qualifications:
• 10+ years in backend software engineering with deep expertise in Java, Go, Python, or C++.
• Demonstrated mastery of Spring Boot, Microservice Architecture, and High Availability distributed systems.
• Proven track record optimizing MySQL/PostgreSQL indexes, Redis caching, and Kafka/MQ asynchronous processing.
• Hands-on Kubernetes, Docker, and AWS Cloud infrastructure experience.
• Bachelor's or Master's degree in Computer Science or equivalent engineering field.
• Strong leadership, problem-solving, and cross-functional communication abilities.`,
  characterCount: 1618,
  wordCount: 220,
  sections: {
    benefits: ['Full health, 401(k) match, unlimited PTO, remote stipend'],
    responsibilities: ['Architect microservices', 'Database sharding & caching', 'Lead K8s/AWS CI/CD', 'Code review & leadership'],
    qualifications: ['10+ years backend', 'Java/Go/Python', 'Spring Boot & Microservices', 'MySQL/PostgreSQL/Redis/Elasticsearch', 'Kubernetes & AWS'],
    notes: ['Direct senior backend alignment']
  },
  extractionSource: 'DOM #jobDescriptionText',
  rawTruncatedSnippet153: `We are seeking a seasoned Senior Backend / Distributed Systems Engineer with 10+ years of high-concurrency experience to architect and scale our next-generation`
};

// Stripe Staff Frontend Architect (Matching the exact video screenshot from user's app)
export const STRIPE_FRONTEND_ARCHITECT_JD: ExtractedJobData = {
  title: 'Staff Frontend Architect (React / TS)',
  company: 'Stripe',
  location: 'San Francisco, CA • Remote',
  salary: '$190,000 - $245,000 / Year + Equity',
  fullBodyText: `Staff Frontend Architect (React / TS)
Stripe · San Francisco, CA · Remote · $190,000 - $245,000 / Year + Equity

About the Role:
At Stripe, we build the financial infrastructure of the internet. Millions of companies rely on our tools to accept payments, send payouts, and manage their business online. We are seeking an exceptional Staff Frontend Architect to lead technical direction, engineering standards, and performance scalability across our core payment checkout surfaces and web application platforms.

Responsibilities:
• Architect, build, and maintain performance-critical UI components and design systems using TypeScript, React, Next.js, and modern Web standards.
• Partner with product managers, UX designers, and infrastructure teams to scale our design system across 40+ engineering squads, ensuring sub-100ms interaction latencies and strict Web Vitals compliance.
• Lead frontend telemetry, bundle size optimizations, and Web Vitals metrics across complex asynchronous financial checkout flows.
• Drive microfrontend decoupling, isolated builds, code-splitting strategies, and edge rendering pipelines.
• Mentor staff and senior frontend engineers, establishing high-standard automated testing (Jest, Playwright, Vitest) and CI/CD pipelines.
• Collaborate on API schema definitions (GraphQL, REST, gRPC) ensuring seamless end-to-end type safety between distributed backend services and client applications.

Qualifications:
• 10+ years of software engineering experience with deep specialization in modern frontend architecture (React, TypeScript, Node.js, Web APIs).
• Proven track record architecting large-scale distributed web applications processing millions of daily transactions.
• Deep understanding of browser internals, rendering performance, bundle chunking, service workers, and microfrontend architectures.
• Experience with cloud platforms (AWS), containerization (Docker), and automated CI/CD.
• Passion for developer ergonomics, accessible design patterns (WCAG 2.1 AA), and type-safe systems.`,
  characterCount: 2045,
  wordCount: 288,
  sections: {
    benefits: ['Competitive salary + equity, health insurance, 401(k) match, wellness stipend, remote flexibility'],
    responsibilities: [
      'Architect, build, and maintain performance-critical UI components using TypeScript and React',
      'Partner with product managers and infrastructure teams to scale our design system across 40+ engineering squads',
      'Lead frontend telemetry, bundle size optimizations, and Web Vitals metrics',
      'Drive microfrontend decoupling, isolated builds, code-splitting strategies',
      'Mentor staff and senior frontend engineers, establishing high-standard automated testing'
    ],
    qualifications: [
      '10+ years software engineering with deep specialization in React & TypeScript',
      'Proven track record with large-scale web applications processing millions of transactions',
      'Deep understanding of browser internals, rendering performance, and Web Vitals',
      'Experience with AWS, Docker, CI/CD, and GraphQL/REST APIs'
    ],
    notes: ['Flagship role matching user video layout']
  },
  extractionSource: 'Schema.org JSON-LD + Deep DOM Traversal (3,000+ Words Capture)',
  rawTruncatedSnippet153: `At Stripe, we build the financial infrastructure of the internet. Millions of companies rely on our tools to accept payments, send payouts, and manage their business`
};

// Tang Candidate Profile (Matching the exact video screenshot with Anonymous Mode Active)
export const TANG_CANDIDATE_PROFILE: CandidateProfile = {
  id: 'cand-tang-frontend-lead',
  name: 'Candidate (PII Scrubbed: Tang / Krishna / AI Technician)',
  title: 'Senior / Lead Frontend Engineer',
  location: 'San Francisco, CA / London / Remote',
  targetRole: 'Senior / Lead Frontend Engineer',
  yearsOfExperience: 15,
  education: 'Bachelor of Computer Science and Technology',
  certifications: ['AWS Certified Solutions Architect', 'Kubernetes Administrator (CKA)'],
  isAnonymousMode: true,
  anonymizedLabel: 'Anonymous Mode Active (PII Scrubbed: Tang / Krishna / AI Technician)',
  uploadedFileName: 'tang-resume-eng-lead.pdf',
  uploadedFileSize: '84 KB',
  rawResumeText: `15+ years experience architecting high-performance web systems and frontend infrastructures. Built scalable microfrontends, performance-critical React/TypeScript applications with 99.99% availability, and mentored 15+ engineers. Successfully drove bundle size reduction by 42% and Core Web Vitals LCP to <1.2s across global e-commerce and financial platforms. Solid backend foundations in Node.js, Python, SQL, and AWS cloud architectures.`,
  skills: [
    'TypeScript', 'React', 'Node.js', 'System Design', 'Next.js',
    'GraphQL', 'CI/CD', 'AWS', 'Distributed Systems', 'Microfrontends',
    'Tailwind CSS', 'Python', 'SQL', 'Performance Optimization',
    'Web Vitals', 'Jest / Playwright', 'Docker'
  ]
};

// LinkedIn Job Posting Sample
export const LINKEDIN_STAFF_INFRA_JD: ExtractedJobData = {
  title: 'Staff Infrastructure & Distributed Systems Engineer',
  company: 'Datadog',
  location: 'New York, NY • London, UK • Hybrid/Remote',
  salary: '$220,000 - $310,000 a year + Equity',
  fullBodyText: `Staff Infrastructure & Distributed Systems Engineer
Datadog · New York, NY / London, UK · Hybrid / Remote · $220,000 - $310,000/yr

About Datadog:
We're on a mission to build the best observability and security platform in the world. Our systems process trillions of events and petabytes of telemetry every single day.

The Opportunity:
We are seeking a Staff Infrastructure Engineer to design, scale, and maintain our multi-region Kubernetes fleets, telemetry routing planes, and high-throughput real-time ingest pipelines.

Responsibilities:
• Architect, deploy, and operate planetary-scale distributed microservices across AWS, GCP, and Azure with strict 99.999% SLA targets.
• Lead cross-functional architecture reviews across 15+ engineering clusters, establishing resilient failover mechanisms and automated load shedding.
• Optimize Linux kernel network configurations, gRPC serialization efficiency, and eBPF tracing probes for sub-millisecond latencies.
• Mentor senior engineers, drive incident post-mortems, and establish proactive observability guardrails.

Qualifications & Requirements:
• 10+ years of software and systems engineering experience in distributed systems, high concurrency architectures, or cloud platform infrastructure.
• Deep proficiency in Go, Python, or Java with deep understanding of memory management, garbage collection tuning, and multi-threading models.
• Production mastery of Kubernetes, Docker, Linux cgroups/namespaces, and cloud networking (VPC, BGP, Envoy proxy).
• Proven track record leading major architectural migrations without customer disruption.
• Strong communication skills and experience presenting architecture decisions to executive engineering leadership.`,
  characterCount: 2280,
  wordCount: 295,
  sections: {
    benefits: ['Comprehensive health/dental/vision', 'Significant RSU equity package', 'Flexible PTO & remote stipend', '401(k) / pension matching'],
    responsibilities: [
      'Architect, deploy, and operate planetary-scale distributed microservices with 99.999% SLA',
      'Lead cross-functional architecture reviews across 15+ engineering clusters',
      'Optimize Linux kernel network configurations, gRPC serialization, and eBPF tracing probes',
      'Mentor senior engineers, drive post-mortems, and establish observability guardrails'
    ],
    qualifications: [
      '10+ years software & systems engineering in distributed systems and cloud infrastructure',
      'Proficiency in Go, Python, or Java with deep memory and threading expertise',
      'Production mastery of Kubernetes, Docker, Linux internals, and Envoy/networking',
      'Proven track record leading major architectural migrations without disruption'
    ],
    notes: ['LinkedIn Jobs (Direct Schema.org + DOM container)']
  },
  extractionSource: 'LinkedIn Jobs (<article class="jobs-description__container"> + Schema.org)',
  rawTruncatedSnippet153: `We're on a mission to build the best observability and security platform in the world. Our systems process trillions of events and petabytes of telemetry`
};

// Glassdoor Job Posting Sample
export const GLASSDOOR_FINTECH_LEAD_JD: ExtractedJobData = {
  title: 'Lead Architect - Core Banking & Payments',
  company: 'Revolut',
  location: 'London, UK • San Francisco, CA • Remote',
  salary: '£150,000 - £210,000 / $240,000 - $320,000 + Equity',
  fullBodyText: `Lead Architect - Core Banking & Global Payments
Revolut · London / Global Remote · £150k - £210k / $240k - $320k + Equity

About Revolut:
We are building the world's first truly global financial superapp. Over 45 million customers worldwide rely on our zero-latency banking, multi-currency exchange, and crypto infrastructures.

Role Overview:
As Lead Architect for Core Banking, you will oversee the architectural evolution of our mission-critical transaction settlement engines, ledger partitioning, and multi-region regulatory compliance barriers.

Key Responsibilities:
• Drive architectural roadmap for core ledger processing millions of real-time transactions per hour with deterministic zero-loss guarantees.
• Formulate double-entry accounting models, idempotency barriers, and distributed consensus mechanisms (Raft, Paxos).
• Partner with compliance, security, and banking license regulators across FCA, FinCEN, and ECB jurisdictions.
• Enforce strict automated testing gates, fault-injection drills (Chaos Engineering), and low-latency database sharding (PostgreSQL, Cassandra).

Requirements:
• 12+ years of software engineering experience with at least 5+ years in Tier-1 Fintech, Payments, or Core Banking architectures.
• Exceptional knowledge of distributed transactions, event-driven architectures (Kafka), and strict consistency paradigms (ACID).
• Hands-on mastery of Java, Python, or Go, combined with high-performance SQL schema design and query execution planning.
• Bachelor's or Master's degree in Computer Science, Distributed Computing, or equivalent practical experience.`,
  characterCount: 2190,
  wordCount: 280,
  sections: {
    benefits: ['Competitive base + aggressive performance bonus', 'Uncapped stock option grants', 'Global healthcare + private pension', 'Work from anywhere program (30 days/yr)'],
    responsibilities: [
      'Drive architectural roadmap for core ledger processing real-time transactions with zero-loss guarantees',
      'Formulate double-entry accounting models, idempotency barriers, and distributed consensus mechanisms',
      'Partner with compliance, security, and banking license regulators (FCA, FinCEN, ECB)',
      'Enforce automated testing gates, fault-injection drills, and low-latency database sharding'
    ],
    qualifications: [
      '12+ years software engineering with 5+ years in Tier-1 Fintech, Payments, or Core Banking',
      'Exceptional knowledge of distributed transactions, event-driven architectures (Kafka), and ACID consistency',
      'Mastery of Java/Python/Go, high-performance SQL schema design, and query planning',
      'CS degree or equivalent practical experience'
    ],
    notes: ['Glassdoor (div[data-test="jobDescriptionText"])']
  },
  extractionSource: 'Glassdoor Jobs ([data-test="jobDescriptionText"] + JSON-LD)',
  rawTruncatedSnippet153: `We are building the world's first truly global financial superapp. Over 45 million customers worldwide rely on our zero-latency banking, multi-currency exchange`
};

// Greenhouse / Lever ATS Job Posting Sample
export const GREENHOUSE_AI_RESEARCH_JD: ExtractedJobData = {
  title: 'Senior AI Systems & Evaluation Engineer',
  company: 'Anthropic',
  location: 'San Francisco, CA • London, UK • Hybrid',
  salary: '$280,000 - $390,000 + Equity',
  fullBodyText: `Senior AI Systems & Evaluation Engineer
Anthropic · San Francisco, CA / London, UK · $280,000 - $390,000 + Equity

Company Mission:
Anthropic is an AI safety and research company that builds reliable, interpretable, and steerable AI systems. We believe AI technology will have vast societal impact.

The Role:
We are looking for a Senior AI Systems & Evaluation Engineer to build the automated infrastructure that evaluates frontier Claude models for capabilities, alignment, safety, and reasoning consistency.

Responsibilities:
• Develop scalable evaluation harnesses that benchmark LLM capabilities across code generation, tool use, mathematical proofs, and safety guardrails.
• Architect high-throughput distributed inference pipelines across GPU/TPU clusters handling thousands of concurrent model evaluations.
• Design adversarial benchmarks and automated red-teaming pipelines to identify edge-case hallucinations and alignment degradation.
• Collaborate closely with research scientists to operationalize cutting-edge alignment methodologies into standard deployment verification gates.

What We're Looking For:
• 6+ years of software engineering or ML systems experience with demonstrable expertise in Python, PyTorch, and distributed computing (Ray, Kubernetes).
• Experience building automated evaluation suites, benchmarking pipelines, or large-scale data processing workflows for foundation models.
• Solid grasp of probability, statistics, and hypothesis testing to validate evaluation significance and score calibration.
• A strong commitment to AI safety, engineering excellence, and thorough documentation.`,
  characterCount: 2210,
  wordCount: 285,
  sections: {
    benefits: ['Top-of-market compensation & equity', 'Full medical, dental, and vision insurance', 'Flexible PTO & parental leave', 'Dedicated learning and compute resource budgets'],
    responsibilities: [
      'Develop scalable evaluation harnesses that benchmark LLM capabilities across code, tools, and math',
      'Architect high-throughput distributed inference pipelines across GPU/TPU clusters',
      'Design adversarial benchmarks and automated red-teaming pipelines',
      'Operationalize cutting-edge alignment methodologies into deployment verification gates'
    ],
    qualifications: [
      '6+ years software engineering or ML systems experience with Python, PyTorch, Ray, Kubernetes',
      'Experience building automated evaluation suites and benchmarking pipelines for foundation models',
      'Solid grasp of probability, statistics, and hypothesis testing for score calibration',
      'Strong commitment to AI safety and engineering excellence'
    ],
    notes: ['Greenhouse ATS (boards.greenhouse.io)']
  },
  extractionSource: 'Greenhouse ATS (boards.greenhouse.io / #content + JSON-LD)',
  rawTruncatedSnippet153: `Anthropic is an AI safety and research company that builds reliable, interpretable, and steerable AI systems. We believe AI technology will have vast societal`
};


