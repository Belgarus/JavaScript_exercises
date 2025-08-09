// 3D Schwarze Loch Simulation - Version 3.0
// Physikalisch korrekte Simulation mit realistischen Orbitalbahnen
// Inspiriert von: https://github.com/kavan010/black_hole

class BlackHole3DSimulation {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        // Simulations-Parameter
        this.blackHoleMass = 5.0;
        this.particleCount = 2000;
        this.simulationSpeed = 1.0;
        this.showGrid = true;
        this.showAccretionDisk = true;
        this.showLensing = true;
        this.showEventHorizon = true;
        this.showOrbits = true;
        this.isPaused = false;
        
        // Schwarzes Loch Eigenschaften (in natürlichen Einheiten)
        this.blackHole = {
            mass: 5.0,
            radius: 2.0,
            eventHorizon: 5.0,
            accretionDiskInner: 7.5,  // Innere Grenze der Akkretionsscheibe
            accretionDiskOuter: 25.0,  // Äußere Grenze
            ergosphere: 4.0
        };
        
        // Partikel-System mit realistischen Orbitalbahnen
        this.particles = [];
        this.orbitTrails = [];
        this.accretionDiskParticles = [];
        
        // Performance-Monitoring
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = 0;
        this.renderTime = 0;
        
        // Kamera-Position
        this.cameraDistance = 80;
        this.cameraRotation = { x: 0, y: 0, z: 0 };
        
        // Raumzeitkrümmung
        this.spacetimeGrid = [];
        
