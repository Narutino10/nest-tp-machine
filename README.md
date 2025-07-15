# État d’avancement des fonctionnalités

| Fonctionnalité                                      | Statut     | Détail / Remarques |
|-----------------------------------------------------|------------|--------------------|
| Inscription utilisateur                             | ✅ Fait     | Email de validation envoyé via Maildev |
| Validation d’email                                 | ✅ Fait     | Code de validation reçu par email |
| Connexion (email + mot de passe)                    | ✅ Fait     |                    |
| Validation 2FA (code par email)                     | ✅ Fait     |                    |
| Gestion des rôles (user/admin)                      | ✅ Fait     | Decorator + Guard, endpoints prêts à protéger |
| CRUD Recettes (create/read/update/delete)           | ✅ Fait     | Contrôle d’accès propriétaire/admin |
| Protection des endpoints par rôle                    | 🟡 Partiel  | Guard prêt, à appliquer sur tous les endpoints |
| Documentation Swagger                               | ✅ Fait     | Accessible sur /api |
| Envoi d’emails (Maildev)                            | ✅ Fait     | nodemailer + Maildev |
| Persistance en base de données                      | ❌ À faire  | Actuellement en mémoire |
| Authentification JWT/session                        | ❌ À faire  | À implémenter |
| Expiration des codes de validation/2FA              | ❌ À faire  |                    |
| Gestion avancée des erreurs HTTP                    | 🟡 Partiel  | Peut être améliorée |
| Nettoyage complet des warnings TypeScript           | 🟡 Partiel  | Warnings nodemailer restants |

# NestJS TP – Gestion de Recettes avec Authentification, Validation Email, 2FA et Rôles

## Présentation du projet
Ce projet est une API REST développée avec [NestJS](https://nestjs.com/) et TypeScript, simulant une application de gestion de recettes avec un système d’authentification avancé. Il s’agit d’un TP (travail pratique) complet, intégrant :
- Inscription utilisateur avec validation d’email
- Authentification avec mot de passe et validation 2FA (code envoyé par email)
- Gestion des rôles (user/admin) et endpoints protégés
- Création, modification, suppression et consultation de recettes
- Documentation Swagger
- Envoi d’emails via Maildev pour le développement

## Fonctionnalités principales
- **Inscription** : Création d’un compte utilisateur, envoi d’un email de validation.
- **Validation d’email** : L’utilisateur valide son email via un lien/code reçu.
- **Connexion** : Authentification par email/mot de passe, puis validation 2FA (code reçu par email).
- **Gestion des rôles** : Accès restreint à certains endpoints selon le rôle (user/admin).
- **CRUD Recettes** : Création, lecture, mise à jour, suppression de recettes, avec contrôle d’accès (seul le propriétaire ou un admin peut modifier/supprimer).
- **Envoi d’emails** : Utilisation de nodemailer et Maildev pour simuler l’envoi d’emails en local.
- **Swagger** : Documentation interactive de l’API accessible via `/api`.

## Structure du projet
- `src/auth/` : Authentification, validation email, 2FA, gestion des rôles (decorator + guard)
- `src/users/` : Gestion des utilisateurs (in-memory)
- `src/recipes/` : Gestion des recettes (in-memory)
- `src/mail/` : Service d’envoi d’emails (nodemailer/Maildev)
- `src/main.ts` : Bootstrap, pipes globaux, Swagger
- `.env.example` : Variables d’environnement pour Maildev et la base de données (non utilisée ici)

## Stack technique
- **NestJS** (v11+)
- **TypeScript** (strict mode)
- **nodemailer** + **Maildev** (pour l’email local)
- **Swagger** (documentation API)
- **class-validator** (validation DTO)
- **In-memory storage** (pas de base de données pour ce TP)

## Ce qui a été fait
- Création des entités, DTOs et services pour utilisateurs et recettes
- Implémentation du flow d’inscription, validation email, connexion, 2FA
- Mise en place du service mail avec nodemailer et configuration Maildev
- Ajout de la gestion des rôles (decorator + guard)
- Protection des endpoints selon le rôle (prêt à être appliqué sur tous les endpoints)
- Documentation Swagger opérationnelle
- Correction des erreurs ESLint/TypeScript (async/await, typage, nodemailer)
- Code prêt à être testé en local (tout fonctionne en mémoire)

## Ce qu’il reste à faire / améliorations possibles
- Appliquer les guards de rôle sur tous les endpoints sensibles
- Persister les utilisateurs/recettes dans une vraie base de données (ex : PostgreSQL via Prisma)
- Implémenter JWT ou sessions pour la gestion d’authentification
- Gérer l’expiration des codes de validation/2FA
- Améliorer la gestion des erreurs et des statuts HTTP
- Nettoyer les derniers warnings TypeScript liés à nodemailer (optionnel)

## Lancer le projet
1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Lancer Maildev (pour voir les emails en local) :
   ```bash
   npx maildev
   ```
3. Copier `.env.example` en `.env` et adapter si besoin
4. Démarrer l’API :
   ```bash
   npm run start:dev
   ```
5. Accéder à la documentation Swagger : [http://localhost:3000/api](http://localhost:3000/api)
6. Accéder à l’interface Maildev : [http://localhost:1080](http://localhost:1080)

## Remarques
- Toute la logique est en mémoire (aucune donnée persistée après redémarrage)
- Les emails sont simulés via Maildev, aucune vraie adresse n’est utilisée
- Le code est prêt pour une extension vers une vraie base de données et une gestion JWT

---

**Auteur :** Ibrahim OUAHABI 5IW3

