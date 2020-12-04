import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { ImageHeaderScrollView } from 'react-native-image-header-scroll-view';
import { toDp } from '../../../utils/style';
import BestGirl from '../components/BestGirl';
import FriendHeader from '../components/FriendHeader';
import Vistors from '../components/Vistors';
import request from '../../../utils/request';
import { BASE_URI, FRIEND_RECOMMEND } from '../../../utils/pathMap';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Overlay } from 'teaset';
import Filter from '../components/Filter';


export default function FriendHome() {
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(10);
    const [gender, setGender] = useState('男');
    const [distance, setDistance] = useState(2);
    const [lastLogin, setLastLogin] = useState('');
    const [city, setCity] = useState('');
    const [education, setEducation] = useState('');
    const [list, setList] = useState([]);
    // ref
    const overLayRef = useRef(null);

    const getList = async () => {
        const res = await request.authGet(FRIEND_RECOMMEND, { page, pagesize, gender, distance, lastLogin, city, education});
        setList(res.data);
    }

    useEffect(() => {
        getList();
    }, [gender, distance, lastLogin, city, education])

    // 筛选条件合并
    const handleFilterComplete = (gender, distance, lastLogin, city, education) => {
        setPage(1);
        setGender(gender);
        setDistance(distance);
        setLastLogin(lastLogin);
        setCity(city);
        setEducation(education);
        overLayRef.current.close();
    }

    const renderForeground = () => {
        return (
            <View style={{ height: toDp(150), justifyContent: "center", alignItems: "center" }} >
                <FriendHeader />
            </View>
        )
    }
    const renderFriendItem = (item) => {
        return (
            <>
                {/* 图片 */}
                <View style={{ paddingLeft: toDp(15), paddingRight: toDp(15) }}>
                    <Image style={{ width: toDp(50), height: toDp(50), borderRadius: toDp(25) }} source={{ uri: BASE_URI + item.header }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', paddingLeft: toDp(10) }}>
                    <View style={{ flex: 4, justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#555' }}>{item.nick_name}</Text>
                            <Icon name={item.gender === '女' ? 'female' : 'male'} color='#f6c9f2' size={toDp(15)} />
                            <Text style={{ color: '#555' }}>{item.age}岁</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#555' }}>{item.marry}</Text>
                            <Text style={{ color: '#555' }}>|</Text>
                            <Text style={{ color: '#555' }}>{item.xueli}</Text>
                            <Text style={{ color: '#555' }}>|</Text>
                            <Text style={{ color: '#555' }}>{item.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name='heart' size={toDp(20)} color='#f75739' />
                            <Text style={{color: '#666', fontSize: toDp(13) }}>{item.fateValue}</Text>
                    </View>
                </View>
            </>
        )
    }

    // 点击筛选图标，打开筛选条件浮层
    const showFilter = () => {
        let params = {gender, distance, lastLogin, city, education}
        let overlayView = (
            <Overlay.View
                modal={true}
                overlayOpacity={0.5}
                ref={overLayRef}
            >
                {/* 筛选组件 */}
                <Filter handleFilterComplete={handleFilterComplete} params={params} onClose={() => overLayRef.current.close()}/>
            </Overlay.View>
        );
        Overlay.show(overlayView);
    }
    return (
        <ImageHeaderScrollView maxHeight={toDp(150)} minHeight={toDp(80)} headerImage={require('../../../assets/images/profileBackground.jpg')} renderForeground={renderForeground} >
            <View>
                {/* 访客 */}
                <Vistors />

                {/* 今日佳人 */}
                <View style={{ height: toDp(5), backgroundColor: '#ccc', marginTop: toDp(10), marginBottom: toDp(10) }}></View>
                <BestGirl />

                {/* 推荐朋友 */}
                <View>
                    <View style={{ paddingRight: toDp(10), paddingLeft: toDp(10), height: toDp(40), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eee' }}>
                        <Text style={{ color: '#666' }}>推荐</Text>
                        <TouchableOpacity onPress={showFilter}><Icon  name='filter' color='#666' /></TouchableOpacity>
                    </View>
                    {/* 列表 */}
                    <View>
                        {list.map((item, index) => (
                            <View key={index} style={{flexDirection: 'row', paddingTop: toDp(10), paddingBottom: toDp(10), borderBottomWidth: toDp(2), borderBottomColor: '#eee'}}>
                                {renderFriendItem(item)}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ImageHeaderScrollView>
    )
}