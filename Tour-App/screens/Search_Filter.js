import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { default as ListFilter } from '../components/ListFilter';
import { useState } from 'react';

export default function Search_Filter({ navigation, route }) {

    const [category, setCategory] = useState(route.params.cate)
    console.log(category)

    const HideKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );

    return (
        <HideKeyboard>
            <View style={styles.container} >
                <StatusBar style="auto" />
                <View style={styles.header}>
                    <View style={{}}>
                        <View style={{ flexDirection: 'row', marginLeft: '-12%' }}>
                            <TouchableOpacity style={{ height: '45%', width: '15%', alignSelf: 'flex-end' }} onPress={() => navigation.goBack()}>
                                <Image source={require('../assets/back_icon.png')} style={{ height: '100%', width: '100%', resizeMode: 'cover', }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 22, alignSelf: 'flex-end' }}>Ở đâu</Text>
                        </View>
                        <Text style={{ fontSize: 26, fontWeight: '600' }}>Bạn muốn đi đâu?</Text>
                    </View>
                    <Image source={require('../assets/duck.png')} style={{ height: 60, width: 62, borderRadius: 30 }} />
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.view_search}>
                        <TouchableOpacity style={{ marginLeft: '5%' }}>
                            <Image style={{ height: 30, width: 30 }} source={require('../assets/search_icon.png')} />
                        </TouchableOpacity>
                        <TextInput style={{ fontSize: 18, marginLeft: '3%' }} placeholder='Khám phá những điều thú vị' />
                    </View>
                </View>

                <View style={{ flex: 5, marginTop: '-2%' }}>
                    <Text style={{ fontSize: 22, fontWeight: '500', flex: 1, marginLeft: '7%', marginTop: '-3%' }}>Thể loại</Text>
                    <View style={{ flexDirection: 'row', flex: 1, marginLeft: '6%', marginTop: '-15%', marginRight:'2%' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity style={[styles.tou_cate, { backgroundColor: category == 0 ? '#5EC2FF' : '#fff' }]} onPress={() => setCategory(0)}>
                                <Image source={require('../assets/all.png')} style={{ height: 40, width: 40, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Tất cả</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity style={[styles.tou_cate, { backgroundColor: category == 1 ? '#5EC2FF' : '#fff' }]} onPress={() => setCategory(1)}>
                                <Image source={require('../assets/sinhthai.png')} style={{ height: 35, width: 30, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Sinh thái</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity style={[styles.tou_cate, { backgroundColor: category == 2 ? '#5EC2FF' : '#fff' }]} onPress={() => setCategory(2)}>
                                <Image source={require('../assets/nhaydu.png')} style={{ height: 30, width: 40, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Thể thao</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity style={[styles.tou_cate, { backgroundColor: category == 3 ? '#5EC2FF' : '#fff' }]} onPress={() => setCategory(3)}>
                                <Image source={require('../assets/thangcanh.png')} style={{ height: 40, width: 20, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Thắng cảnh</Text>
                        </View>
                    </View>
                    <View style={{ flex: 5 }}>
                        <ListFilter style={{}} />
                    </View>
                </View>
            </View>
        </HideKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    view_search: {
        height: '45%',
        width: '85%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: '-4%'
    },
    tou_cate: {
        height: '60%',
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center'
    }
});
