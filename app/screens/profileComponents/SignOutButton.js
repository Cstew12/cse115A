import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {auth} from "../../../firebase";

function SignOutButton(props) {
    const navigation = useNavigation();
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate("Login")
            })
            .catch(error => alert(error.message));
    }

    return (
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
    );
}

export default SignOutButton;