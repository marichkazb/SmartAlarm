import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView, Image, FlatList} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';

function AdvicePage(){
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
 return (
       <View style={styles.container}>
             <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                 <Text style={styles.pageTitle}>Advice</Text>
             </View>

             <View style = {styles.adviceSection}>
                 <Text style={styles.pageDesc}>Tips to make your home secure</Text>
             </View>

             <ScrollView style={styles.container}>
             <View style={styles.contentContainer}>

             <View>
              <Image
                 source = {{uri:'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'}}
                 style = {styles.image}
              />
              
             </View>

              <View style = {styles.adviceSection}>
                  <Text style = {styles.sectionTitle}>Follow the "S-A-F-E" rules</Text>
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
              <View style = {styles.adviceSection}>
                  <Text style = {styles.sectionTitle}>A video guide to keep your home safe</Text>
               </View>
              <View style={styles.container}>
                <Video
                ref={video}
                style={styles.video}
                source={{uri:'https://rr1---sn-o097znzk.googlevideo.com/videoplayback?expire=1684338553&ei=GaNkZMvwMoaHkgahqbXoBA&ip=143.244.49.9&id=o-AKXf1AZjvQaYKHAysZ6bQ6MnlbJUZAkHzF-u-8ipRTXR&itag=22&source=youtube&requiressl=yes&mh=cu&mm=31%2C29&mn=sn-o097znzk%2Csn-n4v7snly&ms=au%2Crdu&mv=m&mvi=1&pl=24&initcwndbps=2462500&vprv=1&svpuc=1&mime=video%2Fmp4&ns=rXlOzM9-YYb6CyG9hPJwalIN&cnr=14&ratebypass=yes&dur=33.854&lmt=1519629099674195&mt=1684316470&fvip=1&fexp=24007246%2C51000012&c=WEB&n=m8q0OAHUDuue3w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Csvpuc%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAOtT-G66QobEVyQm-9IQ0iT5S6JDIye60pySNFdnPCzXAiEAsZsq4GNZJ2lbD6PZopm4-TNigZ0UClPmDaC9aXgdXfc%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgQZ5qZ_ijvXpCA2B-M9VXuM-HBzD9lI3jxGGYbFOJtTYCIGXFp7pJyrhD_FprVsdlvIIdV0JIasleMWAtgP-5qdpv&title=Top+7+Tips+on+Keeping+your+Home+Safe'}}
                useNativeControls
                resizeMode = "contain"
                isLooping
                onPlaybackStatusUpdate = {setStatus}
                />
                
                <StatusBar style ="auto"/>
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
    fontWeight: 'bold',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
},
  contentContainer: {
    paddingVertical: 10, marginHorizontal: 10
  },
  buttons: {
    margin: 16,
  },
  pageDesc: { color: '#797979',
        fontSize: 25,
        fontWeight: '300',
    },
    sectionTitle: {
      fontSize:20,
      fontWeight: 'bold',
      marginTop: 10, 
    },
    video: {
      width:400,
      height: 200
    },
    itemWrapper:{
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
textContainer: {
    paddingTop: 10,
    backgroundColor: '#ffffff',
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
});