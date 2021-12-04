import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,Image } from 'react-native';
import { Camera } from 'expo-camera';
import {store, auth, db} from "../../firebase";
import { useNavigation } from '@react-navigation/core';


function CameraScreen({route}) {
  const {habitName} = route.params;
  const navigation = useNavigation(); 
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
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
        childPath = `${auth.currentUser.uid}/${habitName}/${Date()}`;
    }
    const response = await fetch(image);
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


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  }
  return (
   
  
     <View style={styles.container}>
      <Camera 
      ref={ref => setCamera(ref)}
      style={styles.camera} 
      type={type}  
      >
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
     
      <Button title="Take Picture" onPress={() => takePicture()} />
      <Button title="Save"  
        onPress={() => {
          uploadImage()}} 
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
     
      
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
      flexDirection: 'row'
    },
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });

export default CameraScreen;