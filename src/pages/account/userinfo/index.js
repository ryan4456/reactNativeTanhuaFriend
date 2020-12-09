import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { toDp } from '../../../utils/style';
import SvgUri from 'react-native-svg-uri'
import { male, female } from '../../../assets/fonts/iconSvg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Geo from '../../../utils/geo';
import Picker from 'react-native-picker';
import CityList from '../../../utils/city';
import THButton from '../../../components/THButton/index';
import Toast from '../../../utils/toast';
import ImagePicker from 'react-native-image-crop-picker';
import { Overlay } from 'teaset';
import {inject} from 'mobx-react';
import request from '../../../utils/request';
import { ACCOUNT_CHECKHEADIMAGE, ACCOUNT_SAVE } from '../../../utils/pathMap';
import IM from '../../../utils/jmessage';

const UserInfo = ({tokenStore}) => {
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('男');
    const [birthday, setBirthday] = useState('');
    const [header, setHeader] = useState('');
    const [lng, setLng] = useState('');
    const [lat, setLat] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const overLayRef = useRef();

    useEffect(() => {
        async function getLocation() {
            const { result } = await Geo.getCityByLocation();
            setLat(result.location.lat);
            setLng(result.location.lng);
            const { nation, ad_level_1, ad_level_2 } = result.address_component;
            setAddress(nation + ad_level_1 + ad_level_2);
            setCity(ad_level_2);
        }
        getLocation();
    }, [])

    const dateNow = new Date();
    const currentDate = dateNow.getFullYear() + '-' + (dateNow.getMonth + 1) + '-' + dateNow.getDate();

    // 显示城市选择列表
    const showCityPicker = () => {
        Picker.init({
            pickerData: CityList,
            selectedValue: ['北京', '北京'],
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            pickerTitleText: '选择城市',
            wheelFlex: [1, 1, 0],
            onPickerConfirm: data => {
                //  ["江西省", "南昌市"]
                setAddress(data.join(''));
                setCity(data[1]);
            }
        });
        Picker.show();
    }

    // 点击设置头像按钮
    const handleButtonHeader = async () => {
        // 1校验不为空
        if (!nickname || !birthday || !address) {
            return Toast.message('昵称，生日、或城市不合法', 2000, 'center');
        }
        // 2使用图片裁剪的插件
        const image = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
        // 3图片上传到后台
        let overlayView = (
            <Overlay.View
                style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}
                modal={true}
                overlayOpacity={0}
                ref={overLayRef}
            >
                <View style={{marginTop: 60, width: toDp(300), height: toDp(300), position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{uri: image.path}} style={{width: '60%', height: '60%'}} />
                    <Image style={{opacity: 0.5,width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, zIndex: 100}} source={require('../../../assets/images/scan.gif')}/>
                </View>
            </Overlay.View>
        );
        Overlay.show(overlayView);
        const res = await uploadHeadImage(image);
        if(res.code !== '10000'){
            return;
        }
        setHeader(res.data.headImgPath)
        // 4将表单数据提交到接口
        let params = {nickname, header, gender, birthday, city, lat, lng, address};
        const saveRes = await request.authPost(ACCOUNT_SAVE, params)
        console.log(saveRes);
        if(saveRes.code !== '10000'){
            return;
        }
        console.log(tokenStore);
        // 5成功-极光注册，登录，跳转到首页
        const jgRes = await IM.register(tokenStore.userId, tokenStore.mobile);
        // 6成功提示
        overLayRef.current.close();
        Toast.smile('操作成功', 2000, 'center');
        setTimeout(() => {
            alert('to index');
        }, 2000);
    }

    const uploadHeadImage = async (image) => {
        let formData = new FormData();
        formData.append('headPhoto', {uri: image.path, type: image.mime, name: image.path.split('/').pop()})
        const res = await request.authPost(ACCOUNT_CHECKHEADIMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res;
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1, padding: toDp(40) }}>
            {/* 标题 */}
            <Text style={styles.title}>填写资料</Text>
            <Text style={styles.title}>提升我的魅力</Text>

            {/* 性别 */}
            <View style={styles.sexContainer}>
                <View style={{ width: '60%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity onPress={() => setGender('男')} style={{ backgroundColor: gender === '男' ? 'red' : '#eee', width: toDp(60), height: toDp(60), alignItems: 'center', justifyContent: 'center', borderRadius: toDp(30) }}>
                        <SvgUri width="30" height="30" svgXmlData={male} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('女')} style={{ backgroundColor: gender === '男' ? '#eee' : 'red', width: toDp(60), height: toDp(60), alignItems: 'center', justifyContent: 'center', borderRadius: toDp(30) }}>
                        <SvgUri width="30" height="30" svgXmlData={female} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 昵称 */}
            <View>
                <Input
                    value={nickname}
                    placeholder={'设置昵称'}
                    onChangeText={setNickname}
                />
            </View>

            {/* 生日 */}
            <View>
                <DatePicker
                    style={{ width: '100%' }}
                    date={birthday}
                    mode='date'
                    placeholder='设置生日'
                    format='YYYY-MM-DD'
                    minDate='1900-01-01'
                    maxDate={currentDate}
                    confirmBtnText='确定'
                    cancelBtnText='取消'
                    display='compact'
                    onDateChange={(date) => setBirthday(date)}
                    customStyles={{
                        dateIcon: {
                            display: 'none'
                        },
                        dateInput: {
                            marginLeft: toDp(10),
                            borderWidth: 0,
                            borderBottomWidth: toDp(1.1),
                            alignItems: 'flex-start',
                            paddingLeft: toDp(2)
                        },
                        placeholderText: {
                            fontSize: toDp(18),
                            color: '#afafaf',
                        }
                    }}
                />
            </View>

            {/* 地址 */}
            <View>
                <TouchableOpacity onPress={showCityPicker}>
                    <Input style={{ color: '#666', marginTop: toDp(20) }} value={'当前定位:' + city} disabled />
                </TouchableOpacity>
            </View>

            {/* 头像 */}
            <View style={{ height: toDp(40), marginTop: toDp(20) }}>
                <THButton onPress={handleButtonHeader} styles={{ borderRadius: toDp(20) }} text='设置头像'></THButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: { fontSize: toDp(20), color: '#666', fontWeight: 'bold' },
    sexContainer: {
        marginTop: toDp(20)
    }
})

export default inject(state => ({
    tokenStore: state.rootStore.tokenStore
}))(UserInfo)