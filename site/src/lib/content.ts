export const global = {
  name: "Vedant Patil",
  role: "Software Engineer",
  email: "patilvedant.work@gmail.com",
  location: "Columbus, Ohio",
  github: "https://github.com/vedantpatil2021",
  linkedin: "https://linkedin.com/in/vedant-patil-6082",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const nav = {
  cta: { label: "Get in touch", href: "#contact" },
};

export const hero = {
  eyebrow: "Open to SWE, DevOps, and AI infrastructure roles",
  heading: {
    pre: "I build the systems that let",
    em: "AI agents",
    post: "do real work.",
  },
  support:
    "MCP servers, multi-agent pipelines, and GPU inference platforms on Kubernetes. M.S. Computer Science, The Ohio State University.",
  primaryButton: { label: "View projects", href: "#projects" },
  secondaryLink: { label: "Get in touch", href: "#contact" },
};

export const quote = {
  text: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
  attribution: "Charles Darwin",
};

export const metrics = {
  heading: "Numbers from production",
  support: "Real figures from systems I have shipped and operated.",
  items: [
    {
      value: 99.9,
      decimals: 1,
      prefix: "",
      suffix: "%",
      label: "Uptime",
      context: "WorldForge video inference platform",
    },
    {
      value: 96,
      decimals: 0,
      prefix: "",
      suffix: "%",
      label: "Pipeline success",
      context: "Air-gapped edge Kubernetes",
    },
    {
      value: 90,
      decimals: 0,
      prefix: "~",
      suffix: "%",
      label: "GPU utilization",
      context: "NVIDIA H100 orchestration",
    },
    {
      value: 68,
      decimals: 0,
      prefix: "",
      suffix: "x",
      label: "Faster bootstrap",
      context: "Offline K3s deployment workflows",
    },
    {
      value: 45,
      decimals: 0,
      prefix: "",
      suffix: "",
      label: "LLM-callable tools",
      context: "One production MCP server",
    },
    {
      value: 2,
      decimals: 0,
      prefix: "",
      suffix: "",
      label: "Peer-reviewed papers",
      context: "NeurIPS 2025, ACM/IEEE SEC 2025",
    },
  ],
};

export const about = {
  heading: "About",
  paragraphs: [
    "I am a software engineer working where agentic AI meets production infrastructure. Over the last two years I have shipped MCP servers, multi-agent pipelines, and LLM tool networks that run in real environments, much of it first-of-its-kind work with no playbook to follow.",
    "At Ohio State's ReRout Laboratory I ran AI systems in places the cloud cannot reach: air-gapped Kubernetes clusters on NVIDIA Jetson hardware, H100-backed world-model inference, and robot policy training loops that improve themselves.",
    "I care about systems that hold up: instrumented from day one, deployable without heroics, and honest about their failure modes.",
  ],
  facts: [
    { label: "Location", value: "Columbus, Ohio" },
    { label: "Education", value: "M.S. CSE, Ohio State, 2026" },
    { label: "Focus", value: "Agentic AI, DevOps, cloud platforms" },
    { label: "Published", value: "NeurIPS 2025, ACM/IEEE SEC 2025" },
  ],
};

export const experience = {
  heading: "Experience",
  entries: [
    {
      role: "Research Associate",
      org: "ReRout Laboratory, The Ohio State University",
      dates: "Dec 2024 - May 2026",
      bullets: [
        "Architected a production Kubernetes AI inference platform for air-gapped NVIDIA Jetson edge hardware, reaching a 96% pipeline success rate in fully disconnected environments.",
        "Deployed NVIDIA Cosmos-Predict2.5-14B on K3s with H100 orchestration and Redis-backed queues: 198s P95 latency, 99.9% uptime, roughly $0.11 per video.",
        "Built autonomous collect-train-evaluate loops for robot policy training, including synthetic trajectory collection and 9x faster quality filtering.",
        "Published two peer-reviewed papers: NeurIPS 2025 and ACM/IEEE SEC 2025.",
      ],
    },
    {
      role: "Cloud & DevOps Engineer Intern",
      org: "Healiom",
      dates: "Apr 2024 - Jul 2024",
      bullets: [
        "Designed shared AWS infrastructure (EKS, ECS, VPC) with Terraform for four cross-functional teams in a HIPAA-regulated environment.",
        "Built four GitHub Actions CI/CD pipelines with automated security scanning, secrets management, and IAM/RBAC policies.",
        "Cut container images by 65%, from 5 GB to 1.5 GB, using multi-stage and distroless builds.",
      ],
    },
  ],
};

export type ProjectVisual = "shader-a" | "shader-b" | "tint" | "pattern" | "plain" | "icon-pattern";

export const projects = {
  eyebrow: "Selected work",
  heading: "Projects",
  support: "Six systems, all real, all shipped. Built to run, not to demo.",
  moreLink: { label: "More on GitHub", href: global.github },
  items: [
    {
      title: "WorldForge",
      tagline: "14B-parameter video generation, run like a product.",
      description:
        "End-to-end platform for NVIDIA Cosmos world-model inference on K3s: Redis-backed async queues, FastAPI microservices, and H100 GPU orchestration across 23 Kubernetes manifests.",
      metric: "99.9% uptime · $0.11 per video",
      stack: ["K3s", "NVIDIA H100", "Redis", "FastAPI"],
      visual: "shader-a" as ProjectVisual,
      span: "lg:col-span-7 lg:row-span-2",
    },
    {
      title: "DroneMCP",
      tagline: "Autonomous drone operations, controlled by LLMs.",
      description:
        "A production MCP server on AWS ECS Fargate exposing 45 LLM-callable tools for flight control, GPS, camera, and ML inference, verified by 35 unit tests before touching hardware.",
      metric: "45 LLM-callable tools",
      stack: ["Python", "FastMCP", "ECS Fargate", "WebSocket"],
      visual: "tint" as ProjectVisual,
      span: "lg:col-span-5",
    },
    {
      title: "Autonomous Multi-Agent Dev Team",
      tagline: "Agents that plan, write, review, and test software.",
      description:
        "A fully autonomous engineering pipeline with architect, coder, reviewer, and debugger roles, plus evaluation harnesses that measure completion rate and classify failure modes.",
      metric: null as string | null,
      stack: ["Claude Code", "Codex", "MCP"],
      visual: "icon-pattern" as ProjectVisual,
      span: "lg:col-span-5",
    },
    {
      title: "Kira (RetailOps)",
      tagline: "An AIOps agent that triages incidents before humans do.",
      description:
        "Correlates CloudWatch logs, Prometheus metrics, and EKS cluster health in real time to surface root causes, on a full GitOps platform with ArgoCD and Terraform.",
      metric: null as string | null,
      stack: ["AWS Bedrock", "EKS", "Prometheus", "ArgoCD"],
      visual: "pattern" as ProjectVisual,
      span: "lg:col-span-7",
    },
    {
      title: "Agentic RAG Pipeline",
      tagline: "Retrieval the model decides on, not a fixed step.",
      description:
        "The LLM chooses when and where to retrieve across multiple sources, with automated correctness checks and a failure taxonomy that closes the improvement loop.",
      metric: null as string | null,
      stack: ["Python", "LLM evals"],
      visual: "plain" as ProjectVisual,
      span: "lg:col-span-5",
    },
    {
      title: "Human-in-the-Loop Agent App",
      tagline: "An agent pipeline with human checkpoints where they matter.",
      description:
        "Full-stack web app where agents handle processing, tool calls, and state between steps, with structured handoff protocols and full observability of every model decision.",
      metric: null as string | null,
      stack: ["React", "FastAPI", "LLM agents"],
      visual: "shader-b" as ProjectVisual,
      span: "lg:col-span-12",
    },
  ],
};

export const thought = {
  statement: "Instrument first. Debug second.",
  support: "Every system I ship starts observable. The rest follows from that.",
};

export const skills = {
  heading: "Skills",
  support: "Selective, not exhaustive. These are the tools I reach for in production.",
  groups: [
    {
      title: "Agentic AI & LLM Systems",
      chips: [
        "MCP server development",
        "Multi-agent orchestration",
        "Agent evals & observability",
        "Agentic RAG",
        "AWS Bedrock",
        "Claude Code",
      ],
    },
    {
      title: "Infrastructure & Cloud",
      chips: ["Kubernetes (EKS, K3s)", "AWS", "Terraform", "ArgoCD", "Docker", "GitHub Actions"],
    },
    {
      title: "ML & GPU Systems",
      chips: [
        "PyTorch",
        "NVIDIA Cosmos",
        "YOLO11",
        "VLA fine-tuning",
        "H100 orchestration",
        "Weights & Biases",
      ],
    },
    {
      title: "Languages & Backend",
      chips: ["Python", "TypeScript", "C++", "FastAPI", "PostgreSQL", "Redis"],
    },
  ],
};

export const education = {
  heading: "Education",
  entries: [
    {
      school: "The Ohio State University",
      degree: "M.S. Computer Science and Engineering",
      date: "May 2026",
    },
    {
      school: "University of Mumbai",
      degree: "B.E. Information Technology",
      date: "May 2024",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  heading: "Hiring for platform, DevOps, or agentic AI work?",
  support:
    "I finished my M.S. at Ohio State in May 2026 and I am open to full-time roles. Tell me what you are building.",
  email: global.email,
  primaryButton: { label: "Get in touch", href: `mailto:${global.email}` },
  copyLabel: "Copy email",
  copiedLabel: "Copied",
};

export const socials = [
  { label: "GitHub", href: global.github },
  { label: "LinkedIn", href: global.linkedin },
  { label: "Email", href: `mailto:${global.email}` },
];

export const footer = {
  wordmark: global.name,
  location: global.location,
  copyright: "© 2026 Vedant Patil",
};
