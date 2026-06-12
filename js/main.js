const LANGUAGE_STORAGE_KEY = "spaceExplorer3d.language";
const SUPPORTED_LANGUAGES = ["fr", "en"];
const BODY_SEQUENCE = [
    "sun",
    "mercury",
    "venus",
    "earth",
    "moon",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune"
];
const GLOBAL_CAMERA_POSITION = { x: 0, y: 145, z: 310 };
const GLOBAL_TARGET_POSITION = { x: 0, y: 0, z: 0 };
const ALIGNMENT_ANGLE = 0;
const TOUR_STEP_DURATION = 8000;
const TAU = Math.PI * 2;

const UI_TEXT = {
    fr: {
        pageTitle: "Explorateur de l'Espace 3D",
        appTitle: "Explorateur de l'Espace 3D",
        appSubtitle: "Voyage dans le système solaire, simplement et en 3D.",
        welcomeTitle: "Bienvenue",
        welcomeText: "Explore les planètes, observe leurs orbites et ouvre les fiches pour découvrir les bases du système solaire.",
        controlsTitle: "Contrôles",
        controlRotate: "Cliquer + glisser : tourner autour du système",
        controlZoom: "Molette : zoomer ou dézoomer",
        controlFocus: "Clic sur un astre : rejoindre et ouvrir sa fiche",
        controlKeyboard: "Flèches ← → : astre suivant · Échap : vue globale",
        destinationTitle: "Destinations",
        optionsTitle: "Options",
        toggleOrbits: "Orbites",
        toggleLabels: "Noms",
        toggleInfo: "Infos",
        toggleAnimation: "Animation",
        toggleFullscreen: "Plein écran",
        speedLabel: "Vitesse",
        resetView: "Vue globale",
        alignBodies: "Aligner",
        tourStart: "Visite guidée",
        tourStop: "Arrêter la visite",
        navTour: "Visite",
        navTourStop: "Stop",
        infoTitle: "Informations",
        scaleNote: "Représentation pédagogique, non à l'échelle.",
        scaleHelpTrigger: "pourquoi",
        scaleHelpText: "en vraie échelle, le Soleil serait énorme, la Terre minuscule, et les distances seraient tellement grandes que la plupart des planètes seraient invisibles ou très difficiles à explorer dans une page web",
        closePanel: "Fermer",
        diameterLabel: "Diamètre",
        distanceLabel: "Distance",
        orbitLabel: "Orbite",
        funFactLabel: "À retenir",
        initialInfo: "Choisis une destination ou clique sur un astre pour afficher sa fiche.",
        languageLabel: "Langue",
        loadingText: "Chargement du système solaire…",
        loadErrorText: "Impossible de charger le moteur 3D. Vérifie ta connexion internet puis recharge la page."
    },
    en: {
        pageTitle: "3D Space Explorer",
        appTitle: "3D Space Explorer",
        appSubtitle: "Travel through the Solar System with a simple 3D view.",
        welcomeTitle: "Welcome",
        welcomeText: "Explore planets, watch their orbits, and open short cards to learn the basics of the Solar System.",
        controlsTitle: "Controls",
        controlRotate: "Click + drag: rotate around the system",
        controlZoom: "Mouse wheel: zoom in or out",
        controlFocus: "Click a body: travel to it and open its card",
        controlKeyboard: "Arrow keys ← →: next body · Esc: overview",
        destinationTitle: "Destinations",
        optionsTitle: "Options",
        toggleOrbits: "Orbits",
        toggleLabels: "Names",
        toggleInfo: "Info",
        toggleAnimation: "Animation",
        toggleFullscreen: "Fullscreen",
        speedLabel: "Speed",
        resetView: "Overview",
        alignBodies: "Align",
        tourStart: "Guided tour",
        tourStop: "Stop the tour",
        navTour: "Tour",
        navTourStop: "Stop",
        infoTitle: "Information",
        scaleNote: "Educational representation, not to scale.",
        scaleHelpTrigger: "why",
        scaleHelpText: "at true scale, the Sun would be enormous, Earth tiny, and the distances so large that most planets would be invisible or very difficult to explore on a web page",
        closePanel: "Close",
        diameterLabel: "Diameter",
        distanceLabel: "Distance",
        orbitLabel: "Orbit",
        funFactLabel: "Key fact",
        initialInfo: "Choose a destination or click a body to open its card.",
        languageLabel: "Language",
        loadingText: "Loading the Solar System…",
        loadErrorText: "Could not load the 3D engine. Check your internet connection and reload the page."
    }
};

