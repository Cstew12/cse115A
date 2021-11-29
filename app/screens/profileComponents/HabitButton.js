import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {LinearProgress} from 'react-native-elements';

// passing props to habit page through navigation
function HabitButton({title, data}) {
    const [value, setValue] = useState(data.streak);
    const navigation = useNavigation();

    return (
        <View style={styles.item}>
            <TouchableOpacity  onPress={() => navigation.navigate('Habits', {habitData: data})}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{data.period === 'day' ? 'Daily' : data.frequency + 'x per week'}</Text>
                <LinearProgress 
                    color="primary"
                    variant="determinate"
                    value={data.streak / (data.duration * data.frequency)}
                    color='#2e2d2d'
                    style={{
                        marginBottom: 15, 
                        marginTop: 15,
                    }}>
                </LinearProgress>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#82f591',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 25,
    },
    title: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 32,
    },
    subtitle: {
        fontFamily: 'AvenirNext-Regular',
        fontSize: 14,
    },
});

export default HabitButton;