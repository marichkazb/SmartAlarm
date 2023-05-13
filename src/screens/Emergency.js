    import React from "react";
    import { StyleSheet, Text, View, Alert } from 'react-native';
    import { MaterialCommunityIcons } from '@expo/vector-icons';

    function Emergency(){

        Alert.alert('Emergency', 'Do you want to call 112?', [
            {
            text: 'Cancel',
            },
            {
            text: 'Call',
            onPress: () =>{
                Alert.alert('Redirecting', 'Calling 112');
            }
            }
        ]);

        return(
            <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.pageTitle}>Emergency</Text>
                <View style={styles.contactContainer}>
                <MaterialCommunityIcons name="phone" size={40} color="#dc143c" onPress={Emergency} style={{alignSelf: 'centre'}}/>
                <Text style={styles.textStyle}>Tap icon to call 112</Text>
            </View>
            </View>

            <View style={styles.contentContainer}>
            <Text style={styles.pageDesc}>Extra information</Text>

                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                        </View> 
                        <Text style ={styles.titleStyle}>Immediate emergency services</Text>
                        <Text style ={styles.textStyle}>Dial 112</Text>
                        <Text style ={styles.titleStyle}>Smart Alarm emergency contact</Text>
                        <Text style ={styles.textStyle}>Dial 070 999 55 34</Text>
                        
                    </View>

                    <Text style={styles.pageDesc}>Report incident</Text>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                        </View> 
                        <Text style ={styles.textStyle}>Please report any incidents of intrusions, burglaries, thefts or any other unforseen circumstance using the contacts provided above</Text>
                        
                    </View>
         
            </View>
            </View>
    
        );
    }

    export default Emergency;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        contentContainer: {
          paddingHorizontal: 20,
          paddingTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        },
        contactContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 20,
          backgroundColor: '#ffffff',
          shadowRadius: 3,
          shadowOpacity: 0.5,
          shadowOffset: { width: 0, height: 4 },
          shadowColor: '#8b0000',
          elevation: 2,
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        },
        itemWrapper: {
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        },
        itemContainer: {
          paddingTop: 20,
          backgroundColor: '#ffffff',
          shadowRadius: 3,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowColor: '#dc143c',
          elevation: 2,
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
          width: '100%',
        },
        titleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#dc143c',
          marginVertical: 10,
          textAlign: 'center',
        },
        titleContainer: {
          padding: 10,
          alignItems: 'center',
        },
        pageTitle: {
          fontSize: 50,
          fontWeight: '700',
        },
        textStyle: {
          fontSize: 18,
          color: '#333',
          textAlign: 'center',
        },
        pageDesc: { color: '#797979',
            fontSize: 25,
            fontWeight: '300',
        }
    });