const bodies = {
    sun: {
        symbol: "☉",
        color: 0xffc247,
        emissive: 0xff7b1a,
        visualSize: 18,
        orbitRadius: 0,
        rotationSpeed: 0.002,
        initialAngle: 0,
        tilt: 0,
        type: { fr: "Étoile", en: "Star" },
        name: { fr: "Soleil", en: "Sun" },
        diameter: { fr: "1 392 700 km", en: "1,392,700 km" },
        distance: { fr: "Centre du système solaire", en: "Center of the Solar System" },
        orbitPeriod: { fr: "La Terre tourne autour de lui en 365 jours", en: "Earth orbits it in 365 days" },
        description: {
            fr: "Le Soleil est l'étoile qui fournit lumière et chaleur aux planètes. Il contient presque toute la masse du système solaire.",
            en: "The Sun is the star that gives light and heat to the planets. It contains almost all the mass in the Solar System."
        },
        fact: {
            fr: "Sans le Soleil, il n'y aurait pas de saisons, pas de climat et pas de vie sur Terre.",
            en: "Without the Sun, Earth would have no seasons, no climate, and no life."
        }
    },
    mercury: {
        symbol: "☿",
        color: 0xb8b4aa,
        visualSize: 2.2,
        orbitRadius: 34,
        rotationSpeed: 0.004,
        orbitSpeed: 0.008,
        initialAngle: 0.4,
        tilt: 0.001,
        type: { fr: "Planète rocheuse", en: "Rocky planet" },
        name: { fr: "Mercure", en: "Mercury" },
        diameter: { fr: "4 879 km", en: "4,879 km" },
        distance: { fr: "57,9 millions de km du Soleil", en: "57.9 million km from the Sun" },
        orbitPeriod: { fr: "88 jours terrestres", en: "88 Earth days" },
        description: {
            fr: "Mercure est la planète la plus proche du Soleil. Sa surface est couverte de cratères et ses températures changent énormément.",
            en: "Mercury is the closest planet to the Sun. Its cratered surface faces extreme temperature changes."
        },
        fact: {
            fr: "Une année sur Mercure dure seulement 88 jours terrestres.",
            en: "One year on Mercury lasts only 88 Earth days."
        }
    },
    venus: {
        symbol: "♀",
        color: 0xd99b42,
        visualSize: 3.8,
        orbitRadius: 52,
        rotationSpeed: 0.0015,
        orbitSpeed: 0.006,
        initialAngle: 1.5,
        tilt: 0.05,
        hasAtmosphere: { color: 0xe8c87a, opacity: 0.14 },
        type: { fr: "Planète rocheuse", en: "Rocky planet" },
        name: { fr: "Vénus", en: "Venus" },
        diameter: { fr: "12 104 km", en: "12,104 km" },
        distance: { fr: "108,2 millions de km du Soleil", en: "108.2 million km from the Sun" },
        orbitPeriod: { fr: "225 jours terrestres", en: "225 Earth days" },
        description: {
            fr: "Vénus a presque la taille de la Terre, mais son atmosphère très dense retient fortement la chaleur.",
            en: "Venus is nearly Earth's size, but its very dense atmosphere traps heat intensely."
        },
        fact: {
            fr: "Vénus est la planète la plus chaude du système solaire.",
            en: "Venus is the hottest planet in the Solar System."
        }
    },
    earth: {
        symbol: "♁",
        color: 0x2f8cff,
        visualSize: 4.2,
        orbitRadius: 72,
        rotationSpeed: 0.01,
        orbitSpeed: 0.005,
        initialAngle: 2.6,
        tilt: 0.41,
        hasClouds: true,
        hasAtmosphere: { color: 0x4a9cff, opacity: 0.18 },
        type: { fr: "Planète rocheuse", en: "Rocky planet" },
        name: { fr: "Terre", en: "Earth" },
        diameter: { fr: "12 742 km", en: "12,742 km" },
        distance: { fr: "149,6 millions de km du Soleil", en: "149.6 million km from the Sun" },
        orbitPeriod: { fr: "365,25 jours", en: "365.25 days" },
        description: {
            fr: "La Terre est notre planète. Elle possède de l'eau liquide, une atmosphère protectrice et une grande diversité de vie.",
            en: "Earth is our home planet. It has liquid water, a protective atmosphere, and a huge diversity of life."
        },
        fact: {
            fr: "La Terre est la seule planète connue où la vie existe.",
            en: "Earth is the only known planet where life exists."
        }
    },
    moon: {
        symbol: "☾",
        parent: "earth",
        color: 0xd8d8d8,
        visualSize: 1.2,
        orbitRadius: 8,
        rotationSpeed: 0.008,
        orbitSpeed: 0.034,
        initialAngle: 1,
        tilt: 0.03,
        type: { fr: "Satellite naturel", en: "Natural satellite" },
        name: { fr: "Lune", en: "Moon" },
        diameter: { fr: "3 474 km", en: "3,474 km" },
        distance: { fr: "384 400 km de la Terre", en: "384,400 km from Earth" },
        orbitPeriod: { fr: "27,3 jours autour de la Terre", en: "27.3 days around Earth" },
        description: {
            fr: "La Lune est le satellite naturel de la Terre. Elle influence les marées et reste l'astre le plus proche de nous.",
            en: "The Moon is Earth's natural satellite. It influences tides and remains the closest world to us."
        },
        fact: {
            fr: "On voit toujours presque la même face de la Lune depuis la Terre.",
            en: "From Earth, we almost always see the same side of the Moon."
        }
    },
    mars: {
        symbol: "♂",
        color: 0xd75a31,
        visualSize: 3.1,
        orbitRadius: 92,
        rotationSpeed: 0.009,
        orbitSpeed: 0.004,
        initialAngle: 3.7,
        tilt: 0.44,
        type: { fr: "Planète rocheuse", en: "Rocky planet" },
        name: { fr: "Mars", en: "Mars" },
        diameter: { fr: "6 779 km", en: "6,779 km" },
        distance: { fr: "227,9 millions de km du Soleil", en: "227.9 million km from the Sun" },
        orbitPeriod: { fr: "687 jours terrestres", en: "687 Earth days" },
        description: {
            fr: "Mars est surnommée la planète rouge à cause de la poussière riche en oxyde de fer qui couvre son sol.",
            en: "Mars is called the Red Planet because iron-rich dust covers its surface."
        },
        fact: {
            fr: "Mars possède Olympus Mons, le plus grand volcan connu du système solaire.",
            en: "Mars has Olympus Mons, the largest known volcano in the Solar System."
        }
    },
    jupiter: {
        symbol: "♃",
        color: 0xd9ad79,
        visualSize: 10,
        orbitRadius: 126,
        rotationSpeed: 0.018,
        orbitSpeed: 0.002,
        initialAngle: 4.6,
        tilt: 0.055,
        type: { fr: "Géante gazeuse", en: "Gas giant" },
        name: { fr: "Jupiter", en: "Jupiter" },
        diameter: { fr: "139 820 km", en: "139,820 km" },
        distance: { fr: "778,5 millions de km du Soleil", en: "778.5 million km from the Sun" },
        orbitPeriod: { fr: "11,9 années terrestres", en: "11.9 Earth years" },
        description: {
            fr: "Jupiter est la plus grande planète du système solaire. C'est une géante gazeuse entourée de nombreuses lunes.",
            en: "Jupiter is the largest planet in the Solar System. It is a gas giant surrounded by many moons."
        },
        fact: {
            fr: "Sa Grande Tache rouge est une tempête observée depuis plusieurs siècles.",
            en: "Its Great Red Spot is a storm that has been observed for centuries."
        }
    },
    saturn: {
        symbol: "♄",
        color: 0xe3d18a,
        visualSize: 8.5,
        orbitRadius: 164,
        rotationSpeed: 0.017,
        orbitSpeed: 0.0014,
        initialAngle: 5.4,
        tilt: 0.47,
        rings: { inner: 1.45, outer: 2.4, style: "saturn" },
        type: { fr: "Géante gazeuse", en: "Gas giant" },
        name: { fr: "Saturne", en: "Saturn" },
        diameter: { fr: "116 460 km", en: "116,460 km" },
        distance: { fr: "1,43 milliard de km du Soleil", en: "1.43 billion km from the Sun" },
        orbitPeriod: { fr: "29,5 années terrestres", en: "29.5 Earth years" },
        description: {
            fr: "Saturne est célèbre pour ses anneaux spectaculaires composés de glace, de poussière et de roches.",
            en: "Saturn is famous for its spectacular rings made of ice, dust, and rock."
        },
        fact: {
            fr: "Saturne est si peu dense qu'elle flotterait dans un océan assez grand.",
            en: "Saturn is so low-density that it would float in a large enough ocean."
        }
    },
    uranus: {
        symbol: "♅",
        color: 0x80d8e4,
        visualSize: 6.2,
        orbitRadius: 202,
        rotationSpeed: 0.012,
        orbitSpeed: 0.0009,
        initialAngle: 0.9,
        tilt: 1.71,
        rings: { inner: 1.65, outer: 1.92, style: "uranus" },
        type: { fr: "Géante glacée", en: "Ice giant" },
        name: { fr: "Uranus", en: "Uranus" },
        diameter: { fr: "50 724 km", en: "50,724 km" },
        distance: { fr: "2,87 milliards de km du Soleil", en: "2.87 billion km from the Sun" },
        orbitPeriod: { fr: "84 années terrestres", en: "84 Earth years" },
        description: {
            fr: "Uranus est une géante glacée bleutée. Son axe de rotation est tellement incliné qu'elle semble rouler sur son orbite.",
            en: "Uranus is a blue ice giant. Its rotation axis is so tilted that it seems to roll along its orbit."
        },
        fact: {
            fr: "Une saison sur Uranus peut durer plus de 20 ans.",
            en: "One season on Uranus can last more than 20 years."
        }
    },
    neptune: {
        symbol: "♆",
        color: 0x3f62ff,
        visualSize: 6.1,
        orbitRadius: 238,
        rotationSpeed: 0.012,
        orbitSpeed: 0.0007,
        initialAngle: 2.1,
        tilt: 0.49,
        type: { fr: "Géante glacée", en: "Ice giant" },
        name: { fr: "Neptune", en: "Neptune" },
        diameter: { fr: "49 244 km", en: "49,244 km" },
        distance: { fr: "4,5 milliards de km du Soleil", en: "4.5 billion km from the Sun" },
        orbitPeriod: { fr: "164,8 années terrestres", en: "164.8 Earth years" },
        description: {
            fr: "Neptune est la planète la plus éloignée du Soleil. Ses vents peuvent être parmi les plus rapides du système solaire.",
            en: "Neptune is the farthest planet from the Sun. Its winds can be among the fastest in the Solar System."
        },
        fact: {
            fr: "Depuis sa découverte en 1846, Neptune n'a terminé qu'une seule orbite complète autour du Soleil.",
            en: "Since its discovery in 1846, Neptune has completed only one full orbit around the Sun."
        }
    }
};

