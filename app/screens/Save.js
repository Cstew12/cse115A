import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
import {db, store, auth} from "../../firebase";



export default function Save(props) {
    //const [uri, setUri] = useState('');
    console.log(auth.currentUser.uid);
    const uri = props.image;
    /*useEffect(() => {
        const propsUri = props.uri; 
        setUri(uri);
      });*/
    const uploadImage = async () => {
        
        const childPath = `${auth.currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(props.route.params.image);
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
            {props && <Image source={{ uri: uri }} style={{ flex: 1 }} />}
            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}


