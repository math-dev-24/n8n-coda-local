# Coda n8n selfHosted Pack

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Coda](https://img.shields.io/badge/Coda-FF6B6B?style=flat&logo=coda&logoColor=white)](https://coda.io/)
[![n8n](https://img.shields.io/badge/n8n-FF6B6B?style=flat&logo=n8n&logoColor=white)](https://n8n.io/)

This Coda package lets you interact with your personal n8n instance to trigger workflows and manage resources via the n8n API.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

## ✨ Features

- 🔄 **Workflow Triggering** - Launch your n8n workflows directly from Coda
- 📊 **Resource Management** - Manage your workflows, users and tags
- 🔐 **Secure Authentication** - Using n8n API keys
- 🌐 **Multi-language Support** - Documentation in French and English
- ⚡ **Optimized Performance** - Optimized API requests

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)
- [Coda CLI](https://coda.io/developers/apis/v1)
- A self-hosted n8n instance with an API key

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/math-dev-24/n8n-coda-local.git
cd n8n-coda-local
```

### 2. Install the dependancy

```bash
# Avec pnpm (recommandé)
pnpm install

# Ou avec npm
npm install
```

### 4. Update config URL
in pack.ts, change network domain
```ts
9 -1   pack.addNetworkDomain("ExempleDomain.com");
9 +1   pack.addNetworkDomain("MyDomainN8N.com");

11 -1  const BASE_URL: string = "https://ExempleDomain.com";
11 +1  const BASE_URL: string = "https://MyDomainN8N.com";
```

### 3. Coda Authentication

```bash
# Avec pnpm
pnpm exec coda auth pack.ts

# Ou avec npm
npx coda auth pack.ts
```

### 4. Deploy the pack

```bash
# Avec pnpm
pnpm exec coda upload pack.ts

# Ou avec npm
npx coda upload pack.ts
```

## ⚙️ Configuration

### Authentication

The pack uses n8n API key authentication:

- **Type** : `CustomHeaderToken`
- **Header** : `X-N8N-API-KEY`
- **Domaine** : Your domain n8n (ex: `monDomain.fr`)


## 🤝 Contribuer

Contributions are welcome! Here's how to contribute:

1. Fork this project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`) 
5. Open a Pull Request


## 📝 Licence

This project is under MIT license. See the [LICENSE](LICENSE) file for more details.

## 🙏 Acknowledgments

- [Coda](https://coda.io/) for their platform
- [n8n](https://n8n.io/) for their excellent automation tool
- The open source community

## 📞 Support

If you encounter any problems or have questions:

- 📧 Create an [issue](https://github.com/math-dev-24/n8n-coda-local/issues)

---

**⭐ Don't forget to star the project if you like it!**
