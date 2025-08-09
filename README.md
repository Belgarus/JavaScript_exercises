# 3D Schwarze Loch Simulation

Eine fortschrittliche 3D-Simulation eines Schwarzen Lochs mit Gravitationslinseneffekt, Akkretionsscheibe und relativistischer Partikel-Physik, entwickelt in JavaScript mit Three.js.

## 🌌 Features

- **3D Schwarzes Loch**: Realistische Darstellung mit Ereignishorizont
- **Gravitationslinseneffekt**: Visualisierung der Raumzeitkrümmung
- **Akkretionsscheibe**: Glühende Materie um das Schwarze Loch
- **Partikel-System**: Tausende von Partikeln mit realistischer Physik
- **Raumzeit-Gitter**: Visualisierung der gekrümmten Raumzeit
- **Interaktive Steuerung**: Maus, Tastatur und Touch-Unterstützung
- **Performance-Monitoring**: FPS und Render-Zeit Anzeige

## 🚀 Installation & Start

1. **Repository klonen:**
   ```bash
   git clone <repository-url>
   cd BlackHoleAnimation
   ```

2. **Dateien öffnen:**
   - Öffne `index.html` in einem modernen Webbrowser
   - Oder starte einen lokalen Server:
     ```bash
     python -m http.server 8000
     # Dann öffne http://localhost:8000
     ```

## 🎮 Steuerung

### Maus
- **Linksklick + Ziehen**: Kamera drehen
- **Scrollrad**: Zoomen ein/aus

### Tastatur
- **W/A/S/D**: Kamera bewegen
- **Q/E**: Kamera rollen
- **Leertaste**: Simulation pausieren/fortsetzen

## ⚙️ Einstellungen

### Schwarzes Loch
- **Masse**: 1.0 - 20.0 (beeinflusst Ereignishorizont und Gravitation)
- **Partikel-Anzahl**: 100 - 5000 (Performance vs. Detail)
- **Simulations-Geschwindigkeit**: 0.1x - 3.0x

### Visualisierung
- **Raumzeit-Gitter**: Zeigt gekrümmte Raumzeit an
- **Akkretionsscheibe**: Materie-Ring um das Schwarze Loch
- **Gravitationslinseneffekt**: Lichtkrümmung um das Schwarze Loch
- **Ereignishorizont**: Schwarze Kugel des Schwarzen Lochs

## 🔬 Technische Details

### Physik
- **Relativistische Gravitation**: Vereinfachte Einsteinsche Feldgleichungen
- **Partikel-Trajektorien**: Orbitalbewegung mit Gravitationskraft
- **Ereignishorizont**: Partikel fallen ins Schwarze Loch

### Rendering
- **WebGL/Three.js**: Hardware-beschleunigte 3D-Grafik
- **Partikel-System**: GPU-optimierte Partikel-Darstellung
- **Beleuchtung**: Realistische Licht- und Schatten-Effekte

### Performance
- **60 FPS Ziel**: Optimierte Render-Loop
- **Adaptive Partikel**: Dynamische Partikel-Anzahl
- **Level-of-Detail**: Verschiedene Detail-Stufen

## 🏗️ Projektstruktur

```
BlackHoleAnimation/
├── index.html          # Haupt-HTML-Datei mit UI
├── main.js            # 3D-Simulation und Physik
└── README.md          # Diese Dokumentation
```

## 🎯 Inspirationsquellen

Diese Simulation wurde inspiriert von:
- [kavan010/black_hole](https://github.com/kavan010/black_hole) - C++ Schwarze Loch Simulation
- Einsteinsche Relativitätstheorie
- Astrophysikalische Beobachtungen von Schwarzen Löchern

## 🔧 Entwicklung

### Abhängigkeiten
- **Three.js**: 3D-Grafik-Bibliothek
- **WebGL**: Hardware-beschleunigte Grafik
- **Moderne Browser**: Chrome, Firefox, Safari, Edge

### Erweiterte Features (geplant)
- [ ] Mehrere Schwarze Löcher
- [ ] Verschmelzung von Schwarzen Löchern
- [ ] Gravitationswellen-Simulation
- [ ] VR-Unterstützung
- [ ] Export von Animationen

## 📊 Performance-Optimierung

- **Partikel-Culling**: Nur sichtbare Partikel rendern
- **LOD-System**: Verschiedene Detail-Stufen je nach Entfernung
- **Frustum-Culling**: Nur sichtbare Objekte verarbeiten
- **Batch-Rendering**: Partikel in Gruppen rendern

## 🌟 Besondere Effekte

### Gravitationslinseneffekt
- Mehrere konzentrische Ringe um das Schwarze Loch
- Simulation der Lichtkrümmung durch starke Gravitation
- Dynamische Anpassung basierend auf Masse

### Akkretionsscheibe
- Realistischer Materie-Ring um das Schwarze Loch
- Glühen und Wärme-Emission
- Dynamische Größe basierend auf Masse

### Raumzeitkrümmung
- 3D-Gitter zeigt gekrümmte Raumzeit
- Vertikale Linien zeigen Gravitationswirkung
- Dynamische Anpassung an Masse-Änderungen

## 🐛 Bekannte Probleme

- **Mobile Performance**: Auf schwächeren Geräten kann die Performance leiden
- **Browser-Kompatibilität**: Benötigt WebGL-Unterstützung
- **Partikel-Limit**: Sehr hohe Partikel-Anzahl kann Browser einfrieren

## 🤝 Beitragen

Verbesserungsvorschläge und Bug-Reports sind willkommen!

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

---

**Entwickelt mit ❤️ und JavaScript für die Wissenschaft**
