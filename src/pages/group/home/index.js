import React from 'react';
import { Text, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { toDp } from '@/utils/style';
import CustomeBar from './component/custome-bar';
import Recommend from './recommend';
import Latest from './latest';

export default function GroupHome() {
    return (
        <ScrollableTabView renderTabBar={() => (<CustomeBar />)}>
            <Recommend tabLabel='推荐' />
            <Latest tabLabel='最新' />
        </ScrollableTabView>
    )
}