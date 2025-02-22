import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const MQTTComponent = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const newClient = mqtt.connect('asgoerni-iot-hub.azure-devices.net:8883');

    newClient.on('connect', () => {
      console.log('connected');
      newClient.subscribe('devices/esp32_led/messages/events', (err) => {
        if (!err) {
          console.log('subscribed to devices/esp32_led/messages/events');
        }
      });
    });

    newClient.on('message', (topic, payload) => {
      console.log('message received:', payload.toString());
      setReceivedMessage(payload.toString());
    });
    setClient(newClient)
    return () => {
        newClient.end()
    }
  }, []);

  const publishMessage = () => {
    if (client) {
      client.publish('devices/esp32_led/messages/events', message);
    }
  };

  return (
    <div>
      <h2>MQTT Example</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={publishMessage}>Publish</button>
      <p>Received Message: {receivedMessage}</p>
    </div>
  );
};

export default MQTTComponent;

