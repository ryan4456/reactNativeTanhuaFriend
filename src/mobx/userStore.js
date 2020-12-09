import {action, makeAutoObservable, observable} from 'mobx';

class UserStore {
    user = {};
    
    setUser = (user) => {
        this.user = user;
    }

    clearUserInfo(){
        this.user = {};
    }

    constructor(){
        makeAutoObservable(this, {
            user: observable,
            setUser: action,
            clearUserInfo: action
        })
    }
}
export default new UserStore();