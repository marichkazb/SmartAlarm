import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Card, { printMessage } from '../components/Card';

function Test() {

    const onBtnPress = () => {
        console.log('Hello World');
    };

    const petsArray = [
        {
            id: 1,
            name: 'Sausage Dog',
            color: 'pink',
            isHappy: true
        },
        {
            id: 2,
            name: 'Pirate Parrot',
            color: 'yellow',
            isHappy: true
        },
        {
            id: 3,
            name: 'Fluffy Hamster',
            color: 'blue',
            isHappy: true
        },
        {
            id: 4,
            name: 'Grumpy Cat',
            color: 'brown',
            isHappy: false
        }
    ];

    const renderItem = item => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.desc}>Color: {item.color}</Text>
                    <Ionicons name="color-palette" size={24} color={item.color} />
                </View>
                <View style={styles.itemWrapper}>
                    <Text style={item.isHappy ? styles.happy : styles.sad}>{item.isHappy ? 'Happy' : 'Sad ;('}</Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.pageContainer}>
                <Text style={styles.pageTitle}>Test Screen</Text>
                <Text style={styles.pageDesc}>This is our test screen in the App!</Text>
                <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
                    {petsArray.map(item => renderItem(item))}
                </ScrollView>
            </View>
            <View>
                <Text>Test Screen</Text>
                <Button onPress={printMessage} variant="subtle" colorScheme="blue">Test</Button>
                <Card title="Beyonce" />
                <Card title="Shakira" />
                <Card title="Pikachu" />
                <Card title="Agrima" />
                <Card title="Superman" />
                <Card title="Rihanna" />
                <Card title="🦋" />

            </View>
        </ScrollView>
    );
}

export default Test;


const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    pageContainer: {
        padding: 10,
    },
    pageTitle: {
        fontSize: 50,
        fontWeight: '700',
    },
    pageDesc: {
        color: '#797979',
        fontSize: 25,
        fontWeight: '300',
    },
    happy: {
        color: '#06891b'
    },
    sad: {
        color: '#f88383'
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 20,
        margin: 10,
        backgroundColor: 'rgba(97,224,206,0.4)',
    },
    title: {
        fontSize: 30,
        fontWeight: '400',
        maxWidth: '70%'
    },
    desc: {
        paddingLeft: 2,
        paddingTop: 5,
        fontSize: 17,
        fontWeight: '200'
    }
});
