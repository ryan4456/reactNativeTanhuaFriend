import {init, Geolocation} from 'react-native-amap-geolocation';
import {Platform} from 'react-native';
import axios from 'axios';

class Geo {
    async initGeo() {
        if(Platform.OS === 'ios'){
            await init({
                ios: 'a500e636950fdfe1bd5661a49c3f58d7',
                android: 'a500e636950fdfe1bd5661a49c3f58d7'
            })
        }
        
    }

    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            console.log('开始定位');
            Geolocation.getCurrentPosition(({coords}) => {
                resolve(coords)
            }, reject)
        })
    }

    async getCityByLocation() {
        const {longitude, latitude} = await this.getCurrentPosition();
        console.log('longitude', longitude);
        console.log('latitude', latitude);
        const res = await axios.get('https://apis.map.qq.com/ws/geocoder/v1/', {
            params: {location: `${latitude},${longitude}`, key: 'UVJBZ-KTV6J-G3SFT-KTACP-FVR5V-3WF7O'}
        })
        return Promise.resolve(res.data);
    }
}

export default new Geo();