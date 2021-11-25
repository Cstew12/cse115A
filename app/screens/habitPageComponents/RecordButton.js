import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native-elements/dist/buttons/Button';

function RecordButton({title, onPress, marginEnd}) {
    const navigation = useNavigation();

    return (
        <Button
            title={title}
            type= "solid"
            
            onPress={onPress}
            
            buttonStyle= {{
                backgroundColor: '#9c9c9c',
                height: 70,
                width: 110,
                paddingLeft: 15,
                paddingRight: 15,
                marginEnd: marginEnd,
                marginTop: 60,
            }}

            titleStyle= {{
                color: '#82f591',
                fontFamily: 'AvenirNext-Regular',
                fontSize: 15,
            }}
        />
    );
}

export default RecordButton;