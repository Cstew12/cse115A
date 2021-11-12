import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput, SafeAreaView } from 'react-native';
import CreateHabitScreen from './app/screens/CreateHabitScreen';
import LoginScreen from './app/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './app/screens/RegisterPage';
import ProfileScreen from './app/screens/ProfileScreen';
import HabitPage from './app/screens/HabitPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CameraScreen from './app/screens/CameraScreen';
import SaveScreen from './app/screens/Save'
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
// import {auth, db} from "/Users/sparkz/Desktop/cse115A/firebase.js";

// node_modules/expo-permissions


const Stack = createNativeStackNavigator();

export default function App() {


  // useEffect(() => {

  //   (() => registerForPushNotificationsAsync())();
   
  // }, [])

  // async function sendPushNotification(token) {
  //   const message = {
  //     to: token,
  //     sound: 'default',
  //     title: 'Push Notification test',
  //     body: 'Remember to do your habits!',
  //     data: { someData: 'goes here' },
  //   };
  
  //   await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }


  /* Request permission for push notifications from the user */
  // const registerForPushNotificationsAsync = async () => {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   // Save the user's token in Firestore
  //   if (token) {
  //     const res = await db
  //     .collection('CgqL2rvLskdzgSsLabwnif5Lqkz2')
  //     .doc('token')
  //     .set({token}, {merge: true})
  //     .then(() => {
  //       console.log("Token saved");
  //       sendPushNotification(token)
  //     });

  //   }
  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   return token;
  // }

  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Order of the stack screens please don't change the order */}
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="CreateHabit" component={CreateHabitScreen} />
          <Stack.Screen name="Habits" options={{headerShown: false}} component={HabitPage} />
          <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterPage} />
          <Stack.Screen name="CameraScreen" options={{headerShown: false}} component={CameraScreen} />
          <Stack.Screen name="Save"options={{headerShown: false}}  component={SaveScreen} />
          <Stack.Screen name="Profile"  component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}



