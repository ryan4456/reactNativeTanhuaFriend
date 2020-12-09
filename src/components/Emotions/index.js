import { screenWidth } from '@/utils/style';
import React from 'react';
import {ScrollView, Image, TouchableOpacity} from 'react-native';
import {EMOTION_ARRAY} from './map';

export default function Emotions({onPress}) {
    const width = screenWidth / 9;
    return (
        <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {EMOTION_ARRAY.map((item, index) => (
                <TouchableOpacity onPress={() => onPress(item.key)} key={index} style={{}}>
                    <Image style={{width, height: width}} source={item.value} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}