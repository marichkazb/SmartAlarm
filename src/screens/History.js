import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const intrusionHistory = [
    {
        id: 1,
        date: '12.01.2023',
        title: 'Movement detected',
        desc: 'Sensors detected the movement in the back yard. The case was resolved manually with the message: "It was my dog, nothing special"',
        resolved: true
    },
    {
        id: 2,
        date: '19.02.2023',
        title: 'Sensor was damaged',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        resolved: false
    },
    {
        id: 2,
        date: '23.02.2023',
        title: 'Vacation mode activated',
        desc: 'Donec mauris lacus, ultricies ac facilisis in, sagittis sed ante. Pellentesque vel venenatis velit',
        resolved: true
    },
    {
        id: 2,
        date: '07.03.2023',
        title: 'Intrusion through the front door',
        desc: 'Aenean placerat elit ac posuere ullamcorper. Donec sapien velit, efficitur eget egestas vel, sagittis viverra ipsum. Nullam facilisis sagittis ligula, id commodo eros volutpat a. Sed vel sollicitudin neque, ut eleifend risus.',
        resolved: true
    }
];

const renderItem = item => {
    const resolvedText = item.resolved ? 'Resolved successfully' : 'Not resolved. Please consider this case';
    return (
        <View style={styles.itemContainer}>
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
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.pageTitle}>History</Text>
                <Text style={styles.pageDesc}>View the history of intrusion to your home</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {intrusionHistory.map(item => renderItem(item))}
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
