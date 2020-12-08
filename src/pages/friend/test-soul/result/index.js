import THButton from '@/components/THButton';
import THNav from '@/components/THNav';
import { BASE_URI } from '@/utils/pathMap';
import { toDp } from '@/utils/style';
import React from 'react';
import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';

export default function TestResult({ route, navigation }) {
    const { params } = route;
    return (
        <ImageBackground style={{ flex: 1, width: '100%' }} source={require('@/assets/images/friend/result-bg.png')}>
            <THNav title='测试结果'></THNav>
            <ImageBackground style={{ flex: 1, width: '100%', position: 'relative' }} resizeMode='contain' source={require('@/assets/images/friend/result.png')}>
                <Text style={{ position: 'absolute', top: '3%', left: '6%', color: '#ffffff9a', letterSpacing: toDp(8) }}>灵魂基因鉴定单</Text>
                {/* 用户的名称 */}
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', width: '45%', position: 'absolute',
                    top: '10%', right: '5%', alignItems: 'center'
                }}>
                    <Text style={{ color: '#fff', fontSize: toDp(18) }}>[</Text>
                    <Text style={{ color: '#fff', fontSize: toDp(18) }}>{params.currentUser.nick_name}</Text>
                    <Text style={{ color: '#fff', fontSize: toDp(18) }}>]</Text>
                </View>

                {/* 测试结果 */}
                <ScrollView style={{ top: '15%', width: '45%', position: 'absolute', right: '5%', height: '26%' }}>
                    <Text style={{ color: '#fff' }}>{params.content}</Text>
                </ScrollView>

                <View style={{ position: 'absolute', top: '45%', left: '5%' }}>
                    <Text style={{ color: '#fff' }}>外向</Text>
                    <Text style={{ color: '#fff' }}>{params.extroversion + '%'}</Text>
                </View>
                <View style={{ position: 'absolute', top: '51%', left: '5%' }}>
                    <Text style={{ color: '#fff' }}>判断</Text>
                    <Text style={{ color: '#fff' }}>{params.judgment + '%'}</Text>
                </View>
                <View style={{ position: 'absolute', top: '57%', left: '5%' }}>
                    <Text style={{ color: '#fff' }}>抽象</Text>
                    <Text style={{ color: '#fff' }}>{params.abstract + '%'}</Text>
                </View>
                <View style={{ position: 'absolute', top: '45%', right: '5%' }}>
                    <Text style={{ color: '#fff' }}>理性</Text>
                    <Text style={{ color: '#fff' }}>{params.rational + '%'}</Text>
                </View>

                <Text style={{ position: 'absolute', left: '5%', color: '#fff', top: '64%' }}>与你相似</Text>
                <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                    style={{ position: 'absolute', top: '72.5%', width: '96%', height: '8%' }} horizontal={true}>
                    <Image
                        style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25), marginLeft: toDp(5) }}
                        source={{ uri: BASE_URI + params.currentUser.header }} />
                    <Image
                        style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25), marginLeft: toDp(5) }}
                        source={{ uri: BASE_URI + params.currentUser.header }} />
                    <Image
                        style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25), marginLeft: toDp(5) }}
                        source={{ uri: BASE_URI + params.currentUser.header }} />
                    <Image
                        style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25), marginLeft: toDp(5) }}
                        source={{ uri: BASE_URI + params.currentUser.header }} />
                    <Image
                        style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25), marginLeft: toDp(5) }}
                        source={{ uri: BASE_URI + params.currentUser.header }} />
                    <Image
                        style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25), marginLeft: toDp(5) }}
                        source={{ uri: BASE_URI + params.currentUser.header }} />
                    <Image
                        style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25), marginLeft: toDp(5) }}
                        source={{ uri: BASE_URI + params.currentUser.header }} />
                    <Image
                        style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25), marginLeft: toDp(5) }}
                        source={{ uri: BASE_URI + params.currentUser.header }} />
                </ScrollView>

                <THButton onPress={() => navigation.navigate("TestSoul")} style={{position: 'absolute', top: '55%'}} styles={{width: '96%', height: toDp(40), borderRadius: toDp(10) }} text='继续测试'></THButton>
            </ImageBackground>
        </ImageBackground>
    )
}