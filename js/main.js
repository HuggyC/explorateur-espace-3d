// Constantes du système solaire
const DISTANCE_SCALE = 15; // Échelle pour les distances
const SIZE_SCALE = 1; // Échelle pour les tailles des planètes
const ANIMATION_SPEED = 0.5; // Vitesse d'animation générale

// Variables globales
let scene, camera, renderer;
let controls;
let planets = {};
let orbits = [];
let clock;
let animationActive = true;
let showOrbits = true;

// Données des planètes
const planetData = {
    sun: {
        name: "Soleil",
        size: 20,
        distance: 0,
        rotationSpeed: 0.001 * ANIMATION_SPEED,
        color: 0xffff00
    },
    mercury: {
        name: "Mercure",
        size: 2.5,
        distance: 35,
        rotationSpeed: 0.005 * ANIMATION_SPEED,
        orbitSpeed: 0.008 * ANIMATION_SPEED,
        color: 0xaaaaaa
    },
    venus: {
        name: "Vénus",
        size: 4,
        distance: 55,
        rotationSpeed: 0.002 * ANIMATION_SPEED,
        orbitSpeed: 0.006 * ANIMATION_SPEED,
        color: 0xe39e1c
    },
    earth: {
        name: "Terre",
        size: 4.5,
        distance: 75,
        rotationSpeed: 0.01 * ANIMATION_SPEED,
        orbitSpeed: 0.005 * ANIMATION_SPEED,
        color: 0x0099ff,
        moons: [
            {
                name: "Lune",
                size: 1.2,
                distance: 8,
                rotationSpeed: 0.01 * ANIMATION_SPEED,
                orbitSpeed: 0.03 * ANIMATION_SPEED,
                color: 0xdddddd
            }
        ]
    },
    mars: {
        name: "Mars",
        size: 3.5,
        distance: 95,
        rotationSpeed: 0.01 * ANIMATION_SPEED,
        orbitSpeed: 0.004 * ANIMATION_SPEED,
        color: 0xff3300
    },
    jupiter: {
        name: "Jupiter",
        size: 12,
        distance: 130,
        rotationSpeed: 0.02 * ANIMATION_SPEED,
        orbitSpeed: 0.002 * ANIMATION_SPEED,
        color: 0xffaa77
    },
    saturn: {
        name: "Saturne",
        size: 10,
        distance: 170,
        rotationSpeed: 0.02 * ANIMATION_SPEED,
        orbitSpeed: 0.001 * ANIMATION_SPEED,
        color: 0xebe1a7,
        hasRings: true
    },
    uranus: {
        name: "Uranus",
        size: 7,
        distance: 210,
        rotationSpeed: 0.015 * ANIMATION_SPEED,
        orbitSpeed: 0.0007 * ANIMATION_SPEED,
        color: 0x77ffff
    },
    neptune: {
        name: "Neptune",
        size: 7,
        distance: 250,
        rotationSpeed: 0.015 * ANIMATION_SPEED,
        orbitSpeed: 0.0005 * ANIMATION_SPEED,
        color: 0x3333ff
    }
};

// Initialisation
function init() {
    // Création d'horloge pour l'animation
    clock = new THREE.Clock();
    
    // Création de la scène
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Création de la caméra
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 150, 300);
    camera.lookAt(0, 0, 0);
    
    // Création du renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Ajout du renderer à la page dans une nouvelle div pour éviter les conflits
    const container = document.createElement('div');
    container.id = 'three-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '0'; // Sous les autres éléments
    document.body.insertBefore(container, document.body.firstChild);
    container.appendChild(renderer.domElement);
    
    // Création des contrôles
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Création des lumières
    const ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);
    
    const sunLight = new THREE.PointLight(0xffffff, 2, 0);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    
    // Création des étoiles
    createStars();
    
    // Création des planètes
    createPlanets();
    
    // Création des orbites
    createOrbits();
    
    // Connecter les contrôles d'interface
    setupUI();
    
    // Gestionnaire de redimensionnement
    window.addEventListener('resize', onWindowResize);
    
    // Démarrer l'animation
    animate();
    
    console.log("Initialisation du système solaire terminée");
}

