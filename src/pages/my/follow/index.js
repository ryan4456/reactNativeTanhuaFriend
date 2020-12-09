import { FRIEND_SELECT, LIKE_LIST } from '@/utils/pathMap';
import request from '@/utils/request';
import Toast from '@/utils/toast';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomeBar from './components/custom-bar';
import Like from './like';
import LikeEachOther from './like-each-other';
import Liked from './liked';

export default function Follow({route}) {
    const {params} = route;

    const [likeList, setLikeList] = useState([]);
    const [likedList, setLikedList] = useState([]);
    const [likeEachOtherList, setLikeEachOtherList] = useState([]);

    // 获取列表
    const getList = async () => {
        const res = await request.authGet(LIKE_LIST);
        console.log(res);
        setLikeList(res.data.ilikelist);
        setLikedList(res.data.likemelist);
        setLikeEachOtherList(res.data.likeeachlist);
    }
    // 关注或取消关注
    const handleLike = async (index, type, from) => {
        let user = null;
        if(from === 'like'){
            user = likeList[index];
        }else if(from === 'liked'){
            user = likedList[index];
        }else if(from === 'likeEachOther'){
            user = likeEachOtherList[index];
        }
        const res = await request.authGet(FRIEND_SELECT(user.id, type));
        Toast.smile(type === 'dislike' ? '取消关注成功' : '关注成功');
        getList();
    }
    useEffect(() => {
        getList();
    }, [])
    return (
        <ScrollableTabView initialPage={params}  renderTabBar={() => (<CustomeBar />)}>
            <LikeEachOther handleLike={handleLike} list={likeEachOtherList} tabLabel='互相关注'></LikeEachOther>
            <Like handleLike={handleLike} list={likeList} tabLabel='喜欢'></Like>
            <Liked handleLike={handleLike} list={likedList} tabLabel='粉丝'></Liked>
        </ScrollableTabView>
    )
}