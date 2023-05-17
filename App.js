import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home, History, Settings, Sensors, Emergency, AdvicePage } from './src/screens/index';
import { HISTORY_DB } from './src/constants';


const Stack = createNativeStackNavigator();

function formatToLocalString(date) {
    return date.toString().slice(4, 15);
}

function formatTime(time) {
    return time.toLocaleTimeString('en-ca', { hour12: false });
}

const intrusionHistory = [
    {
        id: Math.random() * 10000,
        date: formatToLocalString(new Date(Date.UTC(2023, 4, 11))),
        time: formatTime(new Date(Date.UTC(2023, 4, 11, 8, 9, 6))),
        title: 'Security Alarm Triggered',
        desc: 'Unauthorized attempt to tamper with the security alarm system was detected',
        resolved: false
    },
    {
        id: Math.random() * 10000,
        date: formatToLocalString(new Date(Date.UTC(2023, 4, 12))),
        time: formatTime(new Date(Date.UTC(2023, 4, 11, 12, 4, 36))),
        title: 'Low Battery Alert',
        desc: 'Low battery detected in the security system. Replace battery."',
        resolved: true
    },
    {
        id: Math.random() * 10000,
        date: formatToLocalString(new Date(Date.UTC(2023, 4, 13))),
        time: formatTime(new Date(Date.UTC(2023, 4, 11, 14, 32, 56))),
        title: 'System Disarmed',
        desc: 'Security system has been disarmed. Verify the authorized user.',
        resolved: false
    },
    {
        id: Math.random() * 10000,
        date: formatToLocalString(new Date(Date.UTC(2023, 4, 14))),
        time: formatTime(new Date(Date.UTC(2023, 4, 11, 11, 45, 18))),
        title: 'Alarm System Test',
        desc: 'This is a scheduled test of the alarm system. No action required.',
        resolved: false
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
                    <Stack.Screen
                        name="AdvicePage"
                        component={AdvicePage}
                        options={{ title: 'AdvicePage' }}
                    />
                    <Stack.Screen
                        name="Emergency"
                        component={Emergency}
                        options={{ title: 'Emergency' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;
