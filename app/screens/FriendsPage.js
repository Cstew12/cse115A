import React, {useState, useEffect} from 'react';
import {auth} from "../../firebase";
import {db} from "../../firebase";
import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import { Button, Input, LinearProgress} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar } from 'react-native-elements';
import CustomModal from './friendComponents/CustomModal';

const FriendsPage = () => {
    
    const [friends,setFriends]= useState([]);
    const [modalVisible, setVisible] = useState(false)
    const navigation = useNavigation();
    const [friendUN, setFriendUN] = useState('');
    const [notFoundModal, setNotFound] = useState(false);

    const fetchFriends = () => {
        db
        .collection(auth.currentUser.uid)
        .doc('friends list')
        .collection('friends collection')
        .onSnapshot(querySnap => {
            setFriends([]);
            querySnap.docs.forEach(doc => {
                setFriends(friends => friends.concat(doc.data()));
            });
        });
    }


    /**
     * @param {string} userUID  - ID of whos friend list the friend will be added to
     * @param {string} friendUID 
     * @param {string} friendName 
     * @param {string} friendUsername 
     * Adds friends information to a users friend list. 
     */
    const addFriendToUser = (userUID, friendUID, friendName, friendUsername) => {
        db.collection(userUID).doc('friends list')
        .collection('friends collection')
        .doc(friendUID)
        .set({
            subtitle: friendUsername, 
            icon: 'user', 
            name: friendName
        })
    };

    /** 
     * @param {string} uid 
     * @returns profile - an object containing profile information from uid
     * Given a uid, return the object stored in the 'user profile' document
     */
    const getUserProfileFromUID = async(uid) => {
        console.log(uid);
        const profile = (await db.collection(uid).doc('user profile').get()).data();
        return profile;
    };

    /**
     * 1. Find a user's UID (friend's UID) given their username
     * 2. Get the friends profile given their UID
     * 3. Add information from friends profile to current users friend list
     */
    const searchAndAddFriend = () => {
        const temp = db.collection('users').doc(friendUN).get()         
        .then((docsnap) => {
            if(docsnap.exists){
                const friendUID = docsnap.data().uid;
                getUserProfileFromUID(friendUID).then((profile) => {
                    const friendName = profile.FirstName + ' ' + profile.lastName;
                    addFriendToUser(auth.currentUser.uid, friendUID, friendName, friendUN);
                })
            }else{
                // User with that username does not exist
                console.log('User with that username does not exist');
                setNotFound(true);
            }
        })
        .catch(error => 
            alert(error.message)) ;
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

                    <Text style={styles.header}>My Friends</Text>
                </View>
                <View style={styles.bottom}>
                    <CustomModal
                        modalVisible={notFoundModal}
                        setVisible={setNotFound}
                        onHideModal={() => {
                            setNotFound(!notFoundModal);
                        }}
                        title={'User with username ' + friendUN+ ' not found'}
                        hideModalText='Close'
                        inputField={false}
                    />
                    <CustomModal
                        modalVisible={modalVisible}
                        setVisible={setVisible}
                        onHideModal={() => {
                            setVisible(!modalVisible);
                            searchAndAddFriend();
                        }}
                        title='Enter a username'
                        placeholder='Username'
                        hideModalText='Add friend'
                        inputField={true}
                        setInput={setFriendUN}
                    />
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

                        onPress={() => setVisible(!modalVisible)}
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