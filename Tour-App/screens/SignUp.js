import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

export default function SignUp({ navigation }) {
    const [isChecked, setChecked] = useState(false)
    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <StatusBar style="auto" />

            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={{ alignSelf: 'center', paddingTop: '15%', width: '15%' }} onPress={() => navigation.goBack()}>
                    <Image style={{ height: "50%", width: '50%', resizeMode: 'cover', alignSelf: 'center' }} source={require('../assets/back_icon.png')}></Image>
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', paddingTop: '15%', width: '70%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Đăng ký Tài khoản</Text>
                <View style={{ alignSelf: 'center', paddingTop: '15%', width: '15%' }} />
            </View>
            <TextInput style={styles.input} placeholder='Tên đăng nhập' />
            <TextInput style={styles.input} placeholder='Email' />
            <TextInput style={styles.input} placeholder='Số điện thoại' />
            <TextInput style={styles.input} placeholder='Mật khẩu' secureTextEntry={true} />
            <TextInput style={styles.input} placeholder='Nhập lại mật khẩu' secureTextEntry={true} />

            <View style={{ flex: 4, alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', marginTop: '7%' }}>
                    <Checkbox style={{ marginLeft: '2%', marginTop: '1%' }} value={isChecked} onValueChange={setChecked} />
                    <Text style={{ paddingLeft: '5%', width: '80%', paddingRight: '5%', fontSize: 16 }}>Bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi</Text>
                </View>
                <TouchableOpacity style={styles.tou_login}>
                    <Text style={styles.textLogin}>ĐĂNG KÝ</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                    <Text style={{ fontSize: 18 }}>Bạn đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontSize: 18, color: '#4D94FF' }}> Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    tou_login: {
        justifyContent: 'center',
        backgroundColor: '#39ACFF',
        borderRadius: 16,
        marginTop: '15%',
        width: '80%',
        height: '22%'
    },
    input: {
        flex: 1,
        paddingLeft: 8,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        height: '7%',
        marginTop: '5%',
        fontSize: 18,
        backgroundColor: '#fff'
    },
    textLogin: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});
