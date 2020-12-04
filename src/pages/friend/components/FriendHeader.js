import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { tanhua, soul, nearby } from '../../../assets/fonts/iconSvg';
import { toDp } from '../../../utils/style';
import {useNavigation} from '@react-navigation/native'

export default function FriendHeader() {
    const list = [
        { source: tanhua, name: '探花', path: 'Tanhua', bgColor: '#ff5a20' },
        { source: nearby, name: '搜附近', path: '', bgColor: '#00acf8' },
        { source: soul, name: '测灵魂', path: '', bgColor: '#f8c270' },
    ]
    const navigation = useNavigation();

    return (
        <View style={styles.outContainer}>
            {list.map(item => (
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(item.path)}>
                    <View style={{...styles.iconContainer, backgroundColor: item.bgColor}}>
                        <Image style={styles.icon} source={item.source} />
                    </View>
                    <Text style={styles.textColor}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    outContainer: {
        width: '100%',
        paddingTop: toDp(50),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    container: {
        alignItems: 'center',
    },
    icon: {
        width: toDp(40),
        height: toDp(40)
    },
    iconContainer: {
        borderRadius: toDp(30),
        height: toDp(60),
        width: toDp(60),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textColor: {
        color: '#fff',
        marginTop: toDp(5)
    }
})