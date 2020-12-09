import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { friend, friendActive, group, groupActive, my, myActive, message, messageActive } from '../assets/fonts/iconSvg';
import FriendHome from '../pages/friend/home/index';
import MessageHome from '../pages/message/home/index';
import MyHome from '../pages/my/home/index';
import GroupHome from '../pages/group/home/index';
import {toDp, dynamicStyle } from '../utils/style';
import {inject, observer} from 'mobx-react';
import request from '@/utils/request';
import { MY_INFO } from '@/utils/pathMap';
import IM from '@/utils/jmessage';

const { Item } = TabNavigator;

const Tabbar = ({userStore, route}) => {
    const [selectedTab, setSelectedTab] = useState(() =>{
        if(route && route.params && route.params.pageName){
            return route.params.pageName;
        }
        return 'my';
    });
    useEffect(() => {
        (async () => {
            const res = await request.authGet(MY_INFO);
            userStore.setUser(res.data);
            await IM.login(res.data.guid, res.data.mobile);
        })();
    }, [])
    // tabbar list
    const list = [
        { name: '交友', key: 'friend', icon: friend, iconActive: friendActive, component: <FriendHome /> },
        { name: '圈子', key: 'group', icon: group, iconActive: groupActive, component: <GroupHome /> },
        { name: '消息', key: 'message', icon: message, iconActive: messageActive, component: <MessageHome /> },
        { name: '我的', key: 'my', icon: my, iconActive: myActive, component: <MyHome /> },
    ]
    const tabBarStyle = dynamicStyle(adaptStyle.iPhoneX, adaptStyle.iOS, adaptStyle.android);
    return (
        <View style={{ flex: 1 }}>
            <TabNavigator tabBarStyle={{...tabBarStyle}}>
                {list.map(item => (
                    <Item key={item.key} selected={selectedTab === item.key}
                        title={item.name}
                        renderIcon={() => <Image style={{ width: toDp(20), height: toDp(20) }} source={item.icon} />}
                        renderSelectedIcon={() => <Image style={{ width: toDp(20), height: toDp(20) }} source={item.iconActive} />}
                        onPress={() => setSelectedTab(item.key)}
                        selectedTitleStyle={{ color: '#d4237a' }}
                    >
                        {item.component}
                    </Item>
                ))}
            </TabNavigator>
        </View>

    )
};

const adaptStyle = StyleSheet.create({
    iPhoneX: {
        paddingBottom: toDp(20),
        height: toDp(70)
    },
    iOS: {
        height: toDp(50)
    },
    android: {
        height: toDp(50)
    }
})

export default inject(state => ({
    userStore: state.rootStore.userStore
}))(Tabbar);