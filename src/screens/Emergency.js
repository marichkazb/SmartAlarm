import React from "react";
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function Emergency(){

    Alert.alert('Emergency', 'Do you want to call 112?', [
        {
          text: 'Cancel',
        },
        {
          text: 'Call',
        }
      ]);

    return(
        <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>Emergency</Text>
       
        <MaterialCommunityIcons name="phone" size={40} color="#dc143c" onPress={Emergency}/>
        
        </View>
    </View>
   
    );
}

export default Emergency;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainer: {
        paddingVertical: 10, marginHorizontal: 10
    },
    itemWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemContainer: {
        paddingTop: 20,
        backgroundColor: '#7CC6FE',
        shadowRadius: 3,
        shadowOpacity: '10%',
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#d8d8d8',
        elevation: 2,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20
    },
    titleContainer: {
        padding: 10
    },
    pageTitle: {
        fontSize: 50,
        fontWeight: '700',
    },
    pageDesc: { color: '#797979',
        fontSize: 25,
        fontWeight: '300',
    }
});