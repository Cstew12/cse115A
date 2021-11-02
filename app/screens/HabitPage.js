import React, {useState, useEffect} from 'react';
import { auth} from "../../firebase";
import {db} from "../../firebase";
import {StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Input, LinearProgress} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

const HabitPage = () => {

    const fetchHabits=async()=>{
        const response=db.collection('test_collection');
        const data=await response.get();
        data.docs.forEach(item=>{
         setHabits([...habits,item.data()])
        })
      }
    
    useEffect(() => {
        fetchHabits();
      }, [])

    const navigation = useNavigation();
    const [build, setBuild] = useState('Build');
    const [period, setPeriod] = useState('day');
    const [value, setValue] = useState(1);
    const [name, setName] = useState('');
    const [habits,setHabits]=useState([]);

    const colors = {
        purple: "#BD9EEF", // BD9EEF, E3D1FC
    }

    console.log('before');
    console.log(habits[0]);
    console.log('after');

    if(habits[0] == undefined){
        return null
    }

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.header}>{habits[0].hname}</Text>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.options}>
                        <Input
                            //placeholder='Current Frequency (click to edit)'
                            label= 'Frequency'
                            placeholder= {habits[0].freq + ' (click to edit)'}
                            placeholderTextColor='#ffffff'

                            inputStyle= {{
                                color: '#fff',
                                fontFamily: 'AvenirNext-Regular'
                            }}
                            onChangeText={text =>
                                db
                                .collection('test_collection')
                                .doc('h1')
                                .update({
                                    freq: text,
                                    })
                            }

                        />
                    </View>
                    <View style={styles.options}>
                        <Input
                            //placeholder='Current Motivation (click to edit)'
                            label= 'Motivation'
                            placeholder= {habits[0].motiv + ' (click to edit)'}
                            placeholderTextColor='#ffffff'

                            inputStyle= {{
                                color: '#fff',
                                fontFamily: 'AvenirNext-Regular'
                            }}

                            onChangeText={text =>
                                db
                                .collection('test_collection')
                                .doc('h1')
                                .update({
                                    motiv: text,
                                    })
                            }
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
                                Current Streak: {habits[0].streak}
                            </Text>
                        <LinearProgress 
                            color="primary"
                            variant="determinate"
                            value={habits[0].streak / 10}
                            //value='0.3'
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
                                onPress={()=>setBuild('Build')}
                        
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