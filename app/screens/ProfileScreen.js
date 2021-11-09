import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useNavigation } from '@react-navigation/core';
import { AutoFocus } from 'expo-camera/build/Camera.types';
import { auth} from "../../firebase";
import {db} from "../../firebase";
import { FAB } from 'react-native-elements';

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

    
    // const fetchUserInfo=async()=>{
    //     const response=db.collection('test_collection');
    //     const data=await response.get();
    //     data.docs.forEach(item=>{
    //      setHabits([...habits,item.data()])
    //     })
    //   }
    
    // useEffect(() => {
    //     fetchUserInfo();
    //   }, [])

    // const [userinfo,setUserInfo]=useState([]);

    return (
        <View style={styles.container}>
            <Button
                  title="Sign Out"
                  type= "solid"
                  raised = "true"
                  onPress={handleSignOut}  
                  buttonStyle= {{
                    backgroundColor: 'blue',
                    width:'40%',
                    left:'580%',
                  }}

                  titleStyle= {{
                    color: 'white',
                    fontFamily: 'AvenirNext-Bold'
                  }}
                /> 
            <View style={styles.top}>
                <Avatar 
                    rounded 
                    size="xlarge" 
                    title="UN"
                    containerStyle={{
                        backgroundColor: "lightgray",
                    }}
                />
            </View>
            <View style={styles.body}>
                <Text style={styles.userInfo}> UserFirstName and UserLastName</Text> 
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
                <View style={styles.habitContainer}>
                    <Button
                        title="Habit 1"
                        //so i can test the habit page
                        onPress={()=>{
                            navigation.navigate('Habits');
                        }}
                        containerStyle={{
                            flex: 1,
                            marginHorizontal: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: "#BD9EEF",
                            height: 55,
                        }}
                        titleStyle = {{
                            
                        }}
                    />
                </View>
                <View style={styles.habitContainer}>
                    <Button
                        title="Habit 2"
                        containerStyle={{
                            flex: 1,
                            marginHorizontal: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: "lightgreen",
                            height: 55,
                        }}
                        titleStyle = {{
                            
                        }}
                    />
                </View>
                <View style={styles.habitContainer}>
                    <Button
                        title="Habit 3"
                        containerStyle={{
                            flex: 1,
                            marginHorizontal: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: "lightblue",
                            height: 55,
                        }}
                        titleStyle = {{
                            
                        }}
                    />
                </View>
            </View>
            <View>
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
        flexDirection: 'row',
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
        fontSize: 20
    },
    bottom : {
        flex: 2
    },
    habitContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }, 
});

export default ProfileScreen;