// Variables globales
let scene, camera, renderer;
let sunMesh, earthMesh, moonMesh, marsMesh;
let earthOrbit, moonOrbit, marsOrbit;
let animationActive = true;
let showOrbits = true;
let showLabels = true;
let showInfo = false;
let controls;

// Importation d'OrbitControls
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';

// Paramètres des orbites
const EARTH_DISTANCE = 150;
const MARS_DISTANCE = 230;
const MOON_DISTANCE = 20;

// Vitesses de rotation
const EARTH_SPEED = 0.005;
const MARS_SPEED = 0.003;
const MOON_SPEED = 0.01;
const SUN_ROTATION = 0.001;

// Angles de rotation actuels
let earthAngle = 0;
let marsAngle = 0;
let moonAngle = 0;

// Initialisation
function init() {
    // Créer la scène, caméra et renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fond transparent pour superposer sur notre fond étoilé CSS
    document.getElementById('space-container').appendChild(renderer.domElement);
    
    // Positionnement initial de la caméra
    camera.position.z = 300;
    
    // Ajouter les contrôles de la caméra
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.minDistance = 50;
    controls.maxDistance = 1000;
    controls.target.set(0, 0, 0); // Centrer les contrôles sur l'origine
    
    // Créer les lumières
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const sunLight = new THREE.PointLight(0xffffff, 2, 500);
    scene.add(sunLight);
    
    // Créer le soleil
    const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffdd00, 
        emissive: 0xff8800
    });
    sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sunMesh);
    
    // Créer les orbites
    createOrbits();
    
    // Créer la Terre
    const earthGeometry = new THREE.SphereGeometry(10, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2233ff, 
        emissive: 0x112244, 
        specular: 0x00ffff,
        shininess: 30
    });
    earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);
    
    // Créer la Lune
    const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xaaaaaa, 
        emissive: 0x222222, 
        specular: 0x444444,
        shininess: 10
    });
    moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moonMesh);
    
    // Créer Mars
    const marsGeometry = new THREE.SphereGeometry(8, 32, 32);
    const marsMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff4400, 
        emissive: 0x441100, 
        specular: 0x220000,
        shininess: 5
    });
    marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
    scene.add(marsMesh);
    
    // Initialiser les positions
    updatePositions();
    
    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', onWindowResize);
    
    // Initialiser les contrôles d'interface
    initUI();
    
    // Démarrer l'animation
    animate();
    
    // Ajouter un gestionnaire pour le double clic
    renderer.domElement.addEventListener('dblclick', onDoubleClick);
}

// Fonction pour gérer le double clic
function onDoubleClick(event) {
    // Calculer la position de la souris en coordonnées normalisées
    const mouse = new THREE.Vector2();
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Créer un rayon depuis la caméra
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    // Liste des objets à tester
    const objects = [sunMesh, earthMesh, moonMesh, marsMesh];
    
    // Tester l'intersection avec les objets
    const intersects = raycaster.intersectObjects(objects);
    
    if (intersects.length > 0) {
        // Si un objet est cliqué, se focaliser dessus
        focusOn(intersects[0].object);
    }
}

// Créer les orbites visuelles
function createOrbits() {
    // Orbite Terre
    const earthOrbitGeometry = new THREE.RingGeometry(EARTH_DISTANCE - 0.5, EARTH_DISTANCE + 0.5, 64);
    const earthOrbitMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x3366ff, 
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.3
    });
    earthOrbit = new THREE.Mesh(earthOrbitGeometry, earthOrbitMaterial);
    earthOrbit.rotation.x = Math.PI / 2;
    scene.add(earthOrbit);
    
    // Orbite Mars
    const marsOrbitGeometry = new THREE.RingGeometry(MARS_DISTANCE - 0.5, MARS_DISTANCE + 0.5, 64);
    const marsOrbitMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff3300, 
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.3
    });
    marsOrbit = new THREE.Mesh(marsOrbitGeometry, marsOrbitMaterial);
    marsOrbit.rotation.x = Math.PI / 2;
    scene.add(marsOrbit);
    
    // Orbite Lune (autour de la Terre)
    const moonOrbitGeometry = new THREE.RingGeometry(MOON_DISTANCE - 0.2, MOON_DISTANCE + 0.2, 32);
    const moonOrbitMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xaaaaaa, 
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.3
    });
    moonOrbit = new THREE.Mesh(moonOrbitGeometry, moonOrbitMaterial);
    moonOrbit.rotation.x = Math.PI / 2;
    scene.add(moonOrbit);
}

