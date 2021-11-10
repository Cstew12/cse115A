import React from 'react';
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


const Stack = createNativeStackNavigator();

export default function App() {
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
          <Stack.Screen name="Save" options={{headerShown: false}}  component={SaveScreen} />
          <Stack.Screen name="Profile"  options={{headerShown: false}} component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
