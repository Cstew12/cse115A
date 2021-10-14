import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

function CreateHabitScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.header}>Create new habit</Text>
            </View>
            <View style={styles.bottom}>
                <View style={styles.options}>
                    <Text style={styles.options_font}>Name of habit</Text>
                    <TextInput style={styles.input} placeholder="enter name"/>
                </View>
                <View style={styles.options}>
                    <Text style={styles.options_font}>Motivation</Text>
                    <TextInput style={styles.input} placeholder="enter motivation"/>
                </View>
                <View style={styles.options}>
                    <Text style={styles.options_font}>Build or Quit</Text>
                </View>
                <View style={styles.options}>
                    <Text style={styles.options_font}>Habit period</Text>
                </View>
                <View style={styles.options}>
                    <Text style={styles.options_font}>Set a goal</Text>
                </View>
                <View style={styles.save_button}>
                    <Text style={styles.options_font}>Save</Text>
                </View>
            </View>
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
    options: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
    },
    save_button: {
        flex: 1,
        marginLeft: 10,
        alignSelf: 'center',
    },
    options_font: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 18,
    },
    input :{
        borderWidth: .5,
        height: 30,
        fontSize: 16,
        paddingLeft: 5,
    }
});

export default CreateHabitScreen;