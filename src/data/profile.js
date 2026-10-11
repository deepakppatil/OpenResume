/**
 * ──────────────────────────────────────────────────────────────────────────
 *  PROFILE DATA — the single source of truth for the whole website.
 *
 *  Everything below is transcribed from Deepak Patil's CV. The website, the printable CV
 *  and the auto-generated PDF résumé all read from this one file.
 *
 *  Conventions
 *   • Dates use "YYYY-MM". Use `end: null` for a current role.
 *   • `icon` values in `profile.strengths` map to:
 *     "layers" | "cloud" | "sparkles" | "users".
 *   • Skill `level` is 1–5 (Familiar → Expert).
 *   • A highlight that starts with `**Bold lead-in**` renders with a bold label.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Deepak Patil",
  initials: "dp",
  title: "Head of Software Engineering",
  organization: "Nomura",
  headline: "Modernize the past. Engineer the future.",
  intro:
    "Engineering leader with 19+ years designing, architecting and building enterprise platforms — spanning IaaS, PaaS and SaaS, distributed and real-time systems, cloud-native architectures, AI and blockchain platforms.",
  location: "Mumbai, India",
  timezone: "IST (UTC+5:30)",
  availability: "Engineering Leadership · Enterprise Architecture · Distributed Systems · IaaS/PaaS/SaaS",

  // Professional summary (About section + PDF résumé)
  summary: [
    "Engineering leader with 19+ years of industry experience designing, architecting, and building enterprise platforms, driving engineering strategy, architecture standards, and technology execution across successive waves of technological change.",
    "Experience spans IaaS, PaaS and SaaS, distributed and real-time systems, high-throughput data processing, cloud-native architectures, AI and blockchain platforms, and enterprise applications designed to be portable, observable, operationally resilient, and cloud-scale, while establishing the engineering practices and architectural foundations required to sustain them.",
    "The engineering journey spans Capital Markets, Hedge Funds, Fixed Income, Risk, Retail & Core Banking, Trade Finance and Payments across Front/Middle/Back Office. Writing, experimentation and architecture thinking focus on enterprise architecture, distributed systems, AI engineering, Context Engineering, modernisation, Spec-Driven Development and the future of software engineering.",
    "One lesson has remained constant while learning through experiences: the hardest part of enterprise transformation is not creating what comes next — it is making what already exists ready for it.",
  ],

  // Contact
  email: "deepak.p.patil@gmail.com",
  phone: "+919930870299",
  // Country code + number, digits only. The CV lists one mobile number, used for both.
  whatsapp: "919930870299",

  /**
   * Résumé download.
   *  • ""            → a PDF is generated in the browser from this data file (always up to date).
   *  • "/resume.pdf" → serve your own designed PDF placed in /public instead.
   */
  resumeUrl: "",
  resumeFileName: "Deepak-Patil-Resume.pdf",

  siteUrl: "https://deepakppatil.github.io/OpenResume/",
  lastUpdated: "2026-10-11",

  social: {
    linkedin: "https://www.linkedin.com/in/depatil",
    github: "https://github.com/deepakppatil",
  },

  // "Current focus" list (About section)
  focus: [
    "Moving enterprises from legacy complexity to modern platforms → AI-native systems.",
    "Building a Context Plane for AI systems and agents from specifications, architecture, source code, APIs, domain knowledge, documentation, telemetry, events and enterprise knowledge.",
    "Exploring how specifications + architecture + AI agents reshape the software lifecycle: Design → Development → Testing → Deployment → Operations → Continuous Modernization.",
    "Systems that scale through decomposition, concurrency, partitioning, resilience and independent processing.",
  ],

  strengths: [
    {
      icon: "users",
      title: "Engineering Leadership",
      description:
        "Engineering strategy, architecture standards, code-review discipline, mentorship and stakeholder management across global engineering teams.",
    },
    {
      icon: "layers",
      title: "Enterprise Architecture",
      description:
        "Enterprise architecture across IaaS, PaaS and SaaS, with the governance and standards that keep applications aligned to global standards and business objectives.",
    },
    {
      icon: "cloud",
      title: "Cloud-native Platforms",
      description:
        "Kubernetes, platform engineering, orchestration (Swarm, Mesos, Terraform) and Dev-Ops / AI-SRE practices for portable, observable and resilient systems.",
    },
    {
      icon: "sparkles",
      title: "AI Enterprise Strategy",
      description:
        "Applied Machine Learning, Artificial Intelligence, NLP, OCR and predictive analytics, plus agentic development and Context Engineering for AI-native systems.",
    },

    {
      icon: "users",
      title: "IaaS, PaaS & SaaS",
      description:
        "Engineering strategy, architecture standards, code-review discipline, mentorship and stakeholder management across global engineering teams.",
    },    
  ],

  facts: [
    { label: "Based in", value: "Mumbai, India" },
    { label: "Experience", value: "19+ years" },
    { label: "Current role", value: "Head of Software Engineering, Nomura" },
    { label: "Domains", value: "Capital markets, trade finance, payments, banking" },
    { label: "Languages", value: "English, Hindi, Marathi" },
    { label: "Work style", value: "Hybrid, Mumbai" },
  ],

  // "Outside work" (About section)
  interests: [
    {
      icon: "cylinder",
      title: "PADI — Professional Dive Master",
      description: "Professional-level scuba diving certification.",
    },
    {
      icon: "wind",
      title: "PAI — Paragliding Pilot",
      description: "Licensed paragliding pilot.",
    },
    {
      icon: "mountain",
      title: "Multiple 6000+ meter summits",
      description: "High-altitude mountaineering and Himalayan expeditions.",
    },
    {
      icon: "footprints",
      title: "Ultra Marathoner",
      description: "Long-distance and ultra-distance running.",
    },
  ],
};

