# VEDANT PATIL — MASTER RESUME & KNOWLEDGE BASE

> **Purpose:** This file is a single source of truth for all resume content, skills, projects, and experience. Feed this to any AI to draft job-specific resumes, cover letters, LinkedIn bios, project write-ups, or any career content without needing to re-upload PDFs.

---

## CONTACT & LINKS

| Field | Value |
|-------|-------|
| **Email (primary)** | patilvedant.work@gmail.com |
| **Email (alt)** | patilvedant6082@gmail.com |
| **Location** | Columbus, OH |
| **LinkedIn** | https://linkedin.com/in/vedant-patil-6082 |
| **GitHub** | https://github.com/vedantpatil2021 |


---

## IDENTITY SNAPSHOTS
> Multiple summary variants for different job targets. Use the one closest to the role.

### Variant A — Agentic AI / LLM Systems (e.g., Neuralink, AI-native startups)
Software engineer with 2 years of research and development experience building production agentic AI systems. Shipped MCP servers, multi-agent orchestration pipelines, and LLM-callable tool networks used in real environments. Comfortable with ambiguity — much of this work was first-of-its-kind. Strong on production debugging, agent observability, and writing new skills that give agents access to systems that didn't exist yesterday.

### Variant B — ML Infrastructure / NVIDIA / Research-adjacent
Software engineer with 2+ years building production agentic AI systems: MCP-integrated tool networks, multi-agent orchestration pipelines, autonomous LLM-driven dev teams, and self-improving evaluation loops. Shipped NVIDIA Cosmos world model inference on production Kubernetes with NVIDIA GPU tooling and H100 orchestration. Comfortable turning fast-moving, ambiguous ideas into robust, modular systems that improve continuously.

### Variant C — DevOps / Platform Engineering / Cloud Infrastructure
DevOps & Platform Engineer with 1+ year of experience designing and operating production AI infrastructure on Kubernetes across cloud and air-gapped edge environments. Built internal platforms, autonomous agent systems (MCP servers + LLM integration), and automated workflows that improved deployment speed, reliability, and developer productivity. Passionate about reducing operational toil through self-service tooling and observable systems. M.S. Computer Science candidate, The Ohio State University (May 2026).

---

## EDUCATION

### The Ohio State University
- **Degree:** Master of Science (M.S.), Computer Science and Engineering
- **Graduation:** May 2026
- **Status:** Graduated

### University of Mumbai
- **Degree:** Bachelor of Engineering (B.E.), Information Technology
- **Graduation:** May 2024

---

## SKILLS (COMPREHENSIVE)

### Agentic AI & LLM Systems
- MCP Server Development
- Multi-Agent Orchestration
- Autonomous Dev Pipelines
- Agentic RAG (Retrieval-Augmented Generation)
- Claude Code
- Codex
- Human-in-the-Loop Pipelines
- Agent Evaluation & Observability
- Self-Improving Feedback Loops
- Skill Engineering
- LLM Proxies
- LLM-callable Tool Networks
- AWS Bedrock (Claude integration)
- AIOps
- n8n (workflow automation)

### ML & Models
- PyTorch
- NVIDIA Cosmos (Predict2.5-14B)
- YOLO11m (real-time object detection)
- VLA Fine-tuning (Vision-Language-Action models)
- Model Evaluation
- Failure Taxonomy Analysis
- Prompt Engineering
- Weights & Biases (W&B)
- Synthetic data generation
- Automated collect-train-evaluate loops

### Infrastructure & Platforms
- Kubernetes: K8s, K3s, EKS
- AWS: ECS Fargate, EKS, Bedrock, CloudWatch, VPC, IAM
- Azure
- Cloudflare
- Docker, Docker Compose
- NVIDIA Container Toolkit
- Terraform (IaC)
- ArgoCD (GitOps)
- Helm
- GitHub Actions CI/CD
- Jenkins

### Observability & Monitoring
- Prometheus
- Grafana
- Loki
- Promtail
- Distributed Tracing
- CloudWatch
- Auto-scaling
- Cost Governance
- End-to-end pipeline visibility across heterogeneous hardware

