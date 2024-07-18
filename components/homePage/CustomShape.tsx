import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomShape = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.triangleCorner, styles.topRight]} />
      <View style={styles.content} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'blue'
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 100,
    borderRightWidth: 0,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f5f5f5',
    position: 'absolute',
  },
  topRight: {
    top: 0,
    right: 0,
    transform: [{ rotate: '180deg' }],
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default CustomShape;
