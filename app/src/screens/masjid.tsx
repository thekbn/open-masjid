import React, { useEffect, useState, useCallback, useContext} from 'react';
import { Image, StyleSheet, FlatList, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import MasjidListContext from '../contexts/MasjidListContext';
import Iqamah from '../components/iqamah';
import { dateToClockTime } from '../util/date'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        margin: 5,
        padding: 10,
        fontSize: 18,
        height: 44,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    }
});

const initialIqamah = [
    {salah: 'Fajr', time: ''},
    {salah: 'Zuhr', time: ''},
    {salah: 'Asr', time: ''},
    {salah: 'Maghrib', time: ''},
    {salah: 'Isha', time: ''},
];

const MasjidScreen = ({ navigation, route }) => {
    const { masjidId } = route.params;

    const { masjids, loadData } = useContext(MasjidListContext);
    const [masjid, setMasjid] = useState(null);
    const [iqamah, setIqamah] = useState({});
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [salahPicked, setSalahPicked] = useState('');

    useFocusEffect(
        useCallback(() => {
            const masjid = masjids.find(m => m.id === masjidId);
            setMasjid(masjid);

            navigation.setOptions({ title: masjid.name });
            setIqamah(masjid?.iqamah?.length ? masjid?.iqamah : initialIqamah);
        }, [masjids])
    );

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Feather name="edit" size={24} color="black"  onPress={() => navigation.navigate({
                name: 'Edit Masjid',
                params: {
                    masjid
                }
            })} />
          ),
        });
      }, [navigation]);

    const updateIqamah = (salah, time) => {
        if (!time) return;
        const newIqamah = Object.assign({}, iqamah);
        newIqamah[salah] = time;

        setIqamah(newIqamah);
    };

    const handleTimeDatePicked = (event, date) => {
        setShowTimePicker(false);
        updateIqamah(salahPicked, date);
    };

    const displayTimerPicker = (prayer) => {
        setSalahPicked(prayer);
        setShowTimePicker(true);
    };

    return (
        <View>
            
            <Image
                style={{ height: Dimensions.get('window').width / 2, aspectRatio: 1 }}
                source={{ uri: masjid?.image ?? '' }}
            />
            {masjid?.address ?
                <Text>{masjid.address}</Text> :
                <Text>Address not available</Text>
            }

            {iqamah &&
                // <FlatList
                //     data={Object.entries(iqamah)}
                //     keyExtractor={(item, index) => item}
                //     renderItem={({ item }) => (
                //         <TouchableOpacity 
                //             style={styles.item}
                //             onPress={() => displayTimerPicker(item[1].salah)}
                //         >
                //             <Text style={styles.name}>{item[1].salah}</Text>
                //             <Text>
                //                 {dateToClockTime(item[1].time)}
                //             </Text>
                //         </TouchableOpacity>
                //     )}
                // />
                <Iqamah iqamah={iqamah} disabled />
            }
            {showTimePicker && (
                <RNDateTimePicker
                    mode="time"
                    value={new Date()}
                    onChange={handleTimeDatePicked}
                />
            )}
            <Button
                title={'Update Iqamah'}
                onPress={() => navigation.navigate({
                    name: 'Edit Iqamah',
                    params: {
                        masjid
                    }
                })}
            />
        </View>
    );
};

export default MasjidScreen;