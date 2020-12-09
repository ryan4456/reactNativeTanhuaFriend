import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { BASE_URI, FRIEND_QUESTION_LIST, FRIEND_QUESTION_SUBMIT } from '@/utils/pathMap';
import request from '@/utils/request';
import THNav from '@/components/THNav';
import { toDp } from '@/utils/style';
import { inject } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

const Question = ({ route, userStore, navigation }) => {
    // 测试题参数
    const { params } = route;
    // 测试题列表
    const [list, setList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerList, setAnswerList] = useState([]);

    const getList = async () => {
        const res = await request.authGet(FRIEND_QUESTION_LIST(params.qid));
        setList(res.data);
    }

    const submitAnswers = async () => {
        const res = await request.authPost(FRIEND_QUESTION_SUBMIT(params.qid), { answers: answerList.join(',') });
        console.log(res);
        navigation.navigate('TestResult', res.data);
    }

    // 用户选择答案触发事件
    const handleSelectAnswer = (ansNo) => {
        if (currentIndex < list.length) {
            setAnswerList(answerList.concat(ansNo));
        }
        if(currentIndex < list.length - 1){
            setCurrentIndex(currentIndex + 1);
        }
    }

    // 判断问题全部答完，提交答案到服务器
    useEffect(() => {
        if(answerList.length !== 0 && answerList.length == list.length){
            submitAnswers();
        }
    }, [answerList])

    useEffect(() => {
        getList();
    }, []);

    if (list.length === 0) {
        return null;
    }

    return (
        <View>
            <THNav title={params.title} />
            <ImageBackground source={{uri: 'tanhua-bg'}} style={{ width: '100%', height: '100%', position: 'relative' }}>
                {/* 1.0 两侧图标 */}
                <View style={{ marginTop: toDp(60), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{
                        width: toDp(66), height: toDp(50),
                        backgroundColor: '#40a3fa', borderTopRightRadius: toDp(25),
                        borderBottomRightRadius: toDp(25), alignItems: 'flex-end',
                        justifyContent: 'center', paddingRight: toDp(10)
                    }}>
                        <Image source={{ uri: BASE_URI + userStore.user.header }}
                            style={{ width: toDp(40), height: toDp(40), borderRadius: toDp(20) }} />
                    </View>
                    <View style={{
                        width: toDp(66), height: toDp(50),
                        backgroundColor: '#40a3fa', borderTopLeftRadius: toDp(25),
                        borderBottomLeftRadius: toDp(25),
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontSize: toDp(15), fontWeight: 'bold' }}>{params.type}</Text>
                    </View>
                </View>

                {/* 2.0测试题 */}
                <View style={{ position: "absolute", width: '80%', top: toDp(60), alignSelf: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={{ color: '#fff', fontSize: toDp(26), fontWeight: 'bold' }}>第{currentIndex + 1}题</Text>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>({currentIndex + 1}/{list.length})</Text>
                    </View>
                    <Text style={{ marginTop: toDp(30), fontSize: toDp(18), color: '#fff' }}>{list[currentIndex].question_title}</Text>

                    {/* 答案 */}
                    <View style={{ width: '100%' }}>
                        {list[currentIndex].answers.map((item, index) => (
                            <TouchableOpacity onPress={() => handleSelectAnswer(item.ans_No)} key={item.ans_No} style={{ marginTop: toDp(10) }}>
                                <LinearGradient style={{
                                    height: toDp(40), borderRadius: toDp(6),
                                    alignItems: 'center', justifyContent: 'center'
                                }} colors={['#695cf5', '#ec75891a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                                    <Text style={{ color: '#fff', fontSize: toDp(14) }}>{item.ans_title}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default inject(state => ({
    userStore: state.rootStore.userStore
}))(Question);