let scene;
let camera;
let renderer;
let controls;
let clock;
let raycaster;
let pointer;
let sceneRoot;
let labelsLayer;
let currentTween;
let currentLanguage = getInitialLanguage();
let animationActive = true;
let simulationSpeed = 1;
let showOrbits = true;
let showLabels = true;
let infoVisible = false;
let selectedBodyId = null;
let followedBodyId = null;
let pendingFollowBodyId = null;
let followedBodyLastPosition;
let hoveredBodyId = null;
let tourActive = false;
let tourTimer = null;
let tourIndex = -1;
let tourButton = null;
let asteroidBelt = null;
let pointerDownX = 0;
let pointerDownY = 0;

const bodyObjects = {};
const orbitObjects = [];
const selectableMeshes = [];

function getInitialLanguage() {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : "fr";
}

/* ------------------------------------------------------------------ */
/* Procedural textures                                                 */
/* ------------------------------------------------------------------ */

function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function createCanvasTexture(width, height, painter) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    painter(canvas.getContext("2d"), width, height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    if (renderer) {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }
    return texture;
}

function fillCircleWrapped(ctx, width, x, y, radius) {
    [x - width, x, x + width].forEach((cx) => {
        ctx.beginPath();
        ctx.arc(cx, y, radius, 0, TAU);
        ctx.fill();
    });
}

function paintSpeckles(ctx, rng, width, height, count, colors, minRadius, maxRadius, alpha) {
    for (let i = 0; i < count; i += 1) {
        ctx.fillStyle = colors[(rng() * colors.length) | 0];
        ctx.globalAlpha = alpha * (0.4 + rng() * 0.6);
        fillCircleWrapped(ctx, width, rng() * width, rng() * height, minRadius + rng() * (maxRadius - minRadius));
    }
    ctx.globalAlpha = 1;
}

function paintRocky(ctx, rng, width, height, base, shades, craterCount) {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 26; i += 1) {
        ctx.fillStyle = shades[i % shades.length];
        ctx.globalAlpha = 0.07 + rng() * 0.1;
        fillCircleWrapped(ctx, width, rng() * width, rng() * height, height * (0.1 + rng() * 0.22));
    }
    ctx.globalAlpha = 1;

    paintCraters(ctx, rng, width, height, craterCount);
}

function paintCraters(ctx, rng, width, height, count) {
    for (let i = 0; i < count; i += 1) {
        const x = rng() * width;
        const y = rng() * height;
        const radius = 1.5 + rng() * 5;

        ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
        fillCircleWrapped(ctx, width, x, y, radius);
        ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
        fillCircleWrapped(ctx, width, x - radius * 0.3, y - radius * 0.3, radius * 0.55);
    }
}

