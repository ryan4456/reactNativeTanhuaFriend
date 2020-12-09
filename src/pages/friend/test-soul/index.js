import THNav from '@/components/THNav';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import { FRIEND_QUESTIONS, BASE_URI } from '@/utils/pathMap';
import request from '@/utils/request';
import Swiper from 'react-native-deck-swiper';
import { toDp } from '@/utils/style';
import THButton from '@/components/THButton';

export default function TestSoul({ navigation }){
    const [list, setList] = useState([]);
    const [index, setIndex] = useState(0);
    const swiperRef = useRef(null);
    useEffect(() => {
        getList();
    }, []);

    // 获取问题列表
    const getList = async () => {
        const res = await request.authGet(FRIEND_QUESTIONS);
        setList(res.data);
    }

    // 渲染卡片
    const renderCard = (item) => {
        if (!item) {
            return <Text>暂无更多数据</Text>;
        }
        return (
            <View style={styles.card}>
                <Image source={{ uri: BASE_URI + item.imgpath }} style={{ width: '100%', height: '80%' }} />
            </View>
        )
    }

    if (list.length === 0) {
        return <></>;
    }

    return (
        <View>
            <THNav title='测灵魂' />
            <ImageBackground imageStyle={{ height: '100%' }} style={{ height: '50%' }} source={{uri: 'tanhua-bg'}}>
                <Swiper cards={list}
                    ref={swiperRef}
                    infinite={true}
                    renderCard={renderCard}
                    onSwiped={setIndex}
                    verticalSwipe={false}
                    cardVerticalMargin={0}
                    stackSize={3}>
                </Swiper>
            </ImageBackground>
            <THButton onPress={() => navigation.navigate('Questions', list[index])} styles={{ alignSelf: 'center', width: '80%', height: toDp(50), marginTop: toDp(160), fontSize: toDp(20), borderRadius: toDp(10) }} text='开始测试' />
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        marginTop: toDp(20),
        borderRadius: toDp(4),
        height: '70%'
    }
})