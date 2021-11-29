import React from 'react';
import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/core';

/**
 * Displays a modal with 2 buttons, 'yes' and 'no', as well as some text.
 */
function YesNoModal({
    modalVisible, // boolean: determines if the modal should show
    setVisible, // state function: sets boolean to true/false when the modal should show
    onHideModal, // function: any actions to occur when modal is closed (when 'No' is pressed)
    title, // string: main text that the modal displays
    navigate // function: secondary function to occur when 'Yes' option is clicked
    }) {
    const navigation = useNavigation();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setVisible(!modalVisible);
            }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{title}</Text>
                <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={navigate}
                    >
                        <Text style={styles.textStyle}>Yes</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={onHideModal}
                    >
                        <Text style={styles.textStyle}>No</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 5,
        height: 200, 
        width: 300, 
        backgroundColor: '#9c9c9c',
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
    },
    shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 20,
        marginTop:20
    },
    buttonOpen: {
        backgroundColor: '#82f591',
    },
    buttonClose: {
        backgroundColor: "#82f591",
    },
    modalText: {
        fontFamily: 'AvenirNext-Medium',
        marginBottom: 15,
        textAlign: "center"
    },
    textStyle: {
        fontFamily: 'AvenirNext-Regular',
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
})

export default YesNoModal;