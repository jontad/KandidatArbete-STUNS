import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Home from '../views/Home'
import Details from '../views/Details'



// const FirstRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
// );

// const SecondRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
// );

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#5DB075' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  home: Home,
  details: Details,
  third: ThirdRoute,
});

// const renderTabBar = () => (
//     <TabBar
//       indicatorStyle={{ backgroundColor: '#5DB075' }}
//       style={{ backgroundColor: 'pink' }}
//     />
// );

function NavBar() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Hem' },
    { key: 'details', title: 'Details' },
    { key: 'third', title: 'Third' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      //renderTabBar={renderTabBar}
      style={styles.container}
      color='#5DB075'
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});

export default NavBar;