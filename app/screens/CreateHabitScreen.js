import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function CreateHabitScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.header}>Create new habit</Text>
            </View>
            <View style={styles.bottom}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    top: {
        flex: 1,
        backgroundColor: '#d2efc8',
        justifyContent: 'flex-end'
    },
    bottom: {
        flex: 3,
        backgroundColor: '#fff',
    },
    header: {
        fontFamily: 'AvenirNext-Bold',
        fontSize: 30,
        justifyContent: 'flex-end',
        marginLeft: 10,
    },
});

export default CreateHabitScreen;