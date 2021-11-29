import React from 'react';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function RegisterInput({onChangeText, placeholder, icon, value, marginTop, secureTextEntry}) {

    return (
        <Input
                  placeholder={placeholder}
                  value={value}
                  secureTextEntry = {secureTextEntry}
                  onChangeText={onChangeText} 
                  placeholderTextColor='#9c9c9c'
                  leftIcon={icon}
                  inputStyle= {{
                    color: 'white'
                  }}
                  inputContainerStyle= {{
                    alignSelf: 'center',
                    width: 215,
                    marginTop: marginTop
                  }}
                />
    );
}

export default RegisterInput;