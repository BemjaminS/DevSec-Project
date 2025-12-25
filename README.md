# 📘 DevSecOps AWS Project

## Overview
This project demonstrates an end-to-end **DevSecOps CI pipeline** for a containerized Node.js application, with a strong emphasis on security-first practices, deterministic builds, and clear separation between CI, security, and deployment concerns.

The project reflects real-world engineering decisions and trade-offs, focusing on **robust CI and security validation first**, with CD planned as a follow-up stage.

---

## Architecture (High Level)

- Node.js application (Dockerized)
- Docker Compose for local development and CI orchestration
- GitHub Actions for CI
- Integrated security scanning (DevSecOps)
- AWS EC2 as the planned deployment target


``Developer → GitHub → CI (Build + Security) → [Planned] CD → EC2``

---

## Tech Stack

- **Language:** Node.js (JavaScript)
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions
- **Security (DevSecOps):**
  - Trivy – container and dependency vulnerability scanning
  - CodeQL – SAST (static application security testing)
- **Cloud (Planned):** AWS EC2

---

## CI Pipeline

The CI pipeline runs automatically on every push or pull request to the `main` branch.

### CI Stages

1. **Source Checkout**
   - Pulls the latest version of the repository

2. **Docker Compose Build**
   - Deterministic build using `npm ci`
   - Production-only dependencies
   - Docker build executed in a clean CI environment

3. **Supply Chain Security (Trivy)**
   - Scans OS packages and runtime libraries inside the Docker image
   - Pipeline fails on **HIGH / CRITICAL** vulnerabilities
   - False positives are explicitly documented and handled

4. **Static Code Analysis (CodeQL)**
   - SAST analysis of the application source code
   - Results are visible under GitHub → Security → Code scanning
   - Warnings are reviewed and documented

5. **Smoke Test**
   - Application container is started and stopped
   - Ensures runtime stability before any deployment

---

## Security Design Decisions

### Deterministic Builds
- `package-lock.json` is enforced
- `npm ci` is used instead of `npm install`
- Prevents dependency drift and ensures reproducible builds

### Container Hardening
- Application runs as a **non-root user**
- Minimal base image
- Production environment configuration (`NODE_ENV=production`)

### Vulnerability Management
- Trivy scans only **runtime-relevant vulnerabilities**
- CI is gated on HIGH / CRITICAL findings
- False positives are documented rather than ignored silently

### Static Application Security Testing
- CodeQL runs in a dedicated workflow
- No critical findings detected
- Warnings are treated as best-practice recommendations

---

## Current Status

- ✅ CI pipeline implemented and stable
- ✅ DevSecOps security checks fully integrated
- ✅ Supply-chain and code-level security validated
- 🟡 CD pipeline planned (see next section)

---

## Planned Improvements / Next Steps

The following enhancements are intentionally planned and documented, but not yet implemented:

- Automated **CD pipeline** to AWS EC2 using GitHub Actions and SSH
- Dedicated deployment user with least-privilege access
- Instance bootstrap automation (user-data or Terraform)
- Optional migration to managed container services (ECS)

These steps will be implemented in a future iteration.

---

## Why CD Was Deferred

The project prioritizes **quality, clarity, and correctness** over rushed implementation.
CI and security were completed end-to-end first, while CD is scheduled as a follow-up stage to maintain focus and system stability.

---

## Key Takeaways

- CI is fully automated and security-focused
- DevSecOps principles are applied from the first build stage
- The project reflects real-world engineering trade-offs and decision-making

---

## Author

**Ben Swissa**
Junior DevOps / DevSecOps Engineer
