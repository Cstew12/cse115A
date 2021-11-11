import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useNavigation } from '@react-navigation/core';
import { AutoFocus, WhiteBalance } from 'expo-camera/build/Camera.types';
import {auth} from "../../firebase";
import {db} from "../../firebase";
import { FAB } from 'react-native-elements';
import HabitButton from './HabitButton';

function ProfileScreen(props) {
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message));
    }


    const [habits, setHabits] = useState([]);
    const [name, setName] = useState('');

    const realTimeData = () => {
        const uid = auth.currentUser.uid;
        const temp = db
        .collection(uid)
        .onSnapshot(querySnap => {
            setHabits([]);
            querySnap.docs.forEach( doc => {
                if(doc.id !== "user profile") {
                    setHabits(habits => habits.concat(doc.data()));
                } else {
                    setName(doc.data().FirstName + " " + doc.data().lastName);
                }
            });
        });
    }

    useEffect(() => {
        realTimeData();
    }, []);
    
    const renderItem = ({ item }) => (
        <HabitButton title={item.habitName} data={item}/>
    );

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View>
                    <Button
                        title="Sign Out"
                        type= "solid"
                        raised = "true"
                        onPress={handleSignOut}  
                        containerStyle = {{
                            marginVertical: 5, 
                        }}
                        buttonStyle= {{
                            backgroundColor: 'blue',
                        }}

                        titleStyle= {{
                            color: 'white',
                            fontFamily: 'AvenirNext-Bold'
                        }}
                    /> 
                </View>

                <View>
                    <Avatar 
                        rounded 
                        size="xlarge" 
                        title="UN"

                        containerStyle={{
                            backgroundColor: "lightgray",
                        }}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.userInfo}>{name}</Text> 
                <Text style={styles.userInfo}> {auth.currentUser?.email}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Button
                        title="Add Friends"
                        type= "solid"
                        onPress={()=> navigation.navigate('Habits')} 
                        buttonStyle= {{
                            backgroundColor: 'white',
                            height: 50,
                            width: 150,
                            paddingLeft: 5,
                            paddingRight: 2,
                            marginEnd: 14,
                        }}

                        titleStyle= {{
                            color: 'black',
                            fontFamily: 'AvenirNext-Bold'
                        }}
                        /> 
                    </View>
                    <View>
                        <Button
                        title="Home Page"
                        type= "solid"
                        buttonStyle= {{
                            backgroundColor: 'white',
                            height: 50,
                            width: 150,
                            paddingLeft: 5,
                            paddingRight: 5,
                            marginEnd: 14,
                        }}

                        titleStyle= {{
                            color: 'black',
                            fontFamily: 'AvenirNext-Bold'
                        }}
                        />
                    </View> 
                </View>
                <Text style={styles.body}>Habits I'm currently working on</Text> 
            </View>
            <View style={styles.bottom}>
                <FlatList
                    data={habits}
                    renderItem={renderItem}
                    keyExtractor={item => item.habitName}
                />
            <FAB 
                title="Add New Habit"
                size="xlarge" 
                onPress={()=> navigation.navigate('CreateHabit')}   
                buttonStyle={{
                    backgroundColor: "white",
                    height: 40,
                }}
                titleStyle = {{
                   color: "black",         
                }} 
            />
            </View> 
        </View>
    );   
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2e2d2d',
        flex: 1
    },
    top: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    body: {
        flex : 1, 
        color: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25
    },
    userInfo: {
        fontSize: 20,
    },
    bottom : {
        flex: 3
    },
    habitContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }, 
});

export default ProfileScreen;