import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {
    Button,
    HStack,
    Avatar,
    Center,
    Progress
} from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Paho from 'paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import homeImage from '../assets/HomeBackground.png';
import { HISTORY_DB } from '../constants';



const HISTORY_UPDATE_INTERVAL = 180000; //180000 ms = 3 min
function Home(props) {
    const { navigation } = props;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const client = new Paho.Client(
    'wss://broker.hivemq.com:8000/mqtt', // Use 'wss' protocol and specify the port
    `client-id-${parseInt(Math.random() * 100)}`,
);

    const topic = 'sensor-status/alarm';
    const angleTopic = 'sensor-status/angleSensor';
    const motionTopic = 'sensor-status/motion';

    const [message, setMessage] = useState('not connected');

    let angleTimeoutPassed = true;
    let motionTimeoutPassed = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function onMessage(message) {
        if (message.destinationName === topic) {
            setMessage(message.payloadString);
        } else if (message.destinationName === angleTopic && angleTimeoutPassed) {
            setHistoryData(getAngleObject(new Date()));
            angleTimeoutPassed = false;
        } else if (message.destinationName === motionTopic && motionTimeoutPassed) {
            motionTimeoutPassed = false;
            setHistoryData(getMotionObject(new Date()));
        }
        setTimeout(() => angleTimeoutPassed = true, HISTORY_UPDATE_INTERVAL); //the message of detecting intrusion will be added once in 3 min
        setTimeout(() => motionTimeoutPassed = true, HISTORY_UPDATE_INTERVAL); //the message of detecting motion will be added once in 3 min
    }
    const formatTime = date => date.toTimeString().slice(0, 8);

    const getAngleObject = date => ({
        id: Math.random() * 10000,
        date: date.toString().slice(4, 15),
        time: formatTime(date),
        title: 'Security Alarm Triggered',
        desc: 'Unauthorized attempt to tamper with the security alarm system was detected',
        resolved: false
    });

    const getMotionObject = date => ({
        id: Math.random() * 10000,
        date: date.toString().slice(4, 15),
        time: formatTime(date),
        title: 'Motion detected',
        desc: 'Security alarm detected motion within the secured area',
        resolved: false
    });

    const setHistoryData = async jsonData => {
        try {
            const existingDatabase = await AsyncStorage.getItem(HISTORY_DB);
            const parsedData = existingDatabase ? JSON.parse(existingDatabase) : [];
            parsedData.push(jsonData);
            await AsyncStorage.setItem(HISTORY_DB, JSON.stringify(parsedData));
            console.log('Data added successfully.');
        } catch (e) {
            console.log('Error updating storeData:', e);
        }
    };

    useEffect(() => {
        client.connect({
            onSuccess: () => {
                console.log('Connected!');
                client.subscribe(topic);
                client.subscribe(angleTopic);
                client.subscribe(motionTopic);
                client.onMessageArrived = onMessage;
            },
            onFailure: () => {
                console.log('Failed to connect!');
            }
        });
        return () => {
            client.disconnect();
        };
    }, [client, onMessage, message]);

    function publishTopic(topic, message) {
        const newMessage = new Paho.Message(message);
        newMessage.destinationName = topic;
        client.send(newMessage);
    }

    const turnOn = () => {
        if (!client.isConnected()) {
            client.connect();
        }
        const topic ='wio-command/alarm-activation';
        const message ='on';
        publishTopic(topic, message);
    };

    const turnOff = () => {
        if (!client.isConnected()) {
            client.connect();
        }
        const topic ='wio-command/alarm-activation';
        const message ='off';
        publishTopic(topic, message);
    };

    const renderCard = (navigationRoute, icon, title) => (
        <Center
            p="5" m="2" borderRadius="md" bg="white" shadow="3"
            rounded="lg" shaddow="1">
            <HStack justifyContent="center" flexDirection="column" alignItems="center" width={100} >
                <MaterialCommunityIcons name={icon} size={55} color="#2420FF" style={{ paddingBottom: 30 }} />
                <Button onPress={() => navigation.navigate(navigationRoute)} variant="subtle" colorScheme="blue">{title}</Button>
            </HStack>
        </Center>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.pageTitle}>Home</Text>
                <Avatar
                    bg="cyan.500" source={{
                        uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                    }}>
                    TE
                </Avatar>
            </View>
            <View style={styles.imageContainer}>
                <Image source={homeImage} style={styles.image} resizeMode="contain" />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={[styles.pageTitle, styles.panelTitle]}>Control Panel</Text>
                <MaterialIcons name="history" size={45} color="#2420FF" style={styles.historyIcon} onPress={() => navigation.navigate('History')} />
            </View>
            <ScrollView horizontal={true} style={styles.flex} pagingEnabled={true}>
                <Center
                    p="5" m="2" borderRadius="md" bg="white" shadow="3"
                    rounded="lg" shaddow="1">
                    <MaterialIcons name="security" size={50} color="#2420FF" style={styles.securityIcon} />
                    <Text>Current status:</Text>
                    <Text>{message}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button style={styles.btnOn} onPress={() => turnOn()}>
                            <Text style={{ color: '#44601A' }}>Turn on</Text>
                        </Button>
                        <Button style={styles.btnOff} onPress={() => turnOff()}>
                            <Text style={{ color: '#E15551' }}>Turn off</Text>
                        </Button>
                    </View>
                </Center>

                {renderCard('Sensors', 'motion-sensor', 'Sensors')}
            </ScrollView>
            <Text style={[styles.pageTitle, styles.moreTitle]}>Find out more:</Text>
            <ScrollView horizontal={true} style={styles.flex} pagingEnabled={true}>
                {renderCard('AdvicePage', 'information-outline', 'Advice')}
                {renderCard('NewVersion', 'shield-home-outline', 'Version 2.0')}
            </ScrollView>
            <Text style={styles.text}>Your progress in completing profile: </Text>
            <Progress value={85} mx="4" colorScheme="blue" size="md" />
            <View style={styles.divider} />
        </ScrollView>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        padding: 10
    },
    headerContainer: {
        alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: '400',
        flex: 1
    },
    text: {
        fontSize: 20,
        fontWeight: '300',
        color: '#515151',
        paddingVertical: 20
    },
    imageContainer: {
        width: 380,
        height: 270
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'relative',
        left: 10,
        right: 10
    },
    btnOn: {
        backgroundColor: '#D8E59E',
        padding: 10,
        borderRadius: 5,
        marginRight: 10
    },
    btnOff: {
        backgroundColor: '#F3BBB9',
        padding: 10,
        borderRadius: 5
    },
    historyIcon: {
        paddingBottom: 15,
        right: 10
    },
    divider: {
        marginBottom: 200
    },
    securityIcon: {
        paddingBottom: 10
    },
    flex: {
        flex: 1
    },
    moreTitle: {
        paddingBottom: 15,
        marginTop: 30
    },
    panelTitle: {
        paddingBottom: 15
    }
});
