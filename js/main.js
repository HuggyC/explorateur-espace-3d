// Constantes globales pour les paramètres du système solaire
const SCALE_FACTOR = 1000; // Facteur d'échelle pour réduire les distances réelles
const SIZE_SCALE_FACTOR = 2000; // Facteur d'échelle séparé pour les tailles des planètes
const TIME_STEP = 0.005; // Pas de temps pour l'animation
const ORBIT_SEGMENTS = 128; // Nombre de segments pour les orbites

// Variables globales
let scene, camera, renderer, controls;
let planets = {};
let orbits = [];
let clock = new THREE.Clock();
let selectedPlanet = null;
let animationActive = true;
let showOrbits = true;
let showLabels = true;

// Données des planètes (distances en millions de km, diamètres en km)
const planetData = {
    sun: {
        name: "Soleil",
        diameter: 1392684,
        distance: 0,
        rotationPeriod: 25.05, // en jours
        orbitalPeriod: 0, // en jours (le soleil ne tourne pas autour d'un autre objet)
        color: 0xffff00,
        info: "Le Soleil est l'étoile au centre de notre système solaire. Il représente à lui seul 99,86% de la masse du système solaire. Il est composé principalement d'hydrogène et d'hélium."
    },
    mercury: {
        name: "Mercure",
        diameter: 4879,
        distance: 57.9,
        rotationPeriod: 58.65,
        orbitalPeriod: 87.97,
        color: 0xbebebe,
        info: "Mercure est la planète la plus proche du Soleil et la plus petite du système solaire. Sa surface est couverte de cratères d'impact, similaires à ceux de la Lune."
    },
    venus: {
        name: "Vénus",
        diameter: 12104,
        distance: 108.2,
        rotationPeriod: -243, // rotation rétrograde
        orbitalPeriod: 224.7,
        color: 0xe39e1c,
        info: "Vénus est la deuxième planète du système solaire et la plus chaude en raison de son effet de serre. Elle est souvent appelée 'l'étoile du berger' car elle est visible à l'œil nu à l'aube et au crépuscule."
    },
    earth: {
        name: "Terre",
        diameter: 12756,
        distance: 149.6,
        rotationPeriod: 1, // en jours
        orbitalPeriod: 365.25, // en jours
        color: 0x0099ff,
        info: "La Terre est la troisième planète du système solaire et la seule connue à abriter la vie. Elle est caractérisée par ses océans d'eau liquide et son atmosphère riche en oxygène."
    },
    moon: {
        name: "Lune",
        diameter: 3475,
        distance: 0.384, // distance à la Terre
        parentPlanet: 'earth', // Orbite autour de la Terre
        parentDistance: 0.384, // 384 000 km de la Terre
        rotationPeriod: 27.32,
        orbitalPeriod: 27.32,
        color: 0xdddddd,
        info: "La Lune est le seul satellite naturel permanent de la Terre. Elle est responsable des marées et stabilise l'axe de rotation de la Terre."
    },
    mars: {
        name: "Mars",
        diameter: 6792,
        distance: 227.9,
        rotationPeriod: 1.03,
        orbitalPeriod: 687,
        color: 0xff3300,
        info: "Mars est la quatrième planète du système solaire, surnommée 'la planète rouge' en raison de son apparence rougeâtre. Elle possède deux petites lunes, Phobos et Deimos."
    },
    jupiter: {
        name: "Jupiter",
        diameter: 142984,
        distance: 778.6,
        rotationPeriod: 0.41, // 9.9 heures
        orbitalPeriod: 4331,
        color: 0xffaa77,
        info: "Jupiter est la cinquième planète du système solaire et la plus grande. C'est une géante gazeuse avec une Grande Tache Rouge, une tempête qui dure depuis au moins 400 ans."
    },
    saturn: {
        name: "Saturne",
        diameter: 120536,
        distance: 1433.5,
        rotationPeriod: 0.44, // 10.6 heures
        orbitalPeriod: 10747,
        color: 0xebe1a7,
        info: "Saturne est la sixième planète du système solaire, célèbre pour ses anneaux spectaculaires. Elle est une géante gazeuse principalement composée d'hydrogène et d'hélium."
    },
    uranus: {
        name: "Uranus",
        diameter: 51118,
        distance: 2872.5,
        rotationPeriod: -0.72, // rotation rétrograde, 17.24 heures
        orbitalPeriod: 30589,
        color: 0x77ffff,
        info: "Uranus est la septième planète du système solaire et la première découverte à l'aide d'un télescope. Son axe de rotation est incliné de façon presque perpendiculaire à son orbite."
    },
    neptune: {
        name: "Neptune",
        diameter: 49528,
        distance: 4495.1,
        rotationPeriod: 0.67, // 16.1 heures
        orbitalPeriod: 59800,
        color: 0x3333ff,
        info: "Neptune est la huitième planète du système solaire et la plus éloignée du Soleil. C'est une géante de glace avec une Grande Tache Sombre et des vents parmi les plus rapides du système solaire."
    }
};

