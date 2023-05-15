import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home, History, Settings, Sensors } from './src/screens/index';
import { HISTORY_DB } from './src/constants';


const Stack = createNativeStackNavigator();

const date = new Date();
function formatToLocalString(date) {
    return date.toLocaleDateString('en-ca');
}

const intrusionHistory = [
    {
        id: Math.random() * 10000,
        date: formatToLocalString(new Date(Date.UTC(2023, 4, 11))),
        time: date.toTimeString(),
        title: 'Security Alarm Triggered',
        desc: 'Unauthorized attempt to tamper with the security alarm system was detected',
    },
    {
        id: Math.random() * 10000,
        date: formatToLocalString(new Date(Date.UTC(2023, 4, 12))),
        time: date.toTimeString(),
        title: 'Security Alarm Triggered',
        desc: 'Unauthorized attempt to tamper with the security alarm system was detected',
    },
    {
        id: Math.random() * 10000,
        date: formatToLocalString(new Date(Date.UTC(2023, 4, 13))),
        time: date.toTimeString(),
        title: 'Security Alarm Triggered',
        desc: 'Unauthorized attempt to tamper with the security alarm system was detected',
    },
    {
        id: Math.random() * 10000,
        date: formatToLocalString(new Date(Date.UTC(2023, 4, 14))),
        time: date.toTimeString(),
        title: 'Security Alarm Triggered',
        desc: 'Unauthorized attempt to tamper with the security alarm system was detected',
    }
];
const initializeDatabase = async () => {
    await AsyncStorage.setItem(HISTORY_DB, JSON.stringify(intrusionHistory));
};
function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    initializeDatabase()
        . then(r => console.log('Initialized history DB'));
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ title: '', headerShown: false }}
                    />
                    <Stack.Screen
                        name="History"
                        component={History}
                        options={{ title: 'History' }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{ title: 'Settings' }}
                    />
                    <Stack.Screen
                        name="Sensors"
                        component={Sensors}
                        options={{ title: 'Sensors' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;
