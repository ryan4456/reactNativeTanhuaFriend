import {Dimensions, Platform} from 'react-native';

// 设计稿的宽度 / 元素的宽度 = 手机屏幕 / 手机中元素的宽度
// 手机中元素的宽度 = 手机屏幕 * 元素宽度 / 设计稿宽度

/**
 * screen width
 */
export const screenWidth = Dimensions.get('window').width;
/**
 * screen height
 */
export const screenHeight = Dimensions.get('window').height;
/**
 * convert px to dp
 * @param {Number} px 
 */
export const toDp =  (px) => screenWidth * px / 375;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        (((screenHeight === X_HEIGHT && screenWidth === X_WIDTH) ||
            (screenHeight === X_WIDTH && screenWidth === X_HEIGHT))
            || 
            // iPhone XR XsMAX
            ((screenHeight === XR_HEIGHT && screenWidth === XR_WIDTH) || 
        (screenHeight === XR_WIDTH && screenWidth === XR_HEIGHT))
            )
    )
}

export function dynamicStyle(iphoneXStyle, iosStyle, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle
    }
}