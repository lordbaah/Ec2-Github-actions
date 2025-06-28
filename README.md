# 🚀 Node.js Express App on AWS EC2 with GitHub Actions CI/CD

This is a simple Node.js + Express application that displays dynamic content and is deployed to an AWS EC2 instance using a GitHub Actions CI/CD pipeline.

---

## 📦 Features

- 🖥️ Express server serving dynamic routes
- ⚙️ Automated deployment to EC2 via GitHub Actions
- 🔐 Secure deployment using SSH keys
- ⚡ Live restart using PM2 on the EC2 instance
- 🌐 Accessible publicly via EC2's public IP

---

## 🧪 Local Development

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev
```

Then visit: http://localhost:3000

### Routes

| Route              | Description                            |
| ------------------ | -------------------------------------- |
| `/`                | Home route with server status and time |
| `/user/:name`      | Dynamic greeting using route params    |
| `/greet?name=Name` | Greeting using query string            |
| `/api/info`        | Returns server info as JSON            |

---

## 🚀 Deployment (CI/CD)

### Automated via GitHub Actions

1. Push to the `main` branch
2. GitHub Action triggers deployment:
   - Connects to EC2 via SSH
   - Uploads code
   - Installs dependencies
   - Restarts app using PM2

### Requirements

- AWS EC2 Ubuntu instance
- Node.js, npm, PM2 installed on EC2
- GitHub Secrets configured (see setup guide below)

---

## 📁 Project Structure

```
my-app/
├── index.js
├── package.json
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

---

## 🛠️ EC2 & GitHub Secrets Setup Guide

### 🖥️ Step 1: Configure EC2 Instance

1. **Launch EC2 Instance**

   - Launch a Ubuntu EC2 instance (e.g., Ubuntu 22.04)
   - Ensure ports 22 (SSH), 3000 (App), and optionally 80 (Web) are open in the security group

2. **SSH into the instance:**

   ```bash
   ssh -i your-key.pem ubuntu@<EC2-IP>
   ```

3. **Install dependencies:**
   ```bash
   sudo apt update && sudo apt install nodejs npm -y
   sudo npm install -g pm2
   ```

### 🔐 Step 2: Prepare SSH Access from GitHub Actions to EC2

1. **On your local machine, generate an SSH key:**

   ```bash
   ssh-keygen -t rsa -b 4096 -C "github-actions" -f github-actions-key
   ```

   This creates two files:

   - `github-actions-key` (private key)
   - `github-actions-key.pub` (public key)

2. **Add the public key to the EC2 instance**

   **Option A (recommended):**

   ```bash
   ssh-copy-id -i github-actions-key.pub ubuntu@<EC2-IP>
   ```

   **Option B (manual):**

   - View the public key:
     ```bash
     cat github-actions-key.pub
     ```
   - SSH into EC2:
     ```bash
     ssh -i your-key.pem ubuntu@<EC2-IP>
     ```
   - Add the key to `~/.ssh/authorized_keys`:
     ```bash
     echo "<paste your public key here>" >> ~/.ssh/authorized_keys
     ```

### 🔐 Step 3: Add GitHub Secrets

1. In your GitHub repository, go to: **Settings → Secrets and Variables → Actions**
2. Click **New repository secret**
3. Add the following secrets:

| Name          | Value                                          |
| ------------- | ---------------------------------------------- |
| `EC2_HOST`    | Your EC2 public IP (e.g., `3.123.45.67`)       |
| `EC2_USER`    | `ubuntu` (default for Ubuntu AMI)              |
| `EC2_SSH_KEY` | Contents of `github-actions-key` (private key) |

⚠️ **Important:** When adding `EC2_SSH_KEY`, copy and paste the entire private key content exactly as it appears in the file, including the header and footer lines (`-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`).

---

## 🛡️ Security Notes

- `node_modules` is excluded via `.gitignore`
- `.env` files should not be committed; consider using `dotenv` for environment variables
- Use Nginx and Let's Encrypt for production HTTPS
- Regularly rotate SSH keys
- Consider using IAM roles instead of SSH keys for enhanced security

---

## 🙌 Acknowledgments

- [Express](https://expressjs.com/)
- [GitHub Actions](https://github.com/features/actions)
- [PM2](https://pm2.keymetrics.io/)
- [AWS EC2](https://aws.amazon.com/ec2/)