// Création du fond étoilé
function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: false
    });
    
    const starsCount = 5000;
    const starsPositions = [];
    
    for (let i = 0; i < starsCount; i++) {
        const x = THREE.Math.randFloatSpread(1000);
        const y = THREE.Math.randFloatSpread(1000);
        const z = THREE.Math.randFloatSpread(1000);
        starsPositions.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsPositions, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

// Création des planètes
function createPlanets() {
    // Créer le soleil
    const sunGeometry = new THREE.SphereGeometry(planetData.sun.size, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: planetData.sun.color,
        emissive: 0xff8800
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    scene.add(sun);
    
    planets.sun = {
        mesh: sun,
        data: planetData.sun
    };
    
    // Créer chaque planète
    for (const key in planetData) {
        if (key === 'sun') continue; // Soleil déjà créé
        
        const data = planetData[key];
        
        // Créer la planète
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: data.color,
            shininess: 30,
            emissive: 0x222222
        });
        const planet = new THREE.Mesh(geometry, material);
        
        // Positionner la planète à un angle aléatoire
        const angle = Math.random() * Math.PI * 2;
        planet.position.x = Math.cos(angle) * data.distance;
        planet.position.z = Math.sin(angle) * data.distance;
        
        scene.add(planet);
        
        planets[key] = {
            mesh: planet,
            data: data,
            angle: angle
        };
        
        // Créer les lunes si nécessaire
        if (data.moons) {
            data.moons.forEach((moonData, index) => {
                // Créer la lune
                const moonGeometry = new THREE.SphereGeometry(moonData.size, 16, 16);
                const moonMaterial = new THREE.MeshPhongMaterial({
                    color: moonData.color,
                    shininess: 20,
                    emissive: 0x111111
                });
                const moon = new THREE.Mesh(moonGeometry, moonMaterial);
                
                // Positionner la lune
                const moonAngle = Math.random() * Math.PI * 2;
                moon.position.x = planet.position.x + Math.cos(moonAngle) * moonData.distance;
                moon.position.z = planet.position.z + Math.sin(moonAngle) * moonData.distance;
                
                scene.add(moon);
                
                const moonKey = `${key}_moon_${index}`;
                planets[moonKey] = {
                    mesh: moon,
                    data: moonData,
                    parent: key,
                    angle: moonAngle
                };
            });
        }
        
        // Ajouter des anneaux à Saturne
        if (data.hasRings) {
            const ringGeometry = new THREE.RingGeometry(data.size * 1.5, data.size * 2.5, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xddccaa,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            planet.add(ring);
        }
    }
    
    console.log("Planètes créées:", Object.keys(planets).length);
}

// Création des orbites
function createOrbits() {
    for (const key in planetData) {
        if (key === 'sun') continue; // Pas d'orbite pour le soleil
        
        const data = planetData[key];
        
        // Créer l'orbite
        const geometry = new THREE.RingGeometry(data.distance - 0.2, data.distance + 0.2, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0x444444,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        const orbit = new THREE.Mesh(geometry, material);
        orbit.rotation.x = Math.PI / 2;
        orbit.visible = showOrbits;
        scene.add(orbit);
        
        orbits.push(orbit);
        
        // Créer les orbites pour les lunes
        if (data.moons) {
            data.moons.forEach((moonData, index) => {
                const planet = planets[key].mesh;
                
                const moonOrbitGeometry = new THREE.RingGeometry(moonData.distance - 0.1, moonData.distance + 0.1, 32);
                const moonOrbitMaterial = new THREE.MeshBasicMaterial({
                    color: 0x333333,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.3
                });
                const moonOrbit = new THREE.Mesh(moonOrbitGeometry, moonOrbitMaterial);
                moonOrbit.rotation.x = Math.PI / 2;
                
                // L'orbite lunaire suit la planète parente
                const moonOrbitPivot = new THREE.Object3D();
                moonOrbitPivot.position.copy(planet.position);
                moonOrbitPivot.add(moonOrbit);
                scene.add(moonOrbitPivot);
                
                moonOrbit.visible = showOrbits;
                orbits.push(moonOrbit);
                
                // Stocker la référence au pivot pour la mise à jour
                const moonKey = `${key}_moon_${index}`;
                if (planets[moonKey]) {
                    planets[moonKey].orbitPivot = moonOrbitPivot;
                }
            });
        }
    }
    
    console.log("Orbites créées:", orbits.length);
}

// Mise à jour des positions
function updatePlanets() {
    if (!animationActive) return;
    
    // Mise à jour du soleil
    if (planets.sun && planets.sun.data.rotationSpeed) {
        planets.sun.mesh.rotation.y += planets.sun.data.rotationSpeed;
    }
    
    // Mise à jour des planètes
    for (const key in planets) {
        if (key === 'sun') continue;
        
        const planet = planets[key];
        
        // Si c'est une lune
        if (planet.parent) {
            const parentPlanet = planets[planet.parent];
            
            // Rotation de la lune
            planet.mesh.rotation.y += planet.data.rotationSpeed;
            
            // Orbite autour de la planète parente
            planet.angle += planet.data.orbitSpeed;
            planet.mesh.position.x = parentPlanet.mesh.position.x + Math.cos(planet.angle) * planet.data.distance;
            planet.mesh.position.z = parentPlanet.mesh.position.z + Math.sin(planet.angle) * planet.data.distance;
            
            // Mise à jour de l'orbite lunaire
            if (planet.orbitPivot) {
                planet.orbitPivot.position.copy(parentPlanet.mesh.position);
            }
        } 
        // Si c'est une planète
        else if (!planet.parent && planet.data.orbitSpeed) {
            // Rotation de la planète
            planet.mesh.rotation.y += planet.data.rotationSpeed;
            
            // Orbite autour du soleil
            planet.angle += planet.data.orbitSpeed;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.data.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.data.distance;
        }
    }
}

// Gestionnaire de redimensionnement
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Configuration des contrôles d'interface
function setupUI() {
    // Gestion du bouton d'orbites
    const toggleOrbitsBtn = document.getElementById('toggle-orbits');
    if (toggleOrbitsBtn) {
        toggleOrbitsBtn.addEventListener('click', function() {
            showOrbits = !showOrbits;
            orbits.forEach(orbit => {
                orbit.visible = showOrbits;
            });
            this.classList.toggle('active', showOrbits);
        });
    }
    
    // Gestion du bouton d'animation
    const toggleAnimationBtn = document.getElementById('toggle-animation');
    if (toggleAnimationBtn) {
        toggleAnimationBtn.addEventListener('click', function() {
            animationActive = !animationActive;
            this.classList.toggle('active', animationActive);
        });
    }
    
    // Boutons pour se focaliser sur les planètes
    setupPlanetButtons('goto-');
    setupPlanetButtons('quick-');
    
    // Boutons de fermeture des panneaux
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.panel').style.display = 'none';
        });
    });
}