// Initialisation de la scène
function init() {
    // Vérifier que les éléments nécessaires existent
    const container = document.getElementById('space-container');
    if (!container) {
        console.error("Conteneur 'space-container' non trouvé!");
        return;
    }

    // Créer la scène
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Créer la caméra
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 300, 500);

    // Créer le rendu
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Vérifier que OrbitControls est disponible
    if (typeof THREE.OrbitControls === 'undefined') {
        console.error("THREE.OrbitControls n'est pas défini! Vérifiez l'importation de la bibliothèque.");
        return;
    }

    // Ajouter les contrôles de navigation
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 5000;
    controls.minDistance = 10;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Ajouter un événement de double-clic pour centrer la caméra sur les planètes
    renderer.domElement.addEventListener('dblclick', onDoubleClick, false);

    // Ajouter des lumières
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 2, 0, 0);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Créer les étoiles de fond
    createStars();

    // Créer les planètes
    createPlanets();

    // Créer les orbites
    createOrbits();

    // Initialiser l'interface utilisateur
    connectExistingUI();

    // Démarrer la boucle d'animation
    animate();
}

// Création des étoiles de fond
function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: false
    });

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(5000);
        const y = THREE.MathUtils.randFloatSpread(5000);
        const z = THREE.MathUtils.randFloatSpread(5000);
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}

// Création des planètes
function createPlanets() {
    for (const key in planetData) {
        const data = planetData[key];
        
        // Calcul de l'échelle avec un facteur différent pour les tailles
        let radius;
        if (key === 'sun') {
            // Réduire le soleil davantage pour qu'il soit visible
            radius = data.diameter / 2 / (SIZE_SCALE_FACTOR * 4);
        } else if (key === 'jupiter' || key === 'saturn' || key === 'uranus' || key === 'neptune') {
            // Réduire les géantes gazeuses pour un meilleur équilibre visuel
            radius = data.diameter / 2 / (SIZE_SCALE_FACTOR * 2);
        } else {
            radius = data.diameter / 2 / SIZE_SCALE_FACTOR;
        }
        
        // Création de la géométrie et du matériau
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        
        // Utiliser la couleur de la planète
        let material;
        if (key === 'sun') {
            // Le soleil est émissif pour qu'il brille
            material = new THREE.MeshBasicMaterial({ 
                color: data.color,
                emissive: 0xff8800,
            });
        } else {
            material = new THREE.MeshPhongMaterial({ 
                color: data.color,
                shininess: key === 'moon' ? 10 : 30,
                emissive: 0x112244,
                specular: 0x444444,
            });
        }
        
        // Créer la planète
        const planet = new THREE.Mesh(geometry, material);
        planet.userData.planetId = key; // Ajouter un ID pour identifier la planète
        
        // Positionner la planète (sera mise à jour dans updatePositions)
        if (key === 'sun') {
            planet.position.set(0, 0, 0);
        } else if (data.parentPlanet) {
            // Pour les lunes ou satellites, la position sera mise à jour dans updatePositions
            planet.position.set(0, 0, 0);
        } else {
            const angle = Math.random() * Math.PI * 2;
            const distance = data.distance / SCALE_FACTOR;
            planet.position.set(
                Math.cos(angle) * distance,
                0,
                Math.sin(angle) * distance
            );
        }
        
        // Ajouter la planète à la scène et à notre objet planètes
        scene.add(planet);
        planets[key] = {
            mesh: planet,
            data: data,
            angle: Math.random() * Math.PI * 2, // angle initial aléatoire
            rotationAngle: 0
        };
    }
}

