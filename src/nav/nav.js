import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../pages/account/login';
import UserInfo from '../pages/account/userinfo';
import Tabbar from './tabbar';
import {observer, inject} from 'mobx-react';
import Tanhua from '../pages/friend/tanhua'

const Stack = createStackNavigator();

const Nav = observer(({rootStore}) => {
    const [initialRouteName, setInitialRouteName] = useState(() => {
        return rootStore.token ? 'Tabbar' : 'Login'
    })
    // setInitialRouteName('Demo')
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName={initialRouteName}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Tabbar' component={Tabbar} />
                <Stack.Screen name='UserInfo' component={UserInfo} />
                <Stack.Screen name='Tanhua' component={Tanhua} />
            </Stack.Navigator>
        </NavigationContainer>
    )
});

export default inject(state => ({
    rootStore: state.rootStore
}))(Nav);