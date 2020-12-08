import {action, makeAutoObservable, observable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_USER_KEY } from '../utils/constant';

class TokenStore {
    mobile = '';
    token = '';
    userId = '';

    constructor(){
        makeAutoObservable(this, {
            mobile: observable,
            token: observable,
            userId: observable,
            setUserInfo: action,
            clearUserInfo: action
        })
    }

    setUserInfo(mobile, token, userId){
        this.mobile = mobile;
        this.token = token;
        this.userId = userId;
    }

    clearUserInfo(){
        this.mobile = '';
        this.token = '';
        this.userId = '';
        AsyncStorage.removeItem(STORAGE_USER_KEY);
    }

    async init(){
        let userInfo = await AsyncStorage.getItem(STORAGE_USER_KEY);
        userInfo = userInfo ? JSON.parse(userInfo) : {};
        if(userInfo.token){
            this.mobile = userInfo.mobile;
            this.token = userInfo.token;
            this.userId = userInfo.userId;
        }
    }
}
const tokenStore = new TokenStore();
tokenStore.init();
export default tokenStore;