// Création des orbites
function createOrbits() {
    // Supprimer les anciennes orbites si elles existent
    for (const orbit of orbits) {
        scene.remove(orbit);
    }
    orbits = [];
    
    // Créer les nouvelles orbites pour chaque planète
    for (const key in planets) {
        const planet = planets[key];
        const data = planet.data;
        
        // Ne pas créer d'orbite pour le Soleil
        if (key === 'sun') continue;
        
        let orbitRadius;
        let orbitCenter = new THREE.Vector3(0, 0, 0);
        
        if (data.parentPlanet) {
            // Orbite autour d'une planète parente
            orbitRadius = data.parentDistance / SCALE_FACTOR;
            // Le centre de l'orbite sera mis à jour dans updatePositions
        } else {
            // Orbite autour du Soleil
            orbitRadius = data.distance / SCALE_FACTOR;
        }
        
        const orbitGeometry = new THREE.BufferGeometry();
        const orbitMaterial = new THREE.LineBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.3
        });
        
        const orbitPoints = [];
        for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
            const angle = (i / ORBIT_SEGMENTS) * Math.PI * 2;
            orbitPoints.push(
                orbitRadius * Math.cos(angle) + orbitCenter.x,
                0,
                orbitRadius * Math.sin(angle) + orbitCenter.z
            );
        }
        
        orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
        const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
        orbit.visible = showOrbits; // Utilise la variable globale
        
        // Pour les lunes, l'orbite sera mise à jour dans updatePositions
        if (data.parentPlanet) {
            planet.orbit = orbit;
        }
        
        scene.add(orbit);
        orbits.push(orbit);
    }
}

