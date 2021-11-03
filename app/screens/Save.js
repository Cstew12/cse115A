import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
import {db} from "../../firebase";
import { auth} from "../../firebase";
import {store} from "../../firebase";


export default function Save(props) {
    const [uri, setUri] = useState('');
    console.log(props.route.params.image);
    //const uri = props.image;
    useEffect(() => {
        const propsUri = props.uri; 
        setUri(uri);
      });
    const uploadImage = async () => {
        
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    return (
        <View style={{ flex: 1 }}>
            {props && <Image source={{ uri: uri }} style={{ flex: 1 }} />}
            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}


