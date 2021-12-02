import React, { useState, useEffect } from "react";
import { StyleSheet, Text,View, Pressable, Image, TextInput} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";

const LoginScreen = () => {
  /* user properties */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  /* *
   * Take us to the Create Habit page if someone is logged in
   * this is basically a listener on the Firebase server to check if a user had signed in
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Profile");
      }
    });
    return unsubscribe;
  }, []);

  /**
   * Handle the user login using the inputted email and password,
   * then navigate to the profile page upon a successful authentication.
   */
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        navigation.navigate("Profile");
      })
      .catch((error) => alert(error.message)); // print alert for failure
  };

  // UI Split up into 3 main flexes: Header (for logo and title),
  // Login (for input fields and login button),
  // and SignUp (for Sign up button)

  return (
    <View style={styles.container}>
      <View style={styles.headerFlex}>
        <Image
          source={require("./../../assets/routeam-logo5.png")}
          style={styles.image1}
        />

        <Text style={styles.titleText}>Routeam</Text>

        <Text style={styles.quoteText}>Building Habits With Friends!</Text>
      </View>

      <View style={styles.loginFlex}>
        <Input
          placeholder="Email"
          placeholderTextColor="#9c9c9c"
          placeholderColo
          leftIcon={<Icon name="envelope" size={14} color="#9c9c9c" />}
          onChangeText={(text) => setEmail(text)}
          inputStyle={{
            color: "#9c9c9c",
          }}
          inputContainerStyle={{
            width: 175,
            marginTop: -30,
          }}
        />

        <Input
          placeholder="Password"
          placeholderTextColor="#9c9c9c"
          leftIcon={<Icon name="lock" size={18} color="#9c9c9c" />}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          inputStyle={{
            color: "#9c9c9c",
          }}
          inputContainerStyle={{
            marginTop: -15,
            marginBottom: -12,
            width: 175,
          }}
        />

        <Button
          title="Login"
          type="solid"
          raised="true"
          onPress={handleLogin}
          buttonStyle={{
            backgroundColor: "#9c9c9c",
          }}
          titleStyle={{
            color: "#82f591",
            fontFamily: "AvenirNext-Bold",
          }}
        />
      </View>

      <View style={styles.signupFlex}>
        <Text style={styles.smallText}>Don't have an account?</Text>

        <Button
          title="Sign Up"
          type="solid"
          raised="true"
          onPress={() => navigation.navigate("Register")}
          buttonStyle={{
            backgroundColor: "#9c9c9c",
          }}
          titleStyle={{
            color: "#82f591",
            fontFamily: "AvenirNext-Bold",
          }}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

// Component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2d2d",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  headerFlex: {
    flex: 3.4,
    backgroundColor: "#2e2d2d",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  loginFlex: {
    flex: 3,
    backgroundColor: "#2e2d2d",
    justifyContent: "center",
  },

  signupFlex: {
    flex: 1,
    backgroundColor: "#2e2d2d",
    justifyContent: "flex-start",
  },

  smallText: {
    fontSize: 12,
    color: "#9c9c9c",
    fontFamily: "Al Nile",
    marginLeft: 0,
  },

  titleText: {
    fontSize: 50,
    color: "#82f591",
    fontFamily: "AvenirNext-Bold",
    marginBottom: -10,
  },

  quoteText: {
    fontSize: 12,
    color: "#9c9c9c",
    fontFamily: "AvenirNext-Bold",
    marginTop: 5,
  },

  image1: {
    width: 160,
    height: 250,
    marginBottom: -20,
    marginLeft: -22,
  },
});

export default LoginScreen;
