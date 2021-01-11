import React from 'react';
import { View } from "react-native";

export default function SliderMaker({ color }) {
    return (
        <View style={{ 

            padding: 20
            }} 
        >
            <View style={{   
                height: 20, 
                width: 20, 
                backgroundColor: color,
                borderRadius: 10,
            }}>

            </View>
        </View>
    )
};