import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Card({ title }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.container, styles.fontSizeWrapper]}>{title}</Text>
        </View>
    );
}

export const printMessage = () => {
    console.log("Hello World What");
};

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink'
    },
    fontSizeWrapper: {
        fontSize: 50
    },

});