        // Initialisierung
        this.init();
    }
    
    async init() {
        try {
            this.createScene();
            this.createCamera();
            this.createRenderer();
            this.createControls();
            
            this.createBlackHole();
            this.createSpacetimeCurvature();
            this.createAccretionDisk();
            this.createOrbitalParticles();
            this.createLensingEffect();
            
            this.setupEventListeners();
            this.showUI();
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
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(ambientLight);
        
        // Schwarzes Loch Licht (sehr schwach)
        const blackHoleLight = new THREE.PointLight(0x0066ff, 0.5, 200);
        blackHoleLight.position.set(0, 0, 0);
        this.scene.add(blackHoleLight);
        
        // Akkretionsscheibe Licht
        const diskLight = new THREE.PointLight(0xff6600, 3, 100);
        diskLight.position.set(0, 0, 0);
        this.scene.add(diskLight);
    }
    
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 40, this.cameraDistance);
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
            this.cameraDistance = Math.max(20, Math.min(300, this.cameraDistance));
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
            opacity: 0.95
        });
        this.eventHorizon = new THREE.Mesh(eventHorizonGeometry, eventHorizonMaterial);
        this.scene.add(this.eventHorizon);
        
        // Schwarzes Loch Zentrum
        const blackHoleGeometry = new THREE.SphereGeometry(this.blackHole.radius, 32, 32);
        const blackHoleMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 1.0
        });
        this.blackHoleMesh = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
        this.scene.add(this.blackHoleMesh);
    }
    
    createSpacetimeCurvature() {
        if (!this.showGrid) return;
        
        // Raumzeitkrümmung als verformtes Gitter
        const gridSize = 100;
        const gridDivisions = 50;
        
        // Horizontales Gitter (gekrümmt)
        for (let i = 0; i <= gridDivisions; i++) {
            const y = (i / gridDivisions - 0.5) * gridSize;
            const points = [];
            
            for (let j = 0; j <= gridDivisions; j++) {
                const x = (j / gridDivisions - 0.5) * gridSize;
                const z = 0;
                
                // Raumzeitkrümmung berechnen
                const distance = Math.sqrt(x * x + z * z);
                const curvature = this.calculateSpacetimeCurvature(distance);
                
                points.push(new THREE.Vector3(x, y + curvature, z));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x00aaff,
                transparent: true,
                opacity: 0.6
            });
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
        }
        
        // Vertikales Gitter (gekrümmt)
        for (let i = 0; i <= gridDivisions; i++) {
            const x = (i / gridDivisions - 0.5) * gridSize;
            const points = [];
            
            for (let j = 0; j <= gridDivisions; j++) {
                const y = (j / gridDivisions - 0.5) * gridSize;
                const z = 0;
                
                const distance = Math.sqrt(x * x + z * z);
                const curvature = this.calculateSpacetimeCurvature(distance);
                
                points.push(new THREE.Vector3(x, y + curvature, z));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x00aaff,
                transparent: true,
                opacity: 0.6
            });
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
        }
    }
    
    calculateSpacetimeCurvature(distance) {
        // Einsteinsche Feldgleichungen vereinfacht
        const rs = this.blackHole.eventHorizon; // Schwarzschild-Radius
        const r = Math.max(distance, rs + 0.1);
        
        // Raumzeitkrümmung (vereinfacht)
        const curvature = -rs / (2 * r) * Math.exp(-r / rs);
        return curvature * 10; // Skalierung für sichtbare Effekte
    }
    
    createAccretionDisk() {
        if (!this.showAccretionDisk) return;
        
        // Dynamische Akkretionsscheibe mit vielen Partikeln
        const diskParticleCount = 3000;
        const diskGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(diskParticleCount * 3);
        const colors = new Float32Array(diskParticleCount * 3);
        const sizes = new Float32Array(diskParticleCount);
        
        for (let i = 0; i < diskParticleCount; i++) {
            // Realistische Verteilung in der Akkretionsscheibe
            const angle = Math.random() * Math.PI * 2;
            const radius = this.blackHole.accretionDiskInner + 
                          Math.random() * (this.blackHole.accretionDiskOuter - this.blackHole.accretionDiskInner);
            
            // Höhe basierend auf Radius (dünner innen, dicker außen)
            const heightScale = 0.1 + (radius - this.blackHole.accretionDiskInner) * 0.02;
            const height = (Math.random() - 0.5) * heightScale * 10;
            
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = height;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
            
            // Farbe basierend auf Temperatur (heißer innen, kälter außen)
            const temperature = 1.0 - (radius - this.blackHole.accretionDiskInner) / 
                              (this.blackHole.accretionDiskOuter - this.blackHole.accretionDiskInner);
            const hue = 30 + temperature * 30; // Gelb zu Orange
            const saturation = 80 + temperature * 20;
            const lightness = 50 + temperature * 30;
            
            const rgb = this.hslToRgb(hue, saturation, lightness);
            colors[i * 3] = rgb.r / 255;
            colors[i * 3 + 1] = rgb.g / 255;
            colors[i * 3 + 2] = rgb.b / 255;
            
            sizes[i] = 0.5 + temperature * 2;
            
            // Partikel-Daten für Animation
            this.accretionDiskParticles.push({
                angle: angle,
                radius: radius,
                height: height,
                velocity: this.calculateOrbitalVelocity(radius),
                life: 1.0,
                temperature: temperature
            });
        }
        
        diskGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        diskGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        diskGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const diskMaterial = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.accretionDisk = new THREE.Points(diskGeometry, diskMaterial);
        this.scene.add(this.accretionDisk);
    }
    
    createOrbitalParticles() {
        // Partikel mit realistischen Orbitalbahnen
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.createOrbitalParticle();
            this.particles.push(particle);
            
            // Orbit-Trail erstellen
            if (this.showOrbits) {
                this.createOrbitTrail(particle);
            }
        }
    }
    
    createOrbitalParticle() {
        // Realistische Orbitalbahn-Parameter
        const semiMajorAxis = this.blackHole.accretionDiskOuter + Math.random() * 30;
        const eccentricity = Math.random() * 0.8; // Elliptische Bahnen
        const inclination = (Math.random() - 0.5) * Math.PI / 4; // Neigung
        const argumentOfPeriapsis = Math.random() * Math.PI * 2;
        const longitudeOfAscendingNode = Math.random() * Math.PI * 2;
        const trueAnomaly = Math.random() * Math.PI * 2;
        
        // Position aus Bahnelementen berechnen
        const position = this.calculatePositionFromOrbitalElements(
            semiMajorAxis, eccentricity, inclination, 
            argumentOfPeriapsis, longitudeOfAscendingNode, trueAnomaly
        );
        
        // Geschwindigkeit aus Bahnelementen berechnen
        const velocity = this.calculateVelocityFromOrbitalElements(
            semiMajorAxis, eccentricity, inclination,
            argumentOfPeriapsis, longitudeOfAscendingNode, trueAnomaly
        );
        
        return {
            position: position,
            velocity: velocity,
            semiMajorAxis: semiMajorAxis,
            eccentricity: eccentricity,
            inclination: inclination,
            argumentOfPeriapsis: argumentOfPeriapsis,
            longitudeOfAscendingNode: longitudeOfAscendingNode,
            trueAnomaly: trueAnomaly,
            mass: 0.1 + Math.random() * 0.2,
            life: 1.0,
            color: this.getParticleColor(semiMajorAxis)
        };
    }
    
    calculatePositionFromOrbitalElements(a, e, i, ω, Ω, ν) {
        // Kepler-Orbitalgleichungen
        const r = a * (1 - e * e) / (1 + e * Math.cos(ν));
        
        const x = r * (Math.cos(Ω) * Math.cos(ω + ν) - Math.sin(Ω) * Math.sin(ω + ν) * Math.cos(i));
        const y = r * Math.sin(ω + ν) * Math.sin(i);
        const z = r * (Math.sin(Ω) * Math.cos(ω + ν) + Math.cos(Ω) * Math.sin(ω + ν) * Math.cos(i));
        
        return new THREE.Vector3(x, y, z);
    }
    
    calculateVelocityFromOrbitalElements(a, e, i, ω, Ω, ν) {
        // Geschwindigkeit aus Bahnelementen
        const μ = this.blackHole.mass * 10; // Gravitationsparameter
        const r = a * (1 - e * e) / (1 + e * Math.cos(ν));
        
        const v = Math.sqrt(μ * (2 / r - 1 / a));
        
        // Tangentiale Geschwindigkeitskomponente
        const vt = v * Math.sqrt(1 + 2 * e * Math.cos(ν) + e * e) / (1 + e * Math.cos(ν));
        
        // Geschwindigkeitsvektor
        const vx = -vt * Math.sin(ν);
        const vy = 0;
        const vz = vt * Math.cos(ν);
        
        return new THREE.Vector3(vx, vy, vz);
    }
    
    createOrbitTrail(particle) {
        // Orbit-Trail als Linie
        const trailPoints = [];
        const steps = 100;
        
        for (let j = 0; j <= steps; j++) {
            const ν = (j / steps) * Math.PI * 2;
            const point = this.calculatePositionFromOrbitalElements(
                particle.semiMajorAxis, particle.eccentricity, particle.inclination,
                particle.argumentOfPeriapsis, particle.longitudeOfAscendingNode, ν
            );
            trailPoints.push(point);
        }
        
        const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
        const trailMaterial = new THREE.LineBasicMaterial({
            color: particle.color,
            transparent: true,
            opacity: 0.3
        });
        
        const trail = new THREE.Line(trailGeometry, trailMaterial);
        this.scene.add(trail);
        this.orbitTrails.push(trail);
    }
    
    createLensingEffect() {
        if (!this.showLensing) return;
        
        // Gravitationslinseneffekt als verzerrte Ringe
        for (let i = 1; i <= 5; i++) {
            const ringGeometry = new THREE.RingGeometry(
                this.blackHole.eventHorizon * (1.2 + i * 0.2),
                this.blackHole.eventHorizon * (1.5 + i * 0.2),
                128
            );
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x0066ff,
                transparent: true,
                opacity: 0.1 - i * 0.015,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = -Math.PI / 2;
            ring.position.y = i * 0.3;
            this.scene.add(ring);
        }
    }
    
    updateAccretionDisk(deltaTime) {
        if (this.isPaused || !this.accretionDisk) return;
        
        const positions = this.accretionDisk.geometry.attributes.position.array;
        const colors = this.accretionDisk.geometry.attributes.color.array;
        
        for (let i = 0; i < this.accretionDiskParticles.length; i++) {
            const particle = this.accretionDiskParticles[i];
            
            // Orbitalbewegung
            particle.angle += particle.velocity * deltaTime * this.simulationSpeed;
            
            // Spiralbewegung ins Schwarze Loch (Akkretion)
            particle.radius -= particle.velocity * 0.01 * deltaTime * this.simulationSpeed;
            
            // Höhe zur Ebene ziehen
            particle.height *= 0.999;
            
            // Partikel entfernen wenn zu nah am Schwarzen Loch
            if (particle.radius < this.blackHole.eventHorizon) {
                particle.radius = this.blackHole.accretionDiskOuter;
                particle.height = (Math.random() - 0.5) * 2;
                particle.angle = Math.random() * Math.PI * 2;
            }
            
            // Position aktualisieren
            positions[i * 3] = Math.cos(particle.angle) * particle.radius;
            positions[i * 3 + 1] = particle.height;
            positions[i * 3 + 2] = Math.sin(particle.angle) * particle.radius;
            
            // Farbe basierend auf Temperatur und Position
            const temperature = 1.0 - (particle.radius - this.blackHole.accretionDiskInner) / 
                              (this.blackHole.accretionDiskOuter - this.blackHole.accretionDiskInner);
            const rgb = this.hslToRgb(30 + temperature * 30, 80 + temperature * 20, 50 + temperature * 30);
            
            colors[i * 3] = rgb.r / 255;
            colors[i * 3 + 1] = rgb.g / 255;
            colors[i * 3 + 2] = rgb.b / 255;
        }
        
        this.accretionDisk.geometry.attributes.position.needsUpdate = true;
        this.accretionDisk.geometry.attributes.color.needsUpdate = true;
    }
    
    updateOrbitalParticles(deltaTime) {
        if (this.isPaused) return;
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Gravitationskraft berechnen
            const distance = particle.position.length();
            
            if (distance < this.blackHole.eventHorizon) {
                // Partikel fällt ins Schwarze Loch
                this.particles.splice(i, 1);
                if (this.orbitTrails[i]) {
                    this.scene.remove(this.orbitTrails[i]);
                    this.orbitTrails.splice(i, 1);
                }
                continue;
            }
            
            // Relativistische Gravitationskraft
            const force = this.calculateRelativisticForce(particle.position, particle.velocity);
            
            // Beschleunigung
            const acceleration = force.multiplyScalar(1 / particle.mass);
            
            // Geschwindigkeit aktualisieren
            particle.velocity.add(acceleration.multiplyScalar(deltaTime * this.simulationSpeed));
            
            // Position aktualisieren
            particle.position.add(particle.velocity.clone().multiplyScalar(deltaTime * this.simulationSpeed));
            
            // Bahnelemente aktualisieren
            this.updateOrbitalElements(particle);
            
            // Orbit-Trail aktualisieren
            if (this.orbitTrails[i]) {
                this.updateOrbitTrail(particle, this.orbitTrails[i]);
            }
        }
        
        // Neue Partikel hinzufügen wenn zu wenige
        while (this.particles.length < this.particleCount) {
            const newParticle = this.createOrbitalParticle();
            this.particles.push(newParticle);
            if (this.showOrbits) {
                this.createOrbitTrail(newParticle);
            }
        }
    }
    
    calculateRelativisticForce(position, velocity) {
        const distance = position.length();
        const rs = this.blackHole.eventHorizon;
        
        // Schwarzschild-Metrik (vereinfacht)
        const c = 1; // Lichtgeschwindigkeit in natürlichen Einheiten
        const v = velocity.length();
        const gamma = 1 / Math.sqrt(1 - (v * v) / (c * c));
        
        // Gravitationskraft mit relativistischen Korrekturen
        const forceMagnitude = (this.blackHole.mass * 10) / (distance * distance);
        const forceDirection = position.clone().normalize().multiplyScalar(-1);
        
        // Relativistische Korrektur
        const relativisticFactor = gamma * (1 + (v * v) / (c * c));
        
        return forceDirection.multiplyScalar(forceMagnitude * relativisticFactor);
    }
    
    updateOrbitalElements(particle) {
        // Bahnelemente aus aktueller Position und Geschwindigkeit neu berechnen
        // (Vereinfacht - in einer echten Simulation würde man die Kepler-Gleichungen lösen)
        particle.trueAnomaly += 0.01;
        if (particle.trueAnomaly > Math.PI * 2) {
            particle.trueAnomaly -= Math.PI * 2;
        }
    }
    
    updateOrbitTrail(particle, trail) {
        // Orbit-Trail aktualisieren
        const trailPoints = [];
        const steps = 50;
        
        for (let j = 0; j <= steps; j++) {
            const ν = (j / steps) * Math.PI * 2;
            const point = this.calculatePositionFromOrbitalElements(
                particle.semiMajorAxis, particle.eccentricity, particle.inclination,
                particle.argumentOfPeriapsis, particle.longitudeOfAscendingNode, ν
            );
            trailPoints.push(point);
        }
        
        trail.geometry.setFromPoints(trailPoints);
    }
    
    calculateOrbitalVelocity(radius) {
        // Kepler'sche Geschwindigkeit
        const μ = this.blackHole.mass * 10;
        return Math.sqrt(μ / radius);
    }
    
    getParticleColor(semiMajorAxis) {
        // Farbe basierend auf Bahnradius
        const normalizedRadius = (semiMajorAxis - this.blackHole.accretionDiskOuter) / 30;
        const hue = 200 + normalizedRadius * 60; // Blau zu Grün
        const saturation = 70 + normalizedRadius * 30;
        const lightness = 50 + normalizedRadius * 20;
        
        const rgb = this.hslToRgb(hue, saturation, lightness);
        return new THREE.Color(rgb.r / 255, rgb.g / 255, rgb.b / 255);
    }
    
    updateBlackHole() {
        // Event Horizon basierend auf Masse aktualisieren
        this.blackHole.eventHorizon = this.blackHoleMass * 1.0;
        this.blackHole.accretionDiskInner = this.blackHole.eventHorizon * 1.5;
        this.blackHole.accretionDiskOuter = this.blackHole.eventHorizon * 5.0;
        
        // Mesh-Größen aktualisieren
        if (this.eventHorizon) {
            this.eventHorizon.scale.setScalar(this.blackHole.eventHorizon / 5.0);
        }
        if (this.blackHoleMesh) {
            this.blackHoleMesh.scale.setScalar(this.blackHole.radius / 2.0);
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
            if (child instanceof THREE.Line && child.material.color.getHex() === 0x0066ff) {
                child.visible = this.showGrid;
            }
        });
    }
    
    toggleAccretionDisk() {
        if (this.accretionDisk) {
            this.accretionDisk.visible = this.showAccretionDisk;
        }
    }
    
    toggleLensing() {
        // Lensing-Effekte ein-/ausschalten
        this.scene.children.forEach(child => {
            if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
                child.visible = this.showLensing;
            }
        });
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
        this.particles.forEach(particle => {
            // Cleanup
        });
        this.particles = [];
        
        this.orbitTrails.forEach(trail => {
            this.scene.remove(trail);
        });
        this.orbitTrails = [];
        
        // Neues Partikel-System erstellen
        this.createOrbitalParticles();
    }
    
    resetSimulation() {
        this.camera.position.set(0, 40, this.cameraDistance);
        this.camera.rotation.set(0, 0, 0);
        this.cameraRotation = { x: 0, y: 0, z: 0 };
        this.updateCameraPosition();
        this.recreateParticleSystem();
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
            document.getElementById('activeParticles').textContent = this.particles.length;
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
        
        const deltaTime = 16.67; // 60 FPS Basis
        
        // Akkretionsscheibe aktualisieren
        this.updateAccretionDisk(deltaTime);
        
        // Orbital-Partikel aktualisieren
        this.updateOrbitalParticles(deltaTime);
        
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
