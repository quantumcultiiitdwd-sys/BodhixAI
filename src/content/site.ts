// Single editable content layer. Swap for a CMS later by keeping these types.

export const site = {
  name: "BodhixAI",
  tagline: "Intelligence, engineered with purpose.",
  description:
    "BodhixAI builds intelligent systems, secure digital infrastructure, and next-generation SaaS — spanning agentic AI, AI cybersecurity, and custom software engineering.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Only verified company channels. Empty entries are not rendered.
  // e.g. { label: "LinkedIn", href: "https://www.linkedin.com/company/..." }
  socials: [] as { label: string; href: string }[],
};

export const nav = [
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ---------------------------------- Solutions --------------------------------- */

export type VisualKind =
  | "workflow"
  | "threat"
  | "dashboard"
  | "rag"
  | "chain"
  | "infra";

export type Solution = {
  slug: string;
  title: string;
  short: string;
  description: string;
  visual: VisualKind;
  capabilities: string[];
};

export const solutions: Solution[] = [
  {
    slug: "agentic-ai",
    title: "Agentic AI & Automation",
    short: "Agents that reason and act.",
    description:
      "Intelligent agents and automated workflows that reason, orchestrate tools, and streamline complex business operations.",
    visual: "workflow",
    capabilities: ["Multi-step tool-using agents", "Workflow orchestration", "Human-in-the-loop review", "Evaluation & guardrails"],
  },
  {
    slug: "ai-cybersecurity",
    title: "AI Cybersecurity",
    short: "Security that learns.",
    description:
      "Intelligent threat detection, security analytics, and resilient architectures designed for evolving digital environments.",
    visual: "threat",
    capabilities: ["Graph-based intrusion detection", "Calibrated risk scoring", "Explainable alerts", "Security architecture reviews"],
  },
  {
    slug: "saas",
    title: "Custom SaaS Development",
    short: "Platforms built to grow.",
    description:
      "Scalable cloud-native platforms, enterprise applications, and subscription software engineered around real business needs.",
    visual: "dashboard",
    capabilities: ["Product discovery & design", "Multi-tenant architecture", "Billing & access control", "Analytics dashboards"],
  },
  {
    slug: "llm-engineering",
    title: "Generative AI & LLM Engineering",
    short: "Knowledge, retrieved and reasoned.",
    description:
      "Domain-aware assistants, retrieval-augmented generation, enterprise knowledge systems, and dependable LLM applications.",
    visual: "rag",
    capabilities: ["Retrieval-augmented generation", "Domain assistants", "Evaluation pipelines", "Grounded data generation"],
  },
  {
    slug: "web3",
    title: "Blockchain & Web3",
    short: "Trust you can verify.",
    description: "Decentralized applications, smart contracts, and verifiable digital infrastructure.",
    visual: "chain",
    capabilities: ["Smart contracts (Solidity, Motoko)", "dApp frontends", "Provenance & audit trails", "IPFS storage"],
  },
  {
    slug: "mlops",
    title: "Cloud, Edge & MLOps",
    short: "From notebook to production.",
    description:
      "Production-focused deployment, infrastructure automation, model serving, and scalable AI operations.",
    visual: "infra",
    capabilities: ["Containerised model serving", "CI/CD for ML", "Edge deployment", "Monitoring & drift detection"],
  },
];

/* ----------------------------------- Projects --------------------------------- */

// Honesty matters: every project states where it came from.
export type ProjectOrigin = "Founder-led research" | "Research prototype" | "Independent engineering";

export type ProjectVisualKind = "ids" | "orbit" | "crowdfund" | "nft" | "federated" | "property";

export type Project = {
  slug: string;
  number: string;
  title: string;
  name: string;
  category: string;
  origin: ProjectOrigin;
  description: string;
  tags: string[];
  visual: ProjectVisualKind;
  overview: string;
  challenge: string;
  approach: string[];
  architecture: { label: string; detail: string }[];
  outcomes: string[];
  links?: { label: string; href: string }[];
};

const GH = "https://github.com/sathwikNARKEDimilli29";

export const projects: Project[] = [
  {
    slug: "sage-ids",
    number: "01",
    name: "SAGE-IDS",
    title: "SAGE-IDS — Intelligent Network Threat Detection",
    category: "AI Cybersecurity / Research",
    origin: "Founder-led research",
    description:
      "A graph-centric intrusion detection framework combining structural surprise, network flow intelligence, and conformal risk estimation to support more reliable security decisions across interconnected environments.",
    tags: ["Graph Learning", "Python", "Machine Learning", "Cybersecurity"],
    visual: "ids",
    overview:
      "SAGE-IDS treats a network as what it is — a graph of relationships — rather than a stream of isolated flows. It was developed as founder-led research in collaboration with the National Informatics Centre (MeitY) and published at IEEE CONECCT 2026.",
    challenge:
      "Flow-level detectors miss attacks that only look suspicious in context, and most give a score without saying how much to trust it. On constrained edge devices across the Internet of Everything (IoX), both problems get worse.",
    approach: [
      "Model hosts and flows as a communication graph and measure structural surprise — how unexpected a new interaction is given the graph so far.",
      "Fuse structural signals with conventional flow features in a lightweight detector.",
      "Apply split-conformal calibration so each alert carries a statistically grounded uncertainty estimate.",
    ],
    architecture: [
      { label: "Ingest", detail: "Network flows aggregated into a rolling interaction graph." },
      { label: "Represent", detail: "Structural-surprise scores combined with flow statistics." },
      { label: "Detect", detail: "Lightweight classifier suited to edge deployment." },
      { label: "Calibrate", detail: "Split-conformal risk sets for dependable decisions." },
    ],
    outcomes: [
      "Peer-reviewed publication at IEEE CONECCT 2026.",
      "Alerts accompanied by calibrated confidence rather than raw scores.",
      "Design informed by constraints of edge devices in connected systems.",
    ],
  },
  {
    slug: "orbit",
    number: "02",
    name: "ORBIT",
    title: "ORBIT — Operational Intelligence Benchmarking",
    category: "Agentic AI / Enterprise Automation Research",
    origin: "Founder-led research",
    description:
      "A benchmark for evaluating multistep operational reasoning in IT operations automation, supported by retrieval-grounded data generation and annotation workflows.",
    tags: ["LLMs", "RAG", "Agentic AI", "Evaluation Pipelines"],
    visual: "orbit",
    overview:
      "ORBIT is a benchmark developed by our co-founder during a research internship with IBM Research. It asks a simple question with hard answers: can an AI agent reason through a real operational incident, step by step?",
    challenge:
      "IT operations problems unfold over many steps — reading telemetry, forming hypotheses, choosing actions. Single-turn benchmarks don't capture that, so it is hard to know whether an agent is actually ready for operational work.",
    approach: [
      "Define multistep operational reasoning tasks grounded in realistic ITOps scenarios.",
      "Build retrieval-grounded pipelines to generate task data tied to source material.",
      "Design annotation workflows that keep evaluation consistent and auditable.",
    ],
    architecture: [
      { label: "Ground", detail: "Retrieval over operational knowledge to anchor generated tasks." },
      { label: "Generate", detail: "LLM-assisted task and trajectory construction." },
      { label: "Annotate", detail: "Structured human review for correctness." },
      { label: "Evaluate", detail: "Step-level scoring of agent reasoning." },
    ],
    outcomes: [
      "A structured way to evaluate agents on multistep operational reasoning.",
      "Reusable retrieval-grounded data generation and annotation pipelines.",
      "Research in progress; details shared as publication allows.",
    ],
  },
  {
    slug: "crowdfunding-nexus",
    number: "03",
    name: "Crowdfunding Nexus",
    title: "Crowdfunding Nexus",
    category: "Blockchain / SaaS",
    origin: "Independent engineering",
    description:
      "A blockchain-enabled crowdfunding platform designed to improve transparency, traceability, and trust in startup fundraising.",
    tags: ["Blockchain", "Smart Contracts", "Web3"],
    visual: "crowdfund",
    overview:
      "An independent engineering project by our co-founder exploring how smart contracts can make fundraising more transparent for early-stage startups and their backers.",
    challenge:
      "Backers of early-stage ventures rarely see where their money goes. Traditional platforms ask for trust; blockchains can offer verification instead.",
    approach: [
      "Encode campaign rules — goals, deadlines, refunds — in smart contracts.",
      "Record every contribution as a traceable on-chain transaction.",
      "Present campaign activity in a clear, familiar web interface.",
    ],
    architecture: [
      { label: "Contracts", detail: "Campaign logic enforced on-chain." },
      { label: "Ledger", detail: "Contributions publicly traceable." },
      { label: "Interface", detail: "Web dApp for founders and backers." },
    ],
    outcomes: [
      "Working prototype of transparent, rule-enforced fundraising.",
      "Explored trade-offs between on-chain transparency and usability.",
    ],
  },
  {
    slug: "nft-marketspace",
    number: "04",
    name: "NFT Marketspace",
    title: "NFT Marketspace",
    category: "Web3 / Digital Commerce",
    origin: "Independent engineering",
    description:
      "A decentralized marketplace supporting the creation, discovery, buying, and selling of unique digital assets.",
    tags: ["Motoko", "Blockchain", "Web3"],
    visual: "nft",
    overview:
      "A Motoko-powered NFT marketplace built by our co-founder on the Internet Computer, designed to help artists mint, list, and trade their work.",
    challenge:
      "Creators need a simple way to mint and sell digital work without giving up control to a centralised intermediary.",
    approach: [
      "Implement minting, listing, and transfer logic in Motoko canisters.",
      "Design a discovery experience focused on the artwork, not the plumbing.",
      "Keep ownership and transfer history verifiable on-chain.",
    ],
    architecture: [
      { label: "Canisters", detail: "Motoko smart contracts for NFTs and listings." },
      { label: "Marketplace", detail: "Discovery, buy, and sell flows." },
      { label: "Ownership", detail: "On-chain provenance per asset." },
    ],
    outcomes: ["End-to-end mint, list, and purchase flow.", "Open-source implementation available on GitHub."],
    links: [{ label: "Source on GitHub", href: `${GH}/Gabbar-Singh-NFT-MarketSpace` }],
  },
  {
    slug: "federated-intelligence",
    number: "05",
    name: "Federated Intelligence",
    title: "Federated Intelligence for Connected Systems",
    category: "AI Security / Privacy Engineering",
    origin: "Research prototype",
    description:
      "Research-informed privacy-preserving machine learning architectures for distributed connected environments, incorporating secure collaboration and decentralized trust mechanisms.",
    tags: ["Federated Learning", "Privacy Engineering", "Blockchain", "AI"],
    visual: "federated",
    overview:
      "A line of research by our co-founder and collaborators on how many devices — vehicles, industrial sensors, city infrastructure — can learn together without pooling raw data. Results appear in publications including FedGuard-IIoT (IEEE GLOBECOM Workshops 2025), FAPL-DM-BC (COMSNETS 2026), and FL-DABE-BC (ACM SenSys FMSys 2025).",
    challenge:
      "Connected systems generate sensitive data at the edge. Centralising it creates privacy risk; federating it creates new questions about trust, authentication, and poisoned updates.",
    approach: [
      "Train models locally on edge nodes and share only model updates.",
      "Use blockchain-backed records for provenance and decentralized trust.",
      "Add privacy-aware aggregation and explainability for auditability.",
    ],
    architecture: [
      { label: "Edge nodes", detail: "Local training on private data." },
      { label: "Aggregation", detail: "Privacy-aware federated averaging." },
      { label: "Trust layer", detail: "Blockchain-backed provenance and authentication." },
      { label: "Explain", detail: "XAI for interpretable decisions." },
    ],
    outcomes: [
      "Multiple peer-reviewed publications across IoV, IIoT, and smart-city settings.",
      "Reference architectures for privacy-preserving collaborative learning.",
    ],
  },
  {
    slug: "dreamhome",
    number: "06",
    name: "DreamHome",
    title: "DreamHome — Modern Property Experiences",
    category: "SaaS / Full-Stack Engineering",
    origin: "Independent engineering",
    description:
      "A property rental application connecting property seekers and homeowners through a streamlined digital experience.",
    tags: ["Express.js", "MySQL", "Full-Stack Development"],
    visual: "property",
    overview:
      "A full-stack property rental application built by our co-founder, connecting homeowners with people looking for their next place.",
    challenge:
      "Rental search is often fragmented across listings, messages, and spreadsheets. Both sides need one clear place to meet.",
    approach: [
      "Model properties, owners, and seekers in a relational schema.",
      "Expose listing, search, and enquiry flows through an Express.js API.",
      "Design an interface that keeps filters and listings front and centre.",
    ],
    architecture: [
      { label: "Data", detail: "MySQL relational model." },
      { label: "API", detail: "Express.js REST endpoints." },
      { label: "Interface", detail: "Listing, filter, and dashboard views." },
    ],
    outcomes: ["Complete listing-to-enquiry flow.", "Open-source implementation available on GitHub."],
    links: [{ label: "Source on GitHub", href: `${GH}/DreamHomE_DBMS_Proj` }],
  },
];

/* ----------------------------------- Research --------------------------------- */

export type ResearchStatus = "Published" | "Accepted" | "Ongoing";

export type Research = {
  topic: string;
  title: string;
  summary: string;
  domain: string;
  status: ResearchStatus;
  venue: string;
  visual: VisualKind;
  link?: { label: string; href: string };
};

// Founder & collaborator research, not proprietary BodhixAI IP.
export const research: Research[] = [
  {
    topic: "Graph-Based Network Intrusion Detection",
    title: "SAGE-IDS: Graph-centric Intrusion Detection with Structural Surprise and Conformal Risk for the IoX",
    summary: "Fusing graph structure with flow features, and calibrating every alert with conformal prediction.",
    domain: "Cybersecurity",
    status: "Published",
    venue: "IEEE CONECCT 2026",
    visual: "threat",
  },
  {
    topic: "Physics-Informed AI for Network Security",
    title: "Physics-aware / constraint-aware intelligent systems for network security in IoX",
    summary: "Using physical and system constraints to make security models more robust and trustworthy.",
    domain: "Cybersecurity · Connected Systems",
    status: "Ongoing",
    venue: "M.Eng thesis, National University of Singapore",
    visual: "infra",
  },
  {
    topic: "Agentic AI and Operational Reasoning",
    title: "ORBIT: benchmarking multistep operational reasoning in ITOps",
    summary: "Evaluating whether agents can reason through real operational incidents, step by step.",
    domain: "Agentic AI",
    status: "Ongoing",
    venue: "Research internship, IBM Research",
    visual: "workflow",
  },
  {
    topic: "Quantum Machine Learning",
    title: "Quantum-Contextual Nano-LCM: A Lightweight Transformer for High-Performance IoT NIDS",
    summary: "Exploring quantum-inspired context modelling for compact, fast intrusion detection.",
    domain: "Quantum ML · Security",
    status: "Accepted",
    venue: "IEEE GLOBECOM Workshops 2026 (Security6G)",
    visual: "rag",
  },
  {
    topic: "Quantum Machine Learning",
    title: "Classical vs. Quantum Approaches for Predicting Galaxy Velocity Dispersion in MaNGA Galaxies",
    summary: "A head-to-head study of classical and quantum models — awarded Outstanding Student Paper.",
    domain: "Quantum ML",
    status: "Published",
    venue: "IEEE WHISPERS 2025",
    visual: "dashboard",
    link: { label: "Code", href: `${GH}/VelocityDispersionPrediction_QML-XAI` },
  },
  {
    topic: "Privacy-Preserving Federated Learning",
    title: "FedGuard-IIoT: A Scalable Federated Learning Architecture for Network-IDS in the Industrial IoT",
    summary: "Collaborative intrusion detection across industrial sites without sharing raw traffic.",
    domain: "Privacy Engineering",
    status: "Published",
    venue: "IEEE GLOBECOM Workshops 2025",
    visual: "infra",
  },
  {
    topic: "Secure Connected Systems",
    title: "FL-DECO-BC: A Privacy and Provenance Preserving, Provably Secure FL Framework for VANETs",
    summary: "Federated learning with blockchain provenance for vehicular networks.",
    domain: "Connected Vehicles",
    status: "Published",
    venue: "IEEE GLOBECOM Workshops 2024",
    visual: "chain",
  },
  {
    topic: "Explainable Intrusion Detection",
    title: "Curriculum Learning with Image Transformation and XAI for Improved Network Intrusion Detection",
    summary: "Teaching detectors easy-to-hard, and explaining what they learned.",
    domain: "Cybersecurity",
    status: "Published",
    venue: "ICISS 2025",
    visual: "threat",
    link: { label: "Code", href: `${GH}/CurriculumLearning_ImageTransformation` },
  },
];

/* ----------------------------------- Other ------------------------------------ */

export const pillars = [
  {
    title: "Research-driven innovation",
    body: "Grounded in emerging advances across artificial intelligence, cybersecurity, and intelligent systems.",
    icon: "flask",
  },
  {
    title: "Security by design",
    body: "Security considerations integrated into architecture, development, and deployment.",
    icon: "shield",
  },
  {
    title: "Built for scale",
    body: "Modern engineering practices designed for reliability, maintainability, and growth.",
    icon: "layers",
  },
  {
    title: "End-to-end execution",
    body: "From initial discovery and prototyping to implementation and continuous improvement.",
    icon: "route",
  },
] as const;

export const processSteps = [
  { n: "01", title: "Discover", body: "Understand the problem, define requirements, and identify meaningful opportunities." },
  { n: "02", title: "Architect", body: "Design secure, scalable systems with clear technical and business objectives." },
  { n: "03", title: "Build", body: "Develop, integrate, and validate intelligent products through iterative engineering." },
  { n: "04", title: "Evolve", body: "Deploy, measure, optimize, and improve as requirements change." },
];

export const techStack = [
  { category: "Artificial Intelligence", items: ["Python", "PyTorch", "LLMs", "RAG", "Agentic AI", "Machine Learning"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "FastAPI", "REST APIs"] },
  { category: "Infrastructure", items: ["Docker", "Kubernetes", "AWS", "CI/CD"] },
  { category: "Cybersecurity", items: ["Network Security", "Intrusion Detection", "Privacy-Preserving AI"] },
  { category: "Blockchain", items: ["Solidity", "Motoko", "IPFS", "Web3"] },
  { category: "Quantum Computing", items: ["Qiskit", "PennyLane", "CUDA-Q"] },
];

export type Testimonial = { quote: string; name: string; role: string; organization: string };

// Add only approved, real testimonials. While empty, production shows a CTA instead.
export const testimonials: Testimonial[] = [];

export const devPlaceholderTestimonials: Testimonial[] = [
  { quote: "[Approved customer quote about collaboration, technical quality, or delivered value.]", name: "Client Name", role: "Position", organization: "Organization" },
  { quote: "[Approved customer quote about how the engagement was run and what changed afterwards.]", name: "Client Name", role: "Position", organization: "Organization" },
];

export const founders = [
  {
    name: "Sathwik Narkedimilli",
    role: "Co-founder",
    initials: "SN",
    bio: "A researcher and engineer working where AI, cybersecurity, blockchain, and quantum computing meet — with the aim of translating deep science into practical, resilient products.",
    highlights: [
      "M.Eng, Electrical & Computer Engineering — National University of Singapore (in progress), thesis on physics-aware intelligent systems for network security.",
      "Research internship with IBM Research, building the ORBIT benchmark for agentic operational reasoning.",
      "Quantum AI and HPC research internship with NVIDIA & I-HUB QTF.",
      "Research with Télécom Paris (IP Paris), TU Delft, and collaborations with NIC (MeitY), ISRO VSSC, and DRDO DYSL-SM.",
      "Author and co-author of peer-reviewed work at IEEE and ACM venues; IEEE WHISPERS 2025 Outstanding Student Paper Award.",
      "Previously co-founder & CEO of Thunder Buddies, a SaaS startup; software engineering and Web3 development experience.",
    ],
    links: [{ label: "GitHub", href: GH }],
  },
];

export const contactServices = [
  "Agentic AI & Automation",
  "AI Cybersecurity",
  "Custom SaaS Development",
  "Generative AI & LLM Engineering",
  "Blockchain & Web3",
  "Cloud, Edge & MLOps",
  "Something else",
] as const;

export const budgetRanges = ["Not sure yet", "< $10k", "$10k – $50k", "$50k – $150k", "$150k+"] as const;
