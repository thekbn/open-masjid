import React, { useEffect, useState, useCallback} from 'react';
import { Image, StyleSheet, FlatList, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import { dateToTime } from '../util/date'

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
    {fajr: ''},
    {zuhr: ''},
    {asr: ''},
    {maghrib: ''},
    {isha: ''}
];

const MasjidScreen = ({ navigation, route }) => {
    const { masjid } = route.params;

    useFocusEffect(
        useCallback(() => {
            console.log('received iqamah'+ Date.now() +  JSON.stringify(iqamah))
            navigation.setOptions({ title: masjid.name });
            setIqamah(masjid?.iqamah?.length || initialIqamah);
        }, [masjid])
    );

    const [showTimePicker, setShowTimePicker] = useState(false);
    const [salahPicked, setSalahPicked] = useState('');
    const [iqamah, setIqamah] = useState({});

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
                <FlatList
                    data={Object.entries(iqamah)}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.item}
                            onPress={() => displayTimerPicker(item[1].salah)}
                        >
                            <Text style={styles.name}>{capitalize(item[1].salah)}</Text>
                            <Text>
                                {dateToTime(item[1])}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            }
            {showTimePicker && (
                <RNDateTimePicker
                    mode="time"
                    value={new Date()}
                    onChange={handleTimeDatePicked}
                />
            )}
            <Button
                title={masjid?.iqamah ? 'Edit Iqamah' : 'Add Iqamah'}
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

function capitalize(str: String) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default MasjidScreen;