import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

function BackButton({
    destination, // Where you want to navigate to after pressing the button
    backgroundColor, // Background color of the button
    iconColor, // Icon color of the button
    marginBottom, // Margin from the bottom of the flex region
    marginHorizontal // Margin from the side of the flex region
}) {
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