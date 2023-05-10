import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AdvicePage(){
 return (

 <View style={styles.container}>
             <View style={styles.titleContainer}>
                 <Text style={styles.pageTitle}>Sensors</Text>
                 <Text style={styles.pageDesc}>View the status of the sensors</Text>
             </View>




         <ScrollView style={styles.container}>
             <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                 <Text style={styles.pageTitle}>Advice Page</Text>
                 <Ionicons name="ios-settings-outline" size={30} color="black" />
             </View>
               <View style = {styles.adviceSection}>
                  <Text style = {styles.sectionTitle}>Info on functionalities</Text>
                  <View style = {styles.textWrapper}>
                    <Text style = {styles.adviceText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                    <Text style = {styles.adviceText}>Lorem Ipsum</Text>
             </View>
             </View>
         </ScrollView>

 );
}

export default AdvicePage;

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