import { BASE_URI } from "@/utils/pathMap";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import SearchInput from '../components/search-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { toDp } from "@/utils/style";

export default function LikeEachOther({ list, handleLike }) {
    const [keyword, setKeyword] = useState('');
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#eee', paddingBottom: toDp(10) }}>
                <SearchInput onChangeText={setKeyword} text={keyword} />
            </View>

            {list.filter(item => item.nick_name.indexOf(keyword) != -1).map((item, index) => (
                <View key={index} style={{
                    flexDirection: 'row', paddingTop: toDp(20), paddingBottom: toDp(20),
                    backgroundColor: '#fff', paddingRight: toDp(15), borderBottomColor: '#ccc', borderBottomWidth: toDp(1)
                }}>
                    <View style={{ paddingLeft: toDp(15), paddingRight: toDp(15) }}>
                        <Image style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25) }} source={{ uri: BASE_URI + item.header }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: toDp(10) }}>
                        <View style={{ flex: 4, justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#666' }}>{item.nick_name}</Text>
                                <View style={{
                                    flexDirection: 'row', backgroundColor: '#fff', marginLeft: toDp(10), height: toDp(20),
                                    alignItems: 'center', width: toDp(50), justifyContent: 'center', borderRadius: toDp(10)
                                }}>
                                    <Icon name={item.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                                    <Text style={{ color: '#666' }}>{item.age}岁</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='map-o' color='#666' size={toDp(12)} />
                                <Text style={{ color: '#666', marginLeft: toDp(10) }}>{item.city}</Text>
                            </View>
                        </View>
                    </View>
                    {/* 关注按钮 */}
                    <TouchableOpacity style={{
                        width: toDp(80), height: toDp(30), borderRadius: toDp(3),
                        borderColor: '#ccc', borderWidth: toDp(1),
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        alignSelf: 'center'
                    }} onPress={() => handleLike(index, 'dislike', 'likeEachOther')}>
                        <Icon name='arrows-h' color='#666' size={toDp(10)} />
                        <Text style={{ color: '#666', marginLeft: toDp(10), fontSize: toDp(10) }}>取消关注</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}