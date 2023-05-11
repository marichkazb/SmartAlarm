import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {
    Button,
    HStack,
    Switch, // eslint-disable-line no-unused-vars
    Avatar,
    Center,
    Progress,
    IconButton,
    CloseIcon,
    VStack,
    Alert,
    Collapse, Box,
} from 'native-base';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Paho from 'paho-mqtt';
import homeImage from '../assets/HomeBackground.png';

function Home(props) {
    const [show, setShow] = React.useState(false);
    const { navigation } = props;

    const client = new Paho.Client(
        'broker.hivemq.com',
        Number(8000),
        `client-id-${parseInt(Math.random() * 100)}`
    );

    const topic = 'sensor-status/alarm';
    const [message, setMessage] = useState('not connected');

    function onMessage(message) {
        if (message.destinationName === topic) setMessage(message.payloadString);
    }

    useEffect(() => {
        client.connect({
            onSuccess: () => {
                console.log('Connected!'); // eslint-disable-line no-console
                client.subscribe(topic);
                client.onMessageArrived = onMessage;
            },
            onFailure: () => {
                console.log('Failed to connect!'); // eslint-disable-line no-console
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
            </ScrollView>
            <View style={styles.alertContainer}>
                <Text style={styles.text}>Test alert by clicking this button!</Text>
                <Button
                    size="sm" onPress={() => setShow(true)} mt={8} mx="auto" style={{ top: -15 }}
                    colorScheme="blue">
                    Open
                </Button>
            </View>
            <Box w="100%" alignItems="center" justifyContent="center">
                <Collapse isOpen={show}>
                    <Alert w="100%" status="success">
                        <VStack space={2} flexShrink={1} w="100%" alignItems="center">
                            <HStack flexShrink={1} space={2} justifyContent="space-between" alignItems="center">
                                <HStack space={3} flexShrink={1}>
                                    <Alert.Icon mt="1" status="success" style={{ bottom: 5 }} />
                                    <Text fontSize="md" color="coolGray.800">
                                        Congrats, you opened alert!
                                    </Text>
                                </HStack>
                                <IconButton
                                    variant="top-accent" _focus={{
                                        borderWidth: 0
                                    }} icon={<CloseIcon size="3" />} _icon={{
                                        color: 'coolGray.600' }} onPress={() => setShow(false)}
                                />
                            </HStack>
                        </VStack>
                    </Alert>
                </Collapse>
            </Box>
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
    },
    alertContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    }
});
