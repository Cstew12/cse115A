import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SliderMinMax from './createHabitComponents/SliderMinMax';
import { useNavigation } from '@react-navigation/core';

function HabitButton({ title }) {
    const [value, setValue] = useState(10);
    const navigation = useNavigation();

    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={()=> navigation.navigate('Habits')}>
                <Text style={styles.title}>{title}</Text>
                <SliderMinMax
                    currVal={value}
                    setCurrVal={setValue}
                    min={0}
                    max={100}
                    color='#2e2d2d'
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default HabitButton;