/**
 * Work history — reverse chronological.
 * `domains` are the business domains covered by the role.
 */
export const experience = [
  {
    company: "Nomura",
    role: "Head of Software Engineering",
    type: "Full-time",
    start: "2025-11",
    end: null,
    location: "Mumbai, India",
    domains: ["Business Units", "AI platform services", "Engineering platforms"],
    summary:
      "Engineering and architecture leadership across Business Units, shaping software engineering strategy, application design, delivery standards and day-to-day technical execution in alignment with business priorities.",
    highlights: [
      "Guide solution architecture decisions for scalable services, dependable integrations, resilient platforms, and long-term technology sustainability.",
      "Drive coordination across engineering, product, architecture, and operations teams to align delivery priorities, technical execution, and business outcomes.",
      "Review and challenge technical proposals, architecture options, and engineering trade-offs, balancing scope, risk, scalability, maintainability, and time-to-market.",
      "Define and institutionalize engineering standards covering code quality, architecture and design practices, code review discipline, testing, and maintainable system development.",
      "Built and evolved AI platform services enabling reliable and governed model execution across internal engineering teams and business initiatives.",
      "Drive the strategy and development of engineering platforms, frameworks, SDKs, and developer tools that improve engineering productivity, standardize implementation patterns, and accelerate delivery across the engineering community.",
      "Establish reusable platform capabilities and engineering practices that enable teams to build, integrate, and operate applications consistently at enterprise scale.",
      "Partner with senior technology and business stakeholders to identify opportunities for platform modernization, engineering simplification, and adoption of emerging technologies.",
    ],
    technologies: ["Enterprise architecture", "AI platform services", "Platform engineering", "SDKs", "Developer tools", "Architecture governance"],
  },
  {
    company: "JPMorgan Chase",
    role: "Executive Director, Engineering & Architecture",
    type: "Full-time",
    start: "2024-08",
    end: "2025-11",
    location: "Mumbai, India",
    domains: ["Payments Technology — India Lead", "Trade Finance — Global Platform Lead"],
    summary:
      "Architecture and engineering leadership for Payments Technology in India and as Global Platform Lead for Trade Finance, across architecture vision, governance, future-ready application development and performance.",
    highlights: [
      "**Leadership in Architecture**: Spearheaded the architectural vision and strategy for Payment Technology in India across 100's of applications, ensuring alignment with global standards and business objectives.",
      "**Governance and Best Practices**: Established and enforced governance frameworks and best practices to enhance software development processes, resulting in improved quality and compliance across teams.",
      "**Future-Ready Application Development**: Guided cross-functional teams in designing and implementing scalable, distributed applications, leveraging modern technologies to meet evolving market demands.",
      "**Collaboration and Mentorship**: Fostered a culture of collaboration by mentoring engineering teams, promoting knowledge sharing, and driving innovation through workshops and training sessions.",
      "**Performance Optimization**: Implemented performance monitoring and optimization strategies, significantly enhancing application efficiency and user experience within the payments ecosystem.",
      "**Global Trade Finance**: Platform lead for Global Trade Technology for Engineering and Architecture as practice across multiple products, contributor at Payments technology for engineering and architecture as part of elite team called Think-Tank.",
      "**Modernize**: Built next-gen trade processing system by breaking existing monolith using Domain-Driven Design and Event-Driven Architecture for distributed systems adhering to cloud native development practice to build highly testable, scalable system.",
      "**Team Building**: Built and managed diverse team of professionals, fostering collaborative work environment for increased productivity.",
      "Key-Tech Stack: Domain-driven Design, Spring, Axon, Micro-service Arch, Event-Sourcing/Storming, R-socket, Kafka, Elastic-search, K8s & Dev-Ops practices.",
    ],
    technologies: ["Open-source stack", "Distributed systems", "AI/ML", "AWS", "Domain-Driven Design", "Spring", "Axon", "Kafka", "Elasticsearch", "Kubernetes", "DevOps"],
  },
  {
    company: "Traystream Ltd.",
    role: "Head of Engineering",
    type: "Full-time",
    start: "2019-04",
    end: "2020-07",
    location: "Mumbai, India",
    domains: ["Trade Finance"],
    summary:
      "Led engineering for trade finance, optimizing existing systems, building high-performance teams for OCR, NLP and machine-learning based trade processing, and modernising document processing with blockchain.",
    highlights: [
      "Optimized existing systems by identifying bottlenecks, implementing best development practices, and built high performant teams to execute on OCR, NLP and machine-learning based trade processing system.",
      "Built private Block-Chain network for document processing using Hyper-ledger Fabric and IPFS over Kubernetes.",
      "Built multi-tenant system to be deployed on to various cloud platform viz. Azure, AWS and GCP using Open-Shift, making the system 100% cloud native to support client demands.",
    ],
    technologies: ["Hyperledger Fabric", "IPFS", "Kubernetes", "Azure", "AWS", "GCP", "OpenShift", "OCR", "NLP", "Machine learning"],
  },
  {
    company: "Morgan Stanley",
    role: "Vice President",
    type: "Full-time",
    start: "2015-03",
    end: "2019-04",
    location: "Mumbai, India",
    domains: ["Platform Engineering — Architect and Core Contributor"],
    summary:
      "Architect and core contributor for a Machine-Learning platform built as PaaS, serving software engineers, data scientists, applied-ML engineers and power users at enterprise scale.",
    highlights: [
      "Built platform and framework for Machine-Learning as PAAS to provide ability for building multiple projects. Enabled platform for software engineers, data-scientist, Applied-ML Engineers and power-users.",
      "Solutions was built to be highly scalable using advanced distributed systems concepts to support high throughput, available and on-demand resource utilization to boost T2M and infra optimization and governance.",
      "Built highly performant team to execute on project while working as IC.",
      "Developed strategic partnerships with key stakeholders to expand platforms reach and influence for adoption to accelerate projects times to market to reduce overall project development cost by 75%.",
    ],
    technologies: ["Scikit-learn", "Spark-ML", "TensorFlow", "Apache Spark", "Hadoop ecosystem", "Accumulo", "Cassandra", "HBase"],
  },
  {
    company: "Indus Valley Partners",
    role: "Product Architect",
    type: "Full-time",
    start: "2010-02",
    end: "2015-03",
    location: "Mumbai, India",
    domains: ["Capital Markets"],
    summary:
      "Product architect for a portfolio management product for alternative asset managers — a multi-tenant, modular solution built on a distributed open-source stack and highly customizable to each hedge fund or fund-of-funds.",
    highlights: [
      "Portfolio management product for alternative asset managers using distributed and open source stack as a multi-tenant, modular solution that can be highly customized to the specific requirements of the respective hedge funds, FoF.",
      "Building end to end and multi-tenant / real time / distributed portfolio management system for Head-funds.",
      "Amazon EC2/S3, distributed and clustered environment with open source stack, big data stack, J2EE, search engines, WebSockets, Flink, Storm, Kafka, Dev-Ops, REST, HTML5, CSS3 and various JavaScript frameworks on Linux.",
    ],
    technologies: ["Amazon EC2/S3", "MapReduce", "Hive", "HBase", "ZooKeeper", "J2EE", "Spring", "MongoDB", "WebSockets", "Flink", "Storm", "Kafka", "REST", "Linux"],
  },
  {
    company: "3i-Infotech (Fin-Eng Solutions)",
    role: "Senior Software Engineer",
    type: "Full-time",
    start: "2007-07",
    end: "2009-12",
    location: "Mumbai, India",
    domains: ["Banking & Capital Markets"],
    summary:
      "Built trading and compliance monitoring systems for mutual funds, and a range of retail banking products across deposits, lending, cards and ATM channels.",
    highlights: [
      "Built trading and compliance monitoring system for various mutual funds.",
      "Experience in building various retail banking products like Saving, Current, Loan, Overdraft, Bills, Deposit, ATM, and interest applications.",
    ],
    technologies: ["Open-source stack", "Vitamin-C", "C++", "Java", "Column stores"],
  },
];

