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
import {Icon} from 'react-native-elements';



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
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');

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
                    setUserName(doc.data().username);
                    setInitials(doc.data().FirstName.charAt(0)+doc.data().lastName.charAt(0));
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
                <View style={styles.signOutButton}>
                    <Button
                        title="Sign out"
                        type= "solid"
                        icon={
                            <Icon
                            name='sign-out'
                            size={15}
                            type='font-awesome'
                            color="white"
                            />
                        }
                        onPress={handleSignOut}  
                        
                        titleStyle= {{
                            color: 'white',
                            fontFamily: 'AvenirNext-Bold'
                        }}
                    /> 
                </View>
                <View style={styles.avatar}>
                    <Avatar 
                        rounded 
                        size="xlarge" 
                        title={initials}

                        containerStyle={{
                            backgroundColor: "lightgray",
                        }}
                    />
                </View>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'column',}}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.username}>
                        {userName}
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', alignContent: 'space-between'}}>
                    <Button
                        type= "solid"
                        title=' Friends'
                        icon={
                            <Icon
                                name='address-book'
                                size={15}
                                type='font-awesome'
                                color="white"
                            />
                        }
                    />
                    <Button
                        type= "solid"
                        type= "solid"
                        title=' Home'
                        icon={
                            <Icon
                                name='home'
                                size={20}
                                type='font-awesome'
                                color="white"
                            />
                        }
                    />
                    
                </View>
            </View>
            <View style={styles.bottom}>
                <FlatList
                    data={habits}
                    renderItem={renderItem}
                    keyExtractor={() => Math.random().toString(36)}
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
        flex: 2
    },
    signOutButton: {
        flex: 1, 
        flexDirection: 'row-reverse', 
        marginLeft: 10, 
        marginTop: 50
    },
    avatar: {
        flex: 3, 
        alignItems: 'center', 
        flexDirection: 'column'
    },
    name: {
        color: 'grey',
        fontSize: 20
    },
    username: {
        color: 'grey',
        fontSize: 14,
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