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
- Textures photographiques réelles pour tous les astres : NASA « Blue Marble » pour la Terre, cartes Solar System Scope pour les autres planètes, le Soleil et l'anneau de Saturne.
- Textures procédurales générées par code servant d'affichage instantané pendant le chargement des photos.
- Anneaux détaillés pour Saturne (avec division de Cassini) et Uranus, halo solaire et ceinture d'astéroïdes.
- Navigation par souris : rotation, zoom, clic ou double-clic sur un astre, avec surbrillance au survol.
- Navigation clavier : flèches ← → pour passer d'un astre à l'autre, Échap pour revenir à la vue globale.
- Visite guidée automatique qui enchaîne les astres et ouvre leur fiche.
- Boutons de destination pour rejoindre rapidement chaque astre, avec indication de l'astre sélectionné.
- Fiches courtes avec type, diamètre, distance, période orbitale, description et fait marquant.
- Options pour afficher ou masquer les orbites, les noms, les fiches et l'animation, plus un réglage de la vitesse de simulation et un mode plein écran.
- Écran de chargement avec message d'erreur clair si le moteur 3D ne peut pas être chargé.
- Interface bilingue français / anglais avec préférence conservée dans le navigateur.
- Site statique compatible avec GitHub Pages, sans étape de build.

### Utilisation

- Cliquer + glisser : tourner autour du système solaire.
- Molette : zoomer ou dézoomer.
- Clic (ou double-clic) sur un astre : centrer la caméra et ouvrir sa fiche.
- Flèches ← → : passer à l'astre suivant ou précédent. Échap : vue globale.
- Boutons de destination : aller directement vers le Soleil, une planète ou la Lune.
- Bouton « Visite guidée » : enchaîner automatiquement la découverte de tous les astres.
- Curseur « Vitesse » : ralentir, accélérer ou mettre en pause la simulation.
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
├── assets/
│   └── textures/   # Cartes NASA (Terre, nuages)
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
- Les textures sont optimisées pour le web (résolution réduite) afin de garder le site léger.
- Les données sont sélectionnées pour la découverte, pas pour un usage scientifique avancé.

### Idées d'évolution

- Mode quiz.
- Lunes supplémentaires.
- Textures photographiques optionnelles.

### Contribution

Les contributions sont bienvenues si elles gardent l'objectif éducatif du projet : une expérience simple, claire et utile pour découvrir l'espace.

Pour proposer une amélioration :

1. Forker le dépôt.
2. Créer une branche dédiée.
3. Faire les changements.
4. Ouvrir une Pull Request avec une description claire.

### Crédits

**Textures**

- Terre : carte « Blue Marble » et couche de nuages, NASA (domaine public).
- Lune : NASA, via le dépôt [three.js](https://github.com/mrdoob/three.js).
- Soleil, planètes et anneau de Saturne : [Solar System Scope](https://www.solarsystemscope.com/textures/) (licence CC BY 4.0).

**Développement assisté par IA**

- Version originale (conservée sur la branche [`version-originale`](https://github.com/HuggyC/explorateur-espace-3d/tree/version-originale)) : développée avec OpenAI Codex.
- Version actuelle (visuels, mobile, fonctionnalités) : développée avec Claude Fable 5 (Anthropic).

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
- Real photographic textures for every body: NASA "Blue Marble" for Earth, Solar System Scope maps for the other planets, the Sun, and Saturn's ring.
- Code-generated procedural textures shown instantly while the photographic maps load.
- Detailed rings for Saturn (with the Cassini division) and Uranus, a solar glow, and an asteroid belt.
- Mouse navigation: rotate, zoom, click or double-click a body, with hover highlighting.
- Keyboard navigation: ← → arrow keys to move between bodies, Esc to return to the overview.
- Automatic guided tour that visits each body and opens its card.
- Destination buttons to quickly travel to each body, with the selected body highlighted.
- Short information cards with type, diameter, distance, orbital period, description, and key fact.
- Options to show or hide orbits, names, information cards, and animation, plus a simulation speed slider and a fullscreen mode.
- Loading screen with a clear error message if the 3D engine cannot be loaded.
- French / English interface with browser-persisted language preference.
- Static GitHub Pages-ready site with no build step.

### Usage

- Click + drag: rotate around the Solar System.
- Mouse wheel: zoom in or out.
- Click (or double-click) a body: center the camera and open its card.
- ← → arrow keys: move to the next or previous body. Esc: overview.
- Destination buttons: travel directly to the Sun, a planet, or the Moon.
- "Guided tour" button: automatically visit every body in sequence.
- "Speed" slider: slow down, speed up, or pause the simulation.
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
├── assets/
│   └── textures/   # NASA maps (Earth, clouds)
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
- Textures are optimized for the web (reduced resolution) to keep the site lightweight.
- Data is selected for discovery, not advanced scientific use.

### Future Ideas

- Quiz mode.
- Additional moons.
- Optional photographic textures.

### Contributing

Contributions are welcome when they support the educational goal: a simple, clear, useful experience for discovering space.

To suggest an improvement:

1. Fork the repository.
2. Create a dedicated branch.
3. Make your changes.
4. Open a Pull Request with a clear description.

### Credits

**Textures**

- Earth: "Blue Marble" map and cloud layer, NASA (public domain).
- Moon: NASA, via the [three.js](https://github.com/mrdoob/three.js) repository.
- Sun, planets, and Saturn's ring: [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0 license).

**AI-assisted development**

- Original version (preserved on the [`version-originale`](https://github.com/HuggyC/explorateur-espace-3d/tree/version-originale) branch): developed with OpenAI Codex.
- Current version (visuals, mobile, features): developed with Claude Fable 5 (Anthropic).

### License

This project is released under the MIT License. See [`LICENSE`](LICENSE).
