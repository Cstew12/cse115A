import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/core';


function CameraScreen({route}) {
  const {habitName} = route.params;
  const navigation = useNavigation(); 
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

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
      //console.log(data.uri);
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
      <Button title="Save" onPress={() => navigation.navigate('Save', { uri:image, habitName: habitName})} />
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