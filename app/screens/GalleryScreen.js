import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useNavigation } from '@react-navigation/core';
import { auth, store } from '../../firebase';




const images = [
    {
        title: 'first picture',
        uri: 'https://firebasestorage.googleapis.com/v0/b/routeam-c901f.appspot.com/o/GTbPfYVVJxYBTqtAPbSaoHqhAZ33%2FDrink%2F0.fqimcp6ig6o?alt=media&token=4535cfcd-6dfa-4c62-80a9-bdaf8a7b226b'
    },
    /*
    {
        title: 'second picture',
        uri: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
        title: 'third picture',
        uri: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
        title: 'fourth picture',
        uri: 'https://reactnative.dev/img/tiny_logo.png'
    },*/
    
    
]

function GalleryScreen({route}) {
    const navigation = useNavigation();
    const [uri, setUri] = useState('https://reactnative.dev/img/tiny_logo.png');
    useEffect(() => {
        const habitName = route.params.name;
        console.log("Habit name: " + name);
        const listRef = store.ref(auth.currentUser.uid + '/' + habitName);

        /*
        * Lists all image name in a specified directory
        */
        listRef.listAll()
            .then((file) => {
                file.items.forEach((ref) => {
                    console.log(ref.name);
                })
            })
        const imageRef = store.ref('/' + auth.currentUser.uid + '/Surf/0.tcqlhalqzzh');
        imageRef
        .getDownloadURL()
        .then((url) => {
            console.log(url);
            setUri(url);
        })
    }, [])

    const renderItem = ({ item }) => (
        <View style={{justifyContent:'center', marginVertical: 20, alignItems:'center'}}>
            <Image style={{height: 200, width: 200}} source={{uri: uri}}/>
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