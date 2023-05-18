import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, History, Settings, Sensors, Emergency, AdvicePage, NewVersion, LockScreen, NewPassword } from './src/screens/index';
import { HISTORY_DB } from './src/constants';

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

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="LockScreen" component={LockScreen} />
            <HomeStack.Screen name="Home" options={{ title: '', headerShown: false }} component={Home} />
            <HomeStack.Screen name="History" component={History} />
            <HomeStack.Screen name="Sensors" component={Sensors} />
            <HomeStack.Screen name="Emergency" component={Emergency} />
            <HomeStack.Screen name="AdvicePage" component={AdvicePage} />
            <HomeStack.Screen name="NewVersion" component={NewVersion} />
            <HomeStack.Screen name="Settings" component={Settings} />
            <HomeStack.Screen name="NewPassword" component={NewPassword} />
        </HomeStack.Navigator>
    );
}

function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    initializeDatabase()
        . then(r => console.log('Initialized history DB'));
    const Tab = createBottomTabNavigator();
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        // eslint-disable-next-line react/no-unstable-nested-components
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'home'
                                    : 'home-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'settings-sharp' : 'settings-outline';
                            } else if (route.name === 'Emergency') {
                                iconName = focused ? 'alert' : 'alert-outline';
                                return <MaterialCommunityIcons name={iconName} size={size} color="#dc143c" />;
                            }
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: route.name === 'Emergency' ? '#dc143c' : '#2420FF',
                        tabBarInactiveTintColor: route.name === 'gray',
                        activeTintColor: '#2420FF'
                    })}>
                    <Tab.Screen name="Home" options={{ title: 'Home', headerShown: false }} component={HomeStackScreen} />
                    <Tab.Screen name="Emergency" component={Emergency} />
                    <Tab.Screen name="Settings" component={Settings} />
                </Tab.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;
