export default {
    /**
     * validate mobile phone number
     * @param {Number} phone 
     */
    validatePhone(phone) {
        const reg = /^1[3456789]\d{9}$/
        return reg.test(phone)
    }
}