/**
 * Projects — derived from the platforms and systems delivered across the roles above.
 *  • category — project type (used by the main filter chips)
 *  • domain   — industry / problem space (filter dropdown)
 *  • tags     — technologies (filter dropdown)
 *  • image    — optional screenshot URL (e.g. "/images/project.png"); when empty an
 *               illustrated cover is drawn instead. `cover` picks the illustration:
 *               "chat" | "network" | "ledger" | "terminal" | "dashboard" | "code"
 */
export const projects = [
  {
    title: "Enterprise AI Platform Services",
    description:
      "AI platform services enabling reliable and governed model execution across internal engineering teams and business initiatives, with reusable platform capabilities, frameworks and developer tooling that standardize implementation patterns.",
    category: "AI / ML",
    domain: "Enterprise platforms",
    role: "Head of Software Engineering",
    year: 2025,
    featured: true,
    impact: "",
    tags: ["AI platform", "Governance", "Platform engineering", "SDKs", "Kubernetes"],
    liveUrl: "",
    repoUrl: "",
    image: "",
    imageAlt: "",
    cover: "chat",
  },
  {
    title: "Payments Technology Architecture — India",
    description:
      "Architectural vision and strategy for Payment Technology in India across 100's of applications, with governance frameworks, best practices and performance monitoring adopted across teams.",
    category: "Platform Engineering",
    domain: "Payments",
    role: "Executive Director, Engineering & Architecture",
    year: 2024,
    featured: true,
    impact: "100's of applications",
    tags: ["Distributed systems", "AWS", "AI/ML", "Open source", "Governance"],
    liveUrl: "",
    repoUrl: "",
    image: "",
    imageAlt: "",
    cover: "network",
  },
  {
    title: "Next-Gen Trade Processing Platform",
    description:
      "Next-generation trade processing system built by breaking an existing monolith using Domain-Driven Design and Event-Driven Architecture, adhering to cloud-native development practice for a highly testable, scalable system.",
    category: "Platform Engineering",
    domain: "Trade Finance",
    role: "Global Platform Lead",
    year: 2024,
    featured: true,
    impact: "",
    tags: ["Domain-Driven Design", "Event-Driven Architecture", "Spring", "Axon", "Kafka", "Kubernetes"],
    liveUrl: "",
    repoUrl: "",
    image: "",
    imageAlt: "",
    cover: "ledger",
  },
  {
    title: "Blockchain Document Processing Network",
    description:
      "Private blockchain network for document processing built on Hyperledger Fabric and IPFS over Kubernetes, replacing manual document handling in trade finance.",
    category: "Blockchain",
    domain: "Trade Finance",
    role: "Head of Engineering",
    year: 2019,
    featured: false,
    impact: "",
    tags: ["Hyperledger Fabric", "IPFS", "Kubernetes"],
    liveUrl: "",
    repoUrl: "",
    image: "",
    imageAlt: "",
    cover: "code",
  },
  {
    title: "Cloud-Native Multi-Tenant Trade Platform",
    description:
      "Multi-tenant system deployable across Azure, AWS and GCP using OpenShift, made 100% cloud native to support client demands without re-platforming per customer.",
    category: "Cloud & DevOps",
    domain: "Trade Finance",
    role: "Head of Engineering",
    year: 2019,
    featured: false,
    impact: "100% cloud native",
    tags: ["Azure", "AWS", "GCP", "OpenShift", "Kubernetes"],
    liveUrl: "",
    repoUrl: "",
    image: "",
    imageAlt: "",
    cover: "dashboard",
  },
  {
    title: "Machine-Learning as a Platform (PaaS)",
    description:
      "Highly scalable ML platform built on advanced distributed-systems concepts, supporting high throughput, availability and on-demand resource utilization for engineers, data scientists and applied-ML power users.",
    category: "AI / ML",
    domain: "Platform Engineering",
    role: "Vice President — Architect & Core Contributor",
    year: 2015,
    featured: true,
    impact: "Reduced project development cost by 75%",
    tags: ["Apache Spark", "Hadoop", "Accumulo", "Cassandra", "HBase", "TensorFlow", "Scikit-learn"],
    liveUrl: "",
    repoUrl: "",
    image: "",
    imageAlt: "",
    cover: "terminal",
  },
  {
    title: "Portfolio Management Platform",
    description:
      "End-to-end, multi-tenant, real-time and distributed portfolio management system for hedge funds and funds-of-funds, built on an open-source stack and highly customizable per client.",
    category: "Enterprise Application",
    domain: "Capital Markets",
    role: "Product Architect",
    year: 2010,
    featured: false,
    impact: "",
    tags: ["J2EE", "Spring", "MongoDB", "HBase", "Kafka", "Flink", "WebSockets", "Amazon EC2/S3"],
    liveUrl: "",
    repoUrl: "",
    image: "",
    imageAlt: "",
    cover: "network",
  },
  {
    title: "Trading & Compliance Monitoring",
    description:
      "Trading and compliance monitoring system for mutual funds, alongside retail banking products spanning savings, current, loan, overdraft, bills, deposit, ATM and interest applications.",
    category: "Enterprise Application",
    domain: "Banking & Capital Markets",
    role: "Senior Software Engineer",
    year: 2007,
    featured: false,
    impact: "",
    tags: ["Java", "C++", "Vitamin-C", "Column stores", "Open source"],
    liveUrl: "",
    repoUrl: "",
    image: "",
    imageAlt: "",
    cover: "dashboard",
  },
];

