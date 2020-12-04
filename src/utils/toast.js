import { ActivityIndicator } from 'react-native';
import React from 'react';
import {Toast, Theme} from 'teaset';

let customKey = null;

Toast.showLoading = (text) => {
    if(customKey) return;
    customKey = Toast.show({
        text: text,
        icon: <ActivityIndicator size='large' />,
        position: 'center',
        duration: 100000,
    });
}

Toast.hideLoading = () => {
    if(!customKey) return;
    Toast.hide(customKey);
    customKey = null;
}

export default Toast;