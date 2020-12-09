import THNav from '@/components/THNav';
import { toDp } from '@/utils/style';
import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geo from '@/utils/geo';
import * as ImagePicker from 'react-native-image-picker';
import Emotions from '@/components/Emotions';
import Toast from '@/utils/toast';
import request from '@/utils/request';
import { IMAGES_UPLOAD, STATUS_SUBMIT } from '@/utils/pathMap';

export default function StatusPublish({navigation}) {
    const inputRef = useRef(null);
    const [textContent, setTextContent] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [location, setLocation] = useState('');
    const [imageList, setImageList] = useState([]);
    const [showEmotion, setShowEmotion] = useState(false);

    // 获取当前定位
    const handleGetPosition = async () => {
        const { result } = await Geo.getCityByLocation();
        setLatitude(result.location.lat);
        setLongitude(result.location.lng);
        const { nation, ad_level_1, ad_level_2 } = result.address_component;
        setLocation(nation + ad_level_1 + ad_level_2);
    }

    // 选择图片
    const handleChooseImage = () => {
        const options = {
            title: 'select avatar',
            customButtons: [],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (response.didCancel) {
                    return;
                }
                if (imageList.length == 3) {
                    return Toast.smlie('最多选择3张');
                }
                setImageList([...imageList, {uri: response.uri, name: response.fileName, type: 'application/octet-stream'}]);
            },
        )
    }

    // 点击图片，删除图片
    const handleRemoveImage = (index) => {
        setImageList([...imageList.slice(0, index), ...imageList.slice(index + 1)]);
    }

    // 选择表情
    const handleEmotionClick = (key) => {
        setTextContent(textContent + key);
    }

    // 点击发帖
    const handleStatusSubmit = async () => {
        //1 validate
        if(!textContent || !location || !longitude || !latitude){
            Toast.message('输入不合法');
            return;
        }
        //2 submit images
        const imageContent = await uploadImages();
        //3 submit all data
        const params = {textContent, location, longitude, latitude, imageContent}
        const res = await request.authPost(STATUS_SUBMIT, params);
        if(res.code === '10000'){
            Toast.smile('发布动态成功');
            setTimeout(() => {
                navigation.reset({routes: [{name: 'Tabbar', params: {pageName: 'group'}}]});
            }, 2000);
        }
        //4 return to parent page
    }

    // 上传图片
    const uploadImages = async () => {
        if(imageList.length === 0){
            return Promise.resolve([]);
        }
        const params = new FormData();
        imageList.forEach(item => {
            params.append('images', item);
        })
        const res = await request.authPost(IMAGES_UPLOAD, params, {
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            }
        })
        return Promise.resolve(res.data.map(v=>({headImgShortPath: v.headImgShortPath})))

    }

    return (
        <View style={{ flex: 1 }}>
            <THNav title='发动态' rightText='发帖' leftText='取消' onRightPress={handleStatusSubmit} />
            <TouchableOpacity style={{ height: '30%', padding: toDp(10) }} onPress={() => inputRef.current.focus()}>
                <TextInput
                    multiline
                    value={textContent}
                    onChangeText={value => setTextContent(value)}
                    ref={inputRef}
                    placeholder='请填写动态（140字以内）'
                    style={{ fontSize: toDp(14) }} />
            </TouchableOpacity>

            {/* 定位 */}
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={handleGetPosition} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='location-arrow' size={toDp(20)} color='#666' />
                    <Text style={{ fontSize: toDp(12), color: '#aaa', marginLeft: toDp(5), marginRight: toDp(5) }}>{location === '' ? '你在哪里？' : location}</Text>
                </TouchableOpacity>
            </View>

            {/* 选择的图片 */}
            <View style={{ marginTop: toDp(10), marginBottom: toDp(10) }}>
                <ScrollView horizontal>
                    {imageList.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleRemoveImage(index)}>
                            <Image source={{ uri: item.uri }}
                                style={{ marginLeft: toDp(5), marginRight: toDp(5), width: toDp(50), height: toDp(50) }} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 工具栏 */}
            <View style={{ flexDirection: 'row', backgroundColor: '#d9d9d9', height: toDp(40), alignItems: 'center', paddingLeft: toDp(20) }}>
                {/* 图片 */}
                <TouchableOpacity onPress={handleChooseImage}>
                    <Icon name='image' size={toDp(30)} color='#666' />
                </TouchableOpacity>
                {/* 表情 */}
                <TouchableOpacity onPress={() => setShowEmotion(!showEmotion)} style={{ marginLeft: toDp(30) }}>
                    <Icon name='heart' size={toDp(30)} color={showEmotion ? '#dd7596' : '#666'} />
                </TouchableOpacity>
            </View>

            {/* 表情 */}
            {showEmotion ? <Emotions onPress={handleEmotionClick} /> : null}
        </View>
    )
}