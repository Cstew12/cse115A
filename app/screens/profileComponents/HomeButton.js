import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
function HomeButton(props) {
    const navigation = useNavigation();

    return (
        <Button
            type= "solid"
            type= "solid"
            title=' Home'
            titleStyle= {{
                fontFamily: 'AvenirNext-Bold'
              }}
            icon={
                <Icon
                    name='home'
                    size={20}
                    type='font-awesome'
                    color='white'
                />
            }
            onPress={() => navigation.navigate('Home')}
        />
    );
}

export default HomeButton;