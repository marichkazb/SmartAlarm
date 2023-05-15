import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'native-base';

export default function SettingsScreen() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState('English');
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const toggleDarkMode = () => {
    setDarkModeEnabled(previousState => !previousState);
  };

  const changeLanguage = language => {
    setLanguage(language);
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
                <Text style={styles.pageTitle}>Settings</Text>
                <Ionicons name="ios-settings-outline" size={30} color="black" />
            </View>


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Avatar
                    bg="cyan.500" source={{
                    uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                }}>
                </Avatar>
                <Text style={styles.textStyle}>Neville Longbottom</Text>
                <Text style={styles.pageDesc}>longbottom@student.hogwarts.uk</Text>
                
                </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  optionValue: {
    fontSize: 18,
  },
});