import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScreensLiked, ScreensSubPlans } from '../subScreens'

const Tab = createMaterialTopTabNavigator();

export default function PlansTopTabbar() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: { backgroundColor: '#f5f5f5', width: '60%', elevation: 0 },
            tabBarLabelStyle: { fontSize: 13, fontWeight: '700' }
        }} >
            <Tab.Screen name="Đã thích" component={ScreensLiked} />
            <Tab.Screen name="Kế hoạch" component={ScreensSubPlans} />
        </Tab.Navigator>
    );
}