function paintGradient(ctx, width, height, stops) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    stops.forEach(([position, color]) => gradient.addColorStop(position, color));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function paintWavyRibbons(ctx, rng, width, height, colors, ribbonCount, maxAmplitude) {
    for (let i = 0; i < ribbonCount; i += 1) {
        const yCenter = ((i + 0.5) / ribbonCount + (rng() - 0.5) * 0.06) * height;
        const thickness = (height / ribbonCount) * (0.45 + rng() * 0.75);
        const amplitude = maxAmplitude * (0.4 + rng() * 0.6);
        // An integer frequency keeps the left/right texture seam invisible.
        const frequency = 1 + Math.floor(rng() * 4);
        const phase = rng() * TAU;
        const edgeY = (x) => yCenter + Math.sin((x / width) * frequency * TAU + phase) * amplitude;

        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = 0.14 + rng() * 0.16;
        ctx.beginPath();
        ctx.moveTo(0, edgeY(0) - thickness / 2);
        for (let x = 8; x <= width; x += 8) {
            ctx.lineTo(x, edgeY(x) - thickness / 2);
        }
        for (let x = width; x >= 0; x -= 8) {
            ctx.lineTo(x, edgeY(x) + thickness / 2);
        }
        ctx.closePath();
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function paintPolarCaps(ctx, width, height, strength) {
    const capHeight = height * 0.08;

    const top = ctx.createLinearGradient(0, 0, 0, capHeight);
    top.addColorStop(0, `rgba(255, 255, 255, ${strength})`);
    top.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = top;
    ctx.fillRect(0, 0, width, capHeight);

    const bottom = ctx.createLinearGradient(0, height - capHeight, 0, height);
    bottom.addColorStop(0, "rgba(255, 255, 255, 0)");
    bottom.addColorStop(1, `rgba(255, 255, 255, ${strength})`);
    ctx.fillStyle = bottom;
    ctx.fillRect(0, height - capHeight, width, capHeight);
}

// Real photographic maps (NASA Blue Marble, public domain). They are
// loaded asynchronously and replace the procedural texture once ready,
// so the scene never waits on them.
const REAL_TEXTURES = {
    earth: { map: "assets/textures/earth-day.jpg", clouds: "assets/textures/earth-clouds.png" }
};

function upgradeToRealTexture(material, path) {
    new THREE.TextureLoader().load(path, (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        if (renderer) {
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        }
        material.map = texture;
        material.needsUpdate = true;
    });
}

const TEXTURE_BUILDERS = {
    sun: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(7);
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, "#ffdf8e");
        gradient.addColorStop(0.5, "#ffb845");
        gradient.addColorStop(1, "#ff9a35");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        paintSpeckles(ctx, rng, w, h, 1600, ["#ffe9a8", "#ffce63", "#ff8a2a", "#fff3c2"], 1, 4, 0.16);
        paintSpeckles(ctx, rng, w, h, 26, ["#d96a1d", "#c2581a"], 3, 8, 0.22);
    }),
    mercury: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        paintRocky(ctx, mulberry32(11), w, h, "#9c968c", ["#7d776d", "#b5afa3", "#6d675e"], 230);
    }),
    venus: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(23);
        paintGradient(ctx, w, h, [
            [0, "#caa05c"], [0.25, "#e3bd7d"], [0.5, "#d8ae67"], [0.75, "#e8c98e"], [1, "#c89a55"]
        ]);
        paintWavyRibbons(ctx, rng, w, h, ["#f2d9a4", "#b8853f", "#e8c98e"], 10, 14);
    }),
    earth: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(42);
        const ocean = ctx.createLinearGradient(0, 0, 0, h);
        ocean.addColorStop(0, "#2d6fc4");
        ocean.addColorStop(0.5, "#1c4f9e");
        ocean.addColorStop(1, "#2d6fc4");
        ctx.fillStyle = ocean;
        ctx.fillRect(0, 0, w, h);

        const landColors = ["#3e8a45", "#4f9a4d", "#7d9c4a", "#b3a05e", "#356f3a"];
        for (let cluster = 0; cluster < 7; cluster += 1) {
            const cx = rng() * w;
            const cy = h * (0.18 + rng() * 0.64);
            for (let blob = 0; blob < 26; blob += 1) {
                ctx.fillStyle = landColors[(rng() * landColors.length) | 0];
                ctx.globalAlpha = 0.88;
                fillCircleWrapped(
                    ctx,
                    w,
                    cx + (rng() - 0.5) * w * 0.16,
                    cy + (rng() - 0.5) * h * 0.3,
                    3 + rng() * 15
                );
            }
        }
        ctx.globalAlpha = 1;

        paintSpeckles(ctx, rng, w, h, 200, ["#3c7fd4", "#16407f"], 2, 8, 0.12);
        paintPolarCaps(ctx, w, h, 0.92);
    }),
    moon: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(31);
        ctx.fillStyle = "#c4c2bd";
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < 20; i += 1) {
            ctx.fillStyle = i % 2 ? "#d6d4cf" : "#aeacaa";
            ctx.globalAlpha = 0.08 + rng() * 0.08;
            fillCircleWrapped(ctx, w, rng() * w, rng() * h, h * (0.1 + rng() * 0.2));
        }

        // Lunar maria: large dark basalt patches clustered on one face.
        const mariaColors = ["#76757d", "#828089", "#6d6c74"];
        for (let m = 0; m < 6; m += 1) {
            const cx = w * (0.15 + rng() * 0.35);
            const cy = h * (0.22 + rng() * 0.42);
            ctx.fillStyle = mariaColors[m % mariaColors.length];
            ctx.globalAlpha = 0.5;
            for (let b = 0; b < 16; b += 1) {
                fillCircleWrapped(ctx, w, cx + (rng() - 0.5) * w * 0.1, cy + (rng() - 0.5) * h * 0.2, 5 + rng() * 13);
            }
        }
        ctx.globalAlpha = 1;

        paintCraters(ctx, rng, w, h, 250);
    }),
    mars: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(53);
        paintGradient(ctx, w, h, [
            [0, "#d2825a"], [0.35, "#c1542f"], [0.7, "#9c4526"], [1, "#b35530"]
        ]);

        // Dark volcanic regions such as Syrtis Major.
        const darkShades = ["#5e3320", "#74402a", "#834a2e"];
        for (let i = 0; i < 9; i += 1) {
            const cx = rng() * w;
            const cy = h * (0.25 + rng() * 0.5);
            ctx.fillStyle = darkShades[i % darkShades.length];
            ctx.globalAlpha = 0.2 + rng() * 0.16;
            for (let b = 0; b < 14; b += 1) {
                fillCircleWrapped(ctx, w, cx + (rng() - 0.5) * w * 0.12, cy + (rng() - 0.5) * h * 0.16, 4 + rng() * 14);
            }
        }
        ctx.globalAlpha = 1;

        paintSpeckles(ctx, rng, w, h, 120, ["#dd8f60", "#c96a3c"], 3, 10, 0.12);
        paintCraters(ctx, rng, w, h, 70);
        paintPolarCaps(ctx, w, h, 0.85);
    }),
    jupiter: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(67);
        paintGradient(ctx, w, h, [
            [0, "#c8a47b"], [0.12, "#e8d9b8"], [0.24, "#b3805a"], [0.34, "#e6d3ae"],
            [0.45, "#a9744e"], [0.55, "#ead9b9"], [0.64, "#bd8a5e"], [0.76, "#ddc9a4"],
            [0.88, "#b78b62"], [1, "#cba87f"]
        ]);
        paintWavyRibbons(ctx, rng, w, h, ["#8a5a3a", "#f4ead2", "#9c6b45", "#e8d9b8"], 14, 7);

        // Great Red Spot with a soft pale collar.
        const spot = ctx.createRadialGradient(w * 0.3, h * 0.63, 2, w * 0.3, h * 0.63, w * 0.06);
        spot.addColorStop(0, "rgba(205, 92, 58, 0.95)");
        spot.addColorStop(0.55, "rgba(186, 74, 44, 0.8)");
        spot.addColorStop(0.8, "rgba(226, 202, 162, 0.45)");
        spot.addColorStop(1, "rgba(226, 202, 162, 0)");
        ctx.fillStyle = spot;
        ctx.beginPath();
        ctx.ellipse(w * 0.3, h * 0.63, w * 0.07, h * 0.075, 0, 0, TAU);
        ctx.fill();
    }),
    saturn: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(71);
        paintGradient(ctx, w, h, [
            [0, "#b89c6a"], [0.2, "#e4d4a4"], [0.4, "#d2bc88"], [0.55, "#ecdfb8"],
            [0.7, "#d7c190"], [0.85, "#c4ab79"], [1, "#ab915f"]
        ]);
        paintWavyRibbons(ctx, rng, w, h, ["#f4ead0", "#b09056", "#e0d0a0"], 12, 4);
    }),
    uranus: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(83);
        paintGradient(ctx, w, h, [
            [0, "#7fc7d6"], [0.4, "#9fe0ea"], [0.6, "#92dae5"], [1, "#6fbccb"]
        ]);
        paintWavyRibbons(ctx, rng, w, h, ["#b8ecf3", "#7cc8d6"], 6, 5);
    }),
    neptune: () => createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(97);
        paintGradient(ctx, w, h, [
            [0, "#2b46a8"], [0.3, "#4a73e8"], [0.55, "#3a5fd0"], [0.8, "#4e76e3"], [1, "#2c49b0"]
        ]);
        paintWavyRibbons(ctx, rng, w, h, ["#6f93f2", "#2843a0", "#9db8f8"], 8, 8);

        // Bright methane cloud wisps.
        ctx.fillStyle = "#dde7ff";
        for (let i = 0; i < 14; i += 1) {
            ctx.globalAlpha = 0.14 + rng() * 0.18;
            ctx.fillRect(rng() * w, rng() * h, 20 + rng() * 60, 1 + rng() * 2);
        }
        ctx.globalAlpha = 1;

        ctx.fillStyle = "rgba(22, 42, 110, 0.85)";
        ctx.beginPath();
        ctx.ellipse(w * 0.62, h * 0.42, w * 0.05, h * 0.05, 0, 0, TAU);
        ctx.fill();
    })
};

function createCloudsTexture() {
    return createCanvasTexture(512, 256, (ctx, w, h) => {
        const rng = mulberry32(8);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#ffffff";
        for (let i = 0; i < 85; i += 1) {
            ctx.globalAlpha = 0.1 + rng() * 0.26;
            const x = rng() * w;
            const y = h * (0.1 + rng() * 0.8);
            const radiusX = 8 + rng() * 38;
            const radiusY = 3 + rng() * 8;
            [x - w, x, x + w].forEach((cx) => {
                ctx.beginPath();
                ctx.ellipse(cx, y, radiusX, radiusY, 0, 0, TAU);
                ctx.fill();
            });
        }
        ctx.globalAlpha = 1;
    });
}