/**
 * Skills — grouped from "Areas of Expertise" and "Skill Depth" in the CV.
 * `level` 1–5 maps the CV's own ratings: 3 Intermediate · 4 Upper intermediate · 5 Advanced.
 */
export const skills = [
  {
    category: "Architecture & Strategy",
    items: [
      { name: "Enterprise Architecture (IaaS, PaaS, SaaS)", level: 5, description: "Enterprise architecture across IaaS, PaaS and SaaS, establishing the standards and foundations required to sustain them." },
      { name: "Solution Architecture", level: 5, description: "Scalable services, dependable integrations, resilient platforms and long-term technology sustainability." },
      { name: "Platform Architecture", level: 5, description: "Reusable platform capabilities that let teams build, integrate and operate applications consistently at enterprise scale." },
      { name: "Architecture Governance", level: 4, description: "Governance frameworks covering code quality, architecture and design practices, code review discipline and testing." },
      { name: "Enterprise Engineering Strategy", level: 44, description: "Engineering strategy, architecture standards and technology execution across successive waves of technological change." },
      { name: "AI platform Architecture", level: 4, description: "Reliable and governed model execution, plus reusable AI platform capabilities for internal teams and business initiatives." },
    ],
  },
  {
    category: "Distributed & Real-Time Systems",
    items: [
      { name: "Distributed System Design", level: 5, description: "Decomposition, concurrency, partitioning, resilience and independent processing for systems that scale." },
      { name: "Parallel-Processing Design", level: 5, description: "Parallel and real-time processing systems for high-throughput workloads." },
      { name: "Microservices & Event-Driven Architecture", level: 5, description: "Microservices, DDD and event-driven architecture, including event sourcing and storming practices." },
      { name: "De-centralised Distributed Systems", level: 3, description: "Distributed and de-centralised distributed systems built to 12CF requirements." },
      { name: "Big data", level: 4, description: "Apache Spark, Flink, Kafka, Storm, Beam and the wider big-data ecosystem." },
    ],
  },
  {
    category: "Cloud, DevOps & Orchestration",
    items: [
      { name: "Cloud-native platforms & Kubernetes", level: 5, description: "Cloud-native architectures, Kubernetes and platform engineering for portable, observable systems." },
      { name: "DevOps practices", level: 5, description: "Enterprise CI/CD, automation and developer productivity." },
      { name: "AI-SRE", level: 4, description: "AI-enabled site reliability and operational resilience practices." },
      { name: "Orchestration — Swarm, Mesos, Kubernetes, Terraform", level: 5, description: "Container orchestration and infrastructure-as-code across multiple platforms." },
      { name: "Test automation — TDD / BDD / performance / chaos", level: 5, description: "Test-driven and behaviour-driven development with performance and chaos engineering." },
    ],
  },
  {
    category: "Data & Storage",
    items: [
      { name: "Wide-column NoSQL — Cassandra & HBase", level: 5, description: "Wide-column stores for high-throughput, high-volume data platforms." },
      { name: "NoSQL — Accumulo & MongoDB", level: 5, description: "Document and cell-based NoSQL stores for distributed data platforms." },
      { name: "Graph store — Apache Neo4j", level: 3, description: "Graph databases for relationship-heavy domain models." },
      { name: "Poliglot data architecture", level: 5, description: "Mixing relational, wide-column, document, graph and search stores to fit the workload." },
      { name: "Search engines", level: 5, description: "Distributed search and indexing platforms as part of enterprise data architecture." },
    ],
  },
  {
    category: "AI, ML & Context Engineering",
    items: [
      { name: "Applied machine learning — AI/ML, NLP, OCR, predictive analytics", level: 5, description: "Applied machine learning including NLP, OCR and predictive analytics for enterprise systems." },
      { name: "Agentic development", level: 4, description: "AI agents that need more than models and prompts — they need context." },
      { name: "Context engineering", level: 4, description: "Specifications, architecture, source code, APIs, domain knowledge, documentation, telemetry, events and enterprise knowledge forming a Context Plane for AI systems and agents." },
      { name: "Spec-driven development", level: 4, description: "Specifications plus architecture plus AI agents reshaping the software lifecycle." },
      { name: "Enterprise AI & AI-native modernization", level: 5, description: "Moving enterprises from legacy complexity to modern platforms, then to AI-native systems." },
    ],
  },
  {
    category: "Blockchain",
    items: [
      { name: "Hyperledger Fabric", level: 4, description: "Permissioned blockchain networks for enterprise document processing." },
      { name: "IPFS", level: 4, description: "InterPlanetary File System for decentralised document storage." },
      { name: "Blockchain document Processing", level: 5, description: "Private blockchain networks for document processing, run over Kubernetes." },
    ],
  },
  {
    category: "Languages & Craft",
    items: [
      { name: "Multi-paradigm — Python, Java/J2EE, C++, Groovy", level: 5, description: "Multi-paradigm engineering across the JVM and beyond." },
      { name: "Functional — Scala", level: 3, description: "Functional programming for data and streaming workloads." },
      { name: "Procedural — C / Vitamin-C", level: 3, description: "Procedural and systems-level programming." },
      { name: "Scripting — Bash, PowerShell", level: 4, description: "Shell scripting and automation across platforms." },
      { name: "Design patterns", level: 5, description: "Patterns applied to distributed, event-driven and platform architectures." },
      { name: "SDLC — Agile / Waterfall", level: 5, description: "Delivery across both agile and waterfall lifecycles." },
    ],
  },
  {
    category: "Leadership & Delivery",
    items: [
      { name: "Stakeholder management", level: 5, description: "Partnering with senior technology and business stakeholders on modernization and emerging technology." },
      { name: "Mentorship & collaboration", level: 5, description: "Mentoring engineering teams, promoting knowledge sharing and driving innovation through workshops and training." },
      { name: "Architecture review & trade-off analysis", level: 5, description: "Reviewing and challenging technical proposals, balancing scope, risk, scalability, maintainability and time-to-market." },
      { name: "Engineering productivity & developer experience", level: 5, description: "Platforms, frameworks, SDKs and developer tools that standardize patterns and accelerate delivery." },
      { name: "Technical writing", level: 4, description: "Writing on enterprise architecture, distributed systems, AI engineering and modernization." },
    ],
  },
];

