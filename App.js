import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import TodoList from './src/TodoList';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <Image source={require('./assets/lloyd.jpg')} style={styles.drawerImage} />
      <Text style={styles.mahName}>lloyd Earnest A. Taburno</Text>
      <Text style={styles.sectionCode}>IT73-IT35B</Text>
      <Text style={styles.courseName}>Bachelor of Science in Information Technology</Text>
      <Text style={styles.courseDesc}>Application Development</Text>
      <Text style={styles.studId}>202111457</Text>
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="TodoList" drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="TodoList" component={TodoList} options={{ title: "LLoydz Todo List" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#F0F0F0', // Light background for minimalist look
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  mahName: {
    fontSize: 22, // Slightly smaller font size
    fontWeight: '500', // Medium font weight
    color: '#333333', // Dark gray for subtlety
    marginBottom: 8,
  },
  sectionCode: {
    fontSize: 14, // Slightly smaller font size
    color: '#555555', // Medium gray for subtlety
    marginBottom: 4,
  },
  courseName: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  courseDesc: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  studId: {
    fontSize: 14,
    color: '#555555',
  },
  drawerImage: {
    width: 100, // Smaller image size
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
});

export default App;
