import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { fonts } from 'react-native-elements/dist/config';
//testing git bot
function LoginScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.headerFlex}>

              <Image source={require('./../../assets/routeam-logo5.png')} style={styles.image1}/>

              <Text style={styles.titleText}>Routeam</Text>

              <Text style={styles.quoteText}>Building Habits With Friends!</Text>


            </View>
            

            <View style={styles.loginFlex}>
                <Input
                  placeholder='Email'
                  placeholderTextColor='#9c9c9c'
                  placeholderColo
                  leftIcon={
                    <Icon
                      name='envelope'
                      size={14}
                      color='#9c9c9c'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    width: 175,
                    marginTop: -30
                  }}
                />

                <Input
                  placeholder='Password'
                  placeholderTextColor='#9c9c9c'
                  leftIcon={
                    <Icon
                      name='lock'
                      size={18}
                      color='#9c9c9c'
                    />
                  }

                  inputStyle= {{
                    color: '#9c9c9c'
                  }}

                  inputContainerStyle= {{
                    marginTop: -15,
                    marginBottom: -12,
                    width: 175
                  }}
                />

                <Button
                  title="Login"
                  type= "solid"
                  raised = "true"
                  onPress={()=> props.navigation.navigate('CreateHabit')}
            
                  buttonStyle= {{
                    backgroundColor: '#9c9c9c',
                    //marginTop: -10,
                  }}

                  titleStyle= {{
                    color: '#82f591',
                    fontFamily: 'AvenirNext-Bold'
                  }}
                />   
                
            </View>

            <View style={styles.signupFlex}>
                <Text style={styles.smallText}>Don't have an account?</Text>

                <Button
                  title="Sign Up"
                  type= "solid"
                  raised = "true"
                  onPress={()=> props.navigation.navigate('Register')}
                  buttonStyle= {{
                    backgroundColor: '#9c9c9c'
                  }}
                  titleStyle= {{
                    color: '#82f591',
                    fontFamily: 'AvenirNext-Bold'
                  }}
                />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2e2d2d',
      alignItems: 'center',
      justifyContent: 'center',
    },

    headerFlex: {
      flex: 3.4,
      backgroundColor: '#2e2d2d',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },

    loginFlex: {
      flex: 3,
      backgroundColor: '#2e2d2d',
      justifyContent: 'center',
    },

    signupFlex: {
      flex: 1,
      backgroundColor: '#2e2d2d',
      justifyContent: 'flex-start',
    },
  
    smallText: {
      fontSize: 12,
      color: '#9c9c9c',
      fontFamily: 'Al Nile',
      marginLeft: 0,
    },

    titleText: {
      fontSize: 50,
      color: '#82f591',
      fontFamily: 'AvenirNext-Bold',
      marginBottom: -10
    },

    quoteText: {
      fontSize: 12,
      color: '#9c9c9c',
      fontFamily: 'AvenirNext-Bold',
      marginTop: 5
    },
  
    image1: {
      width: 160,
      height: 250,
      marginBottom: -20,
      marginLeft: -22
    },

  });
  

export default LoginScreen;