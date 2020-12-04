import { inject, observer } from 'mobx-react';
import React from 'react';
import { View, Text } from 'react-native';

const Btn = observer((props) => {
    // const {rootStore} = React.useContext(MobXProviderContext)
    const {rootStore} = props
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text onPress={() => rootStore.changeText('唐僧')}>Btn, {rootStore.name}</Text>
        </View>
    )
});

export default inject(state => ({
    rootStore: state.rootStore
}))(Btn)