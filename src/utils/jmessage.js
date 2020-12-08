import JMessage from "jmessage-react-plugin";
export default {
    init() {
        JMessage.setDebugMode({enable: true});
        JMessage.init({
            appkey: 'c9854ae4c34da481106fa5fd',
            channel: 'developer-default',
            isOpenMessageRoaming: true,
            isProduction: false,
        });
    },

    // register
    register(username, password) {
        console.log('register', username, password);
        return new Promise((resolve, reject) => {
            JMessage.register({ username, password }, resolve, reject);
        })
    },
    // login
    login(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.login({ username, password }, resolve, reject);
        })
    },
    /**
     * 极光-发送文本消息
     * @param {string} username 收件人
     * @param {string} text 文本内容
     * @param {object} extras 额外附带的参数
     */
    sendTextMessage(username, text, extras={}){
        return new Promise((res, rej) => {
            JMessage.sendTextMessage({
                type: 'single',
                username,
                text,
                extras
            }, res, rej);
        })
    }
}