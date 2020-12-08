import React, { useEffect, useState } from 'react';
import rootStore from './src/mobx/rootStore';
import { Provider } from 'mobx-react'
import Nav from './src/nav/nav';
import Geo from './src/utils/geo';
import IM from './src/utils/jmessage';
import { View, Text } from 'react-native';

const App = () => {
  const [geoSuccess, setGeoSuccess] = useState(false);
  
  useEffect(() => {
    async function init() {
      // 极光IM初始化
      IM.init();
      // 地理位置
      await Geo.initGeo();
      setGeoSuccess(true);
    }
    init();
  }, []);
  
  if(false){
    return (
      <View>
        <Text>bingo</Text>
      </View>
    )
  }
  
  return (
    <Provider rootStore={rootStore}>
      {geoSuccess ? <Nav /> : null}
    </Provider >
  )
}

export default App;