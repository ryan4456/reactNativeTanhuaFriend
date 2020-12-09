import { toDp } from "@/utils/style";
import React from "react";
import { Text, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function CustomeBar(props) {
    const { goToPage, tabs, activeTab } = props;
    const navigation = useNavigation();
    return (
        <ImageBackground resizeMode='stretch'
            style={{
                height: toDp(78), width: '100%',
                paddingTop: toDp(48),
                flexDirection: 'row', justifyContent: 'space-evenly'
            }}
            source={require('@/assets/images/profileBackground.jpg')}>
                <Icon name="chevron-left" color='#fff' size={toDp(16)} onPress={() => navigation.goBack()} />
            {tabs.map((item, index) => (
                <TouchableOpacity onPress={() => goToPage(index)} key={index} style={{ justifyContent: 'center', borderBottomWidth: activeTab === index ? toDp(2) : 0, borderBottomColor: '#fff' }}>
                    <Text style={{ fontSize: activeTab === index ? toDp(26) : toDp(20), color: '#fff' }}>{item}</Text>
                </TouchableOpacity>
            ))}
        </ImageBackground>
    )
}