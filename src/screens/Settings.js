import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


function Settings() {
    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.pageTitle}>Settings</Text>
                <Ionicons name="ios-settings-outline" size={30} color="black" />
            </View>
        </ScrollView>
    );
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        padding: 10
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: '400',
        flex: 1
    }
});
