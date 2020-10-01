import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ToastAndroid, Modal, Pressable} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import { getApartments } from '../../actions';
import ApartmentCard from '../defaults/ApartmentCard';

const ApartmentListScreen  = ({navigation, getApartments, apartments, ui}) => {
    
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(getApartments, []);

    const isScrollToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - 20;
    };

    const onScrollToBottomHandler = () => {
        if (apartments.meta.currentPage + 1 <= apartments.meta.totalPages) {
            getApartments({page: apartments.meta.currentPage + 1});
        } else {
            ToastAndroid.show('Không còn phòng trọ nào!', ToastAndroid.SHORT)
        }
    };

    const renderItem = ({item}) => {
        return (
            <ApartmentCard navigation={navigation} item={item} />
        );
    };

    return (
        <View style={{flex: 1, position: 'relative', backgroundColor: '#fff'}}>
            <View style={styles.filter}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {}}
                >
                    <Text>This is a modal</Text>
                    {/* <CheckBox 
                        value={'Quận Thủ Đức'}
                    /> */}
                    <Pressable onPress={() => setModalVisible(false)} ><Text>Close modal</Text></Pressable>
                </Modal>
                <Pressable onPress={() => setModalVisible(true)}><Text>Show model</Text></Pressable>
            </View>
            <FlatList style={{padding: 10}}
            data={apartments.data}
            renderItem={renderItem}
            keyExtractor={el => `${el.id}`}
            refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={getApartments} />}
            onMomentumScrollEnd={e => (isScrollToBottom(e.nativeEvent) && onScrollToBottomHandler())}
            />
        </View>
    );
};

const mapStateToProps = state => {
    return {
        apartments: state.apartments,
        ui: state.ui
    };
};

export default connect(mapStateToProps, {getApartments})(ApartmentListScreen);

const styles = StyleSheet.create({
    
});

