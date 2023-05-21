import React from 'react';
import { LogBox, useColorScheme } from 'react-native';
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
    const schemeColor = useColorScheme();

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="LockScreen" component={LockScreen} options={{
                headerStyle: {
                    backgroundColor: schemeColor === 'light' ? 'white' : 'black',
                },
                headerTitleStyle: {
                    color: schemeColor === 'dark' ? 'white' : 'black',
                }
            }}
            />
            <HomeStack.Screen name="Home" options={{
                title: '',
                headerShown: false,
                headerStyle: {
                    backgroundColor: schemeColor === 'light' ? 'white' : 'black',
                },
                headerTitleStyle: {
                    color: schemeColor === 'dark' ? 'white' : 'black',
                }
            }} component={Home}
            />
            <HomeStack.Screen name="History" component={History} options={{
                headerStyle: {
                    backgroundColor: schemeColor === 'light' ? 'white' : 'black',
                },
                headerTitleStyle: {
                    color: schemeColor === 'dark' ? 'white' : 'black',
                }
            }}
            />
            <HomeStack.Screen name="Sensors" component={Sensors} options={{
                headerStyle: {
                    backgroundColor: schemeColor === 'light' ? 'white' : 'black',
                },
                headerTitleStyle: {
                    color: schemeColor === 'dark' ? 'white' : 'black',
                }
            }}
            />
            <HomeStack.Screen name="Emergency" component={Emergency} screenOptions={{
                headerStyle: {
                    backgroundColor: schemeColor === 'light' ? 'white' : 'black',
                },
                headerTitleStyle: {
                    color: schemeColor === 'dark' ? 'white' : 'black',
                }
            }}
            />
            <HomeStack.Screen name="AdvicePage" component={AdvicePage} options={{
                headerStyle: {
                    backgroundColor: schemeColor === 'light' ? 'white' : 'black',
                },
                headerTitleStyle: {
                    color: schemeColor === 'dark' ? 'white' : 'black',
                }
            }} />
            <HomeStack.Screen name="NewVersion" component={NewVersion} options={{
                headerStyle: {
                    backgroundColor: schemeColor === 'light' ? 'white' : 'black',
                },
                headerTitleStyle: {
                    color: schemeColor === 'dark' ? 'white' : 'black',
                }
            }}
            />
            <HomeStack.Screen name="Settings" component={Settings} />
            <HomeStack.Screen name="NewPassword" component={NewPassword} options={{
                headerStyle: {
                    backgroundColor: schemeColor === 'light' ? 'white' : 'black',
                },
                headerTitleStyle: {
                    color: schemeColor === 'dark' ? 'white' : 'black',
                }
            }}
            />
        </HomeStack.Navigator>
    );
}

function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    initializeDatabase()
        . then(r => console.log('Initialized history DB'));
    const Tab = createBottomTabNavigator();
    const colorScheme = useColorScheme();

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
                        tabBarInactiveTintColor: route.name === '#fff',
                        activeTintColor: '#2420FF',
                        tabBarStyle: {
                            backgroundColor: colorScheme === 'light' ? 'white' : '#303030',
                        },
                        tabBarItemStyle: {
                            color: colorScheme === 'dark' ? '#fff' : '#000',
                        },
                    })}>
                    <Tab.Screen name="Home" options={{ title: 'Home', headerShown: false }} component={HomeStackScreen} />
                    <Tab.Screen name="Emergency" component={Emergency} options={{
                        headerStyle: {
                            backgroundColor: colorScheme === 'light' ? 'white' : 'black',
                        },
                        headerTitleStyle: {
                            color: colorScheme === 'dark' ? 'white' : 'black',
                        }
                    }} />
                    <Tab.Screen name="Settings" component={Settings} options={{
                        headerStyle: {
                            backgroundColor: colorScheme === 'light' ? 'white' : 'black',
                        },
                        headerTitleStyle: {
                            color: colorScheme === 'dark' ? 'white' : 'black',
                        }
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;
