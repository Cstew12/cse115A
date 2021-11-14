import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useNavigation } from '@react-navigation/core';



const images = [
    {
        title: 'first picture',
        uri: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
        title: 'second picture',
        uri: 'https://reactnative.dev/img/tiny_logo.png'
    },
]


function HomeScreen(props) {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={{flexDirection: 'column', justifyContent:'center', marginVertical: 40, alignItems:'center'}}>
            <Image style={{height: 350, width: 350}} source={{uri: item.uri}}/>
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
                    <Text style={{color: 'white', fontSize: 25, fontFamily: 'AvenirNext-Bold'}}>Home</Text>
               </View>
           </View>
           <View style={styles.bottom}>
                <FlatList
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={() => Math.random().toString(36)}
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
        flex: 8
    },
});
export default HomeScreen;