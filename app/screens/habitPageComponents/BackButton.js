import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

function BackButton({destination, backgroundColor, iconColor, marginBottom, marginHorizontal}) {
    const navigation = useNavigation();

    return (
        <Button
                type="solid"
                icon={
                    <Icon
                        name="long-arrow-left"
                        size={35}
                        color={iconColor}
                    />
                }
                iconRight

                buttonStyle= {{
                    backgroundColor: backgroundColor,
                    height: 50,
                    width: 70,
                    marginBottom: marginBottom,
                    marginHorizontal: marginHorizontal,
                        }}

                onPress={()=>{
                    navigation.navigate(destination);
                }}
                    />
    );
}

export default BackButton;