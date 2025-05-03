# Explorateur de l'Espace 3D 🚀

Un simulateur interactif du système solaire en 3D, créé avec Three.js, permettant aux utilisateurs d'explorer notre système solaire de manière immersive et éducative.

## 🌟 Fonctionnalités

- **Visualisation 3D complète** du système solaire avec toutes les planètes
- **Navigation interactive** avec contrôles de caméra pour explorer librement
- **Animations réalistes** des orbites planétaires
- **Interface utilisateur intuitive** avec panneaux d'information et de contrôle
- **Contrôles interactifs** pour afficher/masquer les orbites, étiquettes et informations
- **Conception responsive** pour une utilisation sur différents appareils
- **Design moderne et immersif** avec effets visuels attractifs

## 📋 Table des matières

- [Démo](#-démo)
- [Technologies utilisées](#-technologies-utilisées)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Personnalisation](#-personnalisation)
- [Fonctionnalités à venir](#-fonctionnalités-à-venir)
- [Contribution](#-contribution)
- [Licence](#-licence)

## 🌐 Démo

Une démo en ligne du projet est disponible à l'adresse suivante : [https://huggyc.github.io/explorateur-espace-3d/](https://huggyc.github.io/explorateur-espace-3d/)

## 💻 Technologies utilisées

- **HTML5** - Structure de base
- **CSS3** - Styles et animations
- **JavaScript** - Logique et interactivité
- **[Three.js](https://threejs.org/)** - Bibliothèque 3D WebGL
- **[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)** - Contrôles de caméra interactifs

## 🔧 Installation

### Option 1: Cloner le dépôt

```bash
# Cloner le dépôt
git clone https://github.com/HuggyC/explorateur-espace-3d.git

# Accéder au répertoire du projet
cd explorateur-espace-3d

# Ouvrir le fichier index.html dans votre navigateur ou utiliser un serveur local
```

### Option 2: Télécharger en tant qu'archive

1. Rendez-vous sur [https://github.com/HuggyC/explorateur-espace-3d](https://github.com/HuggyC/explorateur-espace-3d)
2. Cliquez sur le bouton "Code" puis "Download ZIP"
3. Extrayez l'archive téléchargée
4. Ouvrez le fichier `index.html` dans votre navigateur

### Serveur local (recommandé)

Pour un fonctionnement optimal, il est recommandé d'utiliser un serveur local. Vous pouvez utiliser l'une des méthodes suivantes :

```bash
# Avec Python 3
python -m http.server

# Avec Node.js (après avoir installé http-server)
npx http-server
```

## 🎮 Utilisation

### Contrôles de navigation

- **Cliquer + Glisser** : Faire tourner la vue
- **Molette de souris** : Zoom avant/arrière
- **Double-clic** sur un objet : Focaliser la caméra sur cet objet

### Interface utilisateur

- **Panneau d'accueil** : Introduction et présentation du simulateur
- **Panneau de contrôles** : Instructions sur l'utilisation des contrôles
- **Panneau de destination** : Boutons pour naviguer directement vers les planètes
- **Panneau d'options** : Activation/désactivation des fonctionnalités visuelles
- **Panneau d'informations** : Données sur les objets célestes sélectionnés
- **Navigation rapide** : Accès rapide à toutes les planètes depuis le côté droit

### Options configurables

- **Orbites** : Afficher/masquer les trajectoires orbitales des planètes
- **Noms** : Afficher/masquer les étiquettes des planètes
- **Infos** : Afficher/masquer le panneau d'informations détaillées
- **Animation** : Démarrer/arrêter le mouvement des planètes

## 📁 Structure du projet

```
explorateur-espace-3d/
├── index.html           # Page HTML principale
├── css/
│   └── style.css        # Styles CSS pour l'interface
├── js/
│   └── main.js          # Script JavaScript principal avec Three.js
├── assets/              # Ressources (textures, modèles, etc.)
│   ├── textures/        # Textures pour les planètes
│   └── models/          # Modèles 3D supplémentaires
├── screenshots/         # Captures d'écran pour la documentation
└── README.md            # Ce fichier de documentation
```

## 🎨 Personnalisation

### Modification des paramètres planétaires

Vous pouvez ajuster les tailles, distances et vitesses des planètes en modifiant les constantes dans le fichier `js/main.js` :

```javascript
// Paramètres des orbites
const EARTH_DISTANCE = 150;
const MARS_DISTANCE = 230;
const MOON_DISTANCE = 20;

// Vitesses de rotation
const EARTH_SPEED = 0.005;
const MARS_SPEED = 0.003;
const MOON_SPEED = 0.01;
const SUN_ROTATION = 0.001;
```

### Ajout de nouvelles planètes

Pour ajouter de nouvelles planètes ou objets célestes :

1. Ajoutez les éléments HTML correspondants dans `index.html`
2. Créez les styles CSS appropriés dans `css/style.css`
3. Implémentez la logique JavaScript dans `js/main.js`

Exemple d'ajout d'une nouvelle planète :

```javascript
// 1. Créer la géométrie et le matériau
const newPlanetGeometry = new THREE.SphereGeometry(5, 32, 32);
const newPlanetMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xaabbcc, 
    emissive: 0x112233, 
    specular: 0x445566,
    shininess: 20
});

// 2. Créer le mesh
newPlanetMesh = new THREE.Mesh(newPlanetGeometry, newPlanetMaterial);
scene.add(newPlanetMesh);

// 3. Ajouter les variables de position et vitesse
const NEW_PLANET_DISTANCE = 300;
const NEW_PLANET_SPEED = 0.002;
let newPlanetAngle = 0;

// 4. Mettre à jour la position dans la fonction updatePositions()
newPlanetMesh.position.x = Math.cos(newPlanetAngle) * NEW_PLANET_DISTANCE;
newPlanetMesh.position.z = Math.sin(newPlanetAngle) * NEW_PLANET_DISTANCE;

// 5. Mettre à jour l'angle dans la fonction animate()
newPlanetAngle += NEW_PLANET_SPEED;
```

### Personnalisation de l'interface

Les styles visuels peuvent être modifiés dans le fichier `css/style.css`. Vous pouvez ajuster :

- Les couleurs des planètes et orbites
- La taille et l'apparence des panneaux d'interface
- Les animations et transitions
- La réactivité pour différentes tailles d'écran

## 🚀 Fonctionnalités à venir

- Textures HD pour toutes les planètes
- Informations détaillées pour chaque planète
- Ajout des lunes pour toutes les planètes
- Modèle à l'échelle (option)
- Mode éducatif avec parcours guidé
- Support pour la réalité virtuelle
- Mode plein écran
- Fond étoilé amélioré avec constellations
- Sauvegarde de la position de la caméra

## 👥 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

---

Développé avec ❤️ par [HuggyC](https://github.com/HuggyC)
