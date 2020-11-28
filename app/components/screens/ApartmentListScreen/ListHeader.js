import React, { useEffect, useState } from 'react';
import { Platform, UIManager, View, Pressable, LayoutAnimation, StyleSheet, Text } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FrontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ListHeader = ({onRowPressHandlers}) => {

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'android')
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }, []);

    const changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.filter}>
            <Pressable style={styles.filterRow} 
                onPress={onRowPressHandlers[0]}>
                <EntypoIcon name='location-pin' size={16} color='#000' />
                    <Text style={{marginRight: 'auto', marginLeft: 10}}>Quận</Text>
                <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
            </Pressable>
            {expanded &&
            <Pressable style={styles.filterRow} 
                onPress={onRowPressHandlers[0]}>
                <FeatherIcon name='map' size={16} color='#000' />
                    <Text style={{marginRight: 'auto', marginLeft: 10}}>Địa điểm</Text>
                <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
            </Pressable>
            }
            {expanded &&
            <Pressable style={styles.filterRow} 
                onPress={onRowPressHandlers[0]}>
                <MaterialIcon name='attach-money' size={16} color='#000' />
                    <Text style={{marginRight: 'auto', marginLeft: 10}}>Mức giá</Text>
                <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
            </Pressable>
            }
            {expanded &&
            <Pressable style={styles.filterRow} 
                onPress={onRowPressHandlers[0]}>
                <FrontAwesomeIcon name='home' size={16} color='#000' />
                    <Text style={{marginRight: 'auto', marginLeft: 10}}>Diện tích</Text>
                <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
            </Pressable>
            }
            {expanded &&
            <Pressable style={styles.filterRow}
                onPress={onRowPressHandlers[0]}>
                <EntypoIcon name='tv' size={16} color='#000' />
                    <Text style={{marginRight: 'auto', marginLeft: 10}}>Tiện nghi</Text>
                <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
            </Pressable>
            }
            <View style={styles.expandView}>
                {
                    !expanded ? 
                    <Pressable onPress={changeLayout}>
                        <FrontAwesomeIcon name='angle-double-down' size={16} color='#000' />
                    </Pressable>
                    :
                    <Pressable onPress={changeLayout}>
                        <FrontAwesomeIcon name='angle-double-up' size={16} color='#000'/>
                    </Pressable>

                }
            </View>
            
        </View>
    );
};

export default ListHeader;

const styles = StyleSheet.create({
    filter: {
        paddingTop: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#e8e8e8'
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.25)',
        marginBottom: 5
    },
    expandView: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