// Mise à jour des positions des planètes
function updatePositions() {
    const delta = clock.getDelta();
    
    for (const key in planets) {
        const planet = planets[key];
        const data = planet.data;
        
        // Rotation sur elle-même
        if (data.rotationPeriod !== 0) {
            const rotationSpeed = (2 * Math.PI / data.rotationPeriod) * TIME_STEP;
            planet.mesh.rotation.y += rotationSpeed;
        }
        
        // Mouvement orbital (seulement si l'animation est active)
        if (animationActive && key !== 'sun' && data.orbitalPeriod !== 0) {
            const orbitalSpeed = (2 * Math.PI / data.orbitalPeriod) * TIME_STEP;
            
            if (data.parentPlanet) {
                // Orbite autour d'une planète parente
                const parent = planets[data.parentPlanet];
                planet.angle += orbitalSpeed;
                
                const orbitRadius = data.parentDistance / SCALE_FACTOR;
                planet.mesh.position.x = parent.mesh.position.x + Math.cos(planet.angle) * orbitRadius;
                planet.mesh.position.y = parent.mesh.position.y;
                planet.mesh.position.z = parent.mesh.position.z + Math.sin(planet.angle) * orbitRadius;
                
                // Mise à jour de l'orbite de la lune
                if (planet.orbit) {
                    const orbitPoints = [];
                    for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
                        const angle = (i / ORBIT_SEGMENTS) * Math.PI * 2;
                        orbitPoints.push(
                            parent.mesh.position.x + orbitRadius * Math.cos(angle),
                            parent.mesh.position.y,
                            parent.mesh.position.z + orbitRadius * Math.sin(angle)
                        );
                    }
                    
                    planet.orbit.geometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
                    planet.orbit.geometry.attributes.position.needsUpdate = true;
                }
            } else {
                // Orbite autour du Soleil
                planet.angle += orbitalSpeed;
                
                const orbitRadius = data.distance / SCALE_FACTOR;
                planet.mesh.position.x = Math.cos(planet.angle) * orbitRadius;
                planet.mesh.position.y = 0;
                planet.mesh.position.z = Math.sin(planet.angle) * orbitRadius;
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

// Gestion du double-clic pour centrer la caméra sur une planète
function onDoubleClick(event) {
    event.preventDefault();
    
    // Calculer les coordonnées normalisées de la souris (-1 à +1)
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Lancer un rayon depuis la caméra
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    // Obtenir les objets intersectés par le rayon
    // Créer un tableau d'objets sélectionnables (uniquement les planètes)
    const selectableObjects = [];
    for (const key in planets) {
        selectableObjects.push(planets[key].mesh);
    }
    const intersects = raycaster.intersectObjects(selectableObjects, false);
    
    if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        const planetId = selectedObject.userData.planetId;
        
        if (planetId) {
            focusOnPlanet(planetId);
            showPlanetInfo(planetId);
        }
    }
}

// Fonction pour se focaliser sur une planète
function focusOnPlanet(planetId) {
    if (!planets[planetId]) return;
    
    const target = planets[planetId].mesh.position.clone();
    
    // Animation de déplacement de la caméra
    if (typeof TWEEN !== 'undefined') {
        new TWEEN.Tween(controls.target)
            .to(target, 1000)
            .easing(TWEEN.Easing.Cubic.InOut)
            .start();
    } else {
        console.warn("TWEEN n'est pas défini, l'animation ne sera pas fluide");
        controls.target.copy(target);
    }
    
    // Mise à jour du panneau d'information
    selectedPlanet = planetId;
}

// Afficher les informations d'une planète
function showPlanetInfo(planetId) {
    if (!planets[planetId]) return;
    
    const data = planets[planetId].data;
    const infoPanel = document.getElementById('info-panel');
    const planetInfo = document.getElementById('planet-info');
    
    if (!infoPanel || !planetInfo) {
        console.error("Panneaux d'information non trouvés!");
        return;
    }
    
    // Construire le contenu HTML pour les informations
    let factsHTML = '';
    factsHTML += `<div><strong>Diamètre:</strong> ${data.diameter.toLocaleString()} km</div>`;
    factsHTML += `<div><strong>Distance au Soleil:</strong> ${data.distance ? data.distance.toLocaleString() : 'N/A'} millions km</div>`;
    factsHTML += `<div><strong>Période de rotation:</strong> ${Math.abs(data.rotationPeriod).toLocaleString()} jours${data.rotationPeriod < 0 ? ' (rétrograde)' : ''}</div>`;
    factsHTML += `<div><strong>Période orbitale:</strong> ${data.orbitalPeriod ? data.orbitalPeriod.toLocaleString() : 'N/A'} jours</div>`;
    
    // Mettre à jour le contenu du panneau
    planetInfo.innerHTML = `
        <div class="planet-icon">${planetData[planetId].name}</div>
        <div class="planet-facts">${factsHTML}</div>
        <p class="planet-description">${data.info}</p>
    `;
    
    // Afficher le panneau d'information
    infoPanel.style.display = 'block';
}

// Connecter les boutons de l'interface existante
function connectExistingUI() {
    // Boutons de destination
    connectPlanetButtons('goto-', focusOnPlanet);
    connectPlanetButtons('quick-', focusOnPlanet);
    
    // Boutons d'options
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
    
    const toggleLabelsBtn = document.getElementById('toggle-labels');
    if (toggleLabelsBtn) {
        toggleLabelsBtn.addEventListener('click', function() {
            showLabels = !showLabels;
            document.querySelectorAll('.label').forEach(label => {
                label.style.display = showLabels ? 'block' : 'none';
            });
            this.classList.toggle('active', showLabels);
        });
    }
    
    const toggleAnimationBtn = document.getElementById('toggle-animation');
    if (toggleAnimationBtn) {
        toggleAnimationBtn.addEventListener('click', function() {
            animationActive = !animationActive;
            this.classList.toggle('active', animationActive);
        });
    }
    
    const toggleInfoBtn = document.getElementById('toggle-info');
    if (toggleInfoBtn) {
        toggleInfoBtn.addEventListener('click', function() {
            const infoPanel = document.getElementById('info-panel');
            if (infoPanel) {
                const isVisible = infoPanel.style.display === 'block';
                infoPanel.style.display = isVisible ? 'none' : 'block';
                this.classList.toggle('active', !isVisible);
            }
        });
    }
    
    // Boutons de fermeture
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.panel').style.display = 'none';
        });
    });
    
    // Gestionnaire de redimensionnement
    window.addEventListener('resize', onWindowResize, false);
}

// Utilitaire pour connecter les boutons de planètes
function connectPlanetButtons(prefix, callback) {
    for (const key in planetData) {
        const buttonId = prefix + key;
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                callback(key);
                showPlanetInfo(key);
            });
        }
    }
}

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    
    // Mettre à jour les positions des planètes
    updatePositions();
    
    // Mettre à jour les contrôles
    if (controls) {
        controls.update();
    }
    
    // Mettre à jour les animations TWEEN
    if (typeof TWEEN !== 'undefined') {
        TWEEN.update();
    }
    
    // Effectuer le rendu de la scène
    renderer.render(scene, camera);
}

// Initialiser la scène au chargement
window.onload = init;