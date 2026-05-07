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
        controlFocus: "Double-clic : rejoindre un astre",
        destinationTitle: "Destinations",
        optionsTitle: "Options",
        toggleOrbits: "Orbites",
        toggleLabels: "Noms",
        toggleInfo: "Infos",
        toggleAnimation: "Animation",
        resetView: "Vue globale",
        infoTitle: "Informations",
        scaleNote: "Représentation pédagogique, non à l'échelle.",
        scaleHelpTrigger: "pourquoi",
        scaleHelpText: "en vraie échelle, le Soleil serait énorme, la Terre minuscule, et les distances seraient tellement grandes que la plupart des planètes seraient invisibles ou très difficiles à explorer dans une page web",
        closePanel: "Fermer",
        diameterLabel: "Diamètre",
        distanceLabel: "Distance",
        orbitLabel: "Orbite",
        funFactLabel: "À retenir",
        initialInfo: "Choisis une destination ou double-clique sur un astre pour afficher sa fiche.",
        languageLabel: "Langue"
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
        controlFocus: "Double-click: travel to a body",
        destinationTitle: "Destinations",
        optionsTitle: "Options",
        toggleOrbits: "Orbits",
        toggleLabels: "Names",
        toggleInfo: "Info",
        toggleAnimation: "Animation",
        resetView: "Overview",
        infoTitle: "Information",
        scaleNote: "Educational representation, not to scale.",
        scaleHelpTrigger: "why",
        scaleHelpText: "at true scale, the Sun would be enormous, Earth tiny, and the distances so large that most planets would be invisible or very difficult to explore on a web page",
        closePanel: "Close",
        diameterLabel: "Diameter",
        distanceLabel: "Distance",
        orbitLabel: "Orbit",
        funFactLabel: "Key fact",
        initialInfo: "Choose a destination or double-click a body to open its card.",
        languageLabel: "Language"
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
        hasRings: true,
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
let showOrbits = true;
let showLabels = true;
let infoVisible = false;
let selectedBodyId = null;
let followedBodyId = null;
let pendingFollowBodyId = null;
let followedBodyLastPosition;

const bodyObjects = {};
const orbitObjects = [];
const selectableMeshes = [];

function getInitialLanguage() {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : "fr";
}

function init() {
    sceneRoot = document.getElementById("scene-root");
    labelsLayer = document.getElementById("labels-layer");

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02040a);
    scene.fog = new THREE.FogExp2(0x02040a, 0.0016);

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
    createBodies();
    createOrbits();
    buildNavigation();
    setupUI();
    setLanguage(currentLanguage);

    window.addEventListener("resize", onWindowResize);
    renderer.domElement.addEventListener("dblclick", onCanvasDoubleClick);

    animate();
}

function createLights() {
    scene.add(new THREE.AmbientLight(0x6f7f95, 0.72));

    const sunLight = new THREE.PointLight(0xfff3c0, 2.25, 900);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x8cc9ff, 0.38);
    fillLight.position.set(-160, 100, 120);
    scene.add(fillLight);
}

function createStarField() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const starCount = 2800;

    for (let i = 0; i < starCount; i += 1) {
        const radius = 420 + Math.random() * 520;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions.push(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );

        const brightness = 0.65 + Math.random() * 0.35;
        colors.push(brightness, brightness, brightness);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1.4,
        sizeAttenuation: false,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
    });

    scene.add(new THREE.Points(geometry, material));
}

function createBodies() {
    BODY_SEQUENCE.forEach((id) => {
        const body = bodies[id];
        const geometry = new THREE.SphereGeometry(body.visualSize, id === "moon" ? 24 : 48, 32);
        const material = createBodyMaterial(id, body);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.userData.bodyId = id;
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        scene.add(mesh);
        selectableMeshes.push(mesh);

        bodyObjects[id] = {
            mesh,
            data: body,
            angle: body.initialAngle || 0,
            label: createLabel(id)
        };

        if (body.hasRings) {
            addSaturnRings(mesh, body);
        }

        setBodyPosition(id);
    });
}

function createBodyMaterial(id, body) {
    if (id === "sun") {
        return new THREE.MeshBasicMaterial({ color: body.color });
    }

    return new THREE.MeshPhongMaterial({
        color: body.color,
        shininess: id === "moon" ? 12 : 28,
        emissive: new THREE.Color(body.color).multiplyScalar(0.08)
    });
}

function addSaturnRings(mesh, body) {
    const ringGeometry = new THREE.RingGeometry(body.visualSize * 1.45, body.visualSize * 2.35, 96);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xd7c48b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.72
    });
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.rotation.x = Math.PI / 2;
    rings.rotation.z = -0.22;
    mesh.add(rings);
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

        const width = body.parent ? 0.035 : 0.075;
        const segments = body.parent ? 72 : 160;
        const geometry = new THREE.RingGeometry(body.orbitRadius - width, body.orbitRadius + width, segments);
        const material = new THREE.MeshBasicMaterial({
            color: body.parent ? 0x6e7582 : 0x8a94a6,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: body.parent ? 0.34 : 0.28
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;
        mesh.visible = showOrbits;
        scene.add(mesh);

        orbitObjects.push({ mesh, parentId: body.parent || null });
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
    const frameFactor = delta * 60;

    BODY_SEQUENCE.forEach((id) => {
        const object = bodyObjects[id];
        if (!object) return;

        object.mesh.rotation.y += object.data.rotationSpeed * frameFactor;

        if (!animationActive || !object.data.orbitSpeed) return;

        object.angle += object.data.orbitSpeed * frameFactor;
        setBodyPosition(id);
    });
}

function updateOrbitPositions() {
    orbitObjects.forEach((orbit) => {
        if (!orbit.parentId) return;
        orbit.mesh.position.copy(bodyObjects[orbit.parentId].mesh.position);
    });
}

function buildNavigation() {
    const destinationList = document.getElementById("destination-list");
    destinationList.innerHTML = "";

    destinationList.appendChild(createGlobalViewButton());

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

    if (infoVisible && selectedBodyId) {
        renderInfo(selectedBodyId);
    } else {
        renderInitialInfo();
    }
}

function updateNavigationLabels() {
    document.querySelectorAll("[data-body-id]").forEach((button) => {
        const id = button.dataset.bodyId;
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

function focusBody(id) {
    const object = bodyObjects[id];
    if (!object) return;

    selectedBodyId = id;
    followedBodyId = null;
    pendingFollowBodyId = id;
    infoVisible = true;
    setToggleState("toggle-info", true);
    document.getElementById("info-panel").classList.remove("is-hidden");
    renderInfo(id);

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
    followedBodyId = null;
    pendingFollowBodyId = null;

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

function onCanvasDoubleClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    raycaster.setFromCamera(pointer, camera);
    const intersections = raycaster.intersectObjects(selectableMeshes, false);

    if (intersections.length > 0) {
        focusBody(intersections[0].object.userData.bodyId);
    }
}

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

window.addEventListener("load", init);
