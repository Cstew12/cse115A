import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {LinearProgress} from 'react-native-elements';


// passing props to habit page through navigation
function GalleryButton({title, id}) {
    const navigation = useNavigation();
    return (
        <View style={styles.item}>
            <TouchableOpacity  onPress={() => navigation.navigate('Gallery', {name: title},{uid: id})}>
                <Text style={styles.title}>{title}</Text>
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
    }
});

export default GalleryButton;