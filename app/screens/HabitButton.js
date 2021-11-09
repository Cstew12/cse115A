import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import SliderMinMax from './createHabitComponents/SliderMinMax';

function HabitButton({ title }) {
    const [value, setValue] = useState(10);
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <SliderMinMax
                currVal={value}
                setCurrVal={setValue}
                min={0}
                max={100}
                color='#2e2d2d'
            />
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