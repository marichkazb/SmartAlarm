import Paho from 'paho-mqtt';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function Sensors() {
    const client = new Paho.Client(
        'broker.hivemq.com',
        Number(8000),
        `client-id-${parseInt(Math.random() * 100)}`
    );

    const topic1 = 'sensor-status/motion';
    const topic2 = 'sensor-status/greenLED';
    const topic3 = 'sensor-status/redLED';
    const topic4 = 'sensor-status/angleSensor';
    const [message, setMessage] = useState('not connected');
    const [message2, setMessage2] = useState('not connected');
    const [message3, setMessage3] = useState('not connected');
    const [message4, setMessage4] = useState('not connected');

    function onMessage(message) {
        if (message.destinationName === topic1) setMessage(message.payloadString);
        if (message.destinationName === topic2) setMessage2(message.payloadString);
        if (message.destinationName === topic3) setMessage3(message.payloadString);
        if (message.destinationName === topic4) setMessage4(message.payloadString);
    }

    // eslint-disable-next-line no-unused-vars
    function publishTopic(topic, message) {
        // Create a new MQTT message
        const newMessage = new Paho.Message(message);
        newMessage.destinationName = topic;

        // Publish the new message
        client.send(newMessage);
    }

    useEffect(() => {
        client.connect({
            onSuccess: () => {
                console.log('Connected!');
                client.subscribe(topic1);
                client.subscribe(topic2);
                client.subscribe(topic3);
                client.subscribe(topic4);
                client.onMessageArrived = onMessage;
            },
            onFailure: () => {
                console.log('Failed to connect!');
            }
        });
        return () => {
            client.disconnect();
        };
    });
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
        },
        contentContainer: {
            paddingVertical: 10, marginHorizontal: 10
        },
        itemWrapper: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
        },
        itemContainer: {
            paddingTop: 20,
            backgroundColor: '#7CC6FE',
            shadowRadius: 3,
            shadowOpacity: '10%',
            shadowOffset: { width: 0, height: 4 },
            shadowColor: '#d8d8d8',
            elevation: 2,
            borderRadius: 20,
            padding: 20,
            marginBottom: 20
        },
        titleContainer: {
            padding: 10,
        },
        pageTitle: {
            fontSize: 50,
            fontWeight: '700',
            color: colorScheme === 'light' ? 'black' : 'white',
        },
        pageDesc: { color: '#797979',
            fontSize: 25,
            fontWeight: '300',
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.pageTitle}>Sensors</Text>
                <Text style={styles.pageDesc}>View the status of the sensors</Text>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <MaterialCommunityIcons name="motion-sensor" size={24} color="white" />
                        <Text>Motion sensor status is: {message}</Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <MaterialCommunityIcons name="led-off" size={24} color="#09814A" />
                        <Text>Green LED status is: {message2}</Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <MaterialCommunityIcons name="led-off" size={24} color="#ED474A" />
                        <Text>Red LED status is: {message3}</Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <MaterialCommunityIcons name="spirit-level" size={24} color="white" />
                        <Text>Angle sensor status is: {message4}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Sensors;
