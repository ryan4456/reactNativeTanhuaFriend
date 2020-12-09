import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import THNav from '@/components/THNav';
import { ListItem } from 'react-native-elements';
import { inject } from "mobx-react";
import { toDp } from '@/utils/style';
import { ActionSheet } from "teaset";
import jmessage from '@/utils/jmessage';
import Toast from '@/utils/toast';

function Setting({ tokenStore, userStore, navigation }) {

    // logout
    const handleLogout = () => {
        // logout
        const lougout = () => {
            // clear cache
            tokenStore.clearUserInfo();
            userStore.clearUserInfo();
            jmessage.logout();
            Toast.smile('退出成功');
            setTimeout(() => {
                navigation.reset({routes: [{name: 'Login'}]});
            }, 2000);
        }
        // confirm
        let items = [
            {title: '退出', onPress: lougout}
        ]
        ActionSheet.show(items, {title: '取消'});
    }

    return (
        <View>
            <THNav title='通用设置' />

            <ListItem title='设置陌生人问题' chevron titleStyle={{ color: '#666' }} bottomDivider />
            <ListItem title='通知设置' chevron titleStyle={{ color: '#666' }} bottomDivider />
            <ListItem title='黑名单' chevron titleStyle={{ color: '#666' }} bottomDivider />
            <ListItem title='修改手机号' rightElement={<Text style={{ color: '#666' }}>{tokenStore.mobile}</Text>} chevron
                titleStyle={{ color: '#666' }} bottomDivider />

            <TouchableOpacity onPress={handleLogout} style={{width: '80%', height: toDp(40), backgroundColor: '#fff', 
            borderRadius: toDp(20), alignItems: 'center', justifyContent: 'center', alignSelf: 'center', 
            marginTop: toDp(15)}}>
                <Text style={{color: '#666', fontSize: toDp(15)}}>退出登录</Text>
            </TouchableOpacity>
        </View>
    )
}

export default inject(state => ({
    ...state.rootStore
}))(Setting);