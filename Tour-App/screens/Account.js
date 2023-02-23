import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { logIN, logOut } from '../redux/actions/UserAction'
import { useDispatch, useSelector } from 'react-redux';

export default function Account({navigation}) {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    console.log(user)

    const handleLogOut = () => {
        const action = logOut();
        dispatch(action);
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Text style={styles.title}>Tài khoản</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 70, height: 70, borderRadius: 30, marginLeft: '10%', alignSelf: 'center' }} source={require('../assets/duck.png')} />
                    <Text style={{ marginLeft: '5%', alignSelf: 'center', fontSize: 22 }}>Võ Trung Hiếu</Text>
                </View>
            </View>
            <View style={{ flex: 4 }}>
                <Text style={{ flex: 1, marginLeft: '10%', fontSize: 22, fontWeight: '500' }}>Cài đặt</Text>
                <TouchableOpacity style={styles.tou} onPress={()=> navigation.navigate('ViewProfile')}>
                    <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={require('../assets/info.png')} />
                    <Text style={{ fontSize: 22, alignSelf: 'center', marginLeft: '4%' }}>Thông tin cá nhân</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tou}>
                    <Image style={{ height: 30, width: 35, alignSelf: 'center' }} source={require('../assets/payment.png')} />
                    <Text style={{ fontSize: 22, alignSelf: 'center', marginLeft: '3%' }}>Phương thức thanh toán</Text>
                </TouchableOpacity>

                <View style={{ flex: 4, marginLeft: '10%' }} />

                <TouchableOpacity style={styles.tou} onPress={handleLogOut}>
                    <Image style={{ height: 30, width: 30, }} source={require('../assets/logout_icon.png')} />
                    <Text style={{ fontSize: 22, color: 'red', marginLeft: '3%' }}>Đăng xuất</Text>
                </TouchableOpacity>

                <View style={{ flex: 1, marginLeft: '10%' }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    title: {
        width: '80%', 
        alignSelf: 'center', 
        textAlign: 'left', 
        fontSize: 28, 
        marginLeft: '15%', 
        fontWeight: '600'
    },
    tou:{
        flex: 1, 
        flexDirection: 'row', 
        borderBottomColor: '#f8f8f8', 
        borderBottomWidth: 3, 
        width: '78%', 
        marginLeft: '11%' 
    }
});
