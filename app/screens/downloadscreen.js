import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
import {db, store, auth} from "../../firebase";


export default function download() {
    //const [uri, setUri] = useStgitate('');
    
    const uri = props.uri;
    /*useEffect(() => {
        const propsUri = props.uri; 
        setUri(uri);
      });*/
    const uploadImage = async () => {
        console.log(props);
        console.log("/n");
        console.log(props.route.params.uri)
        const childPath = `${auth.currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(props.route.params.uri);
        const blob = await response.blob();

        store
            .ref()
            .child(childPath)
            .put(blob)
           // .then( {
              //  console.log("");
            //})

       
    }

    return (
        <View style={{ flex: 1 }}>
            {props && <Image source={{ uri: props.route.params.uri}} style={{ flex: 1 }} />}
            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}


