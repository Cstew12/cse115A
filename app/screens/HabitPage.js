import React, {useState, useEffect} from 'react';
import { auth} from "../../firebase";
import {db} from "../../firebase";
import {StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Input, LinearProgress} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import "firebase/firestore";
import firebase from 'firebase/app';
import { Divider } from 'react-native-elements';

const HabitPage = ({route}) => {
    const {habitData} = route.params;

    const fetchHabits=async()=>{
        const response=db.collection('test_collection');
        const data=await response.get();
        data.docs.forEach(item=>{
         setHabits([...habits,item.data()])
        })
      }

    function deQuote(str1){
        if(str1 !== undefined){
            const str2 = str1.substring(1, str1.length - 1); // this was causing a bug if str is undefined
            return str2;
        } else {
            setExists(false);
        }
    }
    
    useEffect(() => {
        fetchHabits();
      }, [])

    const navigation = useNavigation();
    const [habits,setHabits]=useState([]);
    const [exists, setExists] = useState(true);
    const hName = deQuote(JSON.stringify(habitData.habitName));
    const hMotiv = deQuote(JSON.stringify(habitData.motivation));
    const hFreq = deQuote(JSON.stringify(habitData.frequency));
    const hStreak = habitData.streak;
    const hLastRecord = habitData.lastRecord;
    const hPeriod = deQuote(JSON.stringify(habitData.period));
    const hDuration = habitData.duration;
    const uid = auth.currentUser.uid;
    const increment = firebase.firestore.FieldValue.increment(1);

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                <View style={{flexDirection: 'row'}}>
                    <Button
                        type="solid"
                        icon={
                            <Icon
                                name="long-arrow-left"
                                size={35}
                                color='white'
                            />
                        }
                        iconRight

                        buttonStyle= {{
                            backgroundColor: '#2e2d2d',
                            height: 50,
                            width: 70,
                            marginBottom: 90,
                            marginHorizontal: 10,
                                }}

                        onPress={()=>{
                            navigation.navigate('Profile');
                        }}
                    />

                    <Button
                        type="solid"
                        icon={
                            <Icon
                                name="trash"
                                size={28}
                                color='#9c9c9c'
                            />
                        }
                        iconRight

                        buttonStyle= {{
                            backgroundColor: '#2e2d2d',
                            height: 50,
                            width: 70,
                            marginBottom: 90,
                            marginHorizontal: 204,
                            alignSelf: 'flex-end',
                                }}

                        onPress={()=>{
                            db
                                .collection(uid)
                                .doc(hName)
                                .delete()
                            navigation.navigate('Profile');
                        }}
                    />
                </View>
                    <Text style={styles.header}>{hName}</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.options}>
                        <Input
                            label= 'Frequency'
                            placeholder= {hFreq + ' times a ' + hPeriod}
                            placeholderTextColor='#ffffff'
                            disabled= 'true'

                            inputStyle= {{
                                fontFamily: 'AvenirNext-Regular'
                            }}
                            />
                </View>
                    <View style={styles.options}>
                        <Input
                            
                            label= 'Motivation'
                            placeholder= {hMotiv + ' (click to edit)'}
                            placeholderTextColor='#999999'

                            inputStyle= {{
                                color: '#fff',
                                fontFamily: 'AvenirNext-Regular'
                            }}

                            onChangeText={text =>
                                {   if(text.length == 0){
                                            db
                                            .collection(uid)
                                            .doc(hName)
                                            .update({
                                                motivation: hMotiv,
                                                })
                                    }else{
                                            db
                                            .collection(uid)
                                            .doc(hName)
                                            .update({
                                                motivation: text,
                                            })
                                    }
                                    
                                }
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
                                    color: '#82f591',
                                }}>
                                Current Streak: {hStreak}       Goal: {hFreq * hDuration}
                            </Text>
                        <LinearProgress 
                            color="primary"
                            variant="determinate"
                            value={hStreak / (hDuration * hFreq)}
                            color='#82f591'

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
                                    marginTop: 38,
                                    alignSelf: 'center',
                                    fontFamily: 'AvenirNext-Bold',
                                    fontSize: 35,
                                    color: '#82f591',
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
                                    const cDate = new Date();
                                    if(hLastRecord == cDate.getDate()){
                                        alert("You can only record a habit once a day.");
                                    }else{
                                        db
                                            .collection(uid)
                                            .doc(hName)
                                            .update({
                                                streak: increment,
                                                lastRecord: cDate.getDate(),
                                                })
                                        navigation.navigate('CameraScreen', {habitName: hName});
                                        }
                                    }}
                                
                                buttonStyle= {{
                                    backgroundColor: '#9c9c9c',
                                    height: 70,
                                    width: 110,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    marginEnd: 14,
                                    marginTop: 60,
                                }}
            
                                titleStyle= {{
                                    color: '#82f591',
                                    fontFamily: 'AvenirNext-Regular',
                                    fontSize: 15,
                                }}
                            />
                            <Button
                                title="Record"
                                type="solid"
                                
                                buttonStyle= {{
                                    backgroundColor: '#9c9c9c',
                                    height: 70,
                                    width: 110,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    marginEnd: 14,
                                    marginTop: 60,
                                }}
            
                                titleStyle= {{
                                    color: '#82f591',
                                    fontFamily: 'AvenirNext-Regular',
                                    fontSize: 15,
                                }}

                                onPress={()=>{
                                    const cDate = new Date();
                                    if(hLastRecord == cDate.getDate()){
                                        alert("You can only record a habit once a day.");
                                    }else{
                                    db
                                        .collection(uid)
                                        .doc(hName)
                                        .update({
                                            streak: increment,
                                            lastRecord: cDate.getDate(),
                                            })
                                    navigation.navigate('Profile');
                                }}
                            }
                            />
                            <Button
                                title="Photo Gallery"
                                type="solid"
                                
                                buttonStyle= {{
                                    backgroundColor: '#9c9c9c',
                                    height: 70,
                                    width: 110,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    marginTop: 60,
                                }}
            
                                titleStyle= {{
                                    color: '#82f591',
                                    fontFamily: 'AvenirNext-Regular',
                                    fontSize: 15,
                                }}

                                onPress={()=>{
                                    navigation.navigate('Gallery');
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
        flex: 1.3,
        backgroundColor: '#82f591',
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
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default HabitPage;