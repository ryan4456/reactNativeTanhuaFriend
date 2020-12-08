import THButton from '@/components/THButton';
import { toDp } from '@/utils/style';
import { useNavigation } from '@react-navigation/native';
import { inject } from 'mobx-react';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';

const MyHome = ({tokenStore}) => {
    const navigation = useNavigation();

    const handleLogout = () => {
        tokenStore.clearUserInfo();
        navigation.navigate('Login');
    }
    
    return (
        <View>
            <StatusBar />
            <THButton onPress={handleLogout} styles={{marginTop: 400, alignSelf: 'center', width: '90%', height: toDp(40), borderRadius: toDp(10)}} text='Logout' />
        </View>
    )
}

export default inject(state => ({
    tokenStore: state.rootStore.tokenStore
}))(MyHome);