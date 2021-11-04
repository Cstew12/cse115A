import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

function ScreenLayout(props) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.header}>{props.title}</Text>
            </View>
            <View style={styles.bottom}>
                {props.children}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    top: {
        flex: 1,
        backgroundColor: '#BD9EEF',
        justifyContent: 'flex-end'
    },
    bottom: {
        flex: 3,
        paddingTop: 10,
        backgroundColor: '#2e2d2d',
    },
    header: {
        fontFamily: 'AvenirNext-Bold',
        fontSize: 30,
        justifyContent: 'flex-end',
        marginLeft: 10,
        color: "#2e2d2d"
    },
});

export default ScreenLayout;