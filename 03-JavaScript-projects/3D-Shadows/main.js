// 3D Kugel mit realistischen Schatten
class Sphere3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphere = null;
        this.plane = null;
        this.light = null;
        this.controls = {};
        this.isRotating = true;
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        // Szene erstellen
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x87CEEB, 10, 100);
        
        // Kamera erstellen
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 5, 10);
        
        // Renderer erstellen
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x87CEEB);
        document.body.appendChild(this.renderer.domElement);
        
        // Schatten aktivieren
        this.setupShadows();
        
        // Kugel erstellen
        this.createSphere();
        
        // Bodenebene erstellen
        this.createPlane();
        
        // Beleuchtung einrichten
        this.setupLighting();
        
        // OrbitControls für Kamerasteuerung
        this.setupOrbitControls();
        
        // Event Listener für Fenstergröße
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    setupShadows() {
        // Schatten-Qualität einstellen
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMap.autoUpdate = true;
    }
    
    createSphere() {
        // Geometrie für die Kugel
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        
        // Material mit realistischen Eigenschaften
        const material = new THREE.MeshPhongMaterial({
            color: 0x4A90E2,
            shininess: 100,
            specular: 0x444444,
            transparent: true,
            opacity: 0.9
        });
        
        this.sphere = new THREE.Mesh(geometry, material);
        this.sphere.castShadow = true;
        this.sphere.receiveShadow = false;
        this.sphere.position.set(0, 1, 0);
        
        this.scene.add(this.sphere);
    }
    
    createPlane() {
        // Bodenebene für Schatten
        const planeGeometry = new THREE.PlaneGeometry(20, 20);
        const planeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x90EE90,
            transparent: true,
            opacity: 0.8
        });
        
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.position.y = -0.1;
        this.plane.receiveShadow = true;
        
        this.scene.add(this.plane);
        
        // Zusätzliche Umgebung für bessere Schatten
        this.createEnvironment();
    }
    
    createEnvironment() {
        // Hintergrund-Wände für bessere Schatten
        const wallGeometry = new THREE.PlaneGeometry(20, 10);
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xE6E6FA,
            transparent: true,
            opacity: 0.3
        });
        
        // Hintere Wand
        const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
        backWall.position.set(0, 5, -10);
        backWall.receiveShadow = true;
        this.scene.add(backWall);
        
        // Seitliche Wände
        const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
        leftWall.position.set(-10, 5, 0);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.receiveShadow = true;
        this.scene.add(leftWall);
        
        const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
        rightWall.position.set(10, 5, 0);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.receiveShadow = true;
        this.scene.add(rightWall);
    }
    
    setupLighting() {
        // Hauptlicht (Sonne)
        this.light = new THREE.DirectionalLight(0xFFFFFF, 1);
        this.light.position.set(10, 10, 5);
        this.light.castShadow = true;
        
        // Schatten-Eigenschaften
        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;
        this.light.shadow.camera.near = 0.5;
        this.light.shadow.camera.far = 50;
        this.light.shadow.camera.left = -10;
        this.light.shadow.camera.right = 10;
        this.light.shadow.camera.top = 10;
        this.light.shadow.camera.bottom = -10;
        
        this.scene.add(this.light);
        
        // Umgebungslicht für weichere Schatten
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Zusätzliches weiches Licht von der Seite
        const softLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
        softLight.position.set(-5, 8, 3);
        softLight.castShadow = true;
        softLight.shadow.mapSize.width = 1024;
        softLight.shadow.mapSize.height = 1024;
        this.scene.add(softLight);
    }
    
    setupOrbitControls() {
        // Einfache Orbit-Steuerung
        this.controls = {
            mouseX: 0,
            mouseY: 0,
            targetRotationX: 0,
            targetRotationY: 0
        };
        
        // Maus-Events
        document.addEventListener('mousemove', (event) => {
            this.controls.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.controls.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Scroll-Events für Zoom
        document.addEventListener('wheel', (event) => {
            const zoomSpeed = 0.1;
            this.camera.position.z += event.deltaY * zoomSpeed;
            this.camera.position.z = Math.max(2, Math.min(20, this.camera.position.z));
        });
    }
    
    setupEventListeners() {
        // Schatten-Intensität
        document.getElementById('shadowIntensity').addEventListener('input', (e) => {
            const intensity = parseFloat(e.target.value);
            this.light.intensity = intensity;
        });
        
        // Licht-Intensität
        document.getElementById('lightIntensity').addEventListener('input', (e) => {
            const intensity = parseFloat(e.target.value);
            this.light.intensity = intensity;
        });
        
        // Kugel-Größe
        document.getElementById('sphereSize').addEventListener('input', (e) => {
            const size = parseFloat(e.target.value);
            this.sphere.scale.set(size, size, size);
        });
        
        // Rotation pausieren/starten
        document.getElementById('toggleRotation').addEventListener('click', () => {
            this.isRotating = !this.isRotating;
            const button = document.getElementById('toggleRotation');
            button.textContent = this.isRotating ? 'Rotation pausieren' : 'Rotation starten';
        });
        
        // Kamera zurücksetzen
        document.getElementById('resetCamera').addEventListener('click', () => {
            this.camera.position.set(0, 5, 10);
            this.controls.targetRotationX = 0;
            this.controls.targetRotationY = 0;
        });
    }
    
    updateCamera() {
        // Sanfte Kamerabewegung
        this.controls.targetRotationX += this.controls.mouseX * 0.01;
        this.controls.targetRotationY += this.controls.mouseY * 0.01;
        
        // Kugel um die Szene rotieren
        const radius = 10;
        this.camera.position.x = Math.sin(this.controls.targetRotationX) * radius;
        this.camera.position.z = Math.cos(this.controls.targetRotationX) * radius;
        this.camera.position.y = 5 + Math.sin(this.controls.targetRotationY) * 3;
        
        this.camera.lookAt(0, 1, 0);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Kugel rotieren
        if (this.isRotating) {
            this.sphere.rotation.y += 0.01;
            this.sphere.rotation.x += 0.005;
        }
        
        // Kugel schweben lassen
        this.sphere.position.y = 1 + Math.sin(Date.now() * 0.002) * 0.1;
        
        // Licht bewegen (simuliert Sonnenbewegung)
        const time = Date.now() * 0.0005;
        this.light.position.x = Math.cos(time) * 15;
        this.light.position.z = Math.sin(time) * 15;
        this.light.position.y = 10 + Math.sin(time * 2) * 2;
        
        // Kamera aktualisieren
        this.updateCamera();
        
        // Rendern
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Anwendung starten
document.addEventListener('DOMContentLoaded', () => {
    new Sphere3D();
});
