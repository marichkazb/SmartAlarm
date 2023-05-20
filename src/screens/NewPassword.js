/* eslint-disable react-native/no-unused-styles */
import { Center } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Pressable } from 'react-native';
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

    return (
        <View>
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
                <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
            </Pressable>
            {error ? <Text style={{ padding: 10 }}>{error}</Text> : null}
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
                <MaterialCommunityIcons name={rightIcon_} size={22} color="#232323" />
            </Pressable>
            <TouchableOpacity onPress={handlePasswordChange} style={{ padding: 15, marginLeft: 153, marginRight: 50 }} >
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingTop: 5 }}>Save</Text>
            </TouchableOpacity>
        </View>

    );
}


export { state };

export default NewPassword;

const styles = StyleSheet.create({
    inputView: {
        backgroundColor: '#FFC0CB',
        borderRadius: 30,
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
    },
    button: {
        textAlign: Center
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
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
    },
    text: {
        fontSize: 17,
        fontWeight: '300',
        color: '#515151',
        paddingEnd: 0,
        padding: 10
    }
});