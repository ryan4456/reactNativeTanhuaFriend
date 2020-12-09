import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../pages/account/login';
import UserInfo from '../pages/account/userinfo';
import Tabbar from './tabbar';
import {observer, inject} from 'mobx-react';
import Tanhua from '../pages/friend/tanhua';
import Search from '@/pages/friend/search';
import TestSoul from '@/pages/friend/test-soul';
import Question from '@/pages/friend/test-soul/question';
import TestResult from '@/pages/friend/test-soul/result';
import FriendDetail from '@/pages/friend/detail/index';
import Chat from '@/pages/message/chat';
import StatusDetail from '@/pages/group/home/detail';
import StatusPublish from '@/pages/group/home/publish';
import Follow from '@/pages/my/follow';
import MyStatus from '@/pages/my/status';
import MyVisitors from '@/pages/my/visitors';
import MyProfile from '@/pages/my/profile';
import Setting from '@/pages/my/setting';

const Stack = createStackNavigator();

const Nav = observer(({tokenStore}) => {
    const [initialRouteName, setInitialRouteName] = useState(() => {
        return tokenStore.token ? 'Tabbar' : 'Login'
    })
    // setInitialRouteName('Login')
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName={initialRouteName}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Tabbar' component={Tabbar} />
                <Stack.Screen name='UserInfo' component={UserInfo} />
                <Stack.Screen name='Tanhua' component={Tanhua} />
                <Stack.Screen name='Search' component={Search} />
                <Stack.Screen name='TestSoul' component={TestSoul} />
                <Stack.Screen name='Questions' component={Question} />
                <Stack.Screen name='TestResult' component={TestResult} />
                <Stack.Screen name='FriendDetail' component={FriendDetail} />
                <Stack.Screen name='Chat' component={Chat} />
                <Stack.Screen name='StatusDetail' component={StatusDetail} />
                <Stack.Screen name='StatusPublish' component={StatusPublish} />
                <Stack.Screen name='Follow' component={Follow} />
                <Stack.Screen name='MyStatus' component={MyStatus} />
                <Stack.Screen name='MyVisitors' component={MyVisitors} />
                <Stack.Screen name='MyProfile' component={MyProfile} />
                <Stack.Screen name='Setting' component={Setting} />
            </Stack.Navigator>
        </NavigationContainer>
    )
});

export default inject(state => ({
    tokenStore: state.rootStore.tokenStore
}))(Nav);