import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { toDp } from '../../../utils/style';
import SvgUri from 'react-native-svg-uri';
import { male, female } from '../../../assets/fonts/iconSvg';
import Picker from 'react-native-picker';
import { Slider } from 'react-native-elements';
import CityList from '../../../utils/city';
import THButton from '../../../components/THButton';

export default function Filter(props) {
    const { params, onClose, handleFilterComplete } = props;

    const [gender, setGender] = useState(params.gender);
    const [distance, setDistance] = useState(params.distance);
    const [lastLogin, setLastLogin] = useState(params.lastLogin);
    const [city, setCity] = useState(params.city);
    const [education, setEducation] = useState(params.education);

    // 点击近期登陆时间，显示时间选择框
    const showLoginTime = () => {
        Picker.init({
            pickerData: ['15分钟', '1天', '1小时', '不限制'],
            selectedValue: [lastLogin],
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            pickerTitleText: '选择近期登陆时间',
            wheelFlex: [1, 0, 0],
            onPickerConfirm: data => {
                setLastLogin(data[0]);
            }
        });
        Picker.show();
    }

    // 点击选择居住地，显示城市列表
    const showCityList = () => {
        Picker.init({
            pickerData: CityList,
            selectedValue: ['北京', '北京'],
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            pickerTitleText: '选择城市',
            wheelFlex: [1, 1, 0],
            onPickerConfirm: data => {
                setCity(data[1]);
            }
        });
        Picker.show();
    }

    // 选择学历
    const showEducationList = () => {
        Picker.init({
            pickerData: ['博士后', '博士', '硕士', '本科', '大专', '高中', '留学', '其他'],
            selectedValue: ['其他'],
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            pickerTitleText: '选择学历',
            wheelFlex: [1, 0, 0],
            onPickerConfirm: data => {
                setEducation(data[0]);
            }
        });
        Picker.show();
    }

    return (
        <View style={{ position: 'absolute', width: '100%', height: '50%', bottom: 0, left: 0, backgroundColor: '#fff', paddingLeft: toDp(10), paddingRight: toDp(10) }}>
            {/* 标题 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: toDp(15), paddingRight: toDp(10) }}>
                <Text></Text>
                <Text style={{ fontSize: toDp(18), color: '#666' }}>筛选</Text>
                <Icon name='close' size={toDp(18)} onPress={onClose} />
            </View>

            {/* 性别 */}
            <View style={{ paddingTop: toDp(10), flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#777', fontSize: toDp(18), width: toDp(80) }}>性别:</Text>
                <View style={{ width: '60%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity onPress={() => setGender('男')} style={{ backgroundColor: gender === '男' ? 'red' : '#eee', width: toDp(60), height: toDp(60), alignItems: 'center', justifyContent: 'center', borderRadius: toDp(30) }}>
                        <SvgUri width="30" height="30" svgXmlData={male} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('女')} style={{ backgroundColor: gender === '男' ? '#eee' : 'red', width: toDp(60), height: toDp(60), alignItems: 'center', justifyContent: 'center', borderRadius: toDp(30) }}>
                        <SvgUri width="30" height="30" svgXmlData={female} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 近期登陆时间 */}
            <View style={{ paddingTop: toDp(10), flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#777', fontSize: toDp(18), width: toDp(140) }}>近期登陆时间：</Text>
                <Text onPress={showLoginTime} style={{ color: '#777', fontSize: toDp(18), width: toDp(140) }}>{lastLogin || '请选择'}</Text>
            </View>

            {/* 距离 */}
            <View style={{ paddingTop: toDp(10) }}>
                <Text style={{ color: '#777', fontSize: toDp(18), width: toDp(140) }}>距离: {distance || 0}KM</Text>
                <Slider animationType='spring' value={distance} maximumValue={10} minimumValue={0} step={0.5} onValueChange={value => setDistance(value)} />
            </View>

            {/* 居住地 */}
            <View style={{ paddingTop: toDp(10), flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#777', fontSize: toDp(18), width: toDp(100) }}>居住地：</Text>
                <Text onPress={showCityList} style={{ color: '#777', fontSize: toDp(18), width: toDp(140) }}>{city || '请选择'}</Text>
            </View>

            {/* 学历 */}
            <View style={{ paddingTop: toDp(10), flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#777', fontSize: toDp(18), width: toDp(100) }}>学历：</Text>
                <Text onPress={showEducationList} style={{ color: '#777', fontSize: toDp(18), width: toDp(140) }}>{education || '请选择'}</Text>
            </View>

            {/* 确认 */}
            <THButton onPress={() => handleFilterComplete(gender, distance, lastLogin, city, education)} text='确认' styles={{marginTop: toDp(20), width: '80%', height: toDp(40), borderRadius: toDp(10), marginLeft: '10%'}}></THButton>
        </View>
    )
}
