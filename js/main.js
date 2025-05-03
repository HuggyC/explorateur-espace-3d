// Variables globales pour stocker les objets Three.js
let scene, camera, renderer, controls;
let planets = {};
let orbits = [];
let animationActive = true;

// Constantes pour le système solaire
const DISTANCE_SCALE = 10; // Facteur d'échelle pour les distances (pour que tout rentre dans la vue)
const SIZE_SCALE = 1; // Facteur d'échelle pour les tailles des planètes

// Données des planètes avec couleurs et tailles simplifiées
const planetData = {
    sun: { 
        name: "Soleil", 
        size: 10, 
        distance: 0, 
        color: 0xffff00,
        rotationSpeed: 0.001
    },
    mercury: { 
        name: "Mercure", 
        size: 2, 
        distance: 20, 
        color: 0x888888,
        rotationSpeed: 0.01,
        orbitSpeed: 0.02
    },
    venus: { 
        name: "Vénus", 
        size: 3, 
        distance: 30, 
        color: 0xe39e1c,
        rotationSpeed: 0.008,
        orbitSpeed: 0.015
    },
    earth: { 
        name: "Terre", 
        size: 3.5, 
        distance: 40, 
        color: 0x0099ff,
        rotationSpeed: 0.01,
        orbitSpeed: 0.01,
        moons: [
            {
                name: "Lune",
                size: 1,
                distance: 5,
                color: 0xcccccc,
                rotationSpeed: 0.01,
                orbitSpeed: 0.02
            }
        ]
    },
    mars: { 
        name: "Mars", 
        size: 3, 
        distance: 50, 
        color: 0xff5500,
        rotationSpeed: 0.008,
        orbitSpeed: 0.008
    },
    jupiter: { 
        name: "Jupiter", 
        size: 7, 
        distance: 70, 
        color: 0xffaa88,
        rotationSpeed: 0.004,
        orbitSpeed: 0.004
    },
    saturn: { 
        name: "Saturne", 
        size: 6, 
        distance: 90, 
        color: 0xddcc88,
        rotationSpeed: 0.004,
        orbitSpeed: 0.002,
        hasRings: true
    },
    uranus: { 
        name: "Uranus", 
        size: 5, 
        distance: 110, 
        color: 0x99ffff,
        rotationSpeed: 0.003,
        orbitSpeed: 0.001
    },
    neptune: { 
        name: "Neptune", 
        size: 5, 
        distance: 130, 
        color: 0x3333ff,
        rotationSpeed: 0.003,
        orbitSpeed: 0.0005
    }
};

// Initialisation de la scène Three.js
function init() {
    console.log("Initialisation du système solaire...");
    
    // Créer la scène
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Créer la caméra
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 80, 80);
    camera.lookAt(0, 0, 0);
    
    // Créer le renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    // Créer les contrôles
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Ajouter les lumières
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    const sunLight = new THREE.PointLight(0xffffff, 2, 300);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    
    // Créer le fond d'étoiles
    createStars();
    
    // Créer les planètes
    createPlanets();
    
    // Créer les orbites
    createOrbits();
    
    // Connecter l'interface utilisateur
    setupUI();
    
    // Ajouter des gestionnaires d'événements
    window.addEventListener('resize', onWindowResize);
    
    // Lancer l'animation
    animate();
    
    console.log("Initialisation terminée.");
}

// Création du fond d'étoiles
function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: false
    });
    
    const starsVertices = [];
    for (let i = 0; i < 2000; i++) {
        const x = THREE.MathUtils.randFloatSpread(500);
        const y = THREE.MathUtils.randFloatSpread(500);
        const z = THREE.MathUtils.randFloatSpread(500);
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}

// Création des planètes
function createPlanets() {
    console.log("Création des planètes...");
    
    // Créer le soleil
    const sunGeometry = new THREE.SphereGeometry(planetData.sun.size * SIZE_SCALE, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: planetData.sun.color });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    scene.add(sun);
    
    planets.sun = {
        mesh: sun,
        data: planetData.sun,
        orbit: null,
        angle: 0
    };
    
    // Créer chaque planète
    for (const key in planetData) {
        if (key === 'sun') continue; // Le soleil est déjà créé
        
        const data = planetData[key];
        
        // Créer la planète
        const geometry = new THREE.SphereGeometry(data.size * SIZE_SCALE, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: data.color });
        const planet = new THREE.Mesh(geometry, material);
        
        // Positionner la planète
        const angle = Math.random() * Math.PI * 2;
        planet.position.x = Math.cos(angle) * data.distance * DISTANCE_SCALE;
        planet.position.z = Math.sin(angle) * data.distance * DISTANCE_SCALE;
        
        scene.add(planet);
        
        planets[key] = {
            mesh: planet,
            data: data,
            orbit: null,
            angle: angle
        };
        
        // Créer les lunes si elles existent
        if (data.moons) {
            data.moons.forEach((moonData, index) => {
                const moonGeometry = new THREE.SphereGeometry(moonData.size * SIZE_SCALE, 32, 32);
                const moonMaterial = new THREE.MeshPhongMaterial({ color: moonData.color });
                const moon = new THREE.Mesh(moonGeometry, moonMaterial);
                
                const moonAngle = Math.random() * Math.PI * 2;
                moon.position.x = planet.position.x + Math.cos(moonAngle) * moonData.distance;
                moon.position.z = planet.position.z + Math.sin(moonAngle) * moonData.distance;
                
                scene.add(moon);
                
                const moonKey = key + '_moon_' + index;
                planets[moonKey] = {
                    mesh: moon,
                    data: moonData,
                    parentPlanet: key,
                    angle: moonAngle
                };
            });
        }
        
        // Ajouter les anneaux pour Saturne
        if (data.hasRings) {
            const ringGeometry = new THREE.RingGeometry(
                data.size * SIZE_SCALE * 1.5, 
                data.size * SIZE_SCALE * 2.5, 
                32
            );
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
}

