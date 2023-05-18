import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';

function AdvicePage() {
    const video = React.useRef(null);

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
                        <Text style={styles.sectionTitle}>FOLLOW S-A-F-E RULES</Text>
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
                            source={{ uri: 'https://rr1---sn-ovgq0oxu-j2ie.googlevideo.com/videoplayback?expire=1684439828&ei=tC5mZKuaA8yXv_IP97KoyAw&ip=2001%3A6b0%3A4f%3A2801%3A489e%3Ad7c8%3Aea13%3Af298&id=o-AIijJRvWSQpbe42lGhxksdfp5tuli7fjq5sIkyq0cehU&itag=22&source=youtube&requiressl=yes&mh=CG&mm=31%2C29&mn=sn-ovgq0oxu-j2ie%2Csn-5goeenes&ms=au%2Crdu&mv=m&mvi=1&pl=48&initcwndbps=1132500&vprv=1&svpuc=1&mime=video%2Fmp4&ns=0UQxlwoZGOffioMVPbnmNjgN&cnr=14&ratebypass=yes&dur=840.051&lmt=1593008752867321&mt=1684417756&fvip=5&fexp=24007246&c=WEB&txp=5535432&n=Ae5omg0X503NqLWFo6&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Csvpuc%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAPxXY9Q8T5sAdp3dkxojPH2BHY_04ymvTgNezLmFmWs5AiEAk7yS2FKsvMWLhsCsq7nH0V2_5_p7jbABs8s-9i3b3FQ%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgVxfEoizCrcklNxUnUytyd10qPy08qIcMonf42ecdfCkCIC5vnCe5RoK9SlEcKmbElUdZ_yoh0t2-D_VMyXBn7Hhx' }}
                            useNativeControls
                        />
                    </View>
                </View>
            </ScrollView>
        </View>

    );
}

export default AdvicePage;

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 40,
        fontWeight: '400',
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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