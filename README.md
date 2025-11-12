# AstroVision AI

Une application web intelligente pour l'analyse automatique d'images astronomiques par intelligence artificielle.

## 📋 Description du Projet

AstroVision AI est une plateforme frontend conçue pour faciliter l'analyse automatique d'images astronomiques. Le système permet de détecter, reconnaître et classer différents types d'objets célestes (étoiles, galaxies, nébuleuses, quasars) en utilisant l'intelligence artificielle.

L'objectif est d'automatiser l'analyse d'énormes volumes de données visuelles issues de télescopes et missions spatiales, qui serait trop coûteuse en temps si effectuée manuellement.

## 🎯 Public Cible

- Étudiants en astronomie
- Chercheurs débutants
- Passionnés d'astronomie
- Communauté académique et éducative

## ✨ Fonctionnalités Principales

- **Upload d'images** : Interface drag-and-drop pour charger des images astronomiques
- **Analyse par IA** : Connexion à votre backend d'analyse par intelligence artificielle
- **Résultats détaillés** : Affichage du type d'objet, probabilité de classification, et caractéristiques visuelles
- **Galerie interactive** : Navigation dans les objets célestes détectés
- **Design cosmique** : Interface sombre thématique spatiale avec animations

## 🛠️ Technologies Utilisées

### Frontend
- **React 18.3.1** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Composants UI réutilisables
- **React Router DOM** - Navigation
- **Lucide React** - Icônes
- **TanStack Query** - Gestion d'état asynchrone
- **React Hook Form + Zod** - Gestion de formulaires et validation

### Styling & Design
- **Tailwind CSS** avec configuration personnalisée
- **CSS Variables** pour le système de design
- **Animations** personnalisées (shimmer, float, cosmic-glow)
- **Design System** thématique spatiale

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 16+ et npm (recommandé: [installer avec nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Cloner le repository
git clone <YOUR_GIT_URL>

# Naviguer dans le dossier
cd <YOUR_PROJECT_NAME>

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🔌 Connexion avec le Backend

### Architecture Backend

Le frontend est prêt à être connecté à votre backend d'analyse IA. Voici comment intégrer votre API :

### 1. Configuration de l'API

Créez un fichier de configuration pour votre API dans `src/lib/api.ts` :

```typescript
// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    analyze: '/api/analyze',
    results: '/api/results',
    objects: '/api/objects',
  }
};
```

### 2. Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://your-backend-url.com
VITE_API_KEY=your-api-key-if-needed
```

### 3. Endpoints Backend Requis

Votre backend doit exposer les endpoints suivants :

#### POST `/api/analyze`
Analyse une image astronomique

**Request:**
```typescript
{
  image: File | string (base64)
}
```

**Response:**
```typescript
{
  id: string,
  timestamp: string,
  objects: [
    {
      id: string,
      type: "star" | "galaxy" | "nebula" | "quasar",
      confidence: number, // 0-100
      coordinates: {
        x: number,
        y: number
      },
      characteristics: {
        brightness: number,
        size: number,
        color: string,
        // autres caractéristiques
      }
    }
  ],
  metadata: {
    imageSize: { width: number, height: number },
    processingTime: number
  }
}
```

#### GET `/api/results/:id`
Récupère les résultats d'une analyse

**Response:** Même structure que POST `/api/analyze`

#### GET `/api/objects`
Liste tous les objets détectés (pour la galerie)

**Query Parameters:**
- `type`: string (optionnel) - Filtrer par type d'objet
- `minConfidence`: number (optionnel) - Confiance minimale
- `page`: number (optionnel) - Pagination
- `limit`: number (optionnel) - Nombre de résultats

**Response:**
```typescript
{
  objects: Array<{
    id: string,
    type: string,
    confidence: number,
    imageUrl: string,
    detectedAt: string
  }>,
  pagination: {
    total: number,
    page: number,
    limit: number
  }
}
```

### 4. Intégration dans le Code

Modifiez les fichiers suivants pour connecter votre API :

#### `src/pages/Upload.tsx`
Remplacez la fonction de soumission mock par un vrai appel API :

```typescript
import { apiConfig } from '@/lib/api';

const handleSubmit = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.analyze}`, {
      method: 'POST',
      body: formData,
      headers: {
        // Ajoutez vos headers d'authentification si nécessaire
        // 'Authorization': `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();
    
    // Stocker les résultats et naviguer
    localStorage.setItem('analysisResults', JSON.stringify(data));
    navigate('/results');
  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    toast.error('Échec de l\'analyse de l\'image');
  }
};
```

#### `src/pages/Results.tsx`
Récupérez les vrais résultats depuis l'API :

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiConfig } from '@/lib/api';

const Results = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['results', analysisId],
    queryFn: async () => {
      const response = await fetch(
        `${apiConfig.baseUrl}${apiConfig.endpoints.results}/${analysisId}`
      );
      return response.json();
    }
  });

  // Utilisez les données réelles
};
```

