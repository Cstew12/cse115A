import React, {useState, useEffect} from 'react';
import { auth} from "../../firebase";
import {db} from "../../firebase";
import {StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Input, LinearProgress} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar } from 'react-native-elements';


const FriendsPage = () => {

    const [friends,setFriends]= useState([]);
    const navigation = useNavigation();

    const fetchFriends = () => {
        db
        .collection('friend_test')
        .onSnapshot(querySnap => {
            setFriends([]);
            querySnap.docs.forEach( doc => {
                    setFriends(friends => friends.concat(doc.data()));
                    //console.log(habits);
            });
        });

    }

    useEffect(() => {
        fetchFriends();
      }, [])

    if(friends[0] == undefined){
        return null
    }

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Button
                        type="solid"
                        icon={
                            <Icon
                                name="long-arrow-left"
                                size={35}
                                color="white"
                            />
                        }
                        iconRight

                        buttonStyle= {{
                            backgroundColor: '#2e2d2d',
                            height: 50,
                            width: 70,
                            marginBottom: 60,
                            marginHorizontal: 10,
                                }}

                        onPress={()=>{
                                navigation.navigate('Profile');
                        }}
                    />

                    <Text style={styles.header}>Friends List</Text>
                </View>

                <View style={styles.bottom}>
                {
                    friends.map((item, i) => (
                        <ListItem key={i} bottomDivider containerStyle={{backgroundColor: '#9c9c9c'}}>
                            <Icon name={item.icon} />
                                <ListItem.Content>
                                <ListItem.Title style={{ color: '#d15a5a'}}>{item.name}</ListItem.Title>
                                <ListItem.Subtitle style={{ color: 'white'}}>{item.subtitle}</ListItem.Subtitle>
                                </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }

                    <Button
                        type="solid"
                        icon={
                            <Icon
                                name="plus"
                                size={25}
                                color="black"
                            />
                        }
                        iconRight

                        buttonStyle= {{
                            backgroundColor: '#d15a5a',
                            height: 50,
                            width: 70,
                            alignSelf: 'center',
                            marginTop: 20,
                                }}

                        onPress={()=>{
                            db
                            .collection('friend_test')
                            .add({
                            name: 'added friend',
                            icon: 'user',
                            subtitle: 'a new friend'
                        })
                        .then(() => {
                            console.log('Friend added!');
                        });
                            }}
                    />
                    
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    top: {
        flex: 1,
        backgroundColor: '#d15a5a',
        justifyContent: 'flex-end',
    },
    bottom: {
        flex: 3,
        paddingTop: 10,
        backgroundColor: '#2e2d2d',
    },
    overall: {
        backgroundColor: '#2e2d2d',
    },
    header: {
        fontFamily: 'AvenirNext-Bold',
        fontSize: 30,
        alignSelf: 'center',
        color: "#2e2d2d"
    },
    options: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
    },
    record_buttons: {
        flex: 3,
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
});

export default FriendsPage;