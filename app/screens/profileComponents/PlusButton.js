import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';

function PlusButton({plusColor, backgroundColor, onPress}) {
    const navigation = useNavigation();

    return (
        <Button
            type="solid"
            icon={
                <Icon
                    name="plus"
                    size={25}
                    color={plusColor}
                    type='font-awesome'
                />
            }
            onPress={onPress}   
            iconRight
            buttonStyle= {{
                backgroundColor: backgroundColor,
                height: 50,
                width: 70,
                alignSelf: 'center',
            }}
        />
    );
}

export default PlusButton;