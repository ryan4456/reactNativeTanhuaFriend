import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { BASE_URI, STATUS_THUMBS_UP, MY_STATUS } from "@/utils/pathMap";
import request from "@/utils/request";
import Icon from 'react-native-vector-icons/FontAwesome';
import { toDp } from "@/utils/style";
import { ImageViewer } from 'react-native-image-zoom-viewer';
import date from '@/utils/date';
import Toast from "@/utils/toast";
import { useNavigation } from '@react-navigation/native';
import { convertText, EMOTION_MAP } from "@/components/Emotions/map";
import THNav from "@/components/THNav";
import { inject } from "mobx-react";

function MyStatus({navigation, userStore}) {
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(10);
    let isLoading = false;
    const [list, setList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [showAlbum, setShowAlbum] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const {user} = userStore;

    const getList = async () => {
        const res = await request.authGet(MY_STATUS, { page, pagesize });
        setList([...list, ...res.data]);
        setTotalPage(res.pages);
    }

    // 滚动触底
    const handleScroll = () => {
        if (page < totalPage && !isLoading) {
            setPage(page + 1);
            isLoading = true;
        }
    }

    // 初始化
    useEffect(() => {
        getList();
    }, [page])

    // 点赞
    const handleThumbUp = async (item, index) => {
        const res = await request.authGet(STATUS_THUMBS_UP(item.tid));
        if (res.data.iscancelstar) {
            Toast.smile('取消成功');
        } else {
            Toast.smile('点赞成功');
        }
        // reset star count 
        item.star_count = res.data.start_count;
        const _list = [...list.slice(0, index), item, ...list.slice(index + 1)];
        setList(_list);
    }

    // 渲染flat list item
    const renderItem = (item, index) => {
        return (
            <>
                <View key={index} style={{ padding: toDp(10), borderBottomColor: '#d9d9d9', borderBottomWidth: toDp(1) }}>
                    {/* 用户信息 */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ paddingLeft: toDp(10), paddingRight: toDp(10) }}>
                            <Image source={{ uri: BASE_URI + item.header }} style={{ width: toDp(40), height: toDp(40), borderRadius: toDp(20) }} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', padding: toDp(5) }}>
                            <View style={{ flex: 4, justifyContent: 'space-around' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#555' }}>{user.nick_name}</Text>
                                    <Icon style={{ marginLeft: toDp(5), marginRight: toDp(5) }} name={user.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                                    <Text style={{ color: '#555' }}>{user.age}岁</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#555', marginRight: toDp(5) }}>{user.marry}</Text>
                                    <Text style={{ color: '#555', marginRight: toDp(5) }}>|</Text>
                                    <Text style={{ color: '#555', marginRight: toDp(5) }}>{user.xueli}</Text>
                                    <Text style={{ color: '#555', marginRight: toDp(5) }}>|</Text>
                                    <Text style={{ color: '#555', marginRight: toDp(5) }}>{user.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    {/* 动态内容 */}
                    <View style={{ marginTop: toDp(8), flexDirection: 'row' }}>
                        {convertText(item.content).map((item, index) => {
                            if (item.text) {
                                return <Text key={index} style={{ color: '#666' }}>{item.text}</Text>
                            }
                            let source = EMOTION_MAP[item.image];
                            if (source) {
                                return <Image style={{ width: toDp(10), height: toDp(10) }} key={index} source={source} />
                            }
                            return null;
                        })}
                    </View>

                    {/* 相册 */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: toDp(5), paddingBottom: toDp(5) }}>
                        {item.images.map((_item, _index) => (
                            <TouchableOpacity key={_index} onPress={() => { setCurrentIndex(_index); setImages(item.images.map(__item => ({ url: BASE_URI + __item.thum_img_path }))); setShowAlbum(true) }}>
                                <Image style={{ width: toDp(70), height: toDp(70), marginRight: toDp(5) }} source={{ uri: BASE_URI + _item.thum_img_path }} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* 距离 时间 */}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: toDp(10) }}>
                            <Text style={{ color: '#666' }}>距离 {item.dist} km</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#666' }}>{date(item.create_time).fromNow()}</Text>
                        </View>
                    </View>

                    {/* 3个图标 */}
                    <View style={{ marginTop: toDp(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* 点赞 */}
                        <TouchableOpacity onPress={() => handleThumbUp(item, index)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='thumbs-o-up' size={toDp(15)} color='#666' />
                            <Text style={{ marginLeft: toDp(3), color: '#666' }}>{item.star_count}</Text>
                        </TouchableOpacity>
                        {/* 评论 */}
                        <TouchableOpacity onPress={() => navigation.navigate('StatusDetail', item)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='comment-o' size={toDp(15)} color='#666' />
                            <Text style={{ marginLeft: toDp(3), color: '#666' }}>{item.comment_count}</Text>
                        </TouchableOpacity>
                        <Text></Text>
                    </View>
                </View>
                {(page >= totalPage && index === list.length - 1) ? <View style={{ alignItems: 'center', marginTop: toDp(10), paddingBottom: toDp(50) }}><Text style={{ color: '#ccc' }}>没有更多数据了</Text></View> : null}
            </>
        )
    }

    return (
        <>
            <THNav title='我的动态' />
            <FlatList onEndReachedThreshold={0.1} onEndReached={handleScroll}
                data={list} keyExtractor={item => item.tid + ''}
                renderItem={({ item, index }) => renderItem(item, index)}></FlatList>

            {/* 点击放大 */}
            <Modal visible={showAlbum} transparent={true}>
                <ImageViewer onClick={() => setShowAlbum(false)} imageUrls={images} index={currentIndex} />
            </Modal>
        </>
    )
}

export default inject(state => ({
    userStore: state.rootStore.userStore
}))(MyStatus);