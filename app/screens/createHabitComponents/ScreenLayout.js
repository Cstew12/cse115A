import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

// A commonly used screen layout
function ScreenLayout(props) {
    const navigation = useNavigation();
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
                <Text style={styles.header}>{props.title}</Text>
            </View>
            <View style={styles.bottom}>
                {props.children}
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
        justifyContent: 'flex-end'
    },
    bottom: {
        flex: 3,
        paddingTop: 10,
        backgroundColor: '#2e2d2d',
    },
    header: {
        fontFamily: 'AvenirNext-Bold',
        fontSize: 30,
        justifyContent: 'flex-end',
        marginLeft: 10,
        color: "#2e2d2d"
    },
});

export default ScreenLayout;