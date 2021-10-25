import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Input} from 'react-native-elements';
import { Slider } from 'react-native-elements';
import { Animated } from 'react-native';


function CreateHabitScreen(props) {
    const [build, setBuild] = useState('Build');
    const [period, setPeriod] = useState('day');
    const [value, setValue] = useState(1);
    const [name, setName] = useState('');

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
                            color: "#E3D1FC"
                        }}>
                        Create a goal
                    </Text>
                </View>
                <View style={styles.options}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Button
                            title="Build"
                            type= "outline"
                            onPress={()=>setBuild('Build')}
                    
                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                borderColor: build == 'Build' ? "#E3D1FC" : '#2e2d2d',
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
                            onPress={()=>setBuild('Quit')}
                    
                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                borderWidth: 3,
                                borderColor: build == 'Quit' ? "#E3D1FC" : '#2e2d2d',
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
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Button
                            title="Daily"
                            type="outline"
                            onPress={()=>setPeriod('day')}

                            containerStyle = {{
                                flex: 1,
                                marginHorizontal: 10

                            }}
                    
                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                borderWidth: 3,
                                borderColor: period == 'day' ? "#E3D1FC" : '#2e2d2d',
                            }}
        
                            titleStyle= {{
                                color: '#E3D1FC',
                                fontFamily: 'AvenirNext-Regular'
                            }}
                        />
                        <Button
                            title="Weekly"
                            type="outline"
                            onPress={()=>setPeriod('week')}
                    
                            containerStyle = {{
                                flex: 1,
                                marginHorizontal: 10
                            }}

                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                borderWidth: 3,
                                borderColor: period == 'week' ? "#E3D1FC" : '#2e2d2d',
                            }}
        
                            titleStyle= {{
                                color: '#E3D1FC',
                                fontFamily: 'AvenirNext-Regular'
                            }}
                        />
                        <Button
                            title="Monthly"
                            type="outline"
                            onPress={()=>setPeriod('month')}
                    
                            containerStyle = {{
                                flex: 1,
                                marginHorizontal: 10
                            }}

                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                borderWidth: 3,
                                borderColor: period == 'month' ? "#E3D1FC" : '#2e2d2d',
                            }}
        
                            titleStyle= {{
                                color: '#E3D1FC',
                                fontFamily: 'AvenirNext-Regular'
                            }}
                        />
                    </View>
                </View>
                <View style={styles.options}>
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                        <Slider
                            value={value}
                            onValueChange={setValue}
                            minimumValue={1}
                            maximumValue={30}
                            thumbStyle = {{
                                backgroundColor: "#E3D1FC"
                            }}
                            style = {{
                                marginHorizontal: 10
                            }}
                            step={1}
                            minimumTrackTintColor="#E3D1FC"
                        />
                        <Text 
                            style={{
                                marginHorizontal: 10, 
                                alignSelf: 'center',
                                fontFamily: 'AvenirNext-Regular',
                                color: "#E3D1FC"
                            }}>
                            {name == '' ? 'Do habit' : name} {build == 'Build' ? 'at least' : 'at most'} {value} times per {period}  
                        </Text>
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
                            backgroundColor: '#E3D1FC',
                        }}
    
                        titleStyle= {{
                            color: '#9c9c9c',
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
        backgroundColor: '#E3D1FC',
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