import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View } from 'react-native';
import {Input} from 'react-native-elements';

function HabitInput(props) {
    return (
        <View style={styles.options}>
            <Input
                placeholder={props.placeholder}
                placeholderTextColor='#9c9c9c'

                inputStyle= {{
                    color: '#fff',
                    fontFamily: 'AvenirNext-Regular'
                }}
                onChangeText={props.setInput}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    options: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
    },
});

export default HabitInput;