import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';

/*
* Displays button with address book icon and navigates to friends list
*/
function FriendsButton({username}) {
    const navigation = useNavigation();

    return (
        <Button
            type= "solid"
            title=' Friends'
            titleStyle= {{
                fontFamily: 'AvenirNext-Bold'
              }}
            icon={
                <Icon
                    name='address-book'
                    size={15}
                    type='font-awesome'
                    color="white"
                />
            }
            onPress={() => navigation.navigate('Friends', {username: username})}
        />
    );
}

export default FriendsButton;