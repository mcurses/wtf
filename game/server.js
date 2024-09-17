const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

const cars = {};

wss.on("connection", (ws) => {
  // Ein neuer Client hat sich verbunden

  // Eine eindeutige ID für den Client generieren
  const clientId = generateClientId();

  // Das Auto des Clients initialisieren
  cars[clientId] = {
    id: clientId,
    x: 0,
    y: 0,
    rotation: 0,
    speed: 0,
  };

  // Die initialen Daten an den Client senden
  ws.send(JSON.stringify({ type: "init", clientId, cars }));

  ws.on("message", (message) => {
    // Nachrichten vom Client empfangen und verarbeiten

    const data = JSON.parse(message);

    if (data.type === "update") {
      // Aktualisierte Daten für das Auto des Clients erhalten
      const { x, y, rotation, speed } = data;
      cars[clientId] = { ...cars[clientId], x, y, rotation, speed };

      // Die aktualisierten Daten an alle anderen Clients senden
      broadcast(JSON.stringify({ type: "update", car: cars[clientId] }));
    }
  });

  ws.on("close", () => {
    // Der Client hat die Verbindung geschlossen

    // Das Auto des Clients entfernen
    delete cars[clientId];

    // Die Information an alle anderen Clients senden
    broadcast(JSON.stringify({ type: "remove", clientId }));
  });
});

function broadcast(message) {
  // Die Nachricht an alle verbundenen Clients senden
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function generateClientId() {
  // Eine zufällige ID generieren (einfaches Beispiel)
  return Math.random().toString(36).substr(2, 8);
}
