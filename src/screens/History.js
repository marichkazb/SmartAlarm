import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'native-base';
import { HISTORY_DB } from '../constants';

function History() {
    const [database, setDatabase] = React.useState([]);

    const renderItem = item => {
        const resolvedText = item.resolved ? 'Resolved successfully' : 'Not seen yet. Press OK to acknowledge';
        return (
            <View key={item.id} style={styles.itemContainer}>
                <View style={styles.itemWrapper}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={styles.dateTime}>{item.date}</Text>
                        <Text style={styles.dateTime}>{item.time}</Text>
                    </View>
                </View>
                <Text style={styles.desc}>{item.desc}</Text>
                <View style={styles.statusContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', maxWidth: '80%', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {item.resolved ? <Ionicons name="md-checkmark-circle" size={18} color="green" /> : <Ionicons name="construct-outline" size={18} color="red" />}
                        <Text style={[styles.status, item.resolved ? styles.resolved : styles.notResolved]}>{resolvedText}</Text>
                    </View>
                    <Button
                        size="sm" onPress={() => {
                            resolveItem(item); }
                        } colorScheme="blue">
                        OK
                    </Button>
                </View>
            </View>
        );
    };
    const resolveItem = async item => {
        try {
            const index = database.findIndex(obj => obj.id === item.id);
            if (index !== -1) {
                database[index].resolved = true;
            }
            await AsyncStorage.setItem(HISTORY_DB, JSON.stringify(database.reverse()));
            await getHistoryData();
        } catch (error) {
            console.log(error);
        }
    };
    let parsedData;
    const getHistoryData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(HISTORY_DB);
            if (jsonValue !== null) {
                parsedData = JSON.parse(jsonValue);
                setDatabase(parsedData.reverse());
            } else {
                console.log('No data found.');
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    };

    useEffect(() => {
        getHistoryData(); //is called on the component mount
    });

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.pageTitle}>History</Text>
                <Text style={styles.pageDesc}>View the history of intrusion to your home</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {!(database.length === 0) && database.map(item => renderItem(item))}
            </ScrollView>
        </View>
    );
}

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    pageTitle: {
        fontSize: 50,
        fontWeight: '700',
    },
    pageDesc: {
        color: '#797979',
        fontSize: 25,
        fontWeight: '300',
    },
    title: {
        fontSize: 27,
        fontWeight: '400',
        maxWidth: '65%'
    },
    desc: {
        paddingLeft: 2,
        paddingTop: 5,
        fontSize: 17,
        fontWeight: '200'
    },
    dateTime: {
        fontSize: 16,
        color: '#797979'
    },
    itemWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    status: {
        paddingLeft: 3,
        flexWrap: 'wrap'
    },
    resolved: {
        color: '#06891b'
    },
    notResolved: {
        color: '#f88383'
    },
    itemContainer: {
        paddingTop: 30,
        backgroundColor: '#fff',
        shadowRadius: 3,
        shadowOpacity: '10%',
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#d8d8d8',
        elevation: 2,
        borderRadius: 30,
        padding: 20,
        marginBottom: 20
    },
    titleContainer: {
        padding: 10
    },
    statusContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    contentContainer: {
        paddingVertical: 10, marginHorizontal: 10
    }
});
