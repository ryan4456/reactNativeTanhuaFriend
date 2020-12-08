import { toDp } from "@/utils/style";
import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CustomeBar(props) {
    const { goToPage, tabs, activeTab } = props;
    return (
        <ImageBackground resizeMode='stretch'
            style={{
                height: toDp(78), width: '100%',
                paddingTop: toDp(48),
                flexDirection: 'row', justifyContent: 'space-evenly'
            }}
            source={require('@/assets/images/profileBackground.jpg')}>
            {tabs.map((item, index) => (
                <TouchableOpacity onPress={() => goToPage(index)} key={index} style={{ justifyContent: 'center', borderBottomWidth: activeTab === index ? toDp(2) : 0, borderBottomColor: '#fff' }}>
                    <Text style={{ fontSize: activeTab === index ? toDp(26) : toDp(20), color: '#fff' }}>{item}</Text>
                </TouchableOpacity>
            ))}
        </ImageBackground>
    )
}