### Languages & Scripting
- Python (expert)
- JavaScript / TypeScript
- C++
- Bash

### Backends & Data
- FastAPI
- Node.js
- React
- PostgreSQL
- MongoDB
- Redis
- REST APIs
- MQTT (message broker / IoT/edge)
- Streaming Pipelines
- SQL

### Security & Compliance
- HIPAA-regulated environments
- Secrets management
- IAM / RBAC policies
- Automated security scanning
- Multi-stage & distroless container builds

### Networking (Edge / Air-Gapped)
- VXLAN overlay networking
- CNI configuration
- Pod-to-pod traffic routing without host network modification
- Air-gapped deployment strategies

---

## WORK EXPERIENCE

### Research Associate | ReRout Laboratory · The Ohio State University
**Duration:** December 2024 – May 2026
**Environment:** Air-gapped edge, Kubernetes, NVIDIA Jetson, H100 GPUs, fully disconnected environments

#### Key Contributions

**AI Inference Platform (Air-Gapped Edge)**
- Architected and shipped a production Kubernetes AI inference platform for air-gapped edge environments on NVIDIA Jetson hardware.
- Resolved a production CNI failure by configuring a VXLAN overlay that enabled pod-to-pod traffic without modifying the host network.
- Achieved **96% pipeline success rate** in fully disconnected environments.
- Built air-gapped deployment workflows on Docker Compose and K3s that eliminated runtime dependencies and **cut bootstrap time by 68x**.

**NVIDIA Cosmos World Model Inference**
- Designed and deployed NVIDIA Cosmos-Predict2.5-14B on K3s with NVIDIA Container Toolkit.
- Redis-backed async queues, FastAPI microservices, H100 GPU orchestration, 23 Kubernetes manifests.
- Achieved: **198s P95 latency**, ~**90% GPU utilization**, **99.9% uptime**, ~**$0.11 cost-per-video**, ~18 videos/hour throughput.
- Zero-downtime deployments via reproducible manifest strategy.

**Robot Policy Training Pipeline**
- Built automated data pipelines for robot policy training with autonomous collect-train-evaluate loops.
- Synthetic trajectory collection, **9x faster quality filtering**, and VLA model fine-tuning.
- Same feedback architecture as a self-improving agentic research system.

**Fault-Tolerant Microservices**
- Designed fault-tolerant, event-driven multi-container microservices using MQTT.
- Stage-dependent error recovery across inference pipelines running YOLO11m for real-time computer vision.

**Observability**
- Instrumented heterogeneous edge hardware with Grafana, Loki, and Promtail for end-to-end pipeline visibility.

**Publications**
- Published **2 peer-reviewed papers**:
  - NeurIPS 2025 — SmartWilds: Multimodal Wildlife Monitoring Dataset
  - ACM/IEEE SEC 2025 — Poster: Managing Heterogeneity in Far-Edge AI

---

### Cloud & DevOps Engineer Intern | Healiom
**Duration:** April 2024 – July 2024
**Environment:** AWS, HIPAA-regulated, multi-team platform

#### Key Contributions

**AWS Infrastructure**
- Designed and delivered shared AWS infrastructure (EKS, ECS, VPC) using Terraform.
- Served **4 cross-functional teams** in a **HIPAA-regulated** environment.
- Standardized secure deployments across teams via IaC.

**CI/CD Pipelines**
- Built **4 GitHub Actions CI/CD pipelines** with automated security scanning, secrets management, IAM/RBAC policies.
- Introduced auto-scaling governance across production workloads that maintained infrastructure costs within allocated budgets.

**Container Optimization**
- Reduced container image size by **65%** (5 GB → 1.5 GB) through multi-stage and distroless builds.
- Reduced storage and transfer costs significantly.

---

## PROJECTS (COMPREHENSIVE)

### DroneMCP
**Tagline:** Autonomous Drone Operations, Controlled by LLMs
**Infrastructure:** AWS ECS Fargate, FastMCP, ALB, WebSocket

**What it is:**
A production Python MCP server deployed on AWS ECS Fargate that exposes **45 LLM-callable tools** for fully autonomous drone operations.

