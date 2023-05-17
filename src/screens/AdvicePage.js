import React from 'react';
//eslint-disable-next-line no-unused-vars
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AdvicePage() {
    return (

        <View style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.pageTitle}>Advice</Text>
            </View>

            <View style={styles.adviceSection}>
                <Text style={styles.pageDesc}>Tips to make your home secure</Text>
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.contentContainer}>

                    <View>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80' }}
                            style={styles.image}
                        />

                    </View>

                    <View style={styles.adviceSection}>
                        <Text style={styles.sectionTitle}>Follow the &quot;S-A-F-E&quot; rules</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                            <MaterialCommunityIcons name="cctv" size={24} color="black" />
                            <Text style={styles.itemText}>Security cameras installed and running</Text>
                        </View>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                            <MaterialCommunityIcons name="shield-lock" size={24} color="blue" />
                            <Text style={styles.itemText}>Alarm system installed and armed</Text>
                        </View>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                            <MaterialCommunityIcons name="home-lock" size={24} color="green" />
                            <Text style={styles.itemText}>Fortification of entryways in the house</Text>
                        </View>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                            <MaterialCommunityIcons name="alert" size={24} color="red" />
                            <Text style={styles.itemText}>Evaluation of risks to keep house secure</Text>
                        </View>
                    </View>

                    <View style={styles.adviceSection}>
                        <Text style={styles.sectionTitle}>Smart Alarm version 2.0</Text>
                    </View>

                    <View style={styles.adviceSection}>
                        <Text style={[styles.pageDesc, { fontSize: 16 }]}>Launching in August, 2023</Text>
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

            </ScrollView>
        </View>

    );
}

export default AdvicePage;

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        paddingVertical: 10, marginHorizontal: 10
    },
    pageDesc: { color: '#797979',
        fontSize: 25,
        fontWeight: '300',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemText: {
        marginLeft: 10,
    },
    itemContainer: {
        paddingTop: 10,
        backgroundColor: '#7CC6FE',
        shadowRadius: 3,
        shadowOpacity: '10%',
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#d8d8d8',
        elevation: 2,
        borderRadius: 20,
        padding: 10,
        marginTop: 5,
        marginBottom: 5
    },
    image: {
        width: 400,
        height: 200,
        alignSelf: 'center',
    },
    /*textContainer: {
        paddingTop: 10,
        backgroundColor: '#ffffff',
        shadowRadius: 3,
        shadowOpacity: '10%',
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#d8d8d8',
        elevation: 2,
        borderRadius: 20,
        padding: 10,
        marginTop: 5,
        marginBottom: 5
    },*/
});