export const education = [];

export const certifications = [
  {
    name: "M102 — MongoDB for DBA",
    issuer: "MongoDB University",
    year: "",
    credentialId: "",
    url: "",
  },
  {
    name: "Big Data Fundamentals + Hadoop Fundamentals + Hadoop Data Using Hive",
    issuer: "Big Data University",
    year: "",
    credentialId: "",
    url: "",
  },
  {
    name: "Developing Distributed Applications Using ZooKeeper + Hadoop and the Amazon Cloud",
    issuer: "Big Data University",
    year: "",
    credentialId: "",
    url: "",
  },
];

/** type: "impact" | "milestone" | "personal" */
export const achievements = [
  {
    type: "milestone",
    title: "Enterprise AI Platform Services",
    organization: "Nomura",
    year: "2025 — Present",
    description:
      "Built and evolved AI platform services enabling reliable and governed model execution across internal engineering teams and business initiatives.",
    url: "",
  },
  {
    type: "impact",
    title: "Architecture leadership across 300's of applications",
    organization: "JPMorgan Chase",
    year: "2024 — 2025",
    description:
      "Spearheaded the architectural vision and strategy for Payment Technology in India, ensuring alignment with global standards and business objectives.",
    url: "",
  },
  {
    type: "milestone",
    title: "Next-gen Trade Processing from a Monolith",
    organization: "JPMorgan Chase",
    year: "2024 — 2025",
    description:
      "Broke an existing monolith into a Domain-Driven Design, event-driven distributed system adhering to cloud-native development practice.",
    url: "",
  },
  {
    type: "impact",
    title: "Reduced overall project development cost by 75%",
    organization: "Morgan Stanley",
    year: "2015 — 2019",
    description:
      "Developed strategic partnerships with key stakeholders to expand platform reach and influence for adoption, accelerating time-to-market across projects.",
    url: "",
  },
  {
    type: "milestone",
    title: "Machine-Learning as a Platform (PaaS)",
    organization: "Morgan Stanley",
    year: "2015 — 2019",
    description:
      "Highly scalable ML PaaS built on advanced distributed-systems concepts, supporting high throughput and on-demand resource utilization.",
    url: "",
  },
  {
    type: "milestone",
    title: "Private blockchain network for document processing",
    organization: "Traystream Ltd.",
    year: "2019 — 2020",
    description:
      "Hyperledger Fabric and IPFS over Kubernetes, modernising document processing for trade finance.",
    url: "",
  },
  {
    type: "milestone",
    title: "100% cloud-native multi-tenant platform",
    organization: "Traystream Ltd.",
    year: "2019 — 2020",
    description:
      "Multi-tenant system deployable on Azure, AWS and GCP using OpenShift, made fully cloud native to support client demands.",
    url: "",
  },
];
