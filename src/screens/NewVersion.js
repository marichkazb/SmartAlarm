import React from 'react';
import { StyleSheet, Text, View, Image, useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function NewVersion() {

    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        pageTitle: {
            fontSize: 40,
            fontWeight: '400',
            flex: 1,
            color: colorScheme === 'light' ? 'black' : 'white',
        },
        container: {
            flex: 1,
            backgroundColor: colorScheme === 'light' ? 'white' : 'black',
        },
        pageDesc: { color: '#797979',
            fontSize: 25,
            fontWeight: '300',
            marginLeft: 15,
        },
        itemWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            color: colorScheme === 'light' ? 'black' : 'white',

        },
        itemText: {
            marginLeft: 10,
            fontSize: 20,
            color: colorScheme === 'light' ? 'black' : 'white',
        },
        itemContainer: {
            paddingTop: 30,
            backgroundColor: colorScheme === 'light' ? 'white' : 'black',
            shadowRadius: 3,
            shadowOpacity: '10%',
            shadowOffset: { width: 0, height: 4 },
            shadowColor: '#d8d8d8',
            elevation: 2,
            borderRadius: 30,
            padding: 20,
            marginTop: 20,
            marginBottom: 20
        },
        image: {
            width: 430,
            height: 215,
            alignSelf: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 30, marginLeft: 15 }}>
                <Text style={styles.pageTitle}>Smart Alarm 2.0</Text>
            </View>

            <View>
                <Text style={styles.pageDesc}>Launching in August, 2023</Text>
            </View>

            <View>
                <Image
                    source={{ uri: 'https://www.datocms-assets.com/10154/1557442735-cove-products.jpg?auto=format' }}
                    style={styles.image}
                />
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.itemWrapper}>
                    <Text style={[styles.itemText, { fontWeight: 'bold' }]}>New features include:</Text>
                </View>

                <View style={{ borderBottomWidth: 1, borderColor: '#000000' }} />
                <View style={styles.itemWrapper}>
                    <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color="green" />
                    <Text style={styles.itemText}>AI based alerts</Text>
                </View>
                <View style={styles.itemWrapper}>
                    <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color="green" />
                    <Text style={styles.itemText}>Voice recognition</Text>
                </View>

                <View style={styles.itemWrapper}>
                    <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color="green" />
                    <Text style={styles.itemText}>Facial recognition</Text>
                </View>

                <View style={styles.itemWrapper}>
                    <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color="green" />
                    <Text style={styles.itemText}>Temperature and humidity monitoring</Text>
                </View>

                <View style={styles.itemWrapper}>
                    <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color="green" />
                    <Text style={styles.itemText}>Plant monitoring in home</Text>
                </View>

            </View>
        </View>

    );
}

export default NewVersion;
