import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';

function CreateHabitScreen(props) {
    const [build, setBuild] = useState(false);
    const [period, setPeriod] = useState('');

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
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity 
                            style={build ? styles.build_button : styles.build_pressed}
                            onPress={()=>setBuild(true)}
                        >
                            <Text style={styles.build_quit}>Build</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={build ? styles.build_pressed : styles.build_button} onPress={()=>setBuild(false)}>
                            <Text style={styles.build_quit}>Quit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.options}>
                    <Text style={styles.options_font}>Habit period</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <TouchableHighlight style={period == 'daily' ? styles.build_button : styles.build_pressed}
                            onPress={()=>setPeriod('daily')}>
                            <Text>Daily</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={period == 'weekly'? styles.build_button : styles.build_pressed}
                            onPress={()=>setPeriod('weekly')}>
                            <Text>Weekly</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={period == 'monthly' ? styles.build_button : styles.build_pressed}
                            onPress={()=>setPeriod('monthly')}>
                            <Text>Monthly</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.options}>
                    <Text style={styles.options_font}>Set a goal</Text>
                    <TextInput style={styles.input} placeholder="enter name"/>
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
    build_quit :
    {
        flex: 1, 
        color: 'black'
    },
    build_button :
    {
        backgroundColor: 'lightgray',
        paddingTop:10,
        paddingBottom:10,
        height: 25,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    quit_button:
    {
        backgroundColor: 'lightgray',
        paddingTop:10,
        paddingBottom:10,
        height: 25,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    build_pressed :
    {
        backgroundColor: 'lightgray',
        paddingTop:10,
        paddingBottom:10,
        height: 25,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
    },
    input :{
        borderWidth: .5,
        height: 30,
        fontSize: 16,
        paddingLeft: 5,
    },
});

export default CreateHabitScreen;