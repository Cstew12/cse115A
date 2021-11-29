import React from 'react'
import { View, Image, Button } from 'react-native'
import {store, auth} from "../../firebase";
import { useNavigation } from '@react-navigation/core';

export default function Save(props) {

    const navigation = useNavigation()   
   
    const uploadImage = async () => {
        console.log(props.route.params.uri)
        console.log("save: " + props.route.params.habitName)
        const childPath = `${auth.currentUser.uid}/${props.route.params.habitName}/${Math.random().toString(36)}`;
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


