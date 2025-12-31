# ♾️ DevSecOps AWS Project

This project demonstrates a **production-like DevSecOps pipeline** built on AWS.
It covers infrastructure provisioning, containerized application deployment,
automated CI/CD, and security validation as part of the delivery process.

The same application is later used as a foundation for Kubernetes and Helm-based deployments.

---

## 🎯 Project Goals

- Provision cloud infrastructure using **Terraform**
- Run a containerized Node.js application on **AWS EC2**
- Implement **automated CI/CD** with GitHub Actions
- Integrate **security scanning** into the CI pipeline
- Perform **zero-touch deployments** using Docker Compose
- Verify deployments at the **application level**
- Prepare the project for a smooth transition to **Kubernetes**

---

## 🏗️ Architecture Overview
```
Developer
  └── git push (main)
        │
        ▼
GitHub Actions – CI
  - Checkout source code
  - Security scan (Trivy)
  - Fail on HIGH / CRITICAL vulnerabilities
        │
        ▼
GitHub Actions – CD
  - Authenticate using SSH deploy key
  - Sync application code via rsync
  - Build & restart containers using Docker Compose
        │
        ▼
AWS EC2 (Amazon Linux 2023)
  - Docker & Docker Compose
  - Node.js application container
  - Exposed via port 80
 ```
---

## 🧱 Infrastructure

- **Cloud Provider:** AWS
- **Provisioning Tool:** Terraform
- **Compute:** EC2 (Amazon Linux 2023)
- **Networking:** Public EC2 with restricted SSH access
- **Bootstrap:** EC2 `user_data`

### EC2 Bootstrap Responsibilities
During instance initialization:

- Docker is installed and enabled
- Docker Compose (v2) is installed
- `rsync` is installed for CD operations
- Application repository is cloned
- Containers are started automatically

---

## 🐳 Application

- **Runtime:** Node.js (Express)
- **Containerization:** Docker
- **Port:** `3000` (exposed as `80` via Docker Compose)

### Application Endpoints

####
`/` Returns basic runtime information:
```json
{
  "message": "DevSecOps AWS Project - Ben Swissa",
  "status": "OK",
  "host": "container-hostname",
  "time": "2025-12-31T18:30:00Z"
}
```

`/health`  Used for deployment verification and future Kubernetes probes:
```
{
  "status": "ok",
  "host": "container-hostname",
  "time": "2025-12-31T18:30:00Z",
  "build": "20251231-183000"
}
```

### 🔄 CI Pipeline


Triggered on every push to the main branch.

**CI Responsibilities:**

- Checkout repository
- Run security scans using Trivy
- Fail the pipeline on HIGH or CRITICAL vulnerabilities

*This ensures that insecure builds never reach production.*


### 🚀 CD Pipeline

Triggered automatically after a successful CI run.

**CD Responsibilities:**

- Setup SSH using a dedicated deploy key
- Synchronize application code using rsync
- Build and restart containers using Docker Compose
- Perform idempotent deployments (safe to re-run)


#### Deployment Verification

A unique BUILD_ID is generated during deployment and injected into the container.
The /health endpoint exposes this value to confirm successful updates.


---

### 🔐 Security Considerations

- No password-based SSH access
- Dedicated deploy user for CD
- SSH key-based authentication only
- Secrets stored securely in GitHub Actions
- Security scanning enforced in CI

---

### 🛠️ Technology Stack

- Terraform
- AWS EC2
- Docker & Docker Compose
- GitHub Actions
- Node.js (Express)
- Trivy (Security Scanning)
- rsync
- SSH (key-based authentication)

---


###  📌 Why This Project Matters

This project demonstrates:

- End-to-end CI/CD automation
- DevSecOps mindset (security as part of delivery)
- Infrastructure and application separation
- Production-ready deployment patterns
- Clear migration path to Kubernetes

---

### 🔮 Next Steps

- Deploy the same application on Kubernetes (local / cluster)
- Introduce Kubernetes Deployments and Services
- Add readiness and liveness probes
- Package manifests using Helm
- Replace SSH-based CD with image-based deployment

---

### 👤 Author

**Ben Swissa**
*Aspiring DevOps / DevSecOps Engineer*
