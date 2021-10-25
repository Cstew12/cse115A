import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Input} from 'react-native-elements';


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
                    <Input
                        placeholder='Name your habit'
                        placeholderTextColor='#9c9c9c'

                        inputStyle= {{
                            color: '#fff',
                            fontFamily: 'AvenirNext-Regular'
                        }}
                    />
                </View>
                <View style={styles.options}>
                    <Input
                        placeholder='State your motivation'
                        placeholderTextColor='#9c9c9c'

                        inputStyle= {{
                            color: '#fff',
                            fontFamily: 'AvenirNext-Regular'
                        }}
                    />
                </View>
                <View style={styles.options}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Button
                            title="Build"
                            type= "outline"
                            raised = "true"
                            onPress={()=>setBuild(true)}
                    
                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                borderColor: build == true ? "#E3D1FC" : '#2e2d2d',
                                borderWidth: 3,
                                paddingLeft: 50,
                                paddingRight: 50
                            //marginTop: -10,
                            }}
        
                            titleStyle= {{
                                color: '#E3D1FC',
                                fontFamily: 'AvenirNext-Regular'
                            }}
                        />
                        <Button
                            title="Quit"
                            type="outline"
                            onPress={()=>setBuild(false)}
                    
                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                borderWidth: 3,
                                borderColor: build == false ? "#E3D1FC" : '#2e2d2d',
                                paddingLeft: 50,
                                paddingRight: 50
                            //marginTop: -10,
                            }}
        
                            titleStyle= {{
                                color: '#E3D1FC',
                                fontFamily: 'AvenirNext-Regular'
                            }}
                        />
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
                    <View style={{flexDirection: 'row'}}>
                        <TextInput style={styles.goal_input} />
                        <Text style={styles.options_font}> times {period}</Text>
                    </View>
                </View>
                <View style={styles.save_button}>
                    <TouchableHighlight style={styles.build_pressed}>
                        <Text>Save</Text>
                    </TouchableHighlight>
                </View>
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
        backgroundColor: '#E3D1FC',
        justifyContent: 'flex-end'
    },
    bottom: {
        flex: 3,
        backgroundColor: '#2e2d2d',
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
    goal_input :{
        borderWidth: .5,
        height: 30,
        width: 50,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default CreateHabitScreen;