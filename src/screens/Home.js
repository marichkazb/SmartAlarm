import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {
    Button,
    HStack,
    Avatar,
    Center,
    Progress
} from 'native-base';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Paho from 'paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import homeImage from '../assets/HomeBackground.png';
import { HISTORY_DB } from '../constants';

function Home(props) {
    const { navigation } = props;

    const client = new Paho.Client(
        'broker.hivemq.com',
        Number(8000),
        `client-id-${parseInt(Math.random() * 100)}`
    );

    const topic = 'sensor-status/alarm';
    const angleTopic = 'sensor-status/angleSensor';
    const motionTopic = 'sensor-status/motion';

    const [message, setMessage] = useState('not connected');

    function onMessage(message) {
        if (message.destinationName === topic) setMessage(message.payloadString);
        if (message.destinationName === angleTopic) {
            setHistoryData(getAngleObject(new Date()));
        }
        if (message.destinationName === motionTopic) {
            setHistoryData(getMotionObject(new Date()));
        }
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
                client.onMessageArrived = onMessage;
            },
            onFailure: () => {
                console.log('Failed to connect!');
            }
        });
        return () => {
            client.disconnect();
        };
    },);

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
            <Text style={[styles.pageTitle, { paddingBottom: 15 }]}>Control Panel</Text>
            <ScrollView horizontal={true} style={{ flex: 1 }} pagingEnabled={true}>
                <Center
                    p="5" m="2" borderRadius="md" bg="white" shadow="3"
                    rounded="lg" shaddow="1">
                    <MaterialIcons name="security" size={50} color="#2420FF" style={{ paddingBottom: 10 }} />
                    <Text>Current status:</Text>
                    <Text>{message}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button style={{ backgroundColor: '#D8E59E', padding: 10, borderRadius: 5, marginRight: 10 }} onPress={() => turnOn()}>
                            <Text style={{ color: '#44601A' }}>Turn on</Text>
                        </Button>
                        <Button style={{ backgroundColor: '#F3BBB9', padding: 10, borderRadius: 5 }} onPress={() => turnOff()}>
                            <Text style={{ color: '#E15551' }}>Turn off</Text>
                        </Button>
                    </View>

                </Center>
                <Center
                    p="5" m="2" borderRadius="md" bg="white" shadow="3"
                    rounded="lg" shaddow="1">
                    <MaterialIcons name="history" size={55} color="#2420FF" style={{ paddingBottom: 30 }} />
                    <Button onPress={() => navigation.navigate('History')} variant="subtle" colorScheme="blue">View history</Button>
                </Center>
                <Center
                    p="5" m="2" borderRadius="md" bg="white" shadow="3"
                    rounded="lg" shaddow="1">
                    <HStack justifyContent="center" flexDirection="column" alignItems="center" width={100} >
                        <Ionicons name="ios-settings-outline" size={55} color="#2420FF" style={{ paddingBottom: 30 }} />
                        <Button onPress={() => navigation.navigate('Settings')} variant="subtle" colorScheme="blue">Settings</Button>
                    </HStack>
                </Center>
                <Center
                    p="5" m="2" borderRadius="md" bg="white" shadow="3"
                    rounded="lg" shaddow="1">
                    <HStack justifyContent="center" flexDirection="column" alignItems="center" width={100} >
                        <MaterialCommunityIcons name="motion-sensor" size={55} color="#2420FF" style={{ paddingBottom: 30 }} />
                        <Button onPress={() => navigation.navigate('Sensors')} variant="subtle" colorScheme="blue">Sensors</Button>
                    </HStack>
                </Center>
                <Center
                    p="5" m="2" borderRadius="md" bg="white" shadow="3"
                    rounded="lg" shaddow="1">
                    <HStack justifyContent="center" flexDirection="column" alignItems="center" width={100} >
                        <MaterialCommunityIcons name="alert" size={55} color="#dc143c" style={{ paddingBottom: 30 }}  />
                        <Button onPress={() => navigation.navigate('Emergency')} variant="subtle" colorScheme="red">Emergency</Button>
                    </HStack>
                </Center>
                <Center
                    p="5" m="2" borderRadius="md" bg="white" shadow="3"
                    rounded="lg" shaddow="1">
                    <HStack justifyContent="center" flexDirection="column" alignItems="center" width={100} >
                        <MaterialCommunityIcons name="information-outline" size={55} color="#2420FF" style={{ paddingBottom: 30 }}  />
                            <Button onPress={() => navigation.navigate('AdvicePage')} variant="subtle" colorScheme="blue">Advice</Button>
                    </HStack>
                </Center>
            </ScrollView>
            <Button
                size="sm" onPress={() => {
                    setHistoryData(getAngleObject(new Date()));
                }
                } mt={8} mx="auto" style={{ top: -15 }}
                colorScheme="blue">
                Add history item
            </Button>
            <Text style={styles.text}>Your progress in completing your profile: </Text>
            <Progress value={85} mx="4" colorScheme="blue" size="md" />
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
    }
});
