import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Button } from 'react-native-elements/dist/buttons/Button';

function ProfileScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Avatar 
                    rounded 
                    size="xlarge" 
                    title="UN"
                    containerStyle={{
                        backgroundColor: "lightgray",
                    }}
                />
            </View>
            <View style={styles.bottom}>
                <View style={styles.habitContainer}>
                    <Button
                        title="Habit 1"
                        containerStyle={{
                            flex: 1,
                            marginHorizontal: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: "#BD9EEF",
                            height: 75,
                        }}
                        titleStyle = {{
                            
                        }}
                    />
                </View>
                <View style={styles.habitContainer}>
                    <Button
                        title="Habit 2"
                        containerStyle={{
                            flex: 1,
                            marginHorizontal: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: "lightgreen",
                            height: 75,
                        }}
                        titleStyle = {{
                            
                        }}
                    />
                </View>
                <View style={styles.habitContainer}>
                    <Button
                        title="Habit 3"
                        containerStyle={{
                            flex: 1,
                            marginHorizontal: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: "lightblue",
                            height: 75,
                        }}
                        titleStyle = {{
                            
                        }}
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
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottom : {
        flex: 2
    },
    habitContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default ProfileScreen;