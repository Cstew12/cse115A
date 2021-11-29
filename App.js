import React from 'react';
import CreateHabitScreen from './app/screens/CreateHabitScreen';
import LoginScreen from './app/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './app/screens/RegisterScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import HabitPage from './app/screens/HabitDetailsScreen';
import FriendsList from './app/screens/FriendsListScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CameraScreen from './app/screens/CameraScreen';
import SaveScreen from './app/screens/SaveScreen'
import GalleryScreen from './app/screens/GalleryScreen';
import FriendsProfileScreen from './app/screens/FriendsProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Order of the stack screens please don't change the order */}
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="CreateHabit" options={{headerShown: false}} component={CreateHabitScreen} />
          <Stack.Screen name="Habits" options={{headerShown: false}} component={HabitPage} />
          <Stack.Screen name="Friends" options={{headerShown: false}} component={FriendsList} />
          <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterPage} />
          <Stack.Screen name="CameraScreen" options={{headerShown: false}} component={CameraScreen} />
          <Stack.Screen name="Save" options={{headerShown: false}}  component={SaveScreen} />
          <Stack.Screen name="Profile"  options={{headerShown: false}} component={ProfileScreen} />
          <Stack.Screen name="Gallery"  options={{headerShown: false}} component={GalleryScreen} />
          <Stack.Screen name="FriendsProfile"  options={{headerShown: false}} component={FriendsProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
