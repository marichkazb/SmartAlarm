/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';

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

    return (
        <View>
            <TextInput
                secureTextEntry={passwordVisibility}
                style={styles.input}
                inputMode="text"
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
            />
            <Pressable onPress={handlePasswordVisibility} style={{ paddingLeft: 330 }}>
                <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
            </Pressable>
            {error ? <Text style={{ padding: 13 }}>{error}</Text> : null}
            <TouchableOpacity onPress={handleUnlock} style={{ padding: 15, marginLeft: 145, marginRight: 50 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Unlock</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LockScreen;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
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
