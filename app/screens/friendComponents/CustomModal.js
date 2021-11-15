import React from 'react';
import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import {Input} from 'react-native-elements';



function CustomModal({
    modalVisible, 
    setVisible, 
    onHideModal, 
    hideModalText, 
    title,
    inputField,
    placeholder,
    setInput
    }) {
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
                { inputField &&
                    <Input
                        placeholder={placeholder}
                        onChangeText={value => setInput(value)}
                    />
                }
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={onHideModal}
                >
                    <Text style={styles.textStyle}>{hideModalText}</Text>
                </Pressable>
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
        backgroundColor: "white",
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
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
})

export default CustomModal;