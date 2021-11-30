import React from 'react'
import { View, Image, Button } from 'react-native'
import {store, auth, db} from "../../firebase";
import { useNavigation } from '@react-navigation/core';

export default function Save(props) {
    const navigation = useNavigation();  
    const habitName = props.route.params.habitName;
    const currUID = auth.currentUser.uid; 
   
    const saveURIToUserProfile = () => {
        const imageRef = store.ref(
            "/" + currUID + "/" + habitName + "/profile"
        );
        imageRef
            .getDownloadURL()
            .then((url) => {
                db
                .collection(currUID)
                .doc('user profile')
                .update({profilepic: url})
                .then(() => {
                    console.log('saved');
                })
            })
            .catch((error) => alert(error.message)); // error while downloading the image
    }

    const uploadImage = async () => {
        console.log("save: " + habitName)
        let childPath;
        if(habitName === 'profile_picture') {
            // if we are storing the user's profile image, save it under the filename 'profile'
            // everytime they take a new picture, the file will overwrite with the new image
            childPath = `${currUID}/${habitName}/profile`;
        } else {
            childPath = `${auth.currentUser.uid}/${props.route.params.habitName}/${Date()}`;
        }
        const response = await fetch(props.route.params.uri);
        const blob = await response.blob();

        /* Save the image into Storage and navigate to the profile page on success */
        store
            .ref()
            .child(childPath)
            .put(blob)
            .then( () => {
                navigation.navigate("Profile"); 
                if(habitName === 'profile_picture') {
                    saveURIToUserProfile();
                }              
            }).catch((e) => console.log("uploading image error =>", e));
    }

    return (
        <View style={{ flex: 1 }}>
            {props && <Image source={{ uri: props.route.params.uri}} style={{ flex: 1 }} />}
            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}


