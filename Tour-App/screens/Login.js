import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground } from 'react-native';
import { logIN, logOut } from '../redux/actions/UserAction'
import { useDispatch, useSelector } from 'react-redux';

export default function Login({ navigation }) {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    console.log(user)

    const handleLogIn = () => {
        const newUser = {
            username: 'Hieu',
            password: '123456'
        }
        const action = logIN(newUser);
        dispatch(action);
    }

    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <StatusBar style="auto" />

            <View style={{ flex: 1 }}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <TextInput style={styles.input} placeholder='Tên đăng nhập' />
                <TextInput style={styles.input} placeholder='Mật khẩu' secureTextEntry={true} />
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ height: '10%', width: '30%', alignSelf: 'flex-end', marginRight: '10%', marginTop: '2%' }}>
                    <Text style={{ marginTop: '3%', color: '#918AB1' }}>Quên mật khẩu</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity style={styles.tou_login} onPress={handleLogIn}>
                    <Text style={styles.textLogin}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 14, marginTop: '15%' }}>____________ Hoặc tiếp tục với ____________</Text>

                <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                    <TouchableOpacity>
                        <Image style={{ height: 100, width: 100, resizeMode: 'cover' }} source={require('../assets/gg.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={{ height: 100, width: 100, resizeMode: 'cover' }} source={require('../assets/fb.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                    <Text style={{ fontSize: 18 }}>Chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{ fontSize: 18, color: '#4D94FF' }}> Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logo: {
        alignSelf: 'center',
        marginTop: '35%',
        height: '35%',
        width: '40%',
        resizeMode: 'cover'
    },
    tou_login: {
        justifyContent: 'center',
        backgroundColor: '#1EABFF',
        borderRadius: 16,
        marginTop: '25%',
        width: '80%',
        height: '15%'
    },
    input: {
        paddingLeft: 8,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        height: '13%',
        marginTop: '5%',
        fontSize: 18,
        backgroundColor: '#fff'
    },
    textLogin: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    },
    textSignup: {
        color: '#1EABFF',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});