#### `src/pages/Gallery.tsx`
Chargez les objets depuis votre API :

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiConfig } from '@/lib/api';

const Gallery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['objects', filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        type: filters.type,
        minConfidence: filters.confidence.toString(),
      });
      
      const response = await fetch(
        `${apiConfig.baseUrl}${apiConfig.endpoints.objects}?${params}`
      );
      return response.json();
    }
  });

  // Affichez les données réelles
};
```

### 5. Gestion des Erreurs

Implémentez une gestion d'erreurs robuste :

```typescript
// src/lib/api.ts
export const handleApiError = (error: any) => {
  if (error.response) {
    // Erreur de réponse du serveur
    console.error('API Error:', error.response.status, error.response.data);
    return error.response.data.message || 'Erreur serveur';
  } else if (error.request) {
    // Pas de réponse reçue
    console.error('Network Error:', error.request);
    return 'Erreur réseau - Vérifiez votre connexion';
  } else {
    // Autre erreur
    console.error('Error:', error.message);
    return 'Une erreur inattendue s\'est produite';
  }
};
```

### 6. CORS et Sécurité

Assurez-vous que votre backend autorise les requêtes depuis votre frontend :

```python
# Exemple avec Flask (Python)
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173', 'https://your-deployed-url.com'])
```

```javascript
// Exemple avec Express (Node.js)
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'https://your-deployed-url.com']
}));
```

## 📁 Structure du Projet

```
astrovision-ai/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── ui/             # Composants UI de base (shadcn)
│   │   ├── Header.tsx      # En-tête de navigation
│   │   ├── Hero.tsx        # Section hero de la page d'accueil
│   │   ├── Features.tsx    # Section fonctionnalités
│   │   └── UploadZone.tsx  # Zone de drag-and-drop
│   ├── pages/              # Pages de l'application
│   │   ├── Index.tsx       # Page d'accueil
│   │   ├── Upload.tsx      # Page d'upload
│   │   ├── Results.tsx     # Page de résultats
│   │   └── Gallery.tsx     # Galerie d'objets
│   ├── lib/                # Utilitaires et helpers
│   │   └── utils.ts        # Fonctions utilitaires
│   ├── hooks/              # Custom React hooks
│   ├── assets/             # Images et ressources statiques
│   ├── App.tsx             # Composant racine avec routing
│   ├── main.tsx            # Point d'entrée React
│   └── index.css           # Styles globaux et design system
├── public/                 # Fichiers statiques publics
├── index.html              # HTML principal
├── tailwind.config.ts      # Configuration Tailwind
├── vite.config.ts          # Configuration Vite
└── package.json            # Dépendances npm
```

## 🎨 Système de Design

### Couleurs (HSL)

Les couleurs sont définies dans `src/index.css` en utilisant des variables CSS :

```css
:root {
  --primary: 271 91% 65%;        /* Violet cosmique */
  --primary-glow: 280 100% 80%;  /* Éclat violet */
  --secondary: 200 100% 70%;     /* Cyan spatial */
  --accent: 340 82% 52%;         /* Rose nebuleuse */
  /* ... autres couleurs */
}
```

### Typographie

- **Font principale**: Système (sans-serif)
- **Tailles**: Définies via Tailwind (text-sm, text-base, text-lg, etc.)

### Composants UI

Tous les composants sont basés sur shadcn/ui et personnalisés avec le thème cosmique.

## 🧪 Tests

```bash
# Lancer les tests (à configurer)
npm run test

# Build de production
npm run build

# Preview du build
npm run preview
```

## 📦 Déploiement


1. Cliquez sur le bouton **Publish** (coin supérieur droit sur desktop)
2. Cliquez sur **Update** pour déployer les changements frontend

### Manuel

```bash
# Build de production
npm run build

# Le dossier dist/ contient les fichiers à déployer
# Déployez sur Netlify, Vercel, ou votre hébergeur préféré
```

## 🔐 Variables d'Environnement de Production

N'oubliez pas de configurer vos variables d'environnement en production :

- `VITE_API_URL`: URL de votre backend de production
- `VITE_API_KEY`: Clé API si nécessaire

## 🤝 Contribution

Ce projet est conçu pour un usage académique. Les contributions sont les bienvenues !

## 📚 Ressources Utiles

- [Documentation React](https://react.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)
- [Documentation shadcn/ui](https://ui.shadcn.com/)

## 📝 Licence

Ce projet est destiné à un usage éducatif et académique.

## 🌟 Crédits


---

**Note**: Ce frontend est prêt à être connecté à votre backend d'analyse IA. Suivez les instructions de la section "Connexion avec le Backend" pour l'intégration complète.