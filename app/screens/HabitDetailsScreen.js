//Imports including React, React native elements, firebase, and self-made components
import React, {useState} from 'react';
import { auth} from "../../firebase";
import {db} from "../../firebase";
import "firebase/firestore";
import firebase from 'firebase/app';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input, LinearProgress} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from './habitPageComponents/BackButton';
import RecordButton from './habitPageComponents/RecordButton';
import YesNoModal from './profileComponents/YesNoModal';
import CustomModal from './friendComponents/CustomModal';

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
    const [deleteModal, setDeleteModal] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [completeCameraModal, setCompleteCameraModal] = useState(false);
    const increment = firebase.firestore.FieldValue.increment(1);

    //Properly formats all database data
    const hName = deQuote(JSON.stringify(habitData.habitName));
    const hMotiv = deQuote(JSON.stringify(habitData.motivation));
    const hFreq = deQuote(JSON.stringify(habitData.frequency));
    const hPeriod = deQuote(JSON.stringify(habitData.period));
    const hStreak = habitData.streak;
    const hLastRecord = habitData.lastRecord;
    const hRecordsThisWeek = habitData.recordsThisWeek;
    const hDuration = habitData.duration;
    const uid = auth.currentUser.uid;

    //Pluralize 'time' depending on number of times a day/week
    const [plural, setPlural] = useState((hFreq == 1) ? 'time' : 'times');

    //Checking if the streak needs to be reset (user didn't reach goal)
    const cDate = new Date();
    //If user has daily streak
    if(hPeriod == "day"){
        //Check if the time since last record exceeds 1 day, and if it does then reset streak 
        if(cDate.getDate() - hLastRecord > 1){
            db
                .collection(uid)
                .doc(hName)
                .update({
                    streak: 0,
                })
        }
        //Streak is hFreq times per week. Week starts on Sunday (6)
    }else{
        if(cDate.getDay() == 6){
            //If the number of records for the week is less than desired frequency then reset streak
            if(hRecordsThisWeek < hFreq){
                db
                    .collection(uid)
                    .doc(hName)
                    .update({
                        streak: 0,
                })
            }
            //Reset the number of records per week every Sunday
            db
                .collection(uid)
                .doc(hName)
                .update({
                    recordsThisWeek: 0,
                })
        }
    }

    //UI: Split up into two main flexes: Top (styles.top) and Bottom (styles.bottom) 
    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                                color='white'
                            />
                        }

                        buttonStyle= {{
                            backgroundColor: '#2e2d2d',
                            height: 50,
                            width: 70,
                            marginBottom: 90,
                            marginRight: 10,
                                }}

                        //Deletes current habit and navigates back to profile page onPress
                        onPress={()=>{
                            setDeleteModal(true)
                        }}
                    />
                </View>
                <Text style={styles.header}>{hName}</Text>
            </View>

            <View style={styles.bottom}>
                    <YesNoModal
                    //Modal that pops up when the delete button is pressed making sure the user would like to do so
                        modalVisible={deleteModal}
                        setVisible={setDeleteModal}
                        onHideModal={() => {
                            setDeleteModal(!deleteModal);
                        }}
                        navigate={() => {
                             db
                                .collection(uid)
                                .doc(hName)
                                .delete()
                            navigation.navigate('Profile');
                            setDeleteModal(!deleteModal);
                        }}
                        title='Are you sure you want to delete this habit? '
                        hideModalText='Yes'
                    />
                    <CustomModal
                    //Modal for when a user completes a streak while taking a photo
                        modalVisible={completeModal}
                        setVisible={setCompleteModal}
                        onHideModal={() => {
                            if(hStreak == 0){
                                db
                                        .collection(uid)
                                        .doc(hName)
                                        .update({
                                            streak: increment,
                                            })
                                        
                            }
                            navigation.navigate('Profile');
                            setCompleteModal(!completeModal);
                        }}
                        title={'Congrats! You have completed your goal for this habit! Feel free to keep going past your goal, or delete this habit and create new ones. Also make sure to check out the gallery for a recap of your journey!'}
                        hideModalText='Return to Profile'
                        inputField={false}
                    />
                    <CustomModal
                    //Modal for when the user completes a streak by just recording
                        modalVisible={completeCameraModal}
                        setVisible={setCompleteCameraModal}
                        onHideModal={() => {
                            if(hStreak == 0){
                                db
                                        .collection(uid)
                                        .doc(hName)
                                        .update({
                                            streak: increment,
                                            })
                                        
                            }
                            navigation.navigate('CameraScreen', {habitName: hName});
                            setCompleteCameraModal(!completeCameraModal);  
                        }}
                        title={'Congrats! You have completed your goal for this habit! Feel free to keep going past your goal, or delete this habit and create new ones. Also make sure to check out the gallery for a recap of your journey!'}
                        hideModalText='Continue to Picture'
                        inputField={false}
                    />  
                <View style={styles.options}>
                        <Text 
                            style={styles.freq_title}>
                            Frequency: {hFreq} {plural} a {hPeriod}
                        </Text>
                    
                </View>

                <View style={styles.options}>
                    <Input
                        
                        label= 'Motivation'
                        placeholder= {hMotiv + ' (click to edit)'}
                        placeholderTextColor='#82f591'

                        labelStyle= {{
                            color: '#9c9c9c'
                        }}

                        inputContainerStyle= {{
                            borderColor: '#9c9c9c'
                        }}

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
                                if(false){
                                    alert("You can only record a habit once a day.");
                                }else{
                                    db
                                        .collection(uid)
                                        .doc(hName)
                                        .update({
                                            streak: increment,
                                            recordsThisWeek: increment,
                                            lastRecord: cDate.getDate(),
                                            })
                                            .then(() => {
                                                if(hStreak + 1 == (hFreq * hDuration)){
                                                    setCompleteCameraModal(true)
                                                }else{
                                                    navigation.navigate('CameraScreen', {habitName: hName}); 
                                                } 
                                            });  
                                    }
                                }}
                        />
                        <RecordButton
                            title="Record"
                            marginEnd={14}
                            onPress={()=>{
                                const cDate = new Date();
                                if(false){
                                    alert("You can only record a habit once a day.");
                                }else{
                                db
                                    .collection(uid)
                                    .doc(hName)
                                    .update({
                                        streak: increment,
                                        recordsThisWeek: increment,
                                        lastRecord: cDate.getDate(),
                                        })
                                    .then(() => {
                                            if(hStreak + 1 == (hFreq * hDuration)){
                                                setCompleteModal(true)
                                            }else{
                                                navigation.navigate('Profile'); 
                                            } 
                                        });                     
                            }}
                        }
                        />
                        <RecordButton
                            title="Photo Gallery"
                            marginEnd={0}
                            onPress={()=>{
                                navigation.navigate('Gallery', {name: hName, uid: auth.currentUser.uid});
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
    freq_title: {
        marginHorizontal: 20,
        marginTop: 15,
        alignSelf: 'center',
        fontFamily: 'AvenirNext-Medium',
        fontSize: 25,
        color: '#82f591',
    },
});

export default HabitPage;