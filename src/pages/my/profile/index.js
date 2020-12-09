import THNav from '@/components/THNav';
import { ACCOUNT_CHECKHEADIMAGE, BASE_URI, MY_INFO, MY_SAVEINFO } from '@/utils/pathMap';
import { toDp } from '@/utils/style';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { ListItem, Overlay } from 'react-native-elements';
import date from '@/utils/date';
import ImagePicker from 'react-native-image-crop-picker';
import request from '@/utils/request';
import Toast from '@/utils/toast';
import DatePicker from 'react-native-datepicker';
import { ActionSheet } from 'teaset';
import Picker from 'react-native-picker';
import CityList from '@/utils/city';

const MyProfile = observer(({ userStore }) => {

    const [showNickName, setShowNickName] = useState(false);
    const [birthday, setBirthday] = useState('');

    // 选择头像
    const handleChooseImage = async () => {
        const image = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
        const res = await uploadHeadImage(image);
        const header = res.data.headImgShortPath;
        const res2 = await saveUser({ header });
    }

    // 上传头像到后台
    const uploadHeadImage = async (image) => {
        let formData = new FormData();
        formData.append('headPhoto', { uri: image.path, type: image.mime, name: image.path.split('/').pop() })
        const res = await request.authPost(ACCOUNT_CHECKHEADIMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res;
    }

    // 保存用户信息
    const saveUser = async (user) => {
        const res = await request.authPost(MY_SAVEINFO, user);
        Toast.smile('修改成功');
        const res2 = await request.authGet(MY_INFO);
        userStore.setUser(res2.data);
        return Promise.resolve(res);
    }

    // 点击昵称完成
    const handleSubmitEditing = (e) => {
        const nickname = e.nativeEvent.text;
        saveUser({ nickname });
        setShowNickName(false);
    }

    // 点击性别，显示性别选择
    const handleShowSex = () => {
        let items = [
            { title: '男', disabled: userStore.user.gender === '男', onPress: () => handleChooseSex('男') },
            { title: '女', disabled: userStore.user.gender === '女', onPress: () => handleChooseSex('女') }
        ]
        ActionSheet.show(items, { title: '取消' });
    }

    // 选择性别
    const handleChooseSex = (gender) => {
        saveUser({ gender })
    }

    // 选择城市
    const handleShowCity = () => {
        Picker.init({
            pickerData: CityList,
            selectedValue: ['北京', '北京'],
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            pickerTitleText: '选择城市',
            wheelFlex: [1, 1, 0],
            onPickerConfirm: data => {
                //  ["江西省", "南昌市"]
                saveUser({city: data[1]})
            }
        });
        Picker.show();
    }

    // 编辑学历
    const handleShowXueli = () => {
        Picker.init({
            pickerData: ['博士后', '博士', '硕士', '本科', '大专', '高中', '留学', '其他'],
            selectedValue: [userStore.user.xueli],
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            pickerTitleText: '选择学历',
            wheelFlex: [1, 0, 0],
            onPickerConfirm: data => {
                saveUser({xueli: data[0]});
            }
        });
        Picker.show();
    }

    // 编辑婚姻状态
    const handleShowMarry = () => {
        Picker.init({
            pickerData: ['单身', '已婚'],
            selectedValue: [userStore.user.marry],
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            pickerTitleText: '选择婚姻状态',
            wheelFlex: [1, 0, 0],
            onPickerConfirm: data => {
                saveUser({marry: data[0]});
            }
        });
        Picker.show();
    }


    return (
        <View>
            <THNav title='编辑资料' />
            {/* 用户信息 */}
            <ListItem onPress={handleChooseImage} chevron title='头像' rightElement={<Image source={{ uri: BASE_URI + userStore.user.header }} style={{ height: toDp(40), width: toDp(40), borderRadius: toDp(20) }} />} />
            <ListItem onPress={() => setShowNickName(true)} chevron title='昵称' rightTitle={userStore.user.nick_name} />
            <View style={{ position: 'relative' }}>
                <ListItem chevron title='生日' rightTitle={date(userStore.user.birthday).format('YYYY-MM-DD')} />
                <DatePicker
                    useNativeDriver={true}
                    style={{ width: '100%', position: 'absolute', top: 0, left: 0, opacity: 0 }}
                    date={date(userStore.user.birthday).format('YYYY-MM-DD')}
                    mode='date'
                    placeholder='设置生日'
                    format='YYYY-MM-DD'
                    minDate='1900-01-01'
                    maxDate={date(new Date()).format('YYYY-MM-DD')}
                    confirmBtnText='确定'
                    cancelBtnText='取消'
                    display='compact'
                    onDateChange={(date) => saveUser({ birthday: date })}
                />
            </View>
            <ListItem onPress={handleShowSex} chevron title='性别' rightTitle={userStore.user.gender} />
            <ListItem onPress={handleShowCity} chevron title='现居城市' rightTitle={userStore.user.city} />
            <ListItem onPress={handleShowXueli} chevron title='学历' rightTitle={userStore.user.xueli} />
            <ListItem chevron title='月收入' rightTitle={'15-25K'} />
            <ListItem chevron title='行业' rightTitle={'PM'} />
            <ListItem onPress={handleShowMarry} chevron title='婚姻状态' rightTitle={userStore.user.marry} />

            <Overlay isVisible={showNickName} onBackdropPress={() => setShowNickName(false)}>
                <TextInput onSubmitEditing={handleSubmitEditing} placeholder='修改昵称' style={{ width: toDp(200) }} />
            </Overlay>

            <Overlay isVisible={showNickName} onBackdropPress={() => setShowNickName(false)}>
                <TextInput onSubmitEditing={handleSubmitEditing} placeholder='修改昵称' style={{ width: toDp(200) }} />
            </Overlay>
        </View>
    )
});

export default inject(state => ({
    userStore: state.rootStore.userStore
}))(MyProfile);