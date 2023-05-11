import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';

function AdvicePage(){
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
              <Text style = {styles.caption}>Photo by Sebastian Scholz</Text>
             </View>

                <View style = {styles.adviceSection}>
                  <Text style = {styles.sectionTitle}>Advice #1</Text>
               </View>

                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <Text>Loreum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
                    </View>
                </View>

                <View style = {styles.adviceSection}>
                  <Text style = {styles.sectionTitle}>Advice #2</Text>
               </View>

                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <Text>Loreum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
                    </View>
                </View>

                <View style = {styles.adviceSection}>
                  <Text style = {styles.sectionTitle}>Advice #3</Text>
               </View>

                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <Text>Loreum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
                    </View>
                </View>

                <View style = {styles.adviceSection}>
                  <Text style = {styles.sectionTitle}>Advice #4</Text>
               </View>

                <View style={styles.itemContainer}>
                    <View style={styles.itemWrapper}>
                        <Text>Loreum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
                    </View>
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
      backgroundColor: '#fff',
  },
  contentContainer: {
    paddingVertical: 10, marginHorizontal: 10
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
  itemContainer: {
    paddingTop: 20,
    backgroundColor: '#7CC6FE',
    shadowRadius: 3,
    shadowOpacity: '10%',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: '#d8d8d8',
    elevation: 2,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 10
},
image: {
  width: 400,
  height: 200,
},

});