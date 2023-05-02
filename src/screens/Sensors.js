import Paho from "paho-mqtt";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function Sensors() {
    let client;
    client = new Paho.Client(
        "broker.hivemq.com",
        Number(8000),
        `client-id-${parseInt(Math.random() * 100)}`
    );

    const topic1 = 'sensor-status/motion';
    const topic2 = 'sensor-status/button';
    const [message, setMessage] = useState('')
    const [message2, setMessage2] = useState('')


    function onMessage(message) {
        if (message.destinationName === topic1)
            setMessage(message.payloadString);
        if (message.destinationName === topic2)
            setMessage2(message.payloadString);
    }

    function publishTopic(topic, message) {
// Create a new MQTT message
        const newMessage = new Paho.Message(message);
        newMessage.destinationName = topic;

// Publish the new message
        client.send(newMessage);
    }

    useEffect(() => {
        client.connect( {
            onSuccess: () => {
                console.log("Connected!");
                client.subscribe(topic1);
                client.subscribe(topic2);
                client.onMessageArrived = onMessage;
            },
            onFailure: () => {
                console.log("Failed to connect!");
            }
        });
        return () => {
            client.disconnect();
        };
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <MaterialCommunityIcons name="motion-sensor" size={24} color="white" />
                        <Text>Motion sensor status is: {message}</Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <Ionicons name="radio-button-on" size={24} color="white" />
                        <Text>Button status is: {message2}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default Sensors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
//alignItems: 'center',
//justifyContent: 'center',
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
    }
});