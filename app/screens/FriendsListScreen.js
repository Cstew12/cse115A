//Imports including React, React native elements, firebase, and self-made components
import React, {useState, useEffect} from 'react';
import {auth} from "../../firebase";
import {db} from "../../firebase";
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar} from 'react-native-elements';
import CustomModal from './friendComponents/CustomModal';
import BackButton from './habitPageComponents/BackButton';

const FriendsList = ({route}) => {
    
    const [friends,setFriends]= useState([]);
    const [modalVisible, setVisible] = useState(false)
    const navigation = useNavigation();
    const [friendUN, setFriendUN] = useState('');
    const [notFoundModal, setNotFound] = useState(false);
    const [selfAddModal, setSelfAdd] = useState(false);
    const username = route.params.username;

    const fetchFriends = () => {
        console.log('fetch friends')
        const unsubscribe = db
        .collection(auth.currentUser.uid)
        .doc('friends list')
        .collection('friends collection')
        .onSnapshot(querySnap => {
            setFriends([]);
            if(querySnap.size < 1) {
                setFriends(friends => friends.concat({
                    initials: 'GO', 
                    subtitle: 'Click the plus to get started', 
                    name: "Follow people to see their habits"}
                ));
            } else {
                querySnap.docs.forEach(doc => {
                    setFriends(friends => friends.concat(doc.data()));
                });
            }
        });
        return unsubscribe;
    }


    /**
     * @param {string} userUID  - ID of whos friend list the friend will be added to
     * @param {string} friendUID 
     * @param {string} friendName 
     * @param {string} friendUsername
     * @param {string} friendInitials 
     * Adds friends information to a users friend list. 
     */
    const addFriendToUser = (userUID, friendUID, profile) => {
        const friendName = profile.FirstName + ' ' + profile.lastName;
        const friendInitials = profile.FirstName.charAt(0)+profile.lastName.charAt(0);
        const friendProfilePic = profile.profilepic;
        console.log(friendProfilePic);

        db.collection(userUID).doc('friends list')
        .collection('friends collection')
        .doc(friendUID)
        .set({
            subtitle: friendUN, 
            initials: friendInitials, 
            name: friendName,
            uid: friendUID,
            uri: friendProfilePic !== undefined ? friendProfilePic : null
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
        console.log('Search and add friend');
        if(friendUN === username) {
            setSelfAdd(true);
        } else if(friendUN.length==0){
            setVisible(!modalVisible);
        } else{
            const temp = db.collection('users').doc(friendUN).get()         
            .then((docsnap) => {
                if(docsnap.exists){
                    const friendUID = docsnap.data().uid;
                    getUserProfileFromUID(friendUID).then((profile) => {
                        addFriendToUser(auth.currentUser.uid, friendUID, profile);
                    })
                }else{
                    // User with that username does not exist
                    console.log('User with that username does not exist');
                    setNotFound(true);
                }
            })
            .catch(error => 
                alert(error.message));
        }
        
    }

    const onFriendPress = (item) => {
        if(item.subtitle === 'Click the plus to get started'){
            console.log('No friends');
        } else {
            navigation.navigate('FriendsProfile', {FriendUID: item.uid});
        }
    };

    useEffect(() => {
        const unsub = fetchFriends();
        return unsub;
      }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <BackButton
                    destination='Profile'
                    iconColor='white'
                    backgroundColor='#2e2d2d'
                    marginBottom={55}
                    marginHorizontal={10}
                />
                    
                <Text style={styles.header}>Following</Text>

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
                    hideModalText='Follow'
                    inputField= {true}
                    setInput={setFriendUN}
                />
                <CustomModal
                    modalVisible={selfAddModal}
                    setVisible={setSelfAdd}
                    onHideModal={() => {
                        setSelfAdd(!selfAddModal);
                    }}
                    title='You cannot add yourself as a friend'
                    hideModalText='Close'
                    inputField= {false}
                />
                {  
                    friends.map((item, i) => (
                        <ListItem key={i} bottomDivider containerStyle={{backgroundColor: '#9c9c9c'}}
                        onPress={() => onFriendPress(item)}>
                            
                            <Avatar 
                                rounded
                                size='medium'
                                //currently just shows the initials of the user
                                title={item.initials}
                                source={{uri: item.uri !== '' ? item.uri : null}}
                                containerStyle={{
                                    backgroundColor: "#82f591",
                                }}
                                titleStyle={{
                                    color: 'black'
                                }}
                             />
                                <ListItem.Content>
                                <ListItem.Title style={{ color: '#82f591'}}>{item.name}</ListItem.Title>
                                <ListItem.Subtitle style={{ color: '#2e2d2d'}}>{item.subtitle}</ListItem.Subtitle>
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
                            color='black'
                        />
                    }
                    iconRight

                    buttonStyle= {{
                        backgroundColor: '#82f591',
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
        backgroundColor: '#82f591',
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
        fontSize: 32,
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

export default FriendsList;