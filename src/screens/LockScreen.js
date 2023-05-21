/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';

import { ScrollView, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, useColorScheme } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { state } from './NewPassword.js';
import { PassVisibility } from '../lib/passVisibility';

function LockScreen({ navigation }) {
    const [password, setPassword] = useState();
    const [error, setError] = useState('');
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    PassVisibility();

    const handleUnlock = () => {
        if (password === state.userPass) {
            navigation.navigate('Home');
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: '10%',
            backgroundColor: colorScheme === 'light' ? 'white' : 'black',
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            backgroundColor: colorScheme === 'light' ? '#C0C0C0' : '#333',
            color: colorScheme === 'dark' ? '#C0C0C0' : '#000',
        },
        unlockBtn: {
            backgroundColor: colorScheme === 'light' ? '#FFF' : '#2420FF',
            padding: 15,
            alignItems: 'center',
            marginLeft: '30%',
            marginRight: '30%',
            borderRadius: 5,
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowOpacity: 2,
        },
        error: {
            padding: 13,
            color: colorScheme === 'dark' ? '#FFF' : '#2420FF',
        },
        unlockText: {
            fontWeight: 'bold',
            fontSize: 20,
            color: colorScheme === 'dark' ? '#FFF' : '#2420FF',
            backgroundColor: colorScheme === 'light' ? '#FFF' : '#2420FF',
        },
        icon: {
            color: colorScheme === 'dark' ? '#FFF' : '#2420FF',
            fontSize: 22,
        }
    });

    return (
        <ScrollView style={styles.container}>
            <TextInput
                secureTextEntry={passwordVisibility}
                style={styles.input}
                inputMode="text"
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
            />
            <Pressable onPress={handlePasswordVisibility} style={{ paddingLeft: 330 }}>

                <MaterialCommunityIcons name={rightIcon} size={22} style={styles.icon} />
            </Pressable>


            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity onPress={handleUnlock} style={styles.unlockBtn}>
                <Text style={styles.unlockText}>Unlock</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default LockScreen;


