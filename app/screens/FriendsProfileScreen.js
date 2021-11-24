import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TextComponent } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useNavigation } from '@react-navigation/core';
import {auth} from "../../firebase";
import {db} from "../../firebase";
import HabitButton from './HabitButton';
import {Icon} from 'react-native-elements';
import FriendsButton from './profileComponents/FriendsButton';



function FriendsProfileScreen(route) {
    const navigation = useNavigation();
    const id = route.params;
    const [habits, setHabits] = useState([]);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');

    const realTimeData = () => {
        const uid = id;
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
        <HabitButton title={item.habitName} data={item}/>
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
                <View style={styles.avatar}>
                    <Avatar 
                        rounded 
                        size="xlarge" 
                        title={initials}

                        containerStyle={{
                            backgroundColor: "lightgray",
                            marginTop: -15
                        }}
                    />
                </View>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'column',}}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.username}>
                        {userName}
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
        color: '#9c9c9c',
        fontSize: 20,
        marginTop: 5,
    },
    username: {
        fontFamily: 'AvenirNext-Medium',
        color: '#9c9c9c',
        fontSize: 14,
        marginTop: -5
    },
    bottom : {
        flex: 3
    },
    habitContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
});

export default FriendsProfileScreen;