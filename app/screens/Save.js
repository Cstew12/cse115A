import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, Button } from 'react-native'
import {db, store, auth} from "../../firebase";
import { useNavigation } from '@react-navigation/core';

export default function Save(props) {

    const navigation = useNavigation()   
   
    const uploadImage = async () => {
        console.log(props);
        console.log("/n");
        console.log(props.route.params.uri)
        const childPath = `${auth.currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(props.route.params.uri);
        const blob = await response.blob();

        /* Save the image into Storage and navigate to the profile page on success */
        store
            .ref()
            .child(childPath)
            .put(blob)
            .then( () => {
                navigation.navigate("Profile");
                
            }).catch((e) => console.log("uploading image error =>", e));
    }

    return (
        <View style={{ flex: 1 }}>
            {props && <Image source={{ uri: props.route.params.uri}} style={{ flex: 1 }} />}
            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}


