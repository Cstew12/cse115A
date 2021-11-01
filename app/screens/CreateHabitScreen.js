import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Input} from 'react-native-elements';
import { Slider } from 'react-native-elements';
import { Animated } from 'react-native';
import { Icon } from 'react-native-elements'



function CreateHabitScreen(props) {
    const [period, setPeriod] = useState('day');
    const [value, setValue] = useState(1);
    const [name, setName] = useState('');
    const [length, setLength] = useState(1);
    const colors = {
        purple: "#BD9EEF", // BD9EEF, E3D1FC
    }

    const decreaseLength = () => {
        if(length === 0) {
            setLength(0);
        } else {
            setLength(length - 1);
        }
    }
    const increaseLength = () => {
        if(length >= 6) {
            setLength(6);
        } else {
            setLength(length + 1);
        }
    }
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
                        onChangeText={setName}
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
                <View style={{flex: .5}}>
                    <Text 
                        style={{
                            marginHorizontal: 20, 
                            alignSelf: 'center',
                            fontFamily: 'AvenirNext-Medium',
                            fontSize: 20,
                            color: colors.purple
                        }}>
                        Create a goal
                    </Text>
                </View>
                <View style={styles.options}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Button
                            title="Daily"
                            type="outline"
                            onPress={()=>{
                                setPeriod('day')
                                setValue(1)
                            }}
                            containerStyle = {{
                                flex: 1,
                                marginHorizontal: 10

                            }}
                    
                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                borderWidth: 3,
                                borderColor: period == 'day' ? colors.purple : '#9c9c9c',
                            }}
        
                            titleStyle= {{
                                color: '#E3D1FC',
                                fontFamily: 'AvenirNext-Regular'
                            }}
                        />
                        <Button
                            title="Weekly"
                            type="outline"
                            onPress={()=>{
                                setPeriod('week')
                                setValue(1)
                            }}
                    
                            containerStyle = {{
                                flex: 1,
                                marginHorizontal: 10
                            }}

                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                borderWidth: 3,
                                borderColor: period == 'week' ? colors.purple : '#9c9c9c',
                            }}
        
                            titleStyle= {{
                                color: '#E3D1FC',
                                fontFamily: 'AvenirNext-Regular'
                            }}
                        />
                    </View>
                </View>
                {period == "week" &&
                <View style={styles.options}>
                    <Text 
                            style={{
                                marginHorizontal: 10, 
                                alignSelf: 'center',
                                fontFamily: 'AvenirNext-Regular',
                                color: colors.purple
                            }}>
                            {name == '' ? 'Do habit' : name} {length} times per week
                        </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        
                        <Icon 
                            name="minus"
                            size={20}
                            color={colors.purple}
                            type="entypo" 
                            reverse
                            reverseColor="white"
                            onPress={decreaseLength}
                        />
                        <Input
                            onChangeText={setLength}
                            value={length}
                            containerStyle={{
                                width: 100
                            }}
                            inputStyle={{
                                width: 75,
                                color: "white",
                                textAlign: "center",
                                fontFamily: "AvenirNext-Regular"
                            }}
                            keyboardType="numeric"
                        />
                        <Icon 
                            name="plus"
                            size={20}
                            color={colors.purple}
                            type="entypo" 
                            reverse
                            reverseColor="white"
                            onPress={increaseLength}
                        />
                    </View>
                </View>}
                <View style={styles.options}>
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                        <Text 
                            style={{
                                marginHorizontal: 10, 
                                alignSelf: 'center',
                                fontFamily: 'AvenirNext-Regular',
                                color: colors.purple
                            }}>
                            {name == '' ? 'Do habit' : name} {value} {period}s in a row
                        </Text>
                        { period == "day" && 
                        <Slider
                            value={value}
                            onValueChange={setValue}
                            minimumValue={1}
                            maximumValue={90}
                            thumbStyle = {{
                                backgroundColor: colors.purple
                            }}
                            style = {{
                                marginHorizontal: 10
                            }}
                            step={1}
                            minimumTrackTintColor={colors.purple}
                        />}
                        { period == "week" && 
                        <Slider
                            value={value}
                            onValueChange={setValue}
                            minimumValue={1}
                            maximumValue={12}
                            thumbStyle = {{
                                backgroundColor: colors.purple
                            }}
                            style = {{
                                marginHorizontal: 10
                            }}
                            step={1}
                            minimumTrackTintColor={colors.purple}
                        />}
                    </View>
                </View>
                <View style={styles.save_button}>
                    <Button
                        title="Save"                
                        containerStyle = {{
                            flex: 1,
                            marginHorizontal: 10,
                            justifyContent: 'flex-end',
                            marginBottom: 50,
                        }}

                        buttonStyle= {{
                            backgroundColor: '#BD9EEF',
                        }}
    
                        titleStyle= {{
                            color: 'white',
                            fontFamily: 'AvenirNext-Bold'
                        }}
                    />
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
    options: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
    },
    save_button: {
        flex: 2,
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end'
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