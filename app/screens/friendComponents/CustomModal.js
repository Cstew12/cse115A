import React from 'react';
import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import {Input} from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Icon } from 'react-native-elements';



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
                    <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <Button
                            type= "solid"
                            icon={
                                <Icon
                                    name='times'
                                    size={20}
                                    type='font-awesome'
                                    color="black"
                                />
                            }
                            onPress={() => setVisible(!modalVisible)}
                        />
                    </View>
                    <Text style={styles.modalText}>{title}</Text>
                    { inputField &&
                        <Input
                            inputContainerStyle={{
                              borderColor: 'black'
                             }}
                            inputStyle={{
                              color: 'white'
                             }}
                            placeholder={placeholder}
                            placeholderTextColor='black'
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
        backgroundColor: "#9c9c9c",
        borderRadius: 20,
        padding: 10,
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
        backgroundColor: '#82f591',
    },
    buttonClose: {
        backgroundColor: "#82f591",
    },
    modalText: {
        fontFamily: 'AvenirNext-Medium',
        marginBottom: 15,
        textAlign: "left"
    },
    textStyle: {
        fontFamily: 'AvenirNext-Regular',
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
})

export default CustomModal;