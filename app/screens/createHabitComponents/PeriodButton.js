import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';

function PeriodButton(props) {
    return (
        <Button
            title={props.title}
            type="outline"
            onPress={props.onPress}
            containerStyle = {{
                flex: 1,
                marginHorizontal: 10
            }}
            buttonStyle= {{
                backgroundColor: '#9c9c9c',
                borderWidth: 3,
                borderColor: props.borderColor,
            }}

            titleStyle= {{
                color: '#E3D1FC',
                fontFamily: 'AvenirNext-Regular'
            }}
        />            
    );
}

export default PeriodButton;