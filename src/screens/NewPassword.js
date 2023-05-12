import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

let userPass = '1';
let state = {
    userPass: userPass
};

const NewPassword = ({ navigation }) => {
    let [newPass, setNewPass] = useState('');
    state['userPass'] = newPass;
    const handlePasswordChange = () => {
        
        console.log('here123',state['userPass']);
        navigation.navigate({ name: 'LockScreen' });
      };

    return(
        <View>
            <TextInput
                secureTextEntry
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