import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabbar } from '../tab';
import { ScreensTourDetail,ScreensSearch_Filter, ScreensGGMap, ScreensPlannedTour, ScreensTourActivity} from '../screens';

const Stack = createStackNavigator();

export default function Main() {
  return (
    < NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={MainTabbar} />
        <Stack.Screen name="TourDetail" component={ScreensTourDetail} />
        <Stack.Screen name="Search_Filter" component={ScreensSearch_Filter} />
        <Stack.Screen name="GGMap" component={ScreensGGMap} />
        <Stack.Screen name="PlannedTour" component={ScreensPlannedTour} />
        <Stack.Screen name="TourActivity" component={ScreensTourActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