// Mise à jour des positions des objets célestes
function updatePositions() {
    // Position de la Terre
    earthMesh.position.x = Math.cos(earthAngle) * EARTH_DISTANCE;
    earthMesh.position.z = Math.sin(earthAngle) * EARTH_DISTANCE;
    
    // Position de Mars
    marsMesh.position.x = Math.cos(marsAngle) * MARS_DISTANCE;
    marsMesh.position.z = Math.sin(marsAngle) * MARS_DISTANCE;
    
    // Position de la Lune (relative à la Terre)
    moonMesh.position.x = earthMesh.position.x + Math.cos(moonAngle) * MOON_DISTANCE;
    moonMesh.position.z = earthMesh.position.z + Math.sin(moonAngle) * MOON_DISTANCE;
    
    // Position de l'orbite de la Lune (suit la Terre)
    moonOrbit.position.x = earthMesh.position.x;
    moonOrbit.position.z = earthMesh.position.z;
}

// Gérer le redimensionnement de la fenêtre
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialiser les contrôles UI
function initUI() {
    // Boutons de fermeture des panneaux
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });
    
    // Boutons de destination
    document.getElementById('goto-sun').addEventListener('click', () => focusOn(sunMesh));
    document.getElementById('goto-earth').addEventListener('click', () => focusOn(earthMesh));
    document.getElementById('goto-moon').addEventListener('click', () => focusOn(moonMesh));
    document.getElementById('goto-mars').addEventListener('click', () => focusOn(marsMesh));
    
    // Navigation rapide
    document.getElementById('quick-sun').addEventListener('click', () => focusOn(sunMesh));
    document.getElementById('quick-earth').addEventListener('click', () => focusOn(earthMesh));
    document.getElementById('quick-moon').addEventListener('click', () => focusOn(moonMesh));
    document.getElementById('quick-mars').addEventListener('click', () => focusOn(marsMesh));
    
    // Boutons d'options
    document.getElementById('toggle-orbits').addEventListener('click', toggleOrbits);
    document.getElementById('toggle-labels').addEventListener('click', toggleLabels);
    document.getElementById('toggle-animation').addEventListener('click', toggleAnimation);
    document.getElementById('toggle-info').addEventListener('click', toggleInfo);
}

// Fonction pour se focaliser sur un objet
function focusOn(object) {
    // Animation de transition vers l'objet
    const startPosition = camera.position.clone();
    const targetPosition = object.position.clone();
    targetPosition.z += 50; // Distance pour avoir une bonne vue de l'objet
    
    // Animation simple pour la démo (à améliorer)
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Interpolation entre les positions de départ et d'arrivée
        camera.position.lerpVectors(startPosition, targetPosition, progress);
        
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }
    
    animateCamera();
}

// Fonctions de toggle pour les options
function toggleOrbits() {
    showOrbits = !showOrbits;
    earthOrbit.visible = showOrbits;
    marsOrbit.visible = showOrbits;
    moonOrbit.visible = showOrbits;
    
    // Changer l'apparence du bouton
    const btn = document.getElementById('toggle-orbits');
    btn.classList.toggle('active', showOrbits);
}

function toggleLabels() {
    showLabels = !showLabels;
    
    // Dans cette démo, les labels sont gérés en CSS, pas en THREE.js
    document.querySelectorAll('.label').forEach(label => {
        label.style.display = showLabels ? 'block' : 'none';
    });
    
    // Changer l'apparence du bouton
    const btn = document.getElementById('toggle-labels');
    btn.classList.toggle('active', showLabels);
}

function toggleAnimation() {
    animationActive = !animationActive;
    
    // Mettre à jour le style du bouton
    const btn = document.getElementById('toggle-animation');
    btn.classList.toggle('active', animationActive);
}

function toggleInfo() {
    showInfo = !showInfo;
    const infoPanel = document.getElementById('info-panel');
    infoPanel.style.display = showInfo ? 'block' : 'none';
    
    // Mettre à jour le style du bouton
    const btn = document.getElementById('toggle-info');
    btn.classList.toggle('active', showInfo);
}

// Fonction principale d'animation
function animate() {
    requestAnimationFrame(animate);
    
    if (animationActive) {
        // Mettre à jour les angles de rotation
        earthAngle += EARTH_SPEED;
        marsAngle += MARS_SPEED;
        moonAngle += MOON_SPEED;
        
        // Mettre à jour les positions
        updatePositions();
        
        // Faire tourner le soleil sur lui-même
        sunMesh.rotation.y += SUN_ROTATION;
    }
    
    // Mettre à jour les contrôles
    controls.update();
    
    // Effectuer le rendu de la scène
    renderer.render(scene, camera);
}

// Démarrer l'application quand la page est chargée
window.addEventListener('load', init);