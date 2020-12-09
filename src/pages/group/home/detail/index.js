import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { BASE_URI, COMMENT_LIST, COMMENT_SUBMIT, COMMENT_THUMBS_UP } from "@/utils/pathMap";
import request from "@/utils/request";
import Icon from 'react-native-vector-icons/FontAwesome';
import { toDp } from "@/utils/style";
import { ImageViewer } from 'react-native-image-zoom-viewer';
import date from '@/utils/date';
import Toast from "@/utils/toast";
import { ActionSheet } from "teaset";
import THNav from "@/components/THNav";
import LinearGradient from 'react-native-linear-gradient';

export default function StatusDetail({ route }) {
    const { params } = route;
    const item = params;
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(10);
    let isLoading = false;
    const [list, setList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [showAlbum, setShowAlbum] = useState(false);
    const [showComment, setShowComment] = useState(true);
    const [totalPage, setTotalPage] = useState(1);
    const [comment, setComment] = useState('');

    const getList = async () => {
        const res = await request.authGet(COMMENT_LIST(params.tid), { page, pagesize });
        setTotalPage(res.pages);
        if(page === 1){
            return setList(res.data);
        }
        setList([...list, ...res.data]);
    }

    // 滚动触底
    const handleScroll = () => {
        if (page < totalPage && !isLoading) {
            setPage(page + 1);
            isLoading = true;
        }
    }

    // 给评论点赞
    const handleThumbsUp = async (item, index) => {
        const res = await request.authGet(COMMENT_THUMBS_UP(item.cid));
        Toast.smile('点赞成功');
        item.star = res.data.star_count;
        const _list = [...list.slice(0, index), item, ...list.slice(index + 1)];
        setList(_list);
    }

    // 点击遮罩层，关闭输入框
    const handleCloseEditing = () => {
        setShowComment(false);
        setComment('');
    }

    // 完成编辑或点击发送按钮，提交评论
    const handleCommentSubmit = async () => {
        if(comment === ''){
            Toast.smile('评论不能为空');
            return;
        }
        const res = await request.authPost(COMMENT_SUBMIT(params.tid), {comment});
        handleCloseEditing();
        if(page == 1){
            return getList();
        }
        setPage(1);
    }

    // 初始化
    useEffect(() => {
        getList();
    }, [page])

    // 渲染flat list item
    const renderItem = (item, index) => {
        return (
            <>
                <View key={index} style={{
                    padding: toDp(10), borderBottomColor: '#d9d9d9',
                    borderBottomWidth: toDp(1), flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{ paddingRight: toDp(10) }}>
                        <Image source={{ uri: BASE_URI + item.header }} style={{ width: toDp(40), height: toDp(40), borderRadius: toDp(20) }} />
                    </View>
                    <View>
                        <Text style={{ color: '#666' }}>{item.nick_name}</Text>
                        <Text style={{ color: '#666', fontSize: toDp(13), marginTop: toDp(5), marginBottom: toDp(5) }}>{date(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        <Text style={{ color: '#666' }}>{item.content}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleThumbsUp(item, index)} style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Icon name='thumbs-o-up' size={toDp(13)} />
                        <Text style={{ color: '#666' }}>{item.star}</Text>
                    </TouchableOpacity>
                </View>
                {(page >= totalPage && index === list.length - 1) ? <View style={{ alignItems: 'center', marginTop: toDp(10), paddingBottom: toDp(50) }}><Text style={{ color: '#ccc' }}>没有更多数据了</Text></View> : null}
            </>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <THNav title='最新评论' />
            {/* 用户信息 */}
            <View style={{ padding: toDp(10) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ paddingLeft: toDp(10), paddingRight: toDp(10) }}>
                        <Image source={{ uri: BASE_URI + item.header }} style={{ width: toDp(40), height: toDp(40), borderRadius: toDp(20) }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', padding: toDp(5) }}>
                        <View style={{ flex: 4, justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#555' }}>{item.nick_name}</Text>
                                <Icon style={{ marginLeft: toDp(5), marginRight: toDp(5) }} name={item.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                                <Text style={{ color: '#555' }}>{item.age}岁</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#555', marginRight: toDp(5) }}>{item.marry}</Text>
                                <Text style={{ color: '#555', marginRight: toDp(5) }}>|</Text>
                                <Text style={{ color: '#555', marginRight: toDp(5) }}>{item.xueli}</Text>
                                <Text style={{ color: '#555', marginRight: toDp(5) }}>|</Text>
                                <Text style={{ color: '#555', marginRight: toDp(5) }}>{item.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                            </View>
                        </View>
                        {/* 更多 */}
                        <TouchableOpacity onPress={() => handleMore(item)}>
                            <Icon name='ellipsis-v' />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 动态内容 */}
                <View style={{ marginTop: toDp(8) }}>
                    <Text style={{ color: '#666' }}>{item.content}</Text>
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

                {/* 最新评论，发表评论 */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: toDp(1), borderBottomColor: '#eee' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#666' }}>最新评论</Text>
                        <View style={{ marginLeft: toDp(3), backgroundColor: 'red', width: toDp(16), height: toDp(16), borderRadius: toDp(8), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff' }}>{list.length}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setShowComment(true)} style={{ marginRight: toDp(8) }}>
                            <LinearGradient style={{ width: toDp(100), height: toDp(20), borderRadius: toDp(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }} colors={['#735fee', '#e9768b']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <Text style={{ color: '#fff', fontSize: toDp(10) }}>发表评论</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <FlatList onEndReachedThreshold={0.1} onEndReached={handleScroll}
                data={list} keyExtractor={item => item.cid + ''}
                renderItem={({ item, index }) => renderItem(item, index)}></FlatList>

            {/* 点击放大 */}
            <Modal visible={showAlbum} transparent={true}>
                <ImageViewer onClick={() => setShowAlbum(false)} imageUrls={images} index={currentIndex} />
            </Modal>

            {/* 评论 */}
            <Modal onRequestClose={() => handleCloseEditing()} visible={showComment} transparent={true} animationType='slide'>
                <TouchableOpacity onPress={handleCloseEditing} style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'relative'}}>
                    <View style={{position: 'absolute', width: '100%', 
                    left: 0, bottom: 0, backgroundColor: '#eee', 
                    paddingBottom: toDp(40), flexDirection: 'row', 
                    alignItems: 'center', padding: toDp(10)}}>
                        <TextInput onSubmitEditing={handleCommentSubmit} autoFocus value={comment} onChangeText={value => setComment(value)} placeholder='发表评论' style={{flex: 5, backgroundColor: '#fff', height: toDp(38), borderColor: '#ddd', borderRadius: toDp(10)}}/>
                        <Text onPress={handleCommentSubmit} style={{flex: 1, textAlign: 'center'}}>发布</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}