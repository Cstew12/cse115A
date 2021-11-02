import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Input, LinearProgress} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';


function HabitPage(props) {
    const navigation = useNavigation();
    const [build, setBuild] = useState('Build');
    const [period, setPeriod] = useState('day');
    const [value, setValue] = useState(1);
    const [name, setName] = useState('');
    const colors = {
        purple: "#BD9EEF", // BD9EEF, E3D1FC
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.header}>Habit Name</Text>
            </View>
            <View style={styles.bottom}>
                <View style={styles.options}>
                    <Input
                        placeholder='Current Frequency (click to edit)'
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
                        placeholder='Current motivation (click to edit)'
                        placeholderTextColor='#9c9c9c'

                        inputStyle= {{
                            color: '#fff',
                            fontFamily: 'AvenirNext-Regular'
                        }}
                    />
                </View>
                <View style={styles.options}>
                        <Text 
                            style={{
                                marginHorizontal: 20,
                                marginBottom: -25, 
                                marginTop: 18,
                                alignSelf: 'center',
                                fontFamily: 'AvenirNext-Medium',
                                fontSize: 20,
                                color: '#F7BE45',
                            }}>
                            Current Streak: 10
                        </Text>
                    <LinearProgress 
                        color="primary"
                        variant="determinate"
                        value="0.3"
                        color="#F7BE45"

                        style={{
                            marginBottom: 15, 
                            marginTop: 45,
                        }}>

                    </LinearProgress>
   
                </View>
                <View style={styles.options}>
                    <View style={{flex: 1}}>
                        <Text 
                            style={{
                                marginHorizontal: 20,
                                marginBottom: -15, 
                                marginTop: 50,
                                alignSelf: 'center',
                                fontFamily: 'AvenirNext-Medium',
                                fontSize: 35,
                                color: '#F7BE45',
                            }}>
                            Record this Habit
                        </Text>
                    </View>
                </View>
                <View style={styles.record_buttons}>
                <View style={{flexDirection: 'row'}}>
                        <Button
                            title="Record with Picture"
                            type= "solid"
                            onPress={()=>{
                                setBuild('Build');
                                navigation.navigate('CameraScreen');
                            }}
                            
                            
                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                height: 70,
                                width: 170,
                                paddingLeft: 5,
                                paddingRight: 5,
                                marginEnd: 14,
                                marginTop: 60,
                            }}
        
                            titleStyle= {{
                                color: '#F7BE45',
                                fontFamily: 'AvenirNext-Regular',
                                fontSize: 18,
                            }}
                        />
                        <Button
                            title="Record"
                            type="solid"
                            onPress={()=>setBuild('Quit')}
                    
                            buttonStyle= {{
                                backgroundColor: '#9c9c9c',
                                height: 70,
                                width: 170,
                                paddingLeft: 50,
                                paddingRight: 50,
                                marginTop: 60,
                            }}
        
                            titleStyle= {{
                                color: '#F7BE45',
                                fontFamily: 'AvenirNext-Regular'
                            }}
                        />
                    </View>
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
        backgroundColor: '#F7BE45',
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
    record_buttons: {
        flex: 3,
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
});

export default HabitPage;