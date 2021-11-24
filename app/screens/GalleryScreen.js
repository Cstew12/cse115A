import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useNavigation } from '@react-navigation/core';
import { auth, store } from '../../firebase';


function GalleryScreen({route}) {
    const navigation = useNavigation();
    const [images, setImages] = useState([{
        title: 'no images yet',
        uri: images
    }]);

    /**
     *  Adds new image object to the image array
     * @param {uri: string, title: string} newObj 
     */
    const addImageObjToArray = (newObj) => {
        setImages(images => images.concat(newObj));
    }


    useEffect(() => {
        const habitName = route.params.name;
        console.log("Habit name: " + habitName);
        const listRef = store.ref(auth.currentUser.uid + '/' + habitName);

        /*
        * Lists all image name in a specified directory
        */
        listRef.listAll()
            .then((file) => {
                file.items.forEach((ref) => {
                    console.log(ref.name);
                })

                // Move the creating of the image reference into this for each loop
                // the image path will be ('/' + current_uid + '/' + habitname + '/' ref.name)

                // setimage url with useState?

                // use add created image into the the image array 
                
            })
        const imageRef = store.ref('/' + auth.currentUser.uid + '/Surf/0.ufwr218stl');
        imageRef
        .getDownloadURL()
        .then((url) => {
            console.log('Image location: ' + url);
            // setImages(url);
        })
        .catch((e) => console.log("Errors while downloading => ", e)); 
    }, [])

    const renderItem = ({ item }) => (
        <View style={{justifyContent:'center', marginVertical: 20, alignItems:'center'}}>
            <Image style={{height: 200, width: 200}} source={{uri: item.uri}}/>
            <Text style={{color: 'white', marginTop: 20}}>
                {item.title}
            </Text>
        </View>

    );
    return (
       <View style={styles.container}>
           <View style={styles.top}>
                <View style={{flexDirection: 'row-reverse', marginTop: 40, marginLeft: 20}}>
                    <Button
                        title=" Profile"
                        type= "solid"
                        icon={
                            <Icon
                            name='user-circle'
                            size={15}
                            type='font-awesome'
                            color="white"
                            />
                        }
                
                        titleStyle= {{
                            color: 'white',
                            fontFamily: 'AvenirNext-Bold'
                        }}
                        onPress={() => navigation.navigate('Profile')}
                    /> 
               </View>
               <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontSize: 25, fontFamily: 'AvenirNext-Bold'}}>Gallery</Text>
               </View>
           </View>
           <View style={styles.bottom}>
                <FlatList
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={() => Math.random().toString(36)}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: 'space-evenly'
                    }}
                />
           </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2e2d2d',
        flex: 1
    },
    top: {
        flex: 1
    },
    bottom : {
        flex: 7
    },
});
export default GalleryScreen;