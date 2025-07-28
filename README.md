# Coda n8n selfHosted Pack

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Coda](https://img.shields.io/badge/Coda-FF6B6B?style=flat&logo=coda&logoColor=white)](https://coda.io/)
[![n8n](https://img.shields.io/badge/n8n-FF6B6B?style=flat&logo=n8n&logoColor=white)](https://n8n.io/)

Ce pack Coda permet d'interagir avec votre instance n8n personnelle pour déclencher des workflows et gérer les ressources via l'API n8n.

This Coda package lets you interact with your personal n8n instance to trigger workflows and manage resources via the n8n API.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

## ✨ Fonctionnalités

- 🔄 **Déclenchement de workflows** - Lancez vos workflows n8n directement depuis Coda
- 📊 **Gestion des ressources** - Gérez vos workflows, utilisateurs et tags
- 🔐 **Authentification sécurisée** - Utilisation de clés API n8n
- 🌐 **Support multi-langue** - Documentation en français et anglais
- ⚡ **Performance optimisée** - Requêtes API optimisées

## 📋 Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [pnpm](https://pnpm.io/) ou [npm](https://www.npmjs.com/)
- [Coda CLI](https://coda.io/developers/apis/v1)
- Une instance n8n auto-hébergée avec une clé API

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/math-dev-24/n8n-coda-local.git
cd n8n-coda-local
```

### 2. Installer les dépendances

```bash
# Avec pnpm (recommandé)
pnpm install

# Ou avec npm
npm install
```

### 3. Authentification Coda

```bash
# Avec pnpm
pnpm exec coda auth pack.ts

# Ou avec npm
npx coda auth pack.ts
```

### 4. Déployer le pack

```bash
# Avec pnpm
pnpm exec coda upload pack.ts

# Ou avec npm
npx coda upload pack.ts
```

## ⚙️ Configuration

### Authentification

Le pack utilise l'authentification par clé API n8n :

- **Type** : `CustomHeaderToken`
- **Header** : `X-N8N-API-KEY`
- **Domaine** : Votre domaine n8n (ex: `monDomain.fr`)


## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Développement local

```bash
# Installer les dépendances de développement
pnpm install

# Lancer les tests
pnpm test

# Vérifier le linting
pnpm lint
```

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Coda](https://coda.io/) pour leur plateforme
- [n8n](https://n8n.io/) pour leur excellent outil d'automatisation
- La communauté open source

## 📞 Support

Si vous rencontrez des problèmes ou avez des questions :

- 📧 Créez une [issue](https://github.com/math-dev-24/n8n-coda-local/issues)

---

**⭐ N'oubliez pas de donner une étoile au projet si vous l'aimez !**
