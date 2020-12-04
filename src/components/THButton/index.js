import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export default function THButton({styles={}, textStyles={}, text='Text', onPress, disabled=false}) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{overflow: 'hidden', width: '100%', height: '100%', ...styles}}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#9b63cd', '#e0708c']}
                style={_styles.linearGradient}>
                <Text style={_styles.buttonText}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const _styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    buttonText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#fff'
    },
})