import { toDp } from '@/utils/style';
import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SearchInput({onChangeText=() => {}, text=''}) {
    return (
        <View style={{height: toDp(40), borderRadius: toDp(20), 
        backgroundColor: '#fff', position: 'relative', marginTop: toDp(10), 
        paddingLeft: toDp(10), paddingRight: toDp(10)}}>
            <TextInput value={text} onChangeText={onChangeText} placeholder='搜索用户' placeholderTextColor='#bebebe' style={{height: toDp(40), paddingLeft: toDp(30)}}/>
            <Icon style={{position: 'absolute', left: toDp(10), top: toDp(15)}} color='#bebebe' name='search' />
        </View>
    )
}