function createRingTexture(style) {
    return createCanvasTexture(256, 8, (ctx, w, h) => {
        const gradient = ctx.createLinearGradient(0, 0, w, 0);

        if (style === "saturn") {
            gradient.addColorStop(0, "rgba(210, 190, 140, 0)");
            gradient.addColorStop(0.08, "rgba(210, 190, 140, 0.45)");
            gradient.addColorStop(0.2, "rgba(232, 212, 165, 0.85)");
            gradient.addColorStop(0.34, "rgba(180, 160, 120, 0.4)");
            gradient.addColorStop(0.45, "rgba(236, 216, 170, 0.9)");
            gradient.addColorStop(0.55, "rgba(200, 180, 135, 0.6)");
            gradient.addColorStop(0.6, "rgba(160, 145, 110, 0.06)");
            gradient.addColorStop(0.66, "rgba(160, 145, 110, 0.06)");
            gradient.addColorStop(0.72, "rgba(222, 202, 158, 0.7)");
            gradient.addColorStop(0.88, "rgba(208, 188, 146, 0.45)");
            gradient.addColorStop(1, "rgba(208, 188, 146, 0)");
        } else {
            gradient.addColorStop(0, "rgba(170, 220, 230, 0)");
            gradient.addColorStop(0.3, "rgba(170, 220, 230, 0.28)");
            gradient.addColorStop(0.7, "rgba(170, 220, 230, 0.28)");
            gradient.addColorStop(1, "rgba(170, 220, 230, 0)");
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
    });
}

function createGlowTexture(innerColor, outerColor) {
    return createCanvasTexture(256, 256, (ctx, w, h) => {
        const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
        gradient.addColorStop(0, innerColor);
        gradient.addColorStop(0.35, outerColor);
        gradient.addColorStop(1, "rgba(255, 140, 30, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
    });
}

/* ------------------------------------------------------------------ */
/* Scene setup                                                         */
/* ------------------------------------------------------------------ */

function init() {
    sceneRoot = document.getElementById("scene-root");
    labelsLayer = document.getElementById("labels-layer");

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02040a);
    scene.fog = new THREE.FogExp2(0x02040a, 0.0014);

    camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 1600);
    camera.position.set(GLOBAL_CAMERA_POSITION.x, GLOBAL_CAMERA_POSITION.y, GLOBAL_CAMERA_POSITION.z);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    sceneRoot.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.minDistance = 18;
    controls.maxDistance = 560;
    controls.target.set(GLOBAL_TARGET_POSITION.x, GLOBAL_TARGET_POSITION.y, GLOBAL_TARGET_POSITION.z);

    clock = new THREE.Clock();
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();
    followedBodyLastPosition = new THREE.Vector3();

    createLights();
    createStarField();
    createAsteroidBelt();
    createBodies();
    createOrbits();
    buildNavigation();
    setupUI();
    setupMobileUI();
    setLanguage(currentLanguage);

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("keydown", onKeyDown);

    const canvas = renderer.domElement;
    canvas.addEventListener("pointerdown", (event) => {
        pointerDownX = event.clientX;
        pointerDownY = event.clientY;
    });
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("dblclick", onCanvasClick);
    canvas.addEventListener("pointermove", onCanvasPointerMove);

    animate();
}

function createLights() {
    scene.add(new THREE.AmbientLight(0x6f7f95, 0.62));

    const sunLight = new THREE.PointLight(0xfff3c0, 2.3, 900);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x8cc9ff, 0.32);
    fillLight.position.set(-160, 100, 120);
    scene.add(fillLight);
}

function createStarField() {
    const rng = mulberry32(2026);

    const buildLayer = (starCount, size, opacity) => {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];

        for (let i = 0; i < starCount; i += 1) {
            const radius = 420 + rng() * 520;
            const theta = rng() * TAU;
            const phi = Math.acos(rng() * 2 - 1);
            positions.push(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)
            );

            const brightness = 0.6 + rng() * 0.4;
            const tint = rng();
            if (tint < 0.16) {
                colors.push(brightness, brightness * 0.86, brightness * 0.68);
            } else if (tint < 0.42) {
                colors.push(brightness * 0.78, brightness * 0.88, brightness);
            } else {
                colors.push(brightness, brightness, brightness);
            }
        }

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size,
            sizeAttenuation: false,
            vertexColors: true,
            transparent: true,
            opacity,
            depthWrite: false
        });

        scene.add(new THREE.Points(geometry, material));
    };

    buildLayer(2600, 1.3, 0.85);
    buildLayer(380, 2.3, 0.95);
}

function createAsteroidBelt() {
    const rng = mulberry32(404);
    const count = 850;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    for (let i = 0; i < count; i += 1) {
        const radius = 103 + rng() * 14;
        const angle = rng() * TAU;
        positions.push(
            Math.cos(angle) * radius,
            (rng() - 0.5) * 3,
            Math.sin(angle) * radius
        );

        const shade = 0.42 + rng() * 0.32;
        colors.push(shade, shade * 0.92, shade * 0.8);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1.1,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false
    });

    asteroidBelt = new THREE.Points(geometry, material);
    scene.add(asteroidBelt);
}

function createBodies() {
    BODY_SEQUENCE.forEach((id) => {
        const body = bodies[id];
        const geometry = new THREE.SphereGeometry(body.visualSize, id === "moon" ? 32 : 48, 32);
        const material = createBodyMaterial(id, body);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.userData.bodyId = id;
        mesh.rotation.order = "ZYX";
        mesh.rotation.z = body.tilt || 0;

        scene.add(mesh);
        selectableMeshes.push(mesh);

        bodyObjects[id] = {
            mesh,
            data: body,
            angle: body.initialAngle || 0,
            label: createLabel(id)
        };

        if (body.rings) {
            addRings(mesh, body);
        }

        if (body.hasClouds) {
            bodyObjects[id].clouds = addClouds(mesh, body, id);
        }

        if (body.hasAtmosphere) {
            addAtmosphere(mesh, body);
        }

        if (id === "sun") {
            addSunGlow(mesh, body);
        }

        setBodyPosition(id);
    });
}

function createBodyMaterial(id, body) {
    const buildTexture = TEXTURE_BUILDERS[id];
    const map = buildTexture ? buildTexture() : null;

    if (id === "sun") {
        return new THREE.MeshBasicMaterial({ map, color: map ? 0xffffff : body.color });
    }

    const material = new THREE.MeshPhongMaterial({
        map,
        color: map ? 0xffffff : body.color,
        shininess: id === "moon" || id === "mercury" ? 6 : 18,
        emissive: new THREE.Color(body.color).multiplyScalar(0.06)
    });
    material.userData.baseEmissive = material.emissive.clone();
    material.userData.hoverEmissive = new THREE.Color(body.color).multiplyScalar(0.32);

    if (REAL_TEXTURES[id] && REAL_TEXTURES[id].map) {
        upgradeToRealTexture(material, REAL_TEXTURES[id].map);
    }

    return material;
}

function addRings(mesh, body) {
    const inner = body.visualSize * body.rings.inner;
    const outer = body.visualSize * body.rings.outer;
    const geometry = new THREE.RingGeometry(inner, outer, 128, 1);

    // Remap UVs radially so the 1D ring gradient follows the radius.
    const position = geometry.attributes.position;
    const point = new THREE.Vector3();
    for (let i = 0; i < position.count; i += 1) {
        point.fromBufferAttribute(position, i);
        geometry.attributes.uv.setXY(i, (point.length() - inner) / (outer - inner), 0.5);
    }

    const material = new THREE.MeshBasicMaterial({
        map: createRingTexture(body.rings.style),
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false
    });

    const rings = new THREE.Mesh(geometry, material);
    rings.rotation.x = Math.PI / 2;
    mesh.add(rings);
}

