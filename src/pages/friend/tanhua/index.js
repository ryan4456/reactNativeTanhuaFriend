import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import THNav from '@/components/THNav';
import Swiper from 'react-native-deck-swiper';
import request from '@/utils/request';
import { BASE_URI, FRIEND_CARDS } from '@/utils/pathMap';
import { toDp } from '@/utils/style';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Tanhua() {
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(5);
    const [list, setList] = useState([]);

    // 请求列表
    const getList = async () => {
        const res = await request.authGet(FRIEND_CARDS, { page, pagesize });
        setList(res.data);
    }

    useEffect(() => {
        getList();
    }, [])

    // 渲染卡片
    const renderCard = (item) => {
        return (
            <View style={styles.card}>
                <Image source={{ uri: BASE_URI + item.header }} style={{ width: '100%', height: '80%' }} />
                {/* 网友信息 */}
                <View style={{alignItems: 'center', flex: 1, marginTop: toDp(15) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#555' }}>{item.nick_name}</Text>
                        <Icon name={item.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                        <Text style={{ color: '#555' }}>{item.age}岁</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: toDp(15) }}>
                        <Text style={{ color: '#555' }}>{item.marry}</Text>
                        <Text style={{ color: '#555' }}>|</Text>
                        <Text style={{ color: '#555' }}>{item.xueli}</Text>
                        <Text style={{ color: '#555' }}>|</Text>
                        <Text style={{ color: '#555' }}>{item.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                    </View>
                </View>
            </View>
        )
    }

    // 滑动后事件
    const handleSwipe = (cardIndex) => {
        console.log(cardIndex);
    }

    if (list.length === 0) {
        return <></>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <THNav title='探花' />
            <ImageBackground imageStyle={{ height: '100%' }} style={{ height: '60%' }} source={require('../../../assets/tanhua-bg.jpg')}>
                <Swiper cards={list}
                    renderCard={renderCard}
                    onSwiped={handleSwipe}
                    cardIndex={0}
                    backgroundColor={'rgba(0, 0, 0, 0)'}
                    cardVerticalMargin={0}
                    stackSize={3}>
                </Swiper>
            </ImageBackground>
        
            {/* 两个操作图标 */}
            <View style={{marginTop: toDp(50), flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity style={{backgroundColor: '#f8c666', width: toDp(70), height: toDp(70), borderRadius: toDp(35), justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='heartbeat' size={toDp(40)} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: toDp(100), backgroundColor: '#ff5b1f', width: toDp(70), height: toDp(70), borderRadius: toDp(35), justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='heart' size={toDp(40)} color='#fff' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginTop: toDp(20),
        borderRadius: toDp(4),
        borderWidth: toDp(2),
        borderColor: '#e8e8e8',
        height: '60%'
    }
})