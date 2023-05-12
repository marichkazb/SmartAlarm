import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { state } from './NewPassword.js';

const LockScreen = ({ navigation }) => {
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

//   const navigation = useNavigation();
//   const { userPass, setUserPass } = route.params.userPass;

  const handleUnlock = () => {
    console.log('here1234',state.userPass)
    if (password === state.userPass) {
      navigation.navigate('Home');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };
  
  return (
    <View>
      <TextInput
        secureTextEntry
        inputMode='numeric'
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text>{error}</Text> : null}
      <TouchableOpacity onPress={handleUnlock}>
        <Text>Unlock</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LockScreen;

const styles = StyleSheet.create({
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
