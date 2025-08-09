// 3D Kugel mit realistischen Schatten - Optimierte Version
class Sphere3D {
    constructor() {
        // Überprüfe ob Three.js geladen ist
        if (typeof THREE === 'undefined') {
            console.error('Three.js ist nicht geladen!');
            return;
        }
        
        // Performance-optimierte Eigenschaften
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphere = null;
        this.plane = null;
        this.light = null;
        this.controls = {};
        this.isRotating = true;
        this.animationId = null;
        this.lastTime = 0;
        this.frameCount = 0;
        
        // Performance-Monitoring
        this.fps = 0;
        this.lastFpsUpdate = 0;
        
        try {
            this.init();
            this.setupEventListeners();
            this.animate();
        } catch (error) {
            console.error('Fehler beim Initialisieren der 3D-Szene:', error);
            this.showError('Fehler beim Laden der 3D-Szene: ' + error.message);
        }
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 1000;
            text-align: center;
            max-width: 400px;
        `;
        errorDiv.innerHTML = `
            <h3>Fehler</h3>
            <p>${message}</p>
            <button onclick="location.reload()" style="margin-top: 10px; padding: 8px 16px; background: white; color: red; border: none; border-radius: 5px; cursor: pointer;">Neu laden</button>
        `;
        document.body.appendChild(errorDiv);
    }
    
    init() {
        // Szene mit optimierten Einstellungen
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x87CEEB, 15, 50); // Reduzierte Fog-Distanz
        
        // Kamera mit optimierten Parametern
        this.camera = new THREE.PerspectiveCamera(
            60, // Reduzierter FOV für bessere Performance
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        this.camera.position.set(0, 5, 10);
        
        // Renderer mit Performance-Optimierungen
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: false, // Antialiasing deaktiviert für bessere Performance
            powerPreference: "high-performance",
            stencil: false,
            depth: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Begrenzte Pixel-Ratio
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap; // Schnellerer Schatten-Typ
        this.renderer.setClearColor(0x87CEEB);
        
        // Kompatibilität für verschiedene Three.js-Versionen
        if (this.renderer.outputEncoding !== undefined) {
            this.renderer.outputEncoding = THREE.sRGBEncoding;
        }
        if (this.renderer.toneMapping !== undefined) {
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.0;
        }
        
        document.body.appendChild(this.renderer.domElement);
        
        // Optimierte Schatten
        this.setupShadows();
        
        // Kugel mit optimierter Geometrie
        this.createSphere();
        
        // Optimierte Bodenebene
        this.createPlane();
        
        // Effiziente Beleuchtung
        this.setupLighting();
        
        // Optimierte Kamerasteuerung
        this.setupOrbitControls();
        
        // Event Listener mit Throttling
        this.setupResizeHandler();
    }
    
    setupShadows() {
        // Reduzierte Schatten-Qualität für bessere Performance
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.shadowMap.autoUpdate = true; // Automatische Schatten-Updates für bessere Kompatibilität
    }
    
    createSphere() {
        // Reduzierte Geometrie-Auflösung für bessere Performance
        const geometry = new THREE.SphereGeometry(1, 32, 32); // Von 64x64 auf 32x32 reduziert
        
        // Optimiertes Material
        const material = new THREE.MeshPhongMaterial({
            color: 0x4A90E2,
            shininess: 50, // Reduzierter Glanz für bessere Performance
            specular: 0x222222,
            transparent: false, // Transparenz deaktiviert für bessere Performance
            flatShading: false
        });
        
        this.sphere = new THREE.Mesh(geometry, material);
        this.sphere.castShadow = true;
        this.sphere.receiveShadow = false;
        this.sphere.position.set(0, 1, 0);
        
        // Frustum Culling aktivieren
        this.sphere.frustumCulled = true;
        
        this.scene.add(this.sphere);
    }
    
    createPlane() {
        // Reduzierte Ebenen-Größe
        const planeGeometry = new THREE.PlaneGeometry(15, 15); // Von 20x20 auf 15x15 reduziert
        const planeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x90EE90,
            transparent: false
        });
        
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.position.y = -0.1;
        this.plane.receiveShadow = true;
        this.plane.frustumCulled = true;
        
        this.scene.add(this.plane);
        
        // Vereinfachte Umgebung
        this.createEnvironment();
    }
    
    createEnvironment() {
        // Reduzierte Wand-Größen und -Anzahl
        const wallGeometry = new THREE.PlaneGeometry(15, 8); // Kleinere Wände
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xE6E6FA,
            transparent: false
        });
        
        // Nur eine Hintergrund-Wand für bessere Performance
        const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
        backWall.position.set(0, 4, -7.5);
        backWall.receiveShadow = true;
        backWall.frustumCulled = true;
        this.scene.add(backWall);
    }
    
    setupLighting() {
        // Hauptlicht mit optimierten Schatten
        this.light = new THREE.DirectionalLight(0xFFFFFF, 1);
        this.light.position.set(10, 10, 5);
        this.light.castShadow = true;
        
        // Reduzierte Schatten-Auflösung für bessere Performance
        this.light.shadow.mapSize.width = 1024; // Von 2048 auf 1024 reduziert
        this.light.shadow.mapSize.height = 1024;
        this.light.shadow.camera.near = 0.5;
        this.light.shadow.camera.far = 30; // Reduzierte Far-Distanz
        this.light.shadow.camera.left = -7.5;
        this.light.shadow.camera.right = 7.5;
        this.light.shadow.camera.top = 8;
        this.light.shadow.camera.bottom = -8;
        
        this.scene.add(this.light);
        
        // Reduziertes Umgebungslicht
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2); // Von 0.3 auf 0.2 reduziert
        this.scene.add(ambientLight);
        
        // Entferntes zusätzliches Licht für bessere Performance
    }
    
    setupOrbitControls() {
        // Optimierte Steuerung mit Throttling
        this.controls = {
            mouseX: 0,
            mouseY: 0,
            targetRotationX: 0,
            targetRotationY: 0,
            isMouseDown: false
        };
        
        // Maus-Events mit Throttling
        let mouseMoveThrottle = null;
        document.addEventListener('mousemove', (event) => {
            if (mouseMoveThrottle) return;
            
            mouseMoveThrottle = requestAnimationFrame(() => {
                this.controls.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                this.controls.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                mouseMoveThrottle = null;
            });
        });
        
        // Maus-Down/Up Events
        document.addEventListener('mousedown', () => {
            this.controls.isMouseDown = true;
        });
        
        document.addEventListener('mouseup', () => {
            this.controls.isMouseDown = false;
        });
        
        // Scroll-Events mit Throttling
        let scrollThrottle = null;
        document.addEventListener('wheel', (event) => {
            if (scrollThrottle) return;
            
            scrollThrottle = requestAnimationFrame(() => {
                const zoomSpeed = 0.1;
                this.camera.position.z += event.deltaY * zoomSpeed;
                this.camera.position.z = Math.max(2, Math.min(20, this.camera.position.z));
                scrollThrottle = null;
            });
        });
    }
    
    setupEventListeners() {
        // Event Listener mit Debouncing
        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };
        
        // Schatten-Intensität
        const shadowIntensityElement = document.getElementById('shadowIntensity');
        if (shadowIntensityElement) {
            shadowIntensityElement.addEventListener('input', debounce((e) => {
                const intensity = parseFloat(e.target.value);
                if (this.light) this.light.intensity = intensity;
            }, 16)); // 60fps Debouncing
        }
        
        // Licht-Intensität
        const lightIntensityElement = document.getElementById('lightIntensity');
        if (lightIntensityElement) {
            lightIntensityElement.addEventListener('input', debounce((e) => {
                const intensity = parseFloat(e.target.value);
                if (this.light) this.light.intensity = intensity;
            }, 16));
        }
        
        // Kugel-Größe
        const sphereSizeElement = document.getElementById('sphereSize');
        if (sphereSizeElement) {
            sphereSizeElement.addEventListener('input', debounce((e) => {
                const size = parseFloat(e.target.value);
                if (this.sphere) this.sphere.scale.set(size, size, size);
            }, 16));
        }
        
        // Rotation pausieren/starten
        const toggleRotationElement = document.getElementById('toggleRotation');
        if (toggleRotationElement) {
            toggleRotationElement.addEventListener('click', () => {
                this.isRotating = !this.isRotating;
                toggleRotationElement.textContent = this.isRotating ? 'Rotation pausieren' : 'Rotation starten';
            });
        }
        
        // Kamera zurücksetzen
        const resetCameraElement = document.getElementById('resetCamera');
        if (resetCameraElement) {
            resetCameraElement.addEventListener('click', () => {
                this.camera.position.set(0, 5, 10);
                this.controls.targetRotationX = 0;
                this.controls.targetRotationY = 0;
            });
        }
    }
    
    setupResizeHandler() {
        // Optimierter Resize-Handler mit Throttling
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            
            resizeTimeout = setTimeout(() => {
                this.onWindowResize();
            }, 100);
        });
    }
    
    updateCamera() {
        // Nur aktualisieren wenn Maus gedrückt ist
        if (!this.controls.isMouseDown) return;
        
        // Sanfte Kamerabewegung mit reduzierter Sensitivität
        this.controls.targetRotationX += this.controls.mouseX * 0.005; // Von 0.01 auf 0.005 reduziert
        this.controls.targetRotationY += this.controls.mouseY * 0.005;
        
        // Begrenzte Kamerabewegung
        this.controls.targetRotationY = Math.max(-0.5, Math.min(0.5, this.controls.targetRotationY));
        
        const radius = 10;
        this.camera.position.x = Math.sin(this.controls.targetRotationX) * radius;
        this.camera.position.z = Math.cos(this.controls.targetRotationX) * radius;
        this.camera.position.y = 5 + Math.sin(this.controls.targetRotationY) * 3;
        
        this.camera.lookAt(0, 1, 0);
    }
    
    updatePerformance() {
        // FPS-Berechnung
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - this.lastFpsUpdate >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastFpsUpdate));
            this.frameCount = 0;
            this.lastFpsUpdate = currentTime;
            
            // Performance-basierte Anpassungen
            if (this.fps < 30) {
                // Reduziere Schatten-Updates bei niedriger FPS
                this.renderer.shadowMap.autoUpdate = false;
            } else {
                this.renderer.shadowMap.autoUpdate = true;
            }
            
            // Performance-UI aktualisieren
            this.updatePerformanceUI();
        }
    }
    
    updatePerformanceUI() {
        const fpsElement = document.getElementById('fps');
        const shadowElement = document.getElementById('shadowStatus');
        
        if (fpsElement) {
            fpsElement.textContent = this.fps;
            fpsElement.style.color = this.fps > 50 ? '#4CAF50' : this.fps > 30 ? '#FF9800' : '#F44336';
        }
        
        if (shadowElement) {
            shadowElement.textContent = this.renderer.shadowMap.autoUpdate ? 'Aktiv' : 'Reduziert';
            shadowElement.style.color = this.renderer.shadowMap.autoUpdate ? '#4CAF50' : '#FF9800';
        }
    }
    
    animate(currentTime = 0) {
        this.animationId = requestAnimationFrame((time) => this.animate(time));
        
        // Performance-Monitoring
        this.updatePerformance();
        
        // Reduzierte Update-Frequenz für bessere Performance
        if (currentTime - this.lastTime < 16) { // Max 60fps
            return;
        }
        this.lastTime = currentTime;
        
        // Kugel-Animation
        if (this.isRotating && this.sphere) {
            this.sphere.rotation.y += 0.008; // Reduzierte Rotationsgeschwindigkeit
            this.sphere.rotation.x += 0.004;
        }
        
        // Reduzierte Schwebe-Animation
        if (this.sphere) {
            this.sphere.position.y = 1 + Math.sin(currentTime * 0.001) * 0.05;
        }
        
        // Reduzierte Lichtbewegung
        if (this.light) {
            const time = currentTime * 0.0003; // Von 0.0005 auf 0.0003 reduziert
            this.light.position.x = Math.cos(time) * 12; // Von 15 auf 12 reduziert
            this.light.position.z = Math.sin(time) * 12;
            this.light.position.y = 8 + Math.sin(time * 1.5) * 1.5; // Von 10 auf 8 reduziert
        }
        
        // Kamera aktualisieren
        this.updateCamera();
        
        // Schatten nur bei Bedarf aktualisieren
        if (this.renderer && this.renderer.shadowMap.autoUpdate) {
            // Schatten-Map wird automatisch vom Renderer aktualisiert
            // Kein manueller Aufruf von update() nötig
        }
        
        // Rendern
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    // Cleanup-Methode für bessere Speicherverwaltung
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Geometrien und Materialien freigeben
        if (this.sphere) {
            if (this.sphere.geometry) this.sphere.geometry.dispose();
            if (this.sphere.material) this.sphere.material.dispose();
        }
        if (this.plane) {
            if (this.plane.geometry) this.plane.geometry.dispose();
            if (this.plane.material) this.plane.material.dispose();
        }
        
        // Renderer freigeben
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Anwendung starten
function startApp() {
    if (typeof THREE === 'undefined') {
        console.error('Three.js ist nicht verfügbar. Warte auf das Laden...');
        setTimeout(startApp, 100);
        return;
    }
    
    try {
        const app = new Sphere3D();
        
        // Cleanup beim Verlassen der Seite
        window.addEventListener('beforeunload', () => {
            if (app && app.dispose) {
                app.dispose();
            }
        });
        
        // Globale Referenz für Debugging
        window.sphere3D = app;
        
    } catch (error) {
        console.error('Fehler beim Starten der Anwendung:', error);
    }
}

// Warte bis DOM geladen ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}
