import React from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
    Button,
} from 'native-base';

function Settings() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colorScheme === 'light' ? 'white' : 'black',
            paddingTop: 30,
            padding: 10
        },
        pageTitle: {
            fontSize: 40,
            fontWeight: '400',
            flex: 1,
            color: colorScheme === 'light' ? 'black' : 'white',
        }
    });

    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', paddingBottom: '5%' }}>
                <Text style={styles.pageTitle}>Settings</Text>
                <Ionicons name="ios-settings-outline" size={30} color="black" />
                <Button onPress={() => navigation.navigate('NewPassword')} variant="subtle" colorScheme="blue">Set New Password</Button>
            </View>
        </ScrollView>
    );
}

export default Settings;
