import React, { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import request from '../../../utils/request';
import { FRIEND_TODAY_BEST, BASE_URI } from '../../../utils/pathMap';
import { toDp } from "../../../utils/style";
import Icon from "react-native-vector-icons/FontAwesome";

export default function BestGirl() {
    const [girl, setGirl] = useState({});

    const init = async () => {
        const res = await request.authGet(FRIEND_TODAY_BEST);
        if(res.code !== '10000' || !res.data){
            return;
        }
        setGirl(res.data[0]);
    }
    useEffect(() => {
        init();
    }, [])
    return (
        <View style={{flexDirection: 'row'}}>
            {/* 左边图片 */}
            <View style={{ position: 'relative', marginLeft: toDp(5) }}>
                <Image source={{ uri: BASE_URI + girl.header }} style={{ width: toDp(120), height: toDp(120) }} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>今日佳人</Text>
                </View>
            </View>

            {/* 右边内容 */}
            <View style={{flex: 1, flexDirection: 'row', paddingLeft: toDp(10)}}>
                <View style={{flex: 4, justifyContent: 'space-around'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#555'}}>{girl.nick_name}</Text>
                        <Icon name={girl.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                        <Text style={{color: '#555'}}>{girl.age}岁</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#555'}}>{girl.marry}</Text>
                        <Text style={{color: '#555'}}>|</Text>
                        <Text style={{color: '#555'}}>{girl.xueli}</Text>
                        <Text style={{ color: '#555' }}>|</Text>
                        <Text style={{color: '#555'}}>{girl.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                    </View>
                </View>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name='heart' size={toDp(50)} color='#f75739' />
                        <Text style={{position: 'absolute', color: '#fff', fontSize: toDp(13)}}>{girl.fateValue}</Text>
                    </View>
                    <Text style={{color: '#f75739', fontSize: toDp(13)}}>缘分值</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: { 
        width: toDp(80), 
        height: toDp(20), 
        backgroundColor: '#b874c2', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: toDp(7), 
        position: 'absolute', 
        left: toDp(0), 
        bottom: toDp(10) 
    },
    title: {
        color: '#fff',
    }
});