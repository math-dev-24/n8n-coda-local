# Coda n8n Pack

Ce pack Coda permet d'interagir avec votre instance n8n personnelle pour déclencher des workflows et gérer les ressources via l'API n8n.

## 🔧 Configuration

### Authentification
- **Type** : CustomHeaderToken
- **Header** : `X-N8N-API-KEY`
- **Domaine** : `mathieu-busse.dev`


## Installation

```bash

git clone https://github.com/math-dev-24/n8n-coda-local.git

cd n8n-coda-loca

pnpm install
// or
npm install

pnpm exec coda auth pack.ts
// or
npx coda auth pacK.ts


pnpm exec coda upload pack.ts
// or 
npx coda upload pack.ts

```