// Configuration des boutons de planètes
function setupPlanetButtons(prefix) {
    for (const key in planetData) {
        const buttonId = prefix + key;
        const button = document.getElementById(buttonId);
        
        if (button && planets[key]) {
            button.addEventListener('click', function() {
                // Centrer la caméra sur la planète
                controls.target.copy(planets[key].mesh.position);
                controls.update();
                
                // Afficher les informations
                showPlanetInfo(key);
            });
        }
    }
}

// Affichage des informations sur une planète
function showPlanetInfo(key) {
    const data = planetData[key];
    if (!data) return;
    
    const infoPanel = document.getElementById('info-panel');
    const planetInfo = document.getElementById('planet-info');
    
    if (!infoPanel || !planetInfo) return;
    
    // Créer le contenu
    let content = `
        <div class="planet-icon">${data.name}</div>
        <h2 class="planet-name">${data.name}</h2>
        <div class="planet-facts">
            <div><strong>Taille relative:</strong> ${data.size}</div>
            <div><strong>Distance relative:</strong> ${data.distance}</div>
        </div>
        <p class="planet-description">
            ${data.name} est représenté dans cette simulation avec une échelle relative.
            Explorez le système solaire pour découvrir les autres planètes !
        </p>
    `;
    
    planetInfo.innerHTML = content;
    infoPanel.style.display = 'block';
    
    // Activer le bouton d'info
    const infoBtn = document.getElementById('toggle-info');
    if (infoBtn) {
        infoBtn.classList.add('active');
    }
}

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    
    // Mise à jour des planètes
    updatePlanets();
    
    // Mise à jour des contrôles
    controls.update();
    
    // Rendu de la scène
    renderer.render(scene, camera);
}

// Initialisation au chargement
window.addEventListener('load', init);
