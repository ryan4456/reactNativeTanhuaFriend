import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toDp } from '../../utils/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function THNav({ title = '请指定标题' }) {
    const navigation = useNavigation();

    return (
        <View>
            <ImageBackground source={require('../../assets/images/nav-bg.png')}
                style={{ height: toDp(80), paddingTop: toDp(50), flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: toDp(80), flex: 1, flexDirection: 'row', marginLeft: toDp(10), alignItems: 'center' }}>
                    <Icon name="chevron-left" color='#fff' size={toDp(16)} />
                    <Text style={{ color: '#fff', marginLeft: toDp(10), fontSize: toDp(16) }}>返回</Text>
                </TouchableOpacity>
                <Text style={{fontSize: toDp(20), color: '#fff'}}>{title}</Text>
                <Text style={{width: toDp(80)}}></Text>
            </ImageBackground>
        </View>
    )
}