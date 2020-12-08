import React from 'react';
import {View, Text} from 'react-native';

export default function Chat({route}) {
    const {params} = route;
    console.log(params);
    return (
        <View>
            <Text>Chat Page</Text>
        </View>
    )
}