import JMessage from "jmessage-react-plugin";
export default {
    init() {
        JMessage.init({
            appkey: 'c9854ae4c34da481106fa5fd',
            channel: 'developer-default',
            isOpenMessageRoaming: true,
            isProduction: false,
        });
        JMessage.addReceiveMessageListener(message => {
            console.log(message);
        })
    },

    // register
    register(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.register({ username, password }, resolve, reject);
        })
    },
    // login
    login(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.login({ username, password }, resolve, reject);
        })
    }
}