import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function EditProfile({ navigation }) {

    const HideKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );

    return (
        <HideKeyboard>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity style={{ height: height * 0.1, width: width * 0.1, marginLeft: width * 0.05, alignSelf: 'flex-end' }} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/back_icon.png')} style={{ height: height * 0.05, width: width * 0.05, top: -height * 0.01 }} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Image style={{ width: width * 0.3, height: width * 0.3, borderRadius: 30, marginLeft: '3%', alignSelf: 'center' }} source={require('../assets/duck.png')} />
                </View>
                <View style={{ flex: 4 }}>
                    <TextInput style={styles.txtInput} placeholder='Họ và tên' />
                    <TextInput style={styles.txtInput} placeholder='Email' />
                    <TextInput style={styles.txtInput} placeholder='Số điện thoại' />

                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.tou_edit}>
                            <Text style={styles.txt_edit}>Lưu</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }} />
                </View>
            </View>
        </HideKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center'
    },
    title: {
        width: '80%',
        alignSelf: 'center',
        textAlign: 'left',
        fontSize: 28,
        marginLeft: '5%',
        fontWeight: '600'
    },
    tou_edit: {
        flex: 0.3,
        backgroundColor: '#52BBFF',
        width: width * 0.85,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center'
    },
    txt_edit: {
        color: 'white',
        fontWeight: '600',
        fontSize: 22,
        alignSelf: 'center'
    },
    txtInput: {
        flex: 0.7,
        backgroundColor: 'white',
        fontSize: 21,
        fontWeight: '400',
        width: width * 0.85,
        alignSelf: 'center',
        borderRadius: 20,
        margin: height * 0.02,
        paddingLeft: 20
    }
});