function addClouds(mesh, body, id) {
    const geometry = new THREE.SphereGeometry(body.visualSize * 1.035, 48, 32);
    const material = new THREE.MeshPhongMaterial({
        map: createCloudsTexture(),
        transparent: true,
        depthWrite: false,
        shininess: 4
    });

    if (REAL_TEXTURES[id] && REAL_TEXTURES[id].clouds) {
        upgradeToRealTexture(material, REAL_TEXTURES[id].clouds);
    }

    const clouds = new THREE.Mesh(geometry, material);
    mesh.add(clouds);
    return clouds;
}

function addAtmosphere(mesh, body) {
    const geometry = new THREE.SphereGeometry(body.visualSize * 1.16, 32, 24);
    const material = new THREE.MeshBasicMaterial({
        color: body.hasAtmosphere.color,
        transparent: true,
        opacity: body.hasAtmosphere.opacity,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    mesh.add(new THREE.Mesh(geometry, material));
}

function addSunGlow(mesh, body) {
    const outerGlow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: createGlowTexture("rgba(255, 226, 150, 0.85)", "rgba(255, 160, 60, 0.32)"),
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
    }));
    outerGlow.scale.setScalar(body.visualSize * 5.4);
    mesh.add(outerGlow);

    const innerGlow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: createGlowTexture("rgba(255, 244, 200, 0.95)", "rgba(255, 190, 80, 0.5)"),
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
    }));
    innerGlow.scale.setScalar(body.visualSize * 2.9);
    mesh.add(innerGlow);
}

function createLabel(id) {
    const label = document.createElement("div");
    label.className = "body-label";
    label.dataset.bodyId = id;
    labelsLayer.appendChild(label);
    return label;
}

function createOrbits() {
    BODY_SEQUENCE.forEach((id) => {
        const body = bodies[id];
        if (!body.orbitRadius) return;

        const segments = body.parent ? 96 : 200;
        const points = [];
        for (let i = 0; i <= segments; i += 1) {
            const angle = (i / segments) * TAU;
            points.push(new THREE.Vector3(
                Math.cos(angle) * body.orbitRadius,
                0,
                Math.sin(angle) * body.orbitRadius
            ));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: body.parent ? 0x7d87a0 : 0x9aa6bb,
            transparent: true,
            opacity: body.parent ? 0.4 : 0.32
        });
        const line = new THREE.Line(geometry, material);
        line.visible = showOrbits;
        scene.add(line);

        orbitObjects.push({ mesh: line, parentId: body.parent || null });
    });

    updateOrbitPositions();
}

function setBodyPosition(id) {
    const object = bodyObjects[id];
    if (!object) return;

    const body = object.data;
    if (!body.orbitRadius) {
        object.mesh.position.set(0, 0, 0);
        return;
    }

    const center = body.parent ? bodyObjects[body.parent].mesh.position : new THREE.Vector3(0, 0, 0);
    object.mesh.position.set(
        center.x + Math.cos(object.angle) * body.orbitRadius,
        center.y,
        center.z + Math.sin(object.angle) * body.orbitRadius
    );
}

function updateBodies(delta) {
    const frameFactor = delta * 60 * simulationSpeed;

    BODY_SEQUENCE.forEach((id) => {
        const object = bodyObjects[id];
        if (!object) return;

        object.mesh.rotation.y += object.data.rotationSpeed * frameFactor;

        if (object.clouds) {
            object.clouds.rotation.y += 0.0028 * frameFactor;
        }

        if (!animationActive || !object.data.orbitSpeed) return;

        object.angle += object.data.orbitSpeed * frameFactor;
        setBodyPosition(id);
    });

    if (asteroidBelt && animationActive) {
        asteroidBelt.rotation.y += 0.0004 * frameFactor;
    }
}

function updateOrbitPositions() {
    orbitObjects.forEach((orbit) => {
        if (!orbit.parentId) return;
        orbit.mesh.position.copy(bodyObjects[orbit.parentId].mesh.position);
    });
}

/* ------------------------------------------------------------------ */
/* Navigation & UI                                                     */
/* ------------------------------------------------------------------ */

function buildNavigation() {
    const destinationList = document.getElementById("destination-list");
    destinationList.innerHTML = "";

    destinationList.appendChild(createGlobalViewButton());
    destinationList.appendChild(createAlignBodiesButton());
    destinationList.appendChild(createTourButton());

    BODY_SEQUENCE.forEach((id) => {
        destinationList.appendChild(createBodyButton(id, "destination-btn"));
    });
}

function createGlobalViewButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "destination-btn global-view-btn";
    button.innerHTML = '<span class="symbol" aria-hidden="true">◎</span><span data-i18n="resetView"></span>';
    button.addEventListener("click", resetView);
    return button;
}

function createAlignBodiesButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "destination-btn align-bodies-btn";
    button.innerHTML = '<span class="symbol" aria-hidden="true">↔</span><span data-i18n="alignBodies"></span>';
    button.addEventListener("click", alignBodies);
    return button;
}

function createTourButton() {
    tourButton = document.createElement("button");
    tourButton.type = "button";
    tourButton.className = "destination-btn tour-btn";
    tourButton.setAttribute("aria-pressed", "false");
    tourButton.innerHTML = '<span class="symbol" aria-hidden="true">▶</span><span data-i18n="tourStart"></span>';
    tourButton.addEventListener("click", toggleTour);
    return tourButton;
}

function createBodyButton(id, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.dataset.bodyId = id;
    button.innerHTML = `<span class="symbol" aria-hidden="true">${bodies[id].symbol}</span><span class="body-button-label"></span>`;
    button.addEventListener("click", () => focusBody(id));
    return button;
}

function setupUI() {
    document.querySelectorAll("[data-close-panel]").forEach((button) => {
        button.addEventListener("click", () => {
            const panel = button.closest(".panel");
            if (!panel) return;
            panel.classList.add("is-hidden");

            if (panel.id === "info-panel") {
                infoVisible = false;
                setToggleState("toggle-info", false);
            }
        });
    });

    document.querySelectorAll("[data-language]").forEach((button) => {
        button.addEventListener("click", () => setLanguage(button.dataset.language));
    });

    const scaleHelpToggle = document.getElementById("scale-help-toggle");
    scaleHelpToggle.addEventListener("click", () => {
        const popover = document.getElementById("scale-help-popover");
        const isOpen = scaleHelpToggle.getAttribute("aria-expanded") === "true";
        scaleHelpToggle.setAttribute("aria-expanded", String(!isOpen));
        popover.classList.toggle("is-hidden", isOpen);
    });

    document.getElementById("toggle-orbits").addEventListener("click", () => {
        showOrbits = !showOrbits;
        orbitObjects.forEach((orbit) => {
            orbit.mesh.visible = showOrbits;
        });
        setToggleState("toggle-orbits", showOrbits);
    });

    document.getElementById("toggle-labels").addEventListener("click", () => {
        showLabels = !showLabels;
        setToggleState("toggle-labels", showLabels);
        updateLabels();
    });

    document.getElementById("toggle-animation").addEventListener("click", () => {
        animationActive = !animationActive;
        setToggleState("toggle-animation", animationActive);
    });

    document.getElementById("toggle-info").addEventListener("click", () => {
        infoVisible = !infoVisible;
        setToggleState("toggle-info", infoVisible);
        document.getElementById("info-panel").classList.toggle("is-hidden", !infoVisible);

        if (infoVisible) {
            if (selectedBodyId) {
                renderInfo(selectedBodyId);
            } else {
                renderInitialInfo();
            }
        }
    });

    const fullscreenButton = document.getElementById("toggle-fullscreen");
    if (fullscreenButton) {
        fullscreenButton.addEventListener("click", () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        });
        document.addEventListener("fullscreenchange", () => {
            setToggleState("toggle-fullscreen", Boolean(document.fullscreenElement));
        });
    }

    const speedSlider = document.getElementById("speed-slider");
    if (speedSlider) {
        speedSlider.addEventListener("input", () => {
            simulationSpeed = parseFloat(speedSlider.value);
            updateSpeedValue();
        });
        updateSpeedValue();
    }
}

