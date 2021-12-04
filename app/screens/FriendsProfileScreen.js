import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TextComponent } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useNavigation } from '@react-navigation/core';
import {db} from "../../firebase";
import GalleryButton from './friendProfileComponents/GalleryButton';
import FriendsButton from './profileComponents/FriendsButton';

function FriendsProfileScreen({route}) {
    const navigation = useNavigation();
    const id = route.params.FriendUID;
    const [habits, setHabits] = useState([]);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [uri, setURI] = useState('');

    const realTimeData = () => {
        const uid = route.params.FriendUID;
        const unsubscribe = db
        .collection(uid)
        .onSnapshot(querySnap => {
            setHabits([]);
            querySnap.docs.forEach( doc => {
                if(doc.id !== "user profile" && doc.id !== "friends list") {
                    setHabits(habits => habits.concat(doc.data()));
                } else {
                    setName(doc.data().FirstName + " " + doc.data().lastName);
                    setUserName(doc.data().username);
                    setInitials(doc.data().FirstName.charAt(0)+doc.data().lastName.charAt(0));
                    setURI(doc.data().profilepic);
                }
            });
        });
        return unsubscribe;
    }


    useEffect(() => {
        const unsub = realTimeData();
        return unsub;
    }, []);
    
    const renderItem = ({ item }) => (
        <GalleryButton title={item.habitName} data={item} friendUID={route.params.FriendUID}/>
    );

    return (
        <View style={styles.container}>
            <View style={styles.top}>
            <View style={{flexDirection: 'row-reverse', marginTop: 40, marginLeft: 20}}>
                    <FriendsButton username={userName} marginHorizontal={-8}/>
               </View>
                <View style={styles.avatar}>
                    <Avatar 
                        rounded 
                        size="xlarge" 
                        title={initials}
                        source={{uri: uri !== '' ? uri : null}}
                        containerStyle={{
                            backgroundColor: "lightgray",
                            marginTop: -15
                        }}
                    />
                </View>
                <View style={{flex: 1.3, alignItems: 'center', flexDirection: 'column'}}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.username}>
                        {userName}
                    </Text>
                    <Text style={styles.habitTitle}>
                        Habits
                    </Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={{flex: 5}}>
                    <FlatList
                        data={habits}
                        renderItem={renderItem}
                        keyExtractor={() => Math.random().toString(36)}
                    />                    
                </View>
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
        flex: 2
    },
    avatar: {
        flex: 3, 
        alignItems: 'center', 
        flexDirection: 'column'
    },
    name: {
        fontFamily: 'AvenirNext-Medium',
        color: '#82f591',
        fontSize: 20,
        marginTop: -45,
    },
    username: {
        fontFamily: 'AvenirNext-Medium',
        color: '#82f591',
        fontSize: 14,
        marginTop: -5
    },
    habitTitle: {
        fontFamily: 'AvenirNext-Medium',
        color: '#82f591',
        fontSize: 35,
        marginTop: 38,
    },
    bottom : {
        flex: 2.5
    },
    habitContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
});

export default FriendsProfileScreen;