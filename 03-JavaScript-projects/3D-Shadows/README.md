# 3D Kugel mit realistischen Schatten

Eine interaktive 3D-Anwendung, die eine Kugel mit realistischen Schatten und Beleuchtung darstellt.

## Features

- **3D-Kugel**: Hochauflösende Kugel mit realistischen Materialeigenschaften
- **Realistische Schatten**: Weiche Schatten mit hoher Qualität
- **Dynamische Beleuchtung**: Bewegliches Licht simuliert Sonnenbewegung
- **Interaktive Steuerung**: Maus- und Tastatursteuerung
- **Anpassbare Parameter**: Schatten-Intensität, Licht-Intensität und Kugel-Größe

## Verwendung

### Installation
1. Stelle sicher, dass alle Dateien im gleichen Verzeichnis liegen
2. Öffne die `index.html` in einem modernen Webbrowser
3. Die Anwendung lädt automatisch die benötigten Three.js-Bibliotheken

### Steuerung

#### Maus-Steuerung
- **Bewegen**: Bewege die Maus, um die Kamera um die Kugel zu rotieren
- **Zoomen**: Verwende das Mausrad zum Ein- und Auszoomen

#### Interaktive Steuerelemente
- **Schatten-Intensität**: Regelt die Stärke der Schatten (0-1)
- **Licht-Intensität**: Regelt die Helligkeit des Hauptlichts (0-2)
- **Kugel-Größe**: Ändert die Größe der Kugel (0.5-2)
- **Rotation pausieren/starten**: Stoppt oder startet die automatische Kugel-Rotation
- **Kamera zurücksetzen**: Setzt die Kamera in die Ausgangsposition

## Technische Details

### Verwendete Technologien
- **Three.js**: JavaScript 3D-Bibliothek für WebGL
- **WebGL**: Hardware-beschleunigte 3D-Grafik
- **Vanilla JavaScript**: Keine zusätzlichen Frameworks erforderlich

### Schatten-Implementierung
- **PCF Soft Shadow Mapping**: Weiche, realistische Schatten
- **Mehrere Lichtquellen**: Hauptlicht + Umgebungslicht + weiches Seitenlicht
- **Schatten-Karten**: 2048x2048 Auflösung für hohe Qualität
- **Dynamische Beleuchtung**: Bewegliches Licht für realistische Effekte

### Performance-Optimierungen
- **Efficient Rendering**: Nur notwendige Objekte werden gerendert
- **Adaptive Schatten**: Schatten werden nur bei Bedarf aktualisiert
- **Responsive Design**: Automatische Anpassung an Fenstergröße

## Browser-Kompatibilität

- **Chrome**: 60+ (empfohlen)
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## Anpassungen

### Kugel-Material ändern
Bearbeite in `main.js` die `createSphere()`-Funktion:

```javascript
const material = new THREE.MeshPhongMaterial({
    color: 0x4A90E2,        // Farbe ändern
    shininess: 100,         // Glanz erhöhen/verringern
    specular: 0x444444,     // Spiegelung anpassen
    transparent: true,       // Transparenz aktivieren
    opacity: 0.9            // Transparenz-Grad
});
```

### Schatten-Qualität anpassen
Bearbeite in `setupLighting()` die Schatten-Auflösung:

```javascript
this.light.shadow.mapSize.width = 2048;   // Höhere Auflösung = bessere Qualität
this.light.shadow.mapSize.height = 2048;  // Aber mehr Speicherverbrauch
```

### Neue Objekte hinzufügen
Füge in der `init()`-Funktion neue 3D-Objekte hinzu:

```javascript
// Beispiel: Würfel hinzufügen
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(2, 1, 0);
cube.castShadow = true;
this.scene.add(cube);
```

## Fehlerbehebung

### Schatten werden nicht angezeigt
- Stelle sicher, dass WebGL unterstützt wird
- Überprüfe die Browser-Konsole auf Fehlermeldungen
- Reduziere die Schatten-Auflösung bei Performance-Problemen

### Performance-Probleme
- Reduziere die Schatten-Auflösung
- Entferne unnötige 3D-Objekte
- Verwende einen leistungsstärkeren Computer

### Anwendung lädt nicht
- Überprüfe die Internetverbindung (für CDN-Links)
- Stelle sicher, dass alle Dateien im gleichen Verzeichnis liegen
- Überprüfe die Browser-Konsole auf Fehlermeldungen

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz und kann frei verwendet, modifiziert und verteilt werden.
