import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Appearance,git  TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
    Button,
} from 'native-base';

function Settings() {
    const navigation = useNavigation();

    const [colorScheme, setColorScheme] = useState(
        Appearance.getColorScheme() || 'light'
    );

    useEffect(() => {
        const subscription = Appearance.addChangeListener(nextColorScheme => {
            setColorScheme(nextColorScheme.colorScheme);
            console.log('The new color scheme is:', nextColorScheme.colorScheme);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const toggleColorScheme = () => {
        const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
        setColorScheme(newColorScheme);
    };


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
        },
        textDis: {
            fontSize: 20,
            color: colorScheme === 'light' ? 'black' : 'white',
            paddingBottom: '2%',
        },
        themeBtn: {
            backgroundColor: colorScheme === 'light' ? '#b7c9e2' : '#00008B',
            padding: 12,
            borderRadius: 5,
        },
        btnText: {
            color: colorScheme === 'dark' ? '#fff' : '#00008B',
            textAlign: 'center',
        }
    });

    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', paddingBottom: '5%' }}>
                <Text style={styles.pageTitle}>Settings</Text>
                <Ionicons name="ios-settings-outline" size={30} color="black" />
            </View>
            <View>
                <Button onPress={() => navigation.navigate('NewPassword')} variant="subtle" colorScheme="blue">Set New Password</Button>
            </View>
            <View style={{ paddingTop: '3%', paddingBottom: '2%' }}>
                <Text style={styles.textDis}>Current color scheme: {colorScheme}</Text>
                <TouchableOpacity style={styles.themeBtn} onPress={() => toggleColorScheme()}>
                    <Text style={styles.btnText}>Change theme</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Settings;
