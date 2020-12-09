import THButton from '@/components/THButton';
import { BASE_URI, MY_COUNT } from '@/utils/pathMap';
import { toDp } from '@/utils/style';
import { useNavigation } from '@react-navigation/native';
import { inject } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import geo from '@/utils/geo';
import request from '@/utils/request';

const MyHome = ({ tokenStore, userStore }) => {
    const navigation = useNavigation();
    const item = userStore.user;
    const [city, setCity] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    // 粉丝数量、喜欢的数量、相互关注的数量
    const [fan1, setFan1] = useState(0);
    const [fan2, setFan2] = useState(0);
    const [fan3, setFan3] = useState(0);
    const handleLogout = () => {
        tokenStore.clearUserInfo();
        navigation.navigate('Login');
    }

    // 获取地理位置
    const getCity = async () => {
        const res = await geo.getCityByLocation();
        setCity(res.result.address_component.ad_level_2);
    }

    // 请求统计信息
    const getCount = async () => {
        const res = await request.authGet(MY_COUNT);
        res.data.forEach((item, index) => {
            if (index === 0) {
                setFan1(item.cout)
            } else if (index === 1) {
                setFan2(item.cout)
            } else {
                setFan3(item.cout)
            }
        })
        setRefreshing(false);
    }

    // 下拉刷新
    const onRefresh = () => {
        setRefreshing(true);
        getCount();
    }

    useEffect(() => {
        getCity();
        getCount();
    }, [])

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{ flex: 1, backgroundColor: '#f2fcfe' }}>
            <View style={{ height: toDp(150), backgroundColor: '#d4759f', position: 'relative' }}>

                {/* 编辑按钮 */}
                <Icon onPress={() => navigation.navigate('MyProfile')} style={{ position: 'absolute', top: toDp(40), right: toDp(30), zIndex: 100 }} color='#fff' name='edit' size={toDp(20)} />

                {/* 用户信息 */}
                <TouchableOpacity style={{ flexDirection: 'row', paddingTop: toDp(60) }}>
                    <View style={{ paddingLeft: toDp(15), paddingRight: toDp(15) }}>
                        <Image style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25) }} source={{ uri: BASE_URI + item.header }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: toDp(10) }}>
                        <View style={{ flex: 4, justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#fff' }}>{item.nick_name}</Text>
                                <View style={{
                                    flexDirection: 'row', backgroundColor: '#fff', marginLeft: toDp(10), height: toDp(20),
                                    alignItems: 'center', width: toDp(50), justifyContent: 'center', borderRadius: toDp(10)
                                }}>
                                    <Icon name={item.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                                    <Text style={{ color: '#666' }}>{item.age}岁</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='map-o' color='#fff' size={toDp(12)} />
                                <Text style={{ color: '#fff', marginLeft: toDp(10) }}>{city}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            {/* 相互关注，喜欢 */}
            <View style={{
                height: toDp(120), alignSelf: 'center', width: '90%', backgroundColor: '#fff',
                marginTop: toDp(-15), borderRadius: toDp(10), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Follow', 0)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: toDp(15), color: '#666' }}>{fan3}</Text>
                    <Text style={{ fontSize: toDp(15), color: '#666' }}>相互关注</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Follow', 1)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: toDp(15), color: '#666' }}>{fan2}</Text>
                    <Text style={{ fontSize: toDp(15), color: '#666' }}>喜欢</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Follow', 2)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: toDp(15), color: '#666' }}>{fan1}</Text>
                    <Text style={{ fontSize: toDp(15), color: '#666' }}>粉丝</Text>
                </TouchableOpacity>
            </View>

            {/* 菜单 */}
            <View style={{ marginTop: toDp(20) }}>
                <ListItem onPress={() => navigation.navigate('MyStatus')} chevron bottomDivider leftIcon={<Icon name='star' size={toDp(18)} color='#006b18' />} title='我的动态' />
                <ListItem onPress={() => navigation.navigate('MyVisitors')} chevron bottomDivider leftIcon={<Icon name='eye' size={toDp(18)} color='#ff1015' />} title='谁看过我' />
                <ListItem chevron bottomDivider leftIcon={<Icon name='gear' size={toDp(18)} color='#997092' />} title='通用设置' />
                <ListItem chevron leftIcon={<Icon name='contact' size={toDp(18)} color='#494fa5' />} title='客服在线' />
            </View>

        </ScrollView>
    )
}

export default inject(state => ({
    tokenStore: state.rootStore.tokenStore,
    userStore: state.rootStore.userStore
}))(MyHome);