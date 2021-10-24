import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import CreateHabitScreen from './app/screens/CreateHabitScreen';
import LoginScreen from './app/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './app/screens/RegisterPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateHabit" component={CreateHabitScreen} />
          <Stack.Screen name="Register" component={RegisterPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
