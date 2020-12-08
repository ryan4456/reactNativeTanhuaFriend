import {action, makeAutoObservable, observable} from 'mobx';

class UserStore {
    user = {};
    
    setUser = (user) => {
        this.user = user;
    }

    constructor(){
        makeAutoObservable(this, {
            user: observable,
            setUser: action
        })
    }
}
export default new UserStore();