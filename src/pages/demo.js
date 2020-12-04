import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, Dimensions } from 'react-native';

import { TriggeringView, ImageHeaderScrollView } from 'react-native-image-header-scroll-view';

const MIN_HEIGHT = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 200,
    width: Dimensions.get('window').width,
  },
});

class BasicUsage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageHeaderScrollView
          maxHeight={200}
          minHeight={MIN_HEIGHT}
          headerImage={require('../assets/images/profileBackground.jpg')}
          renderForeground={() => (
            <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => console.log('tap!!')}>
                <Text style={{ backgroundColor: 'transparent' }}>Tap Me!</Text>
              </TouchableOpacity>
            </View>
          )}
        >
          <View style={{ height: 1000 }}>
            <TriggeringView onHide={() => console.log('text hidden')}>
              <Text>Scroll Me!</Text>
            </TriggeringView>
          </View>
        </ImageHeaderScrollView>
      </View>
    );
  }
}

export default BasicUsage;