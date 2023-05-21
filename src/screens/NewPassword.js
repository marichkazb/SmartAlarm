import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Pressable, useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PassVisibility } from '../lib/passVisibility';
import { PassVisibility_ } from '../lib/passVisibility_';

const userPass = '1'; // 1 is the default password when a new user uses the app
const state = {
    userPass
}; // this allows for the password value to be used in LockScreen.js

function NewPassword({ navigation }) {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    PassVisibility();
    const { passwordVisibility_, rightIcon_, handlePasswordVisibility_ } =
    PassVisibility_();
    const [error, setError] = useState('');

    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const handlePasswordChange = () => {
        if (oldPass===state.userPass) {
            state.userPass = newPass;
            navigation.navigate({ name: 'LockScreen' });
        } else {
            setError('Incorrect old password. Please try again.');
        }
    };

    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        input: {
            height: 45,
            margin: 12,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            backgroundColor: colorScheme === 'light' ? '#C0C0C0' : '#333',
            color: colorScheme === 'dark' ? '#C0C0C0' : '#000',
        },
        button: {
            textAlign: 'center',
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
        btnText: {
            fontWeight: 500,
            fontSize: 20,
            paddingTop: 5,
            color: colorScheme === 'dark' ? '#FFF' : '#2420FF',
            backgroundColor: colorScheme === 'light' ? '#FFF' : '#2420FF',
        },
        icon: {
            color: colorScheme === 'dark' ? '#FFF' : '#2420FF',
            fontSize: 22,
        },
        container: {
            paddingTop: '10%',
            backgroundColor: colorScheme === 'light' ? 'white' : 'black',
        },
        text: {
            fontSize: 22,
            fontWeight: '300',
            color: colorScheme === 'light' ? '#515151' : '#C0C0C0',
            paddingEnd: 0,
            padding: 10
        }
    });

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.text}>Old Password</Text>
            <TextInput
                secureTextEntry={passwordVisibility}
                style={styles.input}
                inputMode="text"
                placeholder="Enter old password"
                value={oldPass}
                onChangeText={setOldPass}
            />

            <Pressable onPress={handlePasswordVisibility} style={{ paddingLeft: 330 }}>
                <MaterialCommunityIcons name={rightIcon} style={styles.icon} />

            </Pressable>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text style={styles.text}>New Password</Text>
            <TextInput
                secureTextEntry={passwordVisibility_}
                style={styles.input}
                maxLength={15}
                inputMode="text"
                placeholder="Enter new password"
                value={newPass}
                onChangeText={setNewPass}
            />

            <Pressable onPress={handlePasswordVisibility_} style={{ paddingLeft: 330, paddingBottom: 10 }}>
                <MaterialCommunityIcons name={rightIcon_} style={styles.icon} />
            </Pressable>

            <TouchableOpacity onPress={handlePasswordChange} style={styles.button} >
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>

    );
}

export { state };

export default NewPassword;
