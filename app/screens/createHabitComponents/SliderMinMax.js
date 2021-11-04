import React from 'react';
import { Slider } from 'react-native-elements';

function SliderMinMax({currVal, setCurrVal, min, max}) {
    return (
        <Slider
            value={currVal}
            onValueChange={setCurrVal}
            minimumValue={min}
            maximumValue={max}
            thumbStyle = {{
                backgroundColor: "#BD9EEF"
            }}
            style = {{
                marginHorizontal: 10
            }}
            step={1}
            minimumTrackTintColor="#BD9EEF"
        />
    );
}

export default SliderMinMax;