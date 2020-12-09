import THNav from '@/components/THNav';
import { BASE_URI, FRIEND_VISTORS } from '@/utils/pathMap';
import request from '@/utils/request';
import { toDp } from '@/utils/style';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function MyVisitors({navigation}) {
    const [list, setList] = useState([])

    const getList = async () => {
        const res = await request.authGet(FRIEND_VISTORS);
        setList(res.data)
    }

    useEffect(() => {
        getList();
    }, []);

    const renderFriendItem = (item) => {
        return (
            <>
                {/* 图片 */}
                <View style={{ paddingLeft: toDp(15), paddingRight: toDp(15) }}>
                    <Image style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25) }} source={{ uri: BASE_URI + item.header }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', paddingLeft: toDp(10) }}>
                    <View style={{ flex: 4, justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#555' }}>{item.nick_name}</Text>
                            <Icon name={item.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                            <Text style={{ color: '#555' }}>{item.age}岁</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#555' }}>{item.marry}</Text>
                            <Text style={{ color: '#555' }}>|</Text>
                            <Text style={{ color: '#555' }}>{item.xueli}</Text>
                            <Text style={{ color: '#555' }}>|</Text>
                            <Text style={{ color: '#555' }}>{item.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name='heart' size={toDp(20)} color='#f75739' />
                            <Text style={{color: '#666', fontSize: toDp(13) }}>{item.fateValue}</Text>
                    </View>
                </View>
            </>
        )
    }

    return (
        <View>
            <THNav title='谁看过我' />
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', paddingBottom: toDp(10) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {list.map((item, index) => (
                        <Image key={index} style={{ width: toDp(40), height: toDp(40), borderRadius: toDp(20), marginLeft: toDp(5), marginRight: toDp(5) }}
                            source={{ uri: BASE_URI + item.header }} />
                    ))}
                </View>
                <Text>最近有{list.length}人来访，快去查看...</Text>
            </View>

            <View>
                {list.map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate('FriendDetail', { id: item.id })} key={index} style={{ flexDirection: 'row', paddingTop: toDp(10), paddingBottom: toDp(10), borderBottomWidth: toDp(2), borderBottomColor: '#eee' }}>
                        {renderFriendItem(item)}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}