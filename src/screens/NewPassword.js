import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

let userPass = '1';
let state = {
    userPass: userPass
};

const NewPassword = ({ navigation }) => {
    const [error, setError] = useState('');
    let [oldPass, setOldPass] = useState('');
    let [newPass, setNewPass] = useState('');
    const handlePasswordChange = () => {   
        if(oldPass===state.userPass){
            state['userPass'] = newPass;
            navigation.navigate({ name: 'LockScreen' });
        } else {
            setError('Incorrect old password. Please verify again.');
          }
    };

    return(
        <View>
            <TextInput
                secureTextEntry
                style={styles.input}
                inputMode='numeric'
                placeholder="Enter old password"
                value={oldPass}
                onChangeText={setOldPass}
            />
            {error ? <Text>{error}</Text> : null}
            <TextInput
                secureTextEntry
                style={styles.input}
                inputMode='numeric'
                placeholder="Enter new password"
                value={newPass}
                onChangeText={setNewPass}
            />
        <TouchableOpacity onPress={handlePasswordChange}>
            <Text>Save</Text>
        </TouchableOpacity>
        </View>

    );
};


export { state };

export default NewPassword;

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
        paddingTop: 30,
        padding: 10
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: '400',
        flex: 1
    }
});