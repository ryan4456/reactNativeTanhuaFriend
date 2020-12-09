import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomeBar from './component/custome-bar';
import Recommend from './recommend';
import Latest from './latest';

export default function GroupHome() {
    return (
        <ScrollableTabView initialPage={0}  renderTabBar={() => (<CustomeBar />)}>
            <Recommend tabLabel='推荐' />
            <Latest tabLabel='最新' />
        </ScrollableTabView>
    )
}