function setupMobileUI() {
    const sheets = [
        { buttonId: "mobile-nav-destinations", panelId: "destination-panel" },
        { buttonId: "mobile-nav-options", panelId: "options-panel" }
    ];

    sheets.forEach(({ buttonId, panelId }) => {
        document.getElementById(buttonId).addEventListener("click", () => {
            const panel = document.getElementById(panelId);
            const willOpen = !panel.classList.contains("is-open");
            closeMobileSheets();

            if (willOpen) {
                panel.classList.add("is-open");
                const button = document.getElementById(buttonId);
                button.classList.add("active");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    document.getElementById("mobile-nav-overview").addEventListener("click", () => {
        closeMobileSheets();
        resetView();
    });

    document.getElementById("mobile-nav-tour").addEventListener("click", () => {
        closeMobileSheets();
        toggleTour();
    });
}

function closeMobileSheets() {
    ["destination-panel", "options-panel"].forEach((id) => {
        document.getElementById(id).classList.remove("is-open");
    });
    ["mobile-nav-destinations", "mobile-nav-options"].forEach((id) => {
        const button = document.getElementById(id);
        button.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
    });
}

function updateSpeedValue() {
    const output = document.getElementById("speed-value");
    if (output) {
        output.textContent = `×${parseFloat(simulationSpeed.toFixed(2))}`;
    }
}

function setToggleState(id, active) {
    const button = document.getElementById(id);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
}

function setLanguage(language) {
    if (!SUPPORTED_LANGUAGES.includes(language)) return;

    currentLanguage = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    document.documentElement.lang = currentLanguage;
    document.title = UI_TEXT[currentLanguage].pageTitle;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        if (UI_TEXT[currentLanguage][key]) {
            element.textContent = UI_TEXT[currentLanguage][key];
        }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        const key = element.dataset.i18nAria;
        if (UI_TEXT[currentLanguage][key]) {
            element.setAttribute("aria-label", UI_TEXT[currentLanguage][key]);
        }
    });

    document.querySelector(".language-switcher").setAttribute("aria-label", UI_TEXT[currentLanguage].languageLabel);
    document.querySelectorAll("[data-language]").forEach((button) => {
        button.classList.toggle("active", button.dataset.language === currentLanguage);
    });

    updateNavigationLabels();
    updateLabelText();
    updateTourButton();

    if (infoVisible && selectedBodyId) {
        renderInfo(selectedBodyId);
    } else {
        renderInitialInfo();
    }
}

function updateNavigationLabels() {
    document.querySelectorAll("[data-body-id]").forEach((button) => {
        const id = button.dataset.bodyId;
        if (!bodies[id]) return;
        const label = button.querySelector(".body-button-label");
        if (label) {
            label.textContent = bodies[id].name[currentLanguage];
        }
        button.setAttribute("aria-label", bodies[id].name[currentLanguage]);
    });
}

function updateLabelText() {
    Object.entries(bodyObjects).forEach(([id, object]) => {
        object.label.textContent = bodies[id].name[currentLanguage];
    });
}

function updateActiveDestination() {
    document.querySelectorAll(".destination-btn[data-body-id]").forEach((button) => {
        button.classList.toggle("active", button.dataset.bodyId === selectedBodyId);
    });
}

function renderInitialInfo() {
    const infoContainer = document.getElementById("planet-info");
    infoContainer.innerHTML = `<p>${UI_TEXT[currentLanguage].initialInfo}</p>`;
}

function renderInfo(id) {
    const body = bodies[id];
    const infoContainer = document.getElementById("planet-info");

    infoContainer.innerHTML = `
        <div class="planet-heading">
            <span class="planet-symbol" aria-hidden="true">${body.symbol}</span>
            <div>
                <h3 class="planet-name">${body.name[currentLanguage]}</h3>
                <p class="planet-type">${body.type[currentLanguage]}</p>
            </div>
        </div>
        <div class="fact-grid">
            <div class="fact-item">
                <span class="fact-label">${UI_TEXT[currentLanguage].diameterLabel}</span>
                <span class="fact-value">${body.diameter[currentLanguage]}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">${UI_TEXT[currentLanguage].distanceLabel}</span>
                <span class="fact-value">${body.distance[currentLanguage]}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">${UI_TEXT[currentLanguage].orbitLabel}</span>
                <span class="fact-value">${body.orbitPeriod[currentLanguage]}</span>
            </div>
        </div>
        <p class="planet-description">${body.description[currentLanguage]}</p>
        <div class="planet-fun-fact">
            <strong>${UI_TEXT[currentLanguage].funFactLabel}</strong><br>
            ${body.fact[currentLanguage]}
        </div>
    `;
}

/* ------------------------------------------------------------------ */
/* Camera, focus & tour                                                */
/* ------------------------------------------------------------------ */

function focusBody(id, fromTour = false) {
    const object = bodyObjects[id];
    if (!object) return;

    if (!fromTour) {
        stopTour();
    }

    closeMobileSheets();

    selectedBodyId = id;
    followedBodyId = null;
    pendingFollowBodyId = id;
    infoVisible = true;
    setToggleState("toggle-info", true);
    document.getElementById("info-panel").classList.remove("is-hidden");
    renderInfo(id);
    updateActiveDestination();

    const target = object.mesh.position.clone();
    const viewDistance = Math.max(object.data.visualSize * 8, id === "sun" ? 72 : 34);
    let direction = camera.position.clone().sub(controls.target);

    if (direction.lengthSq() < 0.001) {
        direction = new THREE.Vector3(0.45, 0.28, 1);
    }

    direction.normalize();
    const endCamera = target.clone().add(direction.multiplyScalar(viewDistance));

    moveCameraTo(endCamera, target, () => {
        startFollowingBody(pendingFollowBodyId);
    });
}

function moveCameraTo(endCamera, endTarget, onComplete) {
    const tweenState = {
        cameraX: camera.position.x,
        cameraY: camera.position.y,
        cameraZ: camera.position.z,
        targetX: controls.target.x,
        targetY: controls.target.y,
        targetZ: controls.target.z
    };

    if (currentTween) {
        currentTween.stop();
    }

    currentTween = new TWEEN.Tween(tweenState)
        .to({
            cameraX: endCamera.x,
            cameraY: endCamera.y,
            cameraZ: endCamera.z,
            targetX: endTarget.x,
            targetY: endTarget.y,
            targetZ: endTarget.z
        }, 900)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => {
            camera.position.set(tweenState.cameraX, tweenState.cameraY, tweenState.cameraZ);
            controls.target.set(tweenState.targetX, tweenState.targetY, tweenState.targetZ);
        })
        .onComplete(() => {
            currentTween = null;
            camera.position.copy(endCamera);
            controls.target.copy(endTarget);

            if (onComplete) {
                onComplete();
            }
        })
        .start();
}

function resetView() {
    stopTour();
    followedBodyId = null;
    pendingFollowBodyId = null;
    selectedBodyId = null;
    updateActiveDestination();

    const endCamera = new THREE.Vector3(
        GLOBAL_CAMERA_POSITION.x,
        GLOBAL_CAMERA_POSITION.y,
        GLOBAL_CAMERA_POSITION.z
    );
    const endTarget = new THREE.Vector3(
        GLOBAL_TARGET_POSITION.x,
        GLOBAL_TARGET_POSITION.y,
        GLOBAL_TARGET_POSITION.z
    );

    moveCameraTo(endCamera, endTarget);
}

function alignBodies() {
    animationActive = false;
    setToggleState("toggle-animation", false);

    BODY_SEQUENCE.forEach((id) => {
        const object = bodyObjects[id];
        if (!object || !object.data.orbitRadius) return;

        object.angle = ALIGNMENT_ANGLE;
        setBodyPosition(id);
    });

    updateOrbitPositions();
    updateFollowedBody();
    updateLabels();
}

function toggleTour() {
    if (tourActive) {
        stopTour();
    } else {
        startTour();
    }
}

function startTour() {
    tourActive = true;
    updateTourButton();
    advanceTour();
    tourTimer = window.setInterval(advanceTour, TOUR_STEP_DURATION);
}

function advanceTour() {
    tourIndex = (tourIndex + 1) % BODY_SEQUENCE.length;
    focusBody(BODY_SEQUENCE[tourIndex], true);
}

function stopTour() {
    if (tourTimer !== null) {
        window.clearInterval(tourTimer);
        tourTimer = null;
    }
    if (!tourActive) return;
    tourActive = false;
    updateTourButton();
}

function updateTourButton() {
    if (!tourButton) return;

    const key = tourActive ? "tourStop" : "tourStart";
    const labelSpan = tourButton.querySelector("[data-i18n]");
    labelSpan.dataset.i18n = key;
    labelSpan.textContent = UI_TEXT[currentLanguage][key];
    tourButton.querySelector(".symbol").textContent = tourActive ? "■" : "▶";
    tourButton.classList.toggle("active", tourActive);
    tourButton.setAttribute("aria-pressed", String(tourActive));

    const mobileTourTab = document.getElementById("mobile-nav-tour");
    if (mobileTourTab) {
        mobileTourTab.classList.toggle("active", tourActive);
        mobileTourTab.setAttribute("aria-pressed", String(tourActive));
        mobileTourTab.querySelector(".mobile-tab-icon").textContent = tourActive ? "■" : "▶";
        document.getElementById("mobile-tour-label").textContent =
            UI_TEXT[currentLanguage][tourActive ? "navTourStop" : "navTour"];
    }
}

function startFollowingBody(id) {
    const object = bodyObjects[id];
    if (!object) return;

    const currentPosition = object.mesh.position.clone();
    const targetDelta = currentPosition.clone().sub(controls.target);

    camera.position.add(targetDelta);
    controls.target.copy(currentPosition);
    followedBodyLastPosition.copy(currentPosition);
    followedBodyId = id;
    pendingFollowBodyId = null;
}

function updateFollowedBody() {
    if (!followedBodyId || currentTween) return;

    const object = bodyObjects[followedBodyId];
    if (!object) return;

    const currentPosition = object.mesh.position;
    const delta = currentPosition.clone().sub(followedBodyLastPosition);

    if (delta.lengthSq() > 0) {
        camera.position.add(delta);
        controls.target.add(delta);
        followedBodyLastPosition.copy(currentPosition);
    }
}

/* ------------------------------------------------------------------ */
/* Picking, hover & keyboard                                           */
/* ------------------------------------------------------------------ */

function pickBodyAt(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((clientY - rect.top) / rect.height) * 2 - 1);

    raycaster.setFromCamera(pointer, camera);
    const intersections = raycaster.intersectObjects(selectableMeshes, false);
    return intersections.length > 0 ? intersections[0].object.userData.bodyId : null;
}

function onCanvasClick(event) {
    const dragDistance = Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY);
    if (dragDistance > 6) return;

    const bodyId = pickBodyAt(event.clientX, event.clientY);
    if (bodyId) {
        focusBody(bodyId);
    }
}

