import React, { useEffect, useState } from 'react';
import RootStore from './src/mobx/index';
import { Provider } from 'mobx-react'
import Nav from './src/nav/nav';
import Geo from './src/utils/geo';
import IM from './src/utils/jmessage';

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
  return (
    <Provider rootStore={RootStore}>
      {geoSuccess ? <Nav /> : null}
    </Provider >
  )
}

export default App;