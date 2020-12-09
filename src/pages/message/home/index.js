import jmessage from '@/utils/jmessage';
import { toDp } from '@/utils/style';
import React, { useEffect } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MessageHome() {

    useEffect(() => {
        getConversations();
    }, [])

    const getConversations = async () => {
        const res = await jmessage.getConversationList();
        console.log(res);
    }
    return (
        <View>
            <ImageBackground source={require('@/assets/images/nav-bg.png')}
                style={{
                    height: toDp(80), paddingTop: toDp(50),
                    flexDirection: 'row', justifyContent: 'space-between',
                    paddingRight: toDp(10),
                    alignItems: 'center'
                }}>
                <TouchableOpacity style={{ flex: 1 }}></TouchableOpacity>
                <Text style={{ fontSize: toDp(20), color: '#fff', flex: 1 }}>{'消息'}</Text>
                <TouchableOpacity>
                    <Icon name='user-o' color='#fff' size={toDp(20)} />
                </TouchableOpacity>
            </ImageBackground>

            <View style={{flexDirection: 'row', paddingTop: toDp(10), 
            paddingBottom: toDp(10), paddingLeft: toDp(30), 
            paddingRight: toDp(30), justifyContent: 'space-between',
            borderBottomColor: '#ddd', borderBottomWidth: toDp(3)}}>
                {/* 全部 */}
                <TouchableOpacity style={{alignItems: 'center'}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7c670', height: toDp(60), width: toDp(60), borderRadius: toDp(30)}}>
                        <Icon name='clipboard' color='#fff' size={toDp(20)} />
                    </View>
                    <Text style={{color: '#666', marginTop: toDp(5)}}>全部</Text>
                </TouchableOpacity>
                {/* 点赞 */}
                <TouchableOpacity style={{alignItems: 'center'}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff5e20', height: toDp(60), width: toDp(60), borderRadius: toDp(30)}}>
                        <Icon name='thumbs-o-up' color='#fff' size={toDp(20)} />
                    </View>
                    <Text style={{color: '#666', marginTop: toDp(5)}}>点赞</Text>
                </TouchableOpacity>
                {/* 评论 */}
                <TouchableOpacity style={{alignItems: 'center'}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#00aefa', height: toDp(60), width: toDp(60), borderRadius: toDp(30)}}>
                        <Icon name='comment-o' color='#fff' size={toDp(20)} />
                    </View>
                    <Text style={{color: '#666', marginTop: toDp(5)}}>评论</Text>
                </TouchableOpacity>
                {/* 喜欢 */}
                <TouchableOpacity style={{alignItems: 'center'}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#00c9e0', height: toDp(60), width: toDp(60), borderRadius: toDp(30)}}>
                        <Icon name='heart-o' color='#fff' size={toDp(20)} />
                    </View>
                    <Text style={{color: '#666', marginTop: toDp(5)}}>喜欢</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}