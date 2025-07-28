# Coda n8n Pack

Ce pack Coda permet d'interagir avec votre instance n8n pour déclencher des workflows et gérer les ressources.

## Types de Requêtes

Le pack distingue deux types principaux de requêtes :

### 1. Workflows (triggerWorkflow)
- **Objectif** : Déclencher l'exécution d'un workflow n8n
- **URL** : `/webhook/{workflowId}` ou `/webhook-test/{workflowId}` (mode test)
- **Méthode** : POST (par défaut)
- **Caractéristiques** :
  - Peut inclure des données dans le body
  - Supporte les modes test et production
  - Utilise des webhooks n8n

### 2. Requêtes API Standard
- **Objectif** : Gérer les ressources n8n (utilisateurs, workflows, tags)
- **URL** : `/users`, `/workflows`, `/tags`, etc.
- **Méthodes** : GET, POST, PUT, DELETE
- **Caractéristiques** :
  - Supporte la pagination
  - Gestion des paramètres de requête
  - Opérations CRUD standard

## Fonctions Disponibles

### TriggerWorkflow
Déclenche un workflow n8n.

**Paramètres :**
- `baseUrl` : URL de votre instance n8n
- `workflowId` : ID du workflow à déclencher
- `method` : Méthode HTTP (optionnel, défaut: GET)
- `data` : Données JSON à envoyer (optionnel)
- `testMode` : Mode test ou production (optionnel, défaut: false)

**Exemple :**
```
TriggerWorkflow("https://your-n8n.com", "workflow-123", "POST", ["item1", "item2"], false)
```

### Users (Sync Table)
Récupère la liste des utilisateurs.

**Paramètres :**
- `baseUrl` : URL de votre instance n8n
- `limit` : Nombre d'utilisateurs à retourner (optionnel, défaut: 10)
- `includeRole` : Inclure les rôles (optionnel, défaut: false)
- `projectId` : ID du projet (optionnel)

### Workflows (Sync Table)
Récupère la liste des workflows.

**Paramètres :**
- `baseUrl` : URL de votre instance n8n

### generateJson
Génère un objet JSON à partir de listes de clés et valeurs.

**Paramètres :**
- `keys` : Liste des clés
- `values` : Liste des valeurs correspondantes

## Architecture des Services

### UrlService
Gère la construction des URLs et la logique de requête :
- `isWorkflowRoute()` : Détermine si c'est un workflow
- `executeRequest()` : Exécute une requête selon le type
- `executeRequestWithParams()` : Exécute une requête avec paramètres
- `getUrlWithWorkflowId()` : Construit l'URL pour les workflows

### N8nService
Service principal pour interagir avec n8n :
- `triggerWorkflow()` : Déclenche un workflow
- `getUsers()` : Récupère les utilisateurs
- `getWorkflows()` : Récupère les workflows
- `executeRequest()` : Méthode générique selon le type

### Utilitaires
Fonctions helper dans `utils/index.ts` :
- `getRequestType()` : Détermine le type de requête
- `isWorkflowRoute()` : Vérifie si c'est un workflow
- `requiresUrlParams()` : Vérifie si des paramètres d'URL sont nécessaires
- `requiresBody()` : Vérifie si un body est nécessaire

## Configuration

### Authentification
Le pack utilise l'authentification par header personnalisé :
- **Type** : CustomHeaderToken
- **Header** : `X-N8N-API-KEY`

### Domaines Réseau
- **Domaine** : `mathieu-busse.dev`

## Utilisation

1. **Déclencher un workflow** :
   - Utilisez la formule `TriggerWorkflow`
   - Spécifiez l'URL de base et l'ID du workflow
   - Ajoutez des données si nécessaire

2. **Gérer les utilisateurs** :
   - Utilisez la table de synchronisation `Users`
   - Configurez les paramètres de pagination et filtres

3. **Gérer les workflows** :
   - Utilisez la table de synchronisation `Workflows`
   - Consultez la liste des workflows disponibles

## Gestion des Erreurs

Le pack gère automatiquement :
- Les différences entre workflows et requêtes API
- La construction des URLs appropriées
- L'ajout des headers et body nécessaires
- Les modes test vs production pour les workflows

## Développement

Pour ajouter de nouveaux types de requêtes :
1. Ajoutez la configuration dans `const.ts`
2. Créez les types correspondants dans `types/`
3. Ajoutez les méthodes dans `N8nService`
4. Mettez à jour les utilitaires si nécessaire
