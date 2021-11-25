//Imports including React, React native elements, firebase, and self-made components
import React, {useState, useEffect} from 'react';
import { auth} from "../../firebase";
import {db} from "../../firebase";
import "firebase/firestore";
import firebase from 'firebase/app';
import {StyleSheet, Text, View } from 'react-native';
import {Button, Input, LinearProgress} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from './habitPageComponents/BackButton';
import RecordButton from './habitPageComponents/RecordButton';

const HabitPage = ({route}) => {
    //Obtains the data routed from the profile page
    const {habitData} = route.params;

    //Removes the quotations from the retrieved data
    function deQuote(str1){
        if(str1 !== undefined){
            const str2 = str1.substring(1, str1.length - 1);
            return str2;
        } else {
            setExists(false);
        }
    }

    //Initializes use states
    const navigation = useNavigation();
    const [exists, setExists] = useState(true);
    const increment = firebase.firestore.FieldValue.increment(1);

    //Properly formats all database data
    const hName = deQuote(JSON.stringify(habitData.habitName));
    const hMotiv = deQuote(JSON.stringify(habitData.motivation));
    const hFreq = deQuote(JSON.stringify(habitData.frequency));
    const hPeriod = deQuote(JSON.stringify(habitData.period));
    const hStreak = habitData.streak;
    const hLastRecord = habitData.lastRecord;
    const hDuration = habitData.duration;
    const uid = auth.currentUser.uid;

    //UI: Split up into two main flexes: Top (styles.top) and Bottom (styles.bottom) 
    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <View style={{flexDirection: 'row'}}>
                    <BackButton
                        destination='Profile'
                        iconColor='white'
                        backgroundColor='#2e2d2d'
                        marginBottom={90}
                        marginHorizontal={10}
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

                        //Deletes current habit and navigates back to profile page onPress
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
                        
                        //Updates the motivation of the habit onChangeText and keeps current text of input is empty
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
                            style={styles.streak_title}>
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
                        <Text style={styles.record_title}>
                            Record this Habit
                        </Text> 
                    </View>
                </View>

                <View style={styles.record_buttons}>
                    <View style={{flexDirection: 'row'}}>
                        <RecordButton
                            title="Record with Picture"
                            marginEnd={14}
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
                        />
                        <RecordButton
                            title="Record"
                            marginEnd={14}
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
                        <RecordButton
                            title="Photo Gallery"
                            marginEnd={0}
                            onPress={()=>{
                                navigation.navigate('Gallery', {name: hName});
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

//Component styles
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
    record_title: {
        marginHorizontal: 20,
        marginBottom: -15, 
        marginTop: 38,
        alignSelf: 'center',
        fontFamily: 'AvenirNext-Bold',
        fontSize: 35,
        color: '#82f591',
    },
    streak_title: {
        marginHorizontal: 20,
        marginBottom: -25, 
        marginTop: 18,
        alignSelf: 'center',
        fontFamily: 'AvenirNext-Medium',
        fontSize: 20,
        color: '#82f591',
    },
});

export default HabitPage;