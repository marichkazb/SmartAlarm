import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Linking, Pressable } from 'react-native';

function WebRootComponent() {
    const openReadMe = () => {
        Linking.openURL('https://git.chalmers.se/courses/dit113/2023/group-5/smartalarm');
    };
    const openPipelines = () => {
        Linking.openURL('https://git.chalmers.se/courses/dit113/2023/group-5/smartalarm/-/pipelines');
    };



    return (
        <ImageBackground
            source={require('../../smartalarm-background.jpg')}
            style={styles.container}
            imageStyle={styles.backgroundImage}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to SmartAlarm!</Text>
                <Image source={require('../../smartalarm-icon.png')} style={styles.icon} />
                <Text style={styles.description}>
                    Thank you for using SmartAlarm, a innovative alarm app designed for <b>both Android and iOS devices</b>.
                </Text>
                <Text style={styles.note}>
                    Due to time constraints and the extensive complexity of the App's features, we made the decision to exclude the web variant compatibility from our project scope.
                </Text>
                <Text style={styles.phoneMessage}>
                    Note: This page is still entirely <u>built and deployed from within the App</u>.
                </Text>
                <Pressable onPress={openReadMe} style={styles.link}>
                    <Text style={styles.linkText}>The Project</Text>
                </Pressable>
                <Pressable onPress={openPipelines} style={styles.link}>
                    <Text style={styles.linkText}>GitLab's CI/CD</Text>
                </Pressable >
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        resizeMode: 'cover',
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.90)',
        padding: 24,
        borderRadius: 8,
        maxWidth: '80%',
        alignItems: 'center',
    },
    icon: {
        width: 150,
        height: 150,
        margin: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'rgb(30, 30, 30)',
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        marginBottom: 24,
        color: 'rgb(30, 30, 30)',
        textAlign: 'center',
    },
    note: {
        fontSize: 16,
        marginBottom: 8,
        color: 'rgb(30, 30, 30)',
        textAlign: 'center',
    },
    phoneMessage: {
        fontSize: 16,
        marginBottom: 16,
        color: 'rgb(30, 30, 30)',
        textAlign: 'center',
    },
    link: {
        paddingVertical: 5,
        marginVertical: 8
    },
    linkText: {
        fontSize: 16,
        fontWeight: 500,
        color: 'rgb(30, 30, 30)',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});

export default WebRootComponent;