**Capabilities exposed:**
- Flight control
- GPS
- Camera
- Docker lifecycle management
- ML inference

**Technical highlights:**
- Connection-required guards and shared dataclass state ensure safe, deterministic LLM command execution.
- Architected a cloud-to-edge bridge using FastMCP with SSE transport and ALB-backed WebSocket routing.
- Distributed tracing across the full bridge.
- **35-unit tests** with mocked SDKs verified deterministic behavior across all tool paths before any real hardware was involved.

---

### Autonomous Multi-Agent Dev Team
**Tagline:** Fully autonomous software development via MCP-integrated agent roles
**Stack:** Claude Code, Codex, MCP tool integrations

**What it is:**
A fully autonomous software engineering pipeline where agents plan, write, review, test, and iterate on real software without human intervention at runtime.

**Architecture:**
- Role-based agent architecture with defined roles: architect, coder, reviewer, debugger.
- Inter-agent communication via shared context and tool results.
- Orchestrated through MCP tool integrations.

**Evaluation:**
- Built evaluation harnesses to measure task completion rate.
- Failure mode classification taxonomy.

---

### RetailOps / Kira
**Tagline:** Autonomous AIOps incident-response agent on AWS Bedrock with MCP tool access
**Stack:** AWS Bedrock, Claude Code, EKS, Terraform, ArgoCD, GitHub Actions, Prometheus, Grafana, MCP servers

**What it is:**
Kira is an autonomous AIOps agent that correlates CloudWatch logs, Prometheus metrics, and EKS cluster health in real time to diagnose production incidents and surface root causes without human triage.

**Technical highlights:**
- Real-time correlation of CloudWatch logs, Prometheus metrics, EKS cluster health.
- Integrated Claude Code with AWS MCP servers for natural language infrastructure operations across Terraform, EKS, and cost analysis.
- Full GitOps platform: ArgoCD + GitHub Actions.
- Comprehensive Prometheus/Grafana observability stack.
- Full microservices platform on EKS (Terraform + ArgoCD + GitHub Actions).

---

### Agentic RAG Pipeline
**Tagline:** LLM-driven retrieval decisions across multiple data sources
**Stack:** Python, LLM, multiple retrieval sources

**What it is:**
An agentic retrieval-augmented generation system where the LLM autonomously decides when and what to retrieve across multiple sources — not just a static retrieval step.

**Technical highlights:**
- LLM autonomously decides retrieval timing and source selection.
- Evaluated pipeline quality through automated correctness checks.
- Failure taxonomy analysis to close the improvement loop.
- No manual trace inspection required — self-evaluating.

---

### WorldForge
**Tagline:** Production-scale 14B-parameter video generation on Kubernetes with GPU observability
**Stack:** K3s, NVIDIA H100, NVIDIA Cosmos-Predict2.5-14B, Redis, FastAPI, Prometheus, Grafana

**What it is:**
End-to-end production platform for running NVIDIA Cosmos-Predict2.5-14B world model inference at scale.

**Technical highlights:**
- Deployed on K3s with Redis-backed async queues, FastAPI microservices.
- NVIDIA H100 GPU orchestration.
- 23 Kubernetes manifests for zero-downtime deployments.
- **Metrics achieved:**
  - 198s P95 latency
  - ~90% GPU utilization
  - 99.9% uptime
  - ~$0.11 cost-per-video
  - ~18 videos/hour throughput

---

### Human-in-the-Loop Agentic Web Application
**Tagline:** Multi-step agentic pipeline with structured human checkpoints
**Stack:** Full-stack (frontend + backend), LLM agents, structured handoff protocols

**What it is:**
A full-stack web application backed by a multi-step agentic pipeline where LLM agents autonomously handle processing, tool calls, and state management between steps — while humans can review and steer at key decision points via structured handoff protocols.

**Technical highlights:**
- Instrumented full agent observability: tool calls, model decisions, intermediate results.
- Enables fast debugging and continuous workflow improvement without manual trace inspection.
- Structured human checkpoint / handoff protocols at key decision points.

---

## PUBLICATIONS

