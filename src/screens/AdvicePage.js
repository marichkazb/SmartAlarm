import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import videoUrl from '../assets/safetyTips.mp4';

function AdvicePage() {
    const video = React.useRef(null);

    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        pageTitle: {
            fontSize: 40,
            fontWeight: '400',
            flex: 1,
            color: colorScheme === 'light' ? 'black' : 'white',
        },
        container: {
            flex: 1,
            backgroundColor: colorScheme === 'light' ? 'white' : 'black',
        },
        contentContainer: {
            paddingVertical: 10, marginHorizontal: 10
        },
        pageDesc: {
            color: '#797979',
            fontSize: 25,
            fontWeight: '300',
        },
        sectionTitle: {
            fontSize: 20,
            marginTop: 10,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        video: {
            width: 400,
            height: 200
        },
        itemWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        itemText: {
            marginLeft: 10,
        },
        itemContainer: {
            paddingTop: 10,
            backgroundColor: '#7CC6FE',
            shadowRadius: 3,
            shadowOpacity: '10%',
            shadowOffset: { width: 0, height: 4 },
            shadowColor: '#d8d8d8',
            elevation: 2,
            borderRadius: 20,
            padding: 10,
            marginTop: 5,
            marginBottom: 5
        },
        image: {
            width: 400,
            height: 200,
            alignSelf: 'center',
        },
    },
    );


    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.pageTitle}>Advice</Text>
            </View>

            <View style={styles.adviceSection}>
                <Text style={styles.pageDesc}>Tips to make your home secure</Text>
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.contentContainer}>

                    <View>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80' }}
                            style={styles.image}
                        />

                    </View>

                    <View style={styles.adviceSection}>
                        <Text style={styles.sectionTitle}>FOLLOW THE S-A-F-E RULES</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                            <MaterialCommunityIcons name="cctv" size={24} color="black" />
                            <Text style={styles.itemText}>Security cameras installed and running</Text>
                        </View>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                            <MaterialCommunityIcons name="shield-lock" size={24} color="blue" />
                            <Text style={styles.itemText}>Alarm system installed and armed</Text>
                        </View>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                            <MaterialCommunityIcons name="home-lock" size={24} color="green" />
                            <Text style={styles.itemText}>Fortification of entryways in the house</Text>
                        </View>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.itemWrapper}>
                            <MaterialCommunityIcons name="alert" size={24} color="red" />
                            <Text style={styles.itemText}>Evaluation of risks to keep house secure</Text>
                        </View>
                    </View>
                    <View style={styles.adviceSection}>
                        <Text style={styles.sectionTitle}>VIDEO GUIDE</Text>
                    </View>
                    <View style={styles.container}>
                        <Video
                            ref={video}
                            style={styles.video}
                            source={videoUrl}
                            useNativeControls={true}
                            resizeMode="contain"
                            isLooping={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>

    );
}

export default AdvicePage;
