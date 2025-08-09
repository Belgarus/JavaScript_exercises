// 3D Schwarze Loch Simulation - Version 2.0
// Inspiriert von: https://github.com/kavan010/black_hole
// Verwendet Three.js für 3D-Rendering

class BlackHole3DSimulation {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        // Simulations-Parameter
        this.blackHoleMass = 5.0;
        this.particleCount = 1000;
        this.simulationSpeed = 1.0;
        this.showGrid = true;
        this.showAccretionDisk = true;
        this.showLensing = true;
        this.showEventHorizon = true;
        this.isPaused = false;
        
        // Schwarzes Loch Eigenschaften
        this.blackHole = {
            radius: 2.0,
            eventHorizon: 5.0,
            accretionDiskRadius: 8.0,
            ergosphere: 4.0
        };
        
        // Partikel-System
        this.particles = [];
        this.particleSystem = null;
        
        // Performance-Monitoring
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = 0;
        this.renderTime = 0;
        
        // Kamera-Position
        this.cameraDistance = 50;
        this.cameraRotation = { x: 0, y: 0, z: 0 };
        
        // Initialisierung
        this.init();
    }
    
    async init() {
        try {
            // Three.js Scene erstellen
            this.createScene();
            this.createCamera();
            this.createRenderer();
            this.createControls();
            
            // Schwarzes Loch und Partikel erstellen
            this.createBlackHole();
            this.createParticleSystem();
            this.createSpacetimeGrid();
            this.createAccretionDisk();
            this.createLensingEffect();
            
            // Event Listener einrichten
            this.setupEventListeners();
            
            // UI anzeigen
            this.showUI();
            
            // Animation starten
            this.animate();
            
        } catch (error) {
            console.error('Fehler bei der Initialisierung:', error);
            document.getElementById('loading').textContent = 'Fehler beim Laden der Simulation';
        }
    }
    
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);
        
        // Ambient Light für allgemeine Beleuchtung
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Point Light für das Schwarze Loch
        const blackHoleLight = new THREE.PointLight(0x0066ff, 2, 100);
        blackHoleLight.position.set(0, 0, 0);
        this.scene.add(blackHoleLight);
        
        // Directional Light für Schatten
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        this.scene.add(directionalLight);
    }
    
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 30, this.cameraDistance);
        this.camera.lookAt(0, 0, 0);
    }
    
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
    }
    
    createControls() {
        // Einfache Maus-Steuerung implementieren
        this.setupMouseControls();
    }
    
    setupMouseControls() {
        let isMouseDown = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        
        this.renderer.domElement.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        });
        
        this.renderer.domElement.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                const deltaX = e.clientX - lastMouseX;
                const deltaY = e.clientY - lastMouseY;
                
                this.cameraRotation.y += deltaX * 0.01;
                this.cameraRotation.x += deltaY * 0.01;
                this.cameraRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.cameraRotation.x));
                
                this.updateCameraPosition();
                
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
            }
        });
        
        this.renderer.domElement.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
        
        this.renderer.domElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            this.cameraDistance *= zoomFactor;
            this.cameraDistance = Math.max(10, Math.min(200, this.cameraDistance));
            this.updateCameraPosition();
        });
        
        this.updateCameraPosition();
    }
    
    updateCameraPosition() {
        this.camera.position.x = this.cameraDistance * Math.sin(this.cameraRotation.y) * Math.cos(this.cameraRotation.x);
        this.camera.position.y = this.cameraDistance * Math.sin(this.cameraRotation.x);
        this.camera.position.z = this.cameraDistance * Math.cos(this.cameraRotation.y) * Math.cos(this.cameraRotation.x);
        this.camera.lookAt(0, 0, 0);
    }
    
    createBlackHole() {
        // Event Horizon (Schwarze Kugel)
        const eventHorizonGeometry = new THREE.SphereGeometry(this.blackHole.eventHorizon, 64, 64);
        const eventHorizonMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.9
        });
        this.eventHorizon = new THREE.Mesh(eventHorizonGeometry, eventHorizonMaterial);
        this.scene.add(this.eventHorizon);
        
        // Schwarzes Loch Zentrum (kleinere schwarze Kugel)
        const blackHoleGeometry = new THREE.SphereGeometry(this.blackHole.radius, 32, 32);
        const blackHoleMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 1.0
        });
        this.blackHoleMesh = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
        this.scene.add(this.blackHoleMesh);
        
        // Gravitationslinseneffekt Ring
        const lensingGeometry = new THREE.RingGeometry(
            this.blackHole.eventHorizon * 1.2,
            this.blackHole.eventHorizon * 1.5,
            64
        );
        const lensingMaterial = new THREE.MeshBasicMaterial({
            color: 0x0066ff,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        this.lensingRing = new THREE.Mesh(lensingGeometry, lensingMaterial);
        this.lensingRing.rotation.x = -Math.PI / 2;
        this.scene.add(this.lensingRing);
    }
    
    createParticleSystem() {
        // Partikel-Geometrie
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        
        // Partikel initialisieren
        for (let i = 0; i < this.particleCount; i++) {
            const angle = (Math.PI * 2 * i) / this.particleCount;
            const distance = 15 + Math.random() * 35;
            const height = (Math.random() - 0.5) * 10;
            
            positions[i * 3] = Math.cos(angle) * distance;
            positions[i * 3 + 1] = height;
            positions[i * 3 + 2] = Math.sin(angle) * distance;
            
            // Partikel-Farbe basierend auf Position
            const hue = 200 + (distance - 15) * 2;
            const saturation = 70 + Math.random() * 30;
            const lightness = 50 + Math.random() * 30;
            
            colors[i * 3] = this.hslToRgb(hue, saturation, lightness).r / 255;
            colors[i * 3 + 1] = this.hslToRgb(hue, saturation, lightness).g / 255;
            colors[i * 3 + 2] = this.hslToRgb(hue, saturation, lightness).b / 255;
            
            sizes[i] = 0.5 + Math.random() * 1.5;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Partikel-Material
        const particleMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particleSystem);
        
        // Partikel-Daten für Animation
        this.particleData = [];
        for (let i = 0; i < this.particleCount; i++) {
            const angle = (Math.PI * 2 * i) / this.particleCount;
            const distance = 15 + Math.random() * 35;
            const height = (Math.random() - 0.5) * 10;
            
            this.particleData.push({
                angle: angle,
                distance: distance,
                height: height,
                velocity: 0.02 + Math.random() * 0.03,
                life: 1.0,
                originalDistance: distance
            });
        }
    }
    
    createSpacetimeGrid() {
        if (!this.showGrid) return;
        
        const gridHelper = new THREE.GridHelper(100, 50, 0x0066ff, 0x0033aa);
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
        
        // Vertikale Linien für 3D-Gitter
        for (let i = -50; i <= 50; i += 10) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(i, -25, -50),
                new THREE.Vector3(i, 25, -50),
                new THREE.Vector3(i, 25, 50),
                new THREE.Vector3(i, -25, 50)
            ]);
            const material = new THREE.LineBasicMaterial({
                color: 0x0066ff,
                transparent: true,
                opacity: 0.2
            });
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
        }
    }
    
    createAccretionDisk() {
        if (!this.showAccretionDisk) return;
        
        // Akkretionsscheibe als Torus
        const diskGeometry = new THREE.TorusGeometry(
            this.blackHole.accretionDiskRadius,
            2,
            16,
            100
        );
        const diskMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });
        this.accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
        this.accretionDisk.rotation.x = Math.PI / 2;
        this.scene.add(this.accretionDisk);
        
        // Glühen der Akkretionsscheibe
        const glowGeometry = new THREE.TorusGeometry(
            this.blackHole.accretionDiskRadius + 1,
            3,
            16,
            100
        );
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff4400,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        this.diskGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.diskGlow.rotation.x = Math.PI / 2;
        this.scene.add(this.diskGlow);
    }
    
    createLensingEffect() {
        if (!this.showLensing) return;
        
        // Gravitationslinseneffekt als mehrere Ringe
        for (let i = 1; i <= 3; i++) {
            const ringGeometry = new THREE.RingGeometry(
                this.blackHole.eventHorizon * (1.5 + i * 0.3),
                this.blackHole.eventHorizon * (1.8 + i * 0.3),
                64
            );
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x0066ff,
                transparent: true,
                opacity: 0.1 - i * 0.02,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = -Math.PI / 2;
            ring.position.y = i * 0.5;
            this.scene.add(ring);
        }
    }
    
    updateParticles(deltaTime) {
        if (this.isPaused) return;
        
        const positions = this.particleSystem.geometry.attributes.position.array;
        const colors = this.particleSystem.geometry.attributes.color.array;
        
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.particleData[i];
            
            // Partikel-Lebensdauer reduzieren
            particle.life -= 0.001;
            
            // Neue Partikel wenn zu alt
            if (particle.life <= 0) {
                particle.life = 1.0;
                particle.angle = Math.random() * Math.PI * 2;
                particle.distance = particle.originalDistance;
                particle.height = (Math.random() - 0.5) * 10;
            }
            
            // Gravitationskraft berechnen
            const distance = Math.sqrt(particle.distance * particle.distance + particle.height * particle.height);
            
            if (distance < this.blackHole.eventHorizon) {
                // Partikel fällt ins Schwarze Loch
                particle.life = 0;
                continue;
            }
            
            // Relativistische Geschwindigkeit (vereinfacht)
            const relativisticFactor = 1 / (1 + this.blackHoleMass / (distance * distance));
            const velocity = particle.velocity * relativisticFactor;
            
            // Partikel-Position aktualisieren
            particle.angle += velocity * this.simulationSpeed;
            particle.distance -= velocity * 0.1 * this.simulationSpeed;
            particle.height *= 0.999; // Partikel werden zur Ebene gezogen
            
            // Position in Array schreiben
            positions[i * 3] = Math.cos(particle.angle) * particle.distance;
            positions[i * 3 + 1] = particle.height;
            positions[i * 3 + 2] = Math.sin(particle.angle) * particle.distance;
            
            // Farbe basierend auf Lebensdauer
            const alpha = particle.life;
            colors[i * 3] *= alpha;
            colors[i * 3 + 1] *= alpha;
            colors[i * 3 + 2] *= alpha;
        }
        
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.color.needsUpdate = true;
    }
    
    updateBlackHole() {
        // Event Horizon basierend auf Masse aktualisieren
        this.blackHole.eventHorizon = this.blackHoleMass * 1.0;
        this.blackHole.ergosphere = this.blackHoleMass * 0.8;
        this.blackHole.accretionDiskRadius = this.blackHole.eventHorizon * 1.6;
        
        // Mesh-Größen aktualisieren
        this.eventHorizon.scale.setScalar(this.blackHole.eventHorizon / 5.0);
        this.blackHoleMesh.scale.setScalar(this.blackHole.radius / 2.0);
        
        // Akkretionsscheibe aktualisieren
        if (this.accretionDisk) {
            this.accretionDisk.scale.setScalar(this.blackHole.accretionDiskRadius / 8.0);
            this.diskGlow.scale.setScalar((this.blackHole.accretionDiskRadius + 1) / 9.0);
        }
        
        // Gravitationslinseneffekt aktualisieren
        if (this.lensingRing) {
            this.lensingRing.scale.setScalar(this.blackHole.eventHorizon / 5.0);
        }
    }
    
    setupEventListeners() {
        // UI-Controls
        document.getElementById('blackHoleMass').addEventListener('input', (e) => {
            this.blackHoleMass = parseFloat(e.target.value);
            document.getElementById('massValue').textContent = this.blackHoleMass.toFixed(1);
            this.updateBlackHole();
        });
        
        document.getElementById('particleCount').addEventListener('input', (e) => {
            this.particleCount = parseInt(e.target.value);
            document.getElementById('particleValue').textContent = this.particleCount;
            this.recreateParticleSystem();
        });
        
        document.getElementById('simulationSpeed').addEventListener('input', (e) => {
            this.simulationSpeed = parseFloat(e.target.value);
            document.getElementById('speedValue').textContent = this.simulationSpeed.toFixed(1);
        });
        
        document.getElementById('showGrid').addEventListener('change', (e) => {
            this.showGrid = e.target.checked;
            this.toggleGrid();
        });
        
        document.getElementById('showAccretionDisk').addEventListener('change', (e) => {
            this.showAccretionDisk = e.target.checked;
            this.toggleAccretionDisk();
        });
        
        document.getElementById('showLensing').addEventListener('change', (e) => {
            this.showLensing = e.target.checked;
            this.toggleLensing();
        });
        
        document.getElementById('showEventHorizon').addEventListener('change', (e) => {
            this.showEventHorizon = e.target.checked;
            this.toggleEventHorizon();
        });
        
        document.getElementById('resetSimulation').addEventListener('click', () => {
            this.resetSimulation();
        });
        
        document.getElementById('togglePause').addEventListener('click', () => {
            this.togglePause();
        });
        
        document.getElementById('toggleFullscreen').addEventListener('click', () => {
            this.toggleFullscreen();
        });
        
        // Tastatur-Steuerung
        document.addEventListener('keydown', (e) => {
            const moveSpeed = 2;
            switch(e.key.toLowerCase()) {
                case 'w': this.camera.position.y += moveSpeed; break;
                case 's': this.camera.position.y -= moveSpeed; break;
                case 'a': this.camera.position.x -= moveSpeed; break;
                case 'd': this.camera.position.x += moveSpeed; break;
                case 'q': this.camera.rotation.z += 0.1; break;
                case 'e': this.camera.rotation.z -= 0.1; break;
                case ' ': this.togglePause(); break;
            }
        });
        
        // Resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }
    
    toggleGrid() {
        // Grid ein-/ausschalten
        this.scene.children.forEach(child => {
            if (child instanceof THREE.GridHelper) {
                child.visible = this.showGrid;
            }
        });
    }
    
    toggleAccretionDisk() {
        if (this.accretionDisk) {
            this.accretionDisk.visible = this.showAccretionDisk;
            this.diskGlow.visible = this.showAccretionDisk;
        }
    }
    
    toggleLensing() {
        if (this.lensingRing) {
            this.lensingRing.visible = this.showLensing;
        }
    }
    
    toggleEventHorizon() {
        if (this.eventHorizon) {
            this.eventHorizon.visible = this.showEventHorizon;
        }
        if (this.blackHoleMesh) {
            this.blackHoleMesh.visible = this.showEventHorizon;
        }
    }
    
    recreateParticleSystem() {
        // Altes Partikel-System entfernen
        if (this.particleSystem) {
            this.scene.remove(this.particleSystem);
        }
        
        // Neues Partikel-System erstellen
        this.createParticleSystem();
    }
    
    resetSimulation() {
        this.camera.position.set(0, 30, this.cameraDistance);
        this.camera.rotation.set(0, 0, 0);
        this.cameraRotation = { x: 0, y: 0, z: 0 };
        this.updateCameraPosition();
        this.initializeParticles();
        this.isPaused = false;
        document.getElementById('togglePause').textContent = 'Pausieren';
        document.getElementById('simulationStatus').textContent = 'Läuft';
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        const button = document.getElementById('togglePause');
        const status = document.getElementById('simulationStatus');
        
        if (this.isPaused) {
            button.textContent = 'Fortsetzen';
            status.textContent = 'Pausiert';
        } else {
            button.textContent = 'Pausieren';
            status.textContent = 'Läuft';
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    showUI() {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('ui').classList.remove('hidden');
        document.getElementById('info').classList.remove('hidden');
        document.getElementById('performance').classList.remove('hidden');
    }
    
    updatePerformance(currentTime) {
        this.frameCount++;
        
        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Performance-UI aktualisieren
            document.getElementById('fps').textContent = this.fps;
            document.getElementById('activeParticles').textContent = this.particleCount;
            document.getElementById('renderTime').textContent = this.renderTime.toFixed(1);
        }
    }
    
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = l - c / 2;
        
        let r, g, b;
        if (h < 1/6) {
            r = c; g = x; b = 0;
        } else if (h < 2/6) {
            r = x; g = c; b = 0;
        } else if (h < 3/6) {
            r = 0; g = c; b = x;
        } else if (h < 4/6) {
            r = 0; g = x; b = c;
        } else if (h < 5/6) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }
        
        return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        };
    }
    
    render() {
        const startTime = performance.now();
        
        this.renderer.render(this.scene, this.camera);
        
        this.renderTime = performance.now() - startTime;
    }
    
    animate(currentTime = 0) {
        // Performance aktualisieren
        this.updatePerformance(currentTime);
        
        // Partikel-Physik aktualisieren
        this.updateParticles(currentTime);
        
        // Schwarzes Loch aktualisieren
        this.updateBlackHole();
        
        // Rendern
        this.render();
        
        // Nächster Frame
        requestAnimationFrame((time) => this.animate(time));
    }
}

// Anwendung starten
document.addEventListener('DOMContentLoaded', () => {
    new BlackHole3DSimulation();
});