// Création des orbites
function createOrbits() {
    console.log("Création des orbites...");
    
    // Créer une orbite pour chaque planète
    for (const key in planetData) {
        if (key === 'sun') continue; // Le soleil n'a pas d'orbite
        
        const data = planetData[key];
        
        // Créer une orbite visuelle
        const orbitGeometry = new THREE.RingGeometry(
            data.distance * DISTANCE_SCALE - 0.1, 
            data.distance * DISTANCE_SCALE + 0.1, 
            64
        );
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x777777,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        scene.add(orbit);
        
        // Stocker l'orbite
        orbits.push(orbit);
        if (planets[key]) {
            planets[key].orbit = orbit;
        }
        
        // Créer des orbites pour les lunes
        if (data.moons) {
            data.moons.forEach((moonData, index) => {
                const moonOrbitGeometry = new THREE.RingGeometry(
                    moonData.distance - 0.1,
                    moonData.distance + 0.1,
                    32
                );
                const moonOrbitMaterial = new THREE.MeshBasicMaterial({
                    color: 0x444444,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.3
                });
                const moonOrbit = new THREE.Mesh(moonOrbitGeometry, moonOrbitMaterial);
                moonOrbit.rotation.x = Math.PI / 2;
                
                const planet = planets[key].mesh;
                moonOrbit.position.copy(planet.position);
                scene.add(moonOrbit);
                
                orbits.push(moonOrbit);
                
                const moonKey = key + '_moon_' + index;
                if (planets[moonKey]) {
                    planets[moonKey].orbit = moonOrbit;
                }
            });
        }
    }
}

// Mise à jour des positions planétaires
function updatePlanets() {
    if (!animationActive) return;
    
    // Mettre à jour chaque planète
    for (const key in planets) {
        const planet = planets[key];
        
        // Rotation sur soi-même
        if (planet.data.rotationSpeed) {
            planet.mesh.rotation.y += planet.data.rotationSpeed;
        }
        
        // Mouvement orbital pour les planètes (pas le soleil)
        if (key !== 'sun' && !planet.parentPlanet && planet.data.orbitSpeed) {
            planet.angle += planet.data.orbitSpeed;
            
            planet.mesh.position.x = Math.cos(planet.angle) * planet.data.distance * DISTANCE_SCALE;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.data.distance * DISTANCE_SCALE;
        }
        
        // Mouvement orbital pour les lunes
        if (planet.parentPlanet && planet.data.orbitSpeed) {
            const parentPlanet = planets[planet.parentPlanet];
            planet.angle += planet.data.orbitSpeed;
            
            planet.mesh.position.x = parentPlanet.mesh.position.x + Math.cos(planet.angle) * planet.data.distance;
            planet.mesh.position.z = parentPlanet.mesh.position.z + Math.sin(planet.angle) * planet.data.distance;
            
            // Mettre à jour la position de l'orbite lunaire
            if (planet.orbit) {
                planet.orbit.position.copy(parentPlanet.mesh.position);
            }
        }
    }
}

// Redimensionnement de la fenêtre
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Configuration de l'interface utilisateur
function setupUI() {
    // Configuration du bouton d'animation
    const toggleAnimationBtn = document.getElementById('toggle-animation');
    if (toggleAnimationBtn) {
        toggleAnimationBtn.addEventListener('click', function() {
            animationActive = !animationActive;
            this.classList.toggle('active', animationActive);
        });
    }
    
    // Configuration du bouton d'orbites
    const toggleOrbitsBtn = document.getElementById('toggle-orbits');
    if (toggleOrbitsBtn) {
        toggleOrbitsBtn.addEventListener('click', function() {
            const isVisible = orbits[0].visible;
            orbits.forEach(orbit => {
                orbit.visible = !isVisible;
            });
            this.classList.toggle('active', !isVisible);
        });
    }
    
    // Boutons pour les planètes
    for (const key in planetData) {
        const gotoButton = document.getElementById('goto-' + key);
        if (gotoButton) {
            gotoButton.addEventListener('click', function() {
                focusOnPlanet(key);
            });
        }
        
        const quickButton = document.getElementById('quick-' + key);
        if (quickButton) {
            quickButton.addEventListener('click', function() {
                focusOnPlanet(key);
            });
        }
    }
    
    // Gérer les boutons de fermeture
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const panel = this.closest('.panel');
            if (panel) {
                panel.style.display = 'none';
            }
        });
    });
}

// Focaliser la caméra sur une planète
function focusOnPlanet(key) {
    if (!planets[key]) return;
    
    const planet = planets[key].mesh;
    controls.target.copy(planet.position);
    
    // Afficher les infos sur la planète
    showPlanetInfo(key);
}

// Afficher les informations sur une planète
function showPlanetInfo(key) {
    if (!planetData[key]) return;
    
    const data = planetData[key];
    const infoPanel = document.getElementById('info-panel');
    const planetInfo = document.getElementById('planet-info');
    
    if (infoPanel && planetInfo) {
        planetInfo.innerHTML = `
            <h2>${data.name}</h2>
            <p>Taille: ${data.size} (échelle relative)</p>
            <p>Distance du Soleil: ${data.distance} (échelle relative)</p>
        `;
        
        infoPanel.style.display = 'block';
    }
}

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    
    // Mettre à jour les positions des planètes
    updatePlanets();
    
    // Mettre à jour les contrôles
    controls.update();
    
    // Effectuer le rendu
    renderer.render(scene, camera);
}

// Lancer l'initialisation
window.addEventListener('load', init);