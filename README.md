# DWE Creation - Next.js 15

Application Next.js 15 moderne avec App Router, créée avec les dernières technologies web.

## 🚀 Technologies

- **Next.js 15.1.8** - Framework React de dernière génération
- **React 19** - Bibliothèque UI avec Server Components
- **TypeScript** - Typage statique pour un code robuste
- **App Router** - Architecture de routage moderne
- **Server Components** - Rendu côté serveur par défaut

## 📋 Prérequis

- Node.js 18.17 ou supérieur
- npm, yarn, ou pnpm

## 🛠️ Installation

### 1. Installer les dépendances

Ouvrez PowerShell dans le dossier du projet et exécutez :

```powershell
npm install
```

Ou avec yarn :

```powershell
yarn install
```

Ou avec pnpm :

```powershell
pnpm install
```

### 2. Lancer le serveur de développement

```powershell
npm run dev
```

Ou avec yarn :

```powershell
yarn dev
```

Ou avec pnpm :

```powershell
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
DWE Creation/
├── app/                    # Dossier App Router
│   ├── about/             # Page "À propos"
│   │   └── page.tsx
│   ├── error.tsx          # Gestion des erreurs
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout racine
│   ├── loading.tsx        # État de chargement
│   ├── not-found.tsx      # Page 404
│   └── page.tsx           # Page d'accueil
├── public/                # Fichiers statiques
├── .eslintrc.json        # Configuration ESLint
├── .gitignore            # Fichiers à ignorer par Git
├── next.config.ts        # Configuration Next.js
├── package.json          # Dépendances du projet
├── README.md             # Documentation
└── tsconfig.json         # Configuration TypeScript
```

## ✨ Fonctionnalités

### App Router
- Routage basé sur le système de fichiers
- Layouts partagés entre les pages
- Streaming et Suspense pour un chargement progressif

### Server Components
- Rendu côté serveur par défaut
- Amélioration des performances
- Réduction de la taille du bundle JavaScript

### Gestion des erreurs
- Page d'erreur personnalisée (`error.tsx`)
- Page 404 personnalisée (`not-found.tsx`)
- État de chargement (`loading.tsx`)

## 🎨 Personnalisation

### Modifier les styles

Les styles globaux se trouvent dans `app/globals.css`. Vous pouvez modifier les variables CSS :

```css
:root {
  --primary-color: #0070f3;
  --text-color: #333;
  --background: #ffffff;
}
```

### Ajouter des pages

Pour créer une nouvelle page, créez un dossier dans `app/` avec un fichier `page.tsx` :

```powershell
New-Item -ItemType Directory -Path "app\nouvelle-page"
New-Item -ItemType File -Path "app\nouvelle-page\page.tsx"
```

## 🔧 Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm start` | Lance l'application en mode production |
| `npm run lint` | Vérifie le code avec ESLint |

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://react.dev)
- [Documentation TypeScript](https://www.typescriptlang.org/docs)
- [Context7 - Documentation libraries](https://context7.com)

## 🌐 Déploiement

### Vercel (Recommandé)

1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre dépôt Git
3. Vercel détectera automatiquement Next.js et configurera le build

### Build manuel

```powershell
npm run build
npm start
```

L'application sera disponible sur le port 3000.

## 🔍 Informations supplémentaires

### Pourquoi Next.js 15 ?

- **Performance améliorée** : Compilation plus rapide avec Turbopack
- **React 19** : Support des dernières fonctionnalités React
- **Server Components** : Rendu côté serveur optimisé
- **Meilleure DX** : Outils de développement améliorés

### À propos de Context7

Ce projet a été créé en utilisant la documentation officielle de Next.js récupérée via **Context7**, garantissant l'utilisation des meilleures pratiques et des patterns les plus récents de Next.js 15.

## 📝 Licence

Ce projet est libre d'utilisation pour vos besoins personnels ou commerciaux.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

Créé avec ❤️ en utilisant Next.js 15 et Context7

## Email transactionnel

Le formulaire de contact utilise Nodemailer (`app/api/contact/route.ts`) pour envoyer automatiquement :

1. Un email de confirmation au prospect (`to: data.email`).
2. Une copie cachee (BCC) vers votre equipe (`CONTACT_NOTIFICATION_EMAIL`).

### Configuration rapide (5 minutes)

1. **Copiez le fichier d'exemple**
   ```bash
   cp .env.example .env.local
   ```
2. **Renseignez vos identifiants SMTP** (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`). Utilisez un fournisseur dedie (SendGrid, Mailersend, Brevo, Postmark...).
3. **Choisissez l'adresse d'expedition** (`MAIL_FROM`). Elle doit etre autorisee par votre fournisseur SMTP (SPF/DKIM aligns).
4. **Indiquez l'adresse interne qui recevra chaque lead** (`CONTACT_NOTIFICATION_EMAIL`).
5. **Exposez vos infos publiques** (`NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_SITE_URL`, `BRAND_NAME`, `BRAND_LOGO_URL`). Elles alimentent automatiquement la navigation et les CTA (`data/site.ts`).

> Besoin d'un logo garanti même en preproduction ? Définissez `BRAND_LOGO_FILE` (ex: `dwe-logo.png`) pour embarquer automatiquement un fichier stocké dans `public/` sous forme de `data:` URI. L'email s'affichera alors même si votre CDN public n'est pas accessible.

#### Exemple rapide Gmail

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`
- `SMTP_USER=mon-adresse@gmail.com`
- `SMTP_PASSWORD="mot de passe d'application"` (les mots de passe classiques ne fonctionnent pas : créez un mot de passe d'application dans [accounts.google.com](https://myaccount.google.com/apppasswords)).

L'adresse `MAIL_FROM` peut reprendre votre compte Gmail : `"Mon Studio <mon-adresse@gmail.com>"`.

> 💡 Tant que les variables SMTP ne sont pas definies, l'API retourne `503 MAILER_NOT_CONFIGURED` en production et bascule sur un transport console en developpement.

### Logo garanti dans les emails

Les clients comme Gmail bloquent parfois les images distantes ou les `data:` URIs. Pour eviter toute surprise :

1. Ajoutez votre logo dans `public/` (ex. `public/dwe-logo.png`).
2. Renseignez `BRAND_LOGO_FILE=dwe-logo.png` dans `.env.local`.

L'API embarque alors automatiquement ce fichier comme piece jointe inline (CID), un pattern recommande par les templates Postmark/Context7. Votre logo s'affichera meme si le CDN n'est pas accessible ou si l'utilisateur bloque les images externes.

### Verification

```powershell
cd "c:\Users\user\Desktop\DWE Creation"
npm run dev
```

Puis envoyez une requete de test :

```powershell
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullname":"Test User","email":"user@example.com","project":"Migration de site","locale":"fr"}'
```

Vous devez recevoir `{ "ok": true }` ainsi que l'email prospect + la copie interne.
