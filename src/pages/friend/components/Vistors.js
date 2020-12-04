import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import request from '../../../utils/request';
import { BASE_URI, FRIEND_VISTORS } from '../../../utils/pathMap';
import { toDp } from '../../../utils/style';

export default function Vistors() {
    const [list, setList] = useState([]);

    const getData = async () => {
        const res = await request.authGet(FRIEND_VISTORS);
        setList(res.data);    
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>最近有{list.length}人来访,快去看看...</Text>
            <View style={styles.images}>
                {list.map((item, index) => (
                    <Image key={index} style={styles.image} source={{uri: BASE_URI + item.header}} />
                ))}
                <Text style={{color: '#777', fontSize: toDp(15), paddingLeft: toDp(5)}}>&gt;</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        marginTop: toDp(20), 
        alignItems: 'center',
        paddingLeft: toDp(5),
        paddingRight: toDp(5)
    },
    text: {
        flex: 1,
        fontSize: toDp(15),
        color: '#777',
        
    },
    images: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: toDp(40),
        height: toDp(40),
        borderRadius: toDp(20),
        marginLeft: toDp(2)
    }
})