function onCanvasPointerMove(event) {
    setHoveredBody(pickBodyAt(event.clientX, event.clientY));
}

function setHoveredBody(id) {
    if (id === hoveredBodyId) return;

    if (hoveredBodyId) {
        const previous = bodyObjects[hoveredBodyId];
        const material = previous.mesh.material;
        if (material.userData && material.userData.baseEmissive) {
            material.emissive.copy(material.userData.baseEmissive);
        }
        previous.label.classList.remove("is-hovered");
    }

    hoveredBodyId = id;

    if (hoveredBodyId) {
        const current = bodyObjects[hoveredBodyId];
        const material = current.mesh.material;
        if (material.userData && material.userData.hoverEmissive) {
            material.emissive.copy(material.userData.hoverEmissive);
        }
        current.label.classList.add("is-hovered");
    }

    renderer.domElement.style.cursor = hoveredBodyId ? "pointer" : "";
}

function onKeyDown(event) {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const currentIndex = selectedBodyId ? BODY_SEQUENCE.indexOf(selectedBodyId) : -1;
        const nextIndex = (currentIndex + direction + BODY_SEQUENCE.length) % BODY_SEQUENCE.length;
        focusBody(BODY_SEQUENCE[nextIndex]);
    } else if (event.key === "Escape") {
        resetView();
    }
}

/* ------------------------------------------------------------------ */
/* Render loop                                                         */
/* ------------------------------------------------------------------ */

function updateLabels() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const projected = new THREE.Vector3();

    Object.entries(bodyObjects).forEach(([id, object]) => {
        const label = object.label;

        if (!showLabels) {
            label.style.opacity = "0";
            return;
        }

        projected.copy(object.mesh.position);
        projected.y += object.data.visualSize + 3;
        projected.project(camera);

        const visible = projected.z > -1 && projected.z < 1;
        if (!visible) {
            label.style.opacity = "0";
            return;
        }

        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;

        label.style.opacity = "1";
        label.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    updateLabels();
}

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    updateBodies(delta);
    updateOrbitPositions();

    if (typeof TWEEN !== "undefined") {
        TWEEN.update();
    }

    updateFollowedBody();
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
}

window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");

    if (typeof THREE === "undefined" || typeof THREE.OrbitControls === "undefined") {
        if (loadingScreen) {
            loadingScreen.classList.add("has-error");
            const message = loadingScreen.querySelector("p");
            if (message) {
                message.textContent = UI_TEXT[currentLanguage].loadErrorText;
            }
        }
        return;
    }

    init();

    if (loadingScreen) {
        requestAnimationFrame(() => {
            loadingScreen.classList.add("is-done");
            window.setTimeout(() => loadingScreen.remove(), 700);
        });
    }
});
