import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ImageBackground, StatusBar, Image, TouchableOpacity } from 'react-native';
import request from '@/utils/request';
import { BASE_URI, FRIEND_SEARCH } from '@/utils/pathMap';
import { screenHeight, screenWidth, toDp } from '@/utils/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'teaset';
import Filter from './components/Filter';

export default function Search() {
    const [distance, setDistance] = useState(10000);
    const [gender, setGender] = useState('男');
    const [list, setList] = useState([]);
    const overLayRef = useRef(null);

    // 根据距离返回附近的人头像的大小
    const mapWH = (dist) => {
        if (dist < 10) {
            return { width: toDp(70), height: toDp(70) };
        }
        if (dist < 30) {
            return { width: toDp(60), height: toDp(60) };
        }
        if (dist < 50) {
            return { width: toDp(50), height: toDp(50) };
        }
        if (dist < 70) {
            return { width: toDp(40), height: toDp(40) };
        }
        if (dist < 90) {
            return { width: toDp(30), height: toDp(30) };
        }
        return { width: toDp(20), height: toDp(20) };
    }

    useEffect(() => {
        getList();
    }, [distance, gender])

    // 获取附近的人数据
    const getList = async () => {
        const res = await request.authGet(FRIEND_SEARCH, { distance, gender });
        setList(res.data);
    }

    // 筛选条件合并
    const handleFilterComplete = (gender, distance) => {
        setGender(gender);
        setDistance(distance);
        overLayRef.current.close();
    }

    // 点击筛选图标，打开筛选条件浮层
    const showFilter = () => {
        let params = {gender, distance}
        let overlayView = (
            <Overlay.View
                modal={true}
                overlayOpacity={0.5}
                ref={overLayRef}
            >
                {/* 筛选组件 */}
                <Filter handleFilterComplete={handleFilterComplete} params={params} onClose={() => overLayRef.current.close()}/>
            </Overlay.View>
        );
        Overlay.show(overlayView);
    }

    // 渲染头像
    const renderHead = (user) => {
        const style = mapWH(user.dist);
        const width = style.width - toDp(20)
        const tx = Math.random() * (screenWidth - style.width);
        const ty = Math.random() * (screenHeight - style.height);
        return (
            <TouchableOpacity  style={{ position: 'absolute', top: ty, left: tx }}>
                <ImageBackground resizeMode='stretch'
                    style={{ ...style, position: 'relative', alignItems: 'center' }}
                    source={require('@/assets/images/friend/waterdrop.png')}>
                    <Text numberOfLines={1} style={{ color: '#fff', position: 'absolute', top: -toDp(15) }}>{user.nick_name}</Text>
                    <Image source={{ uri: BASE_URI + user.header }} style={{ borderRadius: width / 2, width: width, height: width }} />
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    return (
        <ImageBackground style={{ flex: 1, position: 'relative' }} source={require('@/assets/images/friend/radar.gif')}>
            <StatusBar barStyle='light-content' />
            <TouchableOpacity onPress={showFilter} style={{zIndex: 10000, alignItems: 'center', justifyContent: 'center',backgroundColor: '#fff', top: toDp(100), position: 'absolute', right: toDp(50), width: toDp(50), height: toDp(50), borderRadius: toDp(25) }}>
                <Icon name='filter' color='#8b4b6c' size={toDp(40)} />
            </TouchableOpacity>
            {list.map(item => {
                const Result = renderHead(item);
                return Result;
            })}
            <View style={{ position: 'absolute', bottom: toDp(50), alignItems: 'center', alignSelf: 'center' }}>
                <Text style={{ color: '#fff' }}>您附近有<Text style={{ fontSize: toDp(20), color: 'red' }}>{list.length}</Text>个好友</Text>
                <Text style={{ color: '#fff' }}>选择聊聊</Text>
            </View>
        </ImageBackground>
    )
}