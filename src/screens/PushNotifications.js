import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { HISTORY_DB } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage.native';


let initialLength = 4;

async function getHistoryItem(index) {

    let itemValue = AsyncStorage.getItem(HISTORY_DB.at(index));
    let obj = JSON.parse(await itemValue);
    return obj.body;
}

function compareDB(){
    let newDBLength = HISTORY_DB.length;
    if (newDBLength > initialLength){

        let item = getHistoryItem(HISTORY_DB.length);

        // Either of them.
        return sendPushNotification(registerForPushNotificationsAsync(), {item})
        return PushNotifications({item});
    }
}

    //Deciding on actions allowed while receiving a notification
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    //Function to enable sending push notifications and their structure
    async function sendPushNotification(expoPushToken, body) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Event was detected',
            body: {body} ,
            data: { someData: 'goes here' },
        };

        //Await function, so the code "waits" until the notification is sent
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    /*
    * Function that checks if a real phone is used at the moment, then tries to get the token value.
    * If the token cannot be obtained from the device, it asks for permission.
    * In the end, it acquires the token and displays it in the console.
    */
    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        //Checking if the device has android OS and modifies the notification showed to the user.
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    export default function PushNotifications(body) {
        const [expoPushToken, setExpoPushToken] = useState('');
        const [notification, setNotification] = useState(false);
        const notificationListener = useRef();
        const responseListener = useRef();

        useEffect(() => {

            sendPushNotification(registerForPushNotificationsAsync()
                .then(token => setExpoPushToken(token)), { body })
                 .then( notification => setNotification(true));

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        }, []);

    }
