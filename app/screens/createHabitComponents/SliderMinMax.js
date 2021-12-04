import React from 'react';
import { Slider } from 'react-native-elements';

// Slider with min and max values. Value is stored in currVal param.
// Thumb is a boolean to choose whether or not thumb should exist
function SliderMinMax({currVal, setCurrVal, min, max, color, thumb, margin}) {

    return (
        <Slider
            value={currVal}
            onValueChange={setCurrVal}
            minimumValue={min}
            maximumValue={max}
            thumbStyle = {{
                backgroundColor: '#82f591',
                width: thumb ? 20 : 0,
                height: thumb ? 20 : 0
            }}
            style = {{
                marginHorizontal: margin
            }}
            step={1}
            minimumTrackTintColor={color}
        />
    );
}

export default SliderMinMax;