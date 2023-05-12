import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { Home, History, Settings, Sensors, LockScreen, NewPassword} from './src/screens/index';

const Stack = createNativeStackNavigator();

function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LockScreen"
                        component={LockScreen}
                        options={{ title: 'LockScreen' }}
                    />
                    <Stack.Screen
                        name="History"
                        component={History}
                        options={{ title: 'History' }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ title: 'Home' }}
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
                        name="NewPassword"
                        component={NewPassword}
                        options={{ title: 'NewPassword' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;
