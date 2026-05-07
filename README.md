# Explorateur de l'Espace 3D

Version française ci-dessous. English version follows.

## Français

Explorateur de l'Espace 3D est une petite expérience web éducative pour découvrir le système solaire. Le projet s'adresse aux élèves, aux enseignants, aux familles et aux personnes curieuses qui veulent manipuler une représentation simple en 3D.

La simulation est volontairement pédagogique : les tailles, distances et vitesses sont adaptées pour rendre les astres visibles et faciles à explorer. Elle n'est pas à l'échelle réelle.

### Démo

La démo publique est prévue sur GitHub Pages :

[https://huggyc.github.io/explorateur-espace-3d/](https://huggyc.github.io/explorateur-espace-3d/)

### Fonctionnalités

- Vue 3D interactive du Soleil, des 8 planètes et de la Lune.
- Navigation par souris : rotation, zoom et double-clic sur un astre.
- Boutons de destination pour rejoindre rapidement chaque astre.
- Fiches courtes avec type, diamètre, distance, période orbitale, description et fait marquant.
- Options pour afficher ou masquer les orbites, les noms, les fiches et l'animation.
- Interface bilingue français / anglais avec préférence conservée dans le navigateur.
- Site statique compatible avec GitHub Pages, sans étape de build.

### Utilisation

- Cliquer + glisser : tourner autour du système solaire.
- Molette : zoomer ou dézoomer.
- Double-clic sur un astre : centrer la caméra et ouvrir sa fiche.
- Boutons de destination : aller directement vers le Soleil, une planète ou la Lune.
- Boutons FR / EN : changer la langue de l'interface.

### Installation locale

Clonez le dépôt :

```bash
git clone https://github.com/HuggyC/explorateur-espace-3d.git
cd explorateur-espace-3d
```

Lancez un serveur local :

```bash
python3 -m http.server 8000
```

Ouvrez ensuite :

[http://localhost:8000](http://localhost:8000)

Le projet peut aussi être ouvert directement avec `index.html`, mais un serveur local reproduit mieux le comportement de GitHub Pages.

### Structure du projet

```text
explorateur-espace-3d/
├── index.html      # Structure HTML et chargement des CDN
├── css/
│   └── style.css   # Interface, panneaux, responsive et labels
├── js/
│   └── main.js     # Scène Three.js, données, animation et bilingue
├── LICENSE         # Licence MIT
└── README.md       # Documentation FR / EN
```

### Technologies

- HTML5
- CSS3
- JavaScript
- [Three.js](https://threejs.org/)
- OrbitControls de Three.js
- [Tween.js](https://github.com/tweenjs/tween.js/)

### Limites connues

- La simulation n'est pas à l'échelle réelle.
- Les trajectoires sont circulaires et simplifiées.
- Les textures réalistes ne sont pas incluses dans cette V1.
- Les données sont sélectionnées pour la découverte, pas pour un usage scientifique avancé.

### Idées d'évolution

- Parcours guidé pour une utilisation en classe.
- Mode quiz.
- Textures planétaires.
- Lunes supplémentaires.
- Mode plein écran.
- Meilleure accessibilité clavier.

### Contribution

Les contributions sont bienvenues si elles gardent l'objectif éducatif du projet : une expérience simple, claire et utile pour découvrir l'espace.

Pour proposer une amélioration :

1. Forker le dépôt.
2. Créer une branche dédiée.
3. Faire les changements.
4. Ouvrir une Pull Request avec une description claire.

### Licence

Ce projet est publié sous licence MIT. Voir le fichier [`LICENSE`](LICENSE).

---

## English

3D Space Explorer is a small educational web experience for discovering the Solar System. It is designed for students, teachers, families, and curious visitors who want to manipulate a simple 3D representation.

The simulation is intentionally educational: sizes, distances, and speeds are adapted to keep celestial bodies visible and easy to explore. It is not to real scale.

### Demo

The public demo is intended for GitHub Pages:

[https://huggyc.github.io/explorateur-espace-3d/](https://huggyc.github.io/explorateur-espace-3d/)

### Features

- Interactive 3D view of the Sun, the 8 planets, and the Moon.
- Mouse navigation: rotate, zoom, and double-click a body.
- Destination buttons to quickly travel to each body.
- Short information cards with type, diameter, distance, orbital period, description, and key fact.
- Options to show or hide orbits, names, information cards, and animation.
- French / English interface with browser-persisted language preference.
- Static GitHub Pages-ready site with no build step.

### Usage

- Click + drag: rotate around the Solar System.
- Mouse wheel: zoom in or out.
- Double-click a body: center the camera and open its card.
- Destination buttons: travel directly to the Sun, a planet, or the Moon.
- FR / EN buttons: switch the interface language.

### Local Setup

Clone the repository:

```bash
git clone https://github.com/HuggyC/explorateur-espace-3d.git
cd explorateur-espace-3d
```

Start a local server:

```bash
python3 -m http.server 8000
```

Then open:

[http://localhost:8000](http://localhost:8000)

The project can also be opened directly through `index.html`, but a local server better matches GitHub Pages behavior.

### Project Structure

```text
explorateur-espace-3d/
├── index.html      # HTML structure and CDN loading
├── css/
│   └── style.css   # UI, panels, responsive layout, and labels
├── js/
│   └── main.js     # Three.js scene, data, animation, and bilingual UI
├── LICENSE         # MIT license
└── README.md       # FR / EN documentation
```

### Technologies

- HTML5
- CSS3
- JavaScript
- [Three.js](https://threejs.org/)
- Three.js OrbitControls
- [Tween.js](https://github.com/tweenjs/tween.js/)

### Known Limits

- The simulation is not to real scale.
- Orbits are circular and simplified.
- Realistic planetary textures are not included in this V1.
- Data is selected for discovery, not advanced scientific use.

### Future Ideas

- Guided classroom path.
- Quiz mode.
- Planet textures.
- Additional moons.
- Full-screen mode.
- Better keyboard accessibility.

### Contributing

Contributions are welcome when they support the educational goal: a simple, clear, useful experience for discovering space.

To suggest an improvement:

1. Fork the repository.
2. Create a dedicated branch.
3. Make your changes.
4. Open a Pull Request with a clear description.

### License

This project is released under the MIT License. See [`LICENSE`](LICENSE).
