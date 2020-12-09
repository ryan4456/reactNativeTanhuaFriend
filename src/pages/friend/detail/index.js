import { BASE_URI, FRIEND_DETAIL } from '@/utils/pathMap';
import request from '@/utils/request';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Modal } from 'react-native';
import { ImageHeaderScrollView } from 'react-native-image-header-scroll-view';
import { Carousel } from 'teaset';
import { toDp } from '@/utils/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { ImageViewer } from 'react-native-image-zoom-viewer';
import jmessage from '@/utils/jmessage';
import { inject } from 'mobx-react';
import Toast from '@/utils/toast';

function FriendDetail({ route, tokenStore, navigation }) {
    const { params } = route;
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(3);
    const [userDetail, setUserDetail] = useState({});
    const [statusList, setStatusList] = useState([]);
    const [showAlbum, setShowAlbum] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    // 获取用户详情
    const getDetail = async () => {
        const res = await request.authGet(FRIEND_DETAIL(params.id), { page, pagesize })
        setUserDetail(res.data);
        setStatusList([...statusList, ...res.data.trends]);
        setTotalPage(res.pages);
        setIsLoading(false);
    }

    useEffect(() => {
        getDetail();
    }, [page])

    // 渲染
    const renderForeground = () => {
        return (
            <Carousel style={{ height: toDp(220) }} control>
                {userDetail.silder.map((item, index) => (
                    <Image key={index} style={{ height: toDp(220), width: '100%' }} source={{ uri: BASE_URI + item.thum_img_path }} />
                ))}
            </Carousel>
        )
    }

    // 滚动
    const handleScroll = ({nativeEvent}) => {
        // 滚动条触底
        if(nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y < 10){
            if(page < totalPage && !isLoading){
                setPage(page + 1);
                setIsLoading(true);
            }
        }
    }

    // 喜欢触发事件
    const handleLike = async () => {
        const {guid} = userDetail;
        const text = tokenStore.mobile + ' 喜欢了你';
        const extras = {user: JSON.stringify(userDetail)};
        const res = await jmessage.sendTextMessage(guid, text, extras);
        Toast.smile('喜欢成功', 1000, 'center');
    }

    if (!userDetail.silder) {
        return <></>;
    }

    const girl = userDetail;
    return (
        <ImageHeaderScrollView onScroll={handleScroll} maxHeight={toDp(220)} minHeight={toDp(40)} renderForeground={renderForeground} >
            {/* 个人信息 */}
            <View style={{ flex: 1, flexDirection: 'row', padding: toDp(5), borderBottomWidth: toDp(1), borderBottomColor: '#ccc' }}>
                <View style={{ flex: 4, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#555' }}>{girl.nick_name}</Text>
                        <Icon style={{ marginLeft: toDp(5), marginRight: toDp(5) }} name={girl.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                        <Text style={{ color: '#555' }}>{girl.age}岁</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#555', marginRight: toDp(5) }}>{girl.marry}</Text>
                        <Text style={{ color: '#555', marginRight: toDp(5) }}>|</Text>
                        <Text style={{ color: '#555', marginRight: toDp(5) }}>{girl.xueli}</Text>
                        <Text style={{ color: '#555', marginRight: toDp(5) }}>|</Text>
                        <Text style={{ color: '#555', marginRight: toDp(5) }}>{girl.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                    </View>
                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='heart' size={toDp(50)} color='#f75739' />
                        <Text style={{ position: 'absolute', color: '#fff', fontSize: toDp(13) }}>{girl.fateValue}</Text>
                    </View>
                    <Text style={{ color: '#f75739', fontSize: toDp(13) }}>缘分值</Text>
                </View>
            </View>

            {/* 动态 */}
            <View style={{}}>

                {/* 标题 */}
                <View style={{ flexDirection: 'row', padding: toDp(10), justifyContent: 'space-between', borderBottomWidth: toDp(1), borderBottomColor: '#eee' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#666' }}>动态</Text>
                        <View style={{ marginLeft: toDp(3), backgroundColor: 'red', width: toDp(16), height: toDp(16), borderRadius: toDp(8), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff' }}>{statusList.length}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Chat', userDetail)} style={{ marginRight: toDp(8) }}>
                            <LinearGradient style={{ width: toDp(100), height: toDp(30), borderRadius: toDp(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }} colors={['#fea85d', '#fc8855']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <Icon color='#fff' name='comments' />
                                <Text style={{ color: '#fff' }}>聊一下</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLike} style={{ marginRight: toDp(8) }}>
                            <LinearGradient style={{ width: toDp(100), height: toDp(30), borderRadius: toDp(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }} colors={['#735fee', '#e9768b']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <Icon color='#fff' name='heart-o' />
                                <Text style={{ color: '#fff' }}>喜欢</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 列表 */}
                <View>
                    {statusList.map((item, index) => (
                        <View key={index} style={{padding: toDp(10), borderBottomColor: '#eee', borderBottomWidth: toDp(1) }}>

                            {/* 用户信息 */}
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingLeft: toDp(10), paddingRight: toDp(10) }}>
                                    <Image source={{ uri: BASE_URI + userDetail.header }} style={{ width: toDp(40), height: toDp(40), borderRadius: toDp(20) }} />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', padding: toDp(5) }}>
                                    <View style={{ flex: 4, justifyContent: 'space-around' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: '#555' }}>{girl.nick_name}</Text>
                                            <Icon style={{ marginLeft: toDp(5), marginRight: toDp(5) }} name={girl.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                                            <Text style={{ color: '#555' }}>{girl.age}岁</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#555', marginRight: toDp(5) }}>{girl.marry}</Text>
                                            <Text style={{ color: '#555', marginRight: toDp(5) }}>|</Text>
                                            <Text style={{ color: '#555', marginRight: toDp(5) }}>{girl.xueli}</Text>
                                            <Text style={{ color: '#555', marginRight: toDp(5) }}>|</Text>
                                            <Text style={{ color: '#555', marginRight: toDp(5) }}>{girl.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* 动态内容 */}
                            <View style={{ marginTop: toDp(8) }}>
                                <Text style={{ color: '#666' }}>{item.content}</Text>
                            </View>

                            {/* 相册 */}
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: toDp(5), paddingBottom: toDp(5) }}>
                                {item.album.map((_item, _index) => (
                                    <TouchableOpacity key={_index} onPress={() => {setCurrentIndex(_index); setImages(item.album.map(__item => ({ url: BASE_URI + __item.thum_img_path }))); setShowAlbum(true)}}>
                                        <Image style={{ width: toDp(70), height: toDp(70), marginRight: toDp(5) }} source={{ uri: BASE_URI + _item.thum_img_path }} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* 点击放大 */}
            <Modal visible={showAlbum} transparent={true}>
                <ImageViewer onClick={() => setShowAlbum(false)} imageUrls={images} index={currentIndex} />
            </Modal>

            {page < totalPage ? null : <View style={{alignItems: 'center', marginTop: toDp(10)}}><Text style={{color: '#ccc'}}>没有更多数据了</Text></View>}
        </ImageHeaderScrollView>
    )
}

export default inject(state => ({
    tokenStore: state.rootStore.tokenStore
}))(FriendDetail);