| Title (Area) | Venue | Year |
|---|---|---|
| SmartWilds: Multimodal Wildlife Monitoring Dataset | NeurIPS 2025 | 2025 |
| Poster: Managing Heterogeneity in Far-Edge AI | ACM/IEEE SEC 2025 | 2025 |

*(Full titles TBD — confirm with Vedant before adding to resumes)*

---

## METRICS & IMPACT (QUICK REFERENCE)

| Metric | Value | Context |
|--------|-------|---------|
| Pipeline success rate | 96% | Air-gapped Kubernetes edge platform |
| Bootstrap time reduction | 68x | Air-gapped Docker Compose / K3s deployments |
| Container image reduction | 65% (5 GB → 1.5 GB) | Healiom multi-stage/distroless builds |
| GPU utilization | ~90% | WorldForge / NVIDIA H100 |
| Uptime | 99.9% | WorldForge |
| P95 latency | 198s | 14B-param video generation |
| Cost per video | ~$0.11 | WorldForge |
| Throughput | ~18 videos/hour | WorldForge |
| LLM-callable tools | 45 | DroneMCP |
| Unit tests | 35 | DroneMCP (mocked SDK coverage) |
| CI/CD pipelines shipped | 4 | Healiom |
| Teams served | 4 | Healiom shared AWS infra |
| Quality filter speedup | 9x | Robot policy training pipeline |
| Kubernetes manifests | 23 | WorldForge zero-downtime config |
| Papers published | 2 | NeurIPS 2025, ACM/IEEE SEC 2025 |

---

## DOMAIN EXPERTISE THEMES
> Use these to map Vedant's background to job descriptions.

### 1. Agentic AI & MCP Ecosystem
Deep, first-mover experience with the MCP (Model Context Protocol) tooling ecosystem. Built production MCP servers, multi-agent pipelines, and LLM-callable tool surfaces from scratch — before widespread tooling existed. Strong intuition for agent failure modes, evaluation loops, and observability.

### 2. Edge AI & Air-Gapped Infrastructure
Unique experience deploying AI systems in fully disconnected, constrained environments (NVIDIA Jetson, K3s). Solved real production problems — CNI networking failures, zero-external-dependency deployments — not just simulated environments.

### 3. GPU-Scale Model Inference
Hands-on with NVIDIA Cosmos-Predict2.5-14B, YOLO11m, H100 orchestration, NVIDIA Container Toolkit, and the full stack from model → Kubernetes → observability → cost optimization.

### 4. Production Observability Culture
Every system Vedant has built includes end-to-end observability (Prometheus, Grafana, Loki, distributed tracing). Strong bias toward instrumenting first, debugging second.

### 5. Cloud Infrastructure at Scale (AWS / Kubernetes)
Production experience with AWS EKS, ECS Fargate, Bedrock, Terraform, ArgoCD, GitOps workflows, and multi-team platform engineering in regulated (HIPAA) environments.

### 6. Self-Improving & Autonomous Systems
Built systems with automated feedback loops: self-evaluating RAG pipelines, autonomous collect-train-evaluate robot training loops, AIOps agents that triage without humans. Strong pattern for removing toil from engineering workflows.

---

## NOTES FOR AI DRAFTING

- **Tone:** Direct, technical, precise. Avoid fluff. Vedant's voice is confident without being boastful.
- **Preferred format:** Bullet points for experience/projects; short punchy taglines before detail.
- **Metrics:** Always include — Vedant has strong numbers. Don't leave them out.
- **Ambiguity comfort:** A recurring theme — explicitly call it out when relevant ("first-of-its-kind", "before tooling existed").
- **Research credibility:** 2 peer-reviewed papers (NeurIPS + ACM/IEEE) — worth mentioning for research-adjacent or academic roles.
- **Graduation:** May 2026 M.S. — currently a student/research associate. For roles starting mid-2026 or later, frame as "graduating May 2026."
- **Target roles (based on resume variants):** Agentic AI engineer, ML infrastructure engineer, DevOps/platform engineer, research engineer, AI systems engineer.
- **Avoid:** Listing every technology in one sentence. Be selective based on the job. Use the skills section to tailor.