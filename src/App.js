import React, { useState, useEffect } from 'react';
// import mqtt from 'mqtt';
import * as mqtt from 'paho-mqtt'


const MQTTComponent = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    // const newClient = mqtt.connect('asgoerni-iot-hub.azure-devices.net:8883');
    const client = new mqtt.Client('esp32_led'); // Replace 'clientId' with a unique identifier

    client.connect({ 

      host: 'asgoerni-iot-hub.azure-devices.net', 
    
      port: 8883,
    
      clientId: 'esp32_led', 
    
      username: 'asgoerni-iot-hub.azure-devices.net/esp32_led/?api-version=2021-04-12', 
    
      password: 'SharedAccessSignature sr=asgoerni-iot-hub.azure-devices.net%2Fdevices%2Fesp32_led&sig=L%2BptEo%2Bc2AVPB8fpdKxvemK3RgdxQv7WfWot1c%2Bc6QU%3D&se=1740256938'
    
    });
    

    client.onConnect = () => {

      console.log('Connected to Azure IoT Hub');
    
      client.subscribe('devices/esp32_led/messages/events/', (err) => {
        if (!err) {
          console.log('subscribed to devices/esp32_led/messages/events');
        }
      });

    };
    
    // newClient.on('connect', () => {
    //   console.log('connected');
    //   newClient.subscribe('devices/esp32_led/messages/events', (err) => {
    //     if (!err) {
    //       console.log('subscribed to devices/esp32_led/messages/events');
    //     }
    //   });
    // });

    client.onMessage = (message) => {

      console.log('Received message:', message.payload.toString());
    
      // Update your React UI with the received data
      setReceivedMessage(message.payload.toString());
    
    };
    

    // newClient.on('message', (topic, payload) => {
    //   console.log('message received:', payload.toString());
    //   setReceivedMessage(payload.toString());
    // });
    // setClient(newClient)
    return () => {
        // newClient.end()
        client.end()
    }
  }, []);

  
  const publishMessage = () => {
    if (client) {
      // client.publish('devices/esp32_led/messages/events', message);
      client.publish('devices/esp32_led/messages/devicebound/#', message);
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

