import React from 'react';
import { Button } from 'react-native-elements/dist/buttons/Button';

// Button to update the frequency of times habit is performed. 
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
                color: '#82f591',
                fontFamily: 'AvenirNext-Regular'
            }}
        />            
    );
}

export default PeriodButton;