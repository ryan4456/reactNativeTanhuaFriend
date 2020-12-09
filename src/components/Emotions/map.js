export const EMOTION_MAP = {
    '/{laughing}': require('./images/laughing.png'),
    '/{cry}': require('./images/crying.png')
};

export const EMOTION_ARRAY = Object.keys(EMOTION_MAP).map(key => ({key, value: EMOTION_MAP[key]}));

export const convertText = (text) => {
    const result = [];
    const rule = /(\/\{.+?\})/g;
    const emoArr = text.match(rule);
    if(emoArr === null){
        result.push({text: text});
        return result;
    }
    const textArr = text.replace(rule, '88').split('88');
    while(textArr.length){
        let text = textArr.shift();
        if(text !== ''){
            result.push({text})
        }
        if(emoArr.length){
            result.push({image: emoArr.shift()});
        }
    }
    return result;
}