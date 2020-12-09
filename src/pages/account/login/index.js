import React, { useState } from 'react';
import { View, Text, Image, StatusBar, StyleSheet } from 'react-native';
import { toDp } from '../../../utils/style'
import { Input } from 'react-native-elements';
import Validator from '../../../utils/validator';
import request from '../../../utils/request';
import { ACCOUNT_LOGIN, ACCOUNT_VALIDATE_CODE } from '../../../utils/pathMap';
import THButton from '../../../components/THButton/index';
import Toast from '../../../utils/toast';
import {STORAGE_USER_KEY} from '../../../utils/constant';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { observer, inject } from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = observer(({ navigation, tokenStore }) => {
    const [phone, setPhone] = useState('17701304450');
    const [code, setCode] = useState('')
    const [codeText, setCodeText] = useState('重新获取')
    const [phoneValid, setPhoneValid] = useState(true);
    const [showLogin, setShowLogin] = useState(true);
    const [isCounting, setIsCounting] = useState(false);
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    // 输入手机号码，点击完成
    const handleSubmit = async () => {
        if (!Validator.validatePhone(phone)) {
            return setPhoneValid(false);
        }
        setPhoneValid(true);
        if (isCounting) {
            return;
        }
        const res = await request.post(ACCOUNT_LOGIN, { phone });
        // success
        if (res.code === '10000') {
            setIsCounting(true)
            countDown();
            return setShowLogin(false);
        }
    }

    // start code timer
    const countDown = () => {
        let seconds = 5;
        setCodeText(`重新获取(${seconds}s)`)
        let timerId = setInterval(() => {
            seconds--;
            setCodeText(`重新获取(${seconds}s)`)
            if (seconds === 0) {
                clearInterval(timerId);
                setIsCounting(false);
                setCodeText('重新获取');
            }
        }, 1000)
    }

    // 填写完成验证码
    const handleCodeComplete = async () => {
        if (!code || code.length !== 6) {
            Toast.message('验证码不正确', 2000, 'center');
            return;
        }
        const res = await request.post(ACCOUNT_VALIDATE_CODE, { phone, vcode: code })
        if (res.code != '10000') {
            console.log(res);
            return;
        }
        tokenStore.setUserInfo(phone, res.data.token, res.data.id);
        // 用户信息存储到本地存储
        AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify({
            mobile: phone,
            token: res.data.token,
            userId: res.data.id
        }));
        if (res.data.isNew) {
            // new user
            navigation.navigate("UserInfo");
            return;
        }
        // old user
        navigation.reset({routes: [{name: 'Tabbar'}]});
    }

    const renderLogin = () => {
        return (
            <>
                {/* login title*/}
                <View><Text style={{ fontSize: toDp(25), color: '#888', fontWeight: 'bold' }}>手机号登录注册</Text></View>
                {/* login input */}
                <View style={{ marginTop: toDp(30) }}>
                    <Input
                        maxLength={11}
                        keyboardType='phone-pad'
                        value={phone}
                        errorMessage={phoneValid ? '' : '手机号码格式不正确'}
                        inputStyle={{ color: '#333' }}
                        onChangeText={(text) => setPhone(text)}
                        placeholder='请输入手机号'
                        leftIcon={{ type: 'font-awesome', name: 'phone', color: '#ccc', size: toDp(20) }}
                        onSubmitEditing={handleSubmit}
                    />
                </View>
                {/* login button */}
                <View style={{ width: '85%', height: toDp(40), marginLeft: '7.5%' }}>
                    <THButton onPress={handleSubmit} styles={{ borderRadius: toDp(20) }} text='获取验证码' />
                </View>
            </>
        )
    }

    const renderCode = () => {
        return (
            <View>
                <View><Text style={{ fontSize: toDp(25), color: '#888', fontWeight: 'bold' }}>输入6位验证码</Text></View>
                <View style={{ marginTop: toDp(15) }}><Text style={{ color: '#888' }}>已发到:+86 {phone}</Text></View>
                <CodeField
                    {...props}
                    value={code}
                    onChangeText={setCode}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType='default'
                    autoFocus
                    onEndEditing={handleCodeComplete}
                    textContentType="oneTimeCode"
                    onSubmitEditing={handleCodeComplete}
                    renderCell={({ index, symbol, isFocused }) => (
                        <View
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            <Text style={[styles.cell, isFocused && styles.focusCell]}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
                        </View>
                    )}
                />
                <View style={{ width: '85%', height: toDp(40), marginLeft: '7.5%', marginTop: toDp(15) }}>
                    <THButton disabled={isCounting} onPress={handleSubmit} styles={{ borderRadius: toDp(20) }} text={codeText} />
                </View>
            </View>
        )
    }

    return (
        <View>
            <StatusBar backgroundColor='transparent' translucent={true} />
            {/* bg image */}
            <Image style={{ width: '100%', height: toDp(200) }} source={{uri: 'profileBackground'}} />

            {/* content */}
            <View style={{ padding: toDp(20) }}>
                {showLogin ? renderLogin() : renderCode()}
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: toDp(2),
        borderBottomColor: '#888',
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#7d53ea',
        color: '#7d53ea'
    },
});

export default inject(state => ({
    tokenStore: state.rootStore.tokenStore
}))(Login)