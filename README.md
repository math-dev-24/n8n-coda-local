# Coda n8n Pack

Ce pack Coda permet d'interagir avec votre instance n8n personnelle pour déclencher des workflows et gérer les ressources via l'API n8n.

## 🎯 Fonctionnement

Le pack distingue deux types d'interactions avec n8n :

### 1. Déclenchement de Workflows
- **Fonction** : `TriggerWorkflow` - Déclenche l'exécution d'un workflow n8n
- **Mécanisme** : Utilise les webhooks n8n (`/webhook/{workflowId}` ou `/webhook-test/{workflowId}`)
- **Méthodes** : POST (par défaut), GET, PUT, DELETE, PATCH, HEAD
- **Fonctionnalités** :
  - Envoi de données JSON au workflow
  - Mode test vs production
  - Support de toutes les méthodes HTTP

### 2. Gestion des Ressources
- **Tables de synchronisation** : Users, Workflows, Tags, Roles
- **Mécanisme** : Utilise l'API REST n8n standard
- **Opérations** : Lecture, création, modification, suppression
- **Fonctionnalités** :
  - Pagination automatique
  - Filtres et paramètres de requête
  - Gestion des cursors

## 📋 Routes Disponibles

### ✅ Implémentées

#### Workflows
- `GET /workflows` - Liste des workflows
- `GET /workflows/:id` - Détails d'un workflow
- `DELETE /workflows/:id` - Supprimer un workflow
- `POST /workflows/:id/activate` - Activer un workflow
- `POST /workflows/:id/deactivate` - Désactiver un workflow

#### Utilisateurs
- `GET /users` - Liste des utilisateurs
- `GET /users/:id` - Détails d'un utilisateur
- `POST /users` - Créer un utilisateur
- `PUT /users/:id` - Modifier un utilisateur

#### Tags
- `GET /tags` - Liste des tags

#### Rôles
- `GET /roles` - Liste des rôles

### ❌ Routes Manquantes

#### Workflows
- `POST /workflows` - Créer un workflow
- `PUT /workflows/:id` - Modifier un workflow
- `POST /workflows/:id/duplicate` - Dupliquer un workflow
- `GET /workflows/:id/executions` - Historique des exécutions
- `POST /workflows/:id/execute` - Exécuter un workflow manuellement

#### Utilisateurs
- `DELETE /users/:id` - Supprimer un utilisateur
- `POST /users/:id/reinvite` - Réinviter un utilisateur

#### Tags
- `POST /tags` - Créer un tag
- `PUT /tags/:id` - Modifier un tag
- `DELETE /tags/:id` - Supprimer un tag

#### Rôles
- `POST /roles` - Créer un rôle
- `PUT /roles/:id` - Modifier un rôle
- `DELETE /roles/:id` - Supprimer un rôle

#### Variables d'Environnement
- `GET /variables` - Liste des variables
- `POST /variables` - Créer une variable
- `PUT /variables/:id` - Modifier une variable
- `DELETE /variables/:id` - Supprimer une variable

#### Exécutions
- `GET /executions` - Liste des exécutions
- `GET /executions/:id` - Détails d'une exécution
- `DELETE /executions/:id` - Supprimer une exécution

## 🔧 Configuration

### Authentification
- **Type** : CustomHeaderToken
- **Header** : `X-N8N-API-KEY`
- **Domaine** : `mathieu-busse.dev`

### Utilisation

1. **Déclencher un workflow** :
   ```
   TriggerWorkflow("https://your-n8n.com", "workflow-123", "POST", ["data1", "data2"], false)
   ```

2. **Gérer les utilisateurs** :
   - Table de synchronisation `Users` avec pagination et filtres

3. **Gérer les workflows** :
   - Table de synchronisation `Workflows` pour consulter la liste

## 🏗️ Architecture

### Services
- **N8nService** : Service principal pour interagir avec n8n
- **UrlService** : Gestion des URLs et logique de requête
- **FetchService** : Gestion des requêtes HTTP

### Utilitaires
- **Type Detection** : Détection automatique du type de requête
- **URL Building** : Construction intelligente des URLs
- **Parameter Handling** : Gestion des paramètres et body

## 🚀 Développement

Pour ajouter de nouvelles routes :

1. **Configuration** : Ajouter dans `const.ts`
2. **Types** : Créer les types dans `types/`
3. **Service** : Implémenter dans `N8nService`
4. **Pack** : Ajouter la formule/table dans `pack.ts`

Le pack est conçu pour être extensible et facilement maintenable.
