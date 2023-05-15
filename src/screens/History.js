import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { HISTORY_DB } from '../constants';

const renderItem = item => {
    const resolvedText = item.resolved ? 'Resolved successfully' : 'Not resolved. Please consider this case';
    return (
        <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemWrapper}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.desc}>{item.desc}</Text>
            <View style={styles.statusContainer}>
                {item.resolved ? <Ionicons name="md-checkmark-circle" size={18} color="green" /> : <Ionicons name="construct-outline" size={18} color="red" />}
                <Text style={[styles.status, item.resolved ? styles.resolved : styles.notResolved]}>{resolvedText}</Text>
            </View>
        </View>
    );
};
function History() {
    const [database, setDatabase] = React.useState([]);

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
        fontSize: 30,
        fontWeight: '400',
        maxWidth: '70%'
    },
    desc: {
        paddingLeft: 2,
        paddingTop: 5,
        fontSize: 17,
        fontWeight: '200'
    },
    date: {
        fontSize: 20,
        color: '#797979'
    },
    itemWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    status: {
        paddingLeft: 3,
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
        flexDirection: 'row', alignItems: 'center', paddingTop: 10
    },
    contentContainer: {
        paddingVertical: 10, marginHorizontal: 10
    }
});
