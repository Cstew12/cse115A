import React from 'react';
import {Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

function Counter({currentCount, min, max, setCount}) {
    const decreaseLength = () => {
        if(currentCount === min) {
            setCount(min);
        } else {
            setCount(currentCount - 1);
        }
    }
    const increaseLength = () => {
        if(currentCount >= max) {
            setCount(max);
        } else {
            setCount(currentCount + 1);
        }
    }
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Icon 
                name="minus"
                size={20}
                color='#82f591'
                type="entypo" 
                reverse
                reverseColor="white"
                onPress={decreaseLength}
            />
            <Text
                style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "AvenirNext-Regular",
                    alignSelf: "center"
                }}
            >{currentCount}</Text>
            <Icon 
                name="plus"
                size={20}
                color='#82f591'
                type="entypo" 
                reverse
                reverseColor="white"
                onPress={increaseLength}
            />
        </View>
    );
}

export default Counter;