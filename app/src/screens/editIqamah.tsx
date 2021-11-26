import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, FlatList, Text, View, Dimensions, TextInput, Button, TouchableOpacity } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import MasjidListContext from '../contexts/MasjidListContext'
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

const initialIqamah = {
    fajr: '',
    zuhr: '',
    asr: '',
    maghrib: '',
    isha: ''
}

const EditIqamahScreen = ({ navigation, route }) => {
    const { updateMasjid } = useContext(MasjidListContext);
    const { masjid } = route.params;

    useEffect(() => {
        const title = masjid?.iqamah ? 'Edit Iqamah' : 'New Iqamah';
        navigation.setOptions({ title: title });
    })

    const [salahPicked, setSalahPicked] = useState('');
    const [iqamah, setIqamah] = useState(masjid?.iqamah || initialIqamah);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const updateIqamah = (salah, time) => {
        if (!time) return;
        const newIqamah = Object.assign({}, iqamah);
        newIqamah[salah] = time;

        setIqamah(newIqamah);
    };

    const handleTimeDatePicked = (event, date) => {
        updateIqamah(salahPicked, date);
        setShowTimePicker(false);
    };

    const displayTimerPicker = (prayer) => {
        setSalahPicked(prayer);
        setShowTimePicker(true);
    };


    return (
        <View>
            <FlatList
                data={Object.entries(iqamah)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => displayTimerPicker(item[0])}
                    >
                        <Text style={styles.name}>{capitalize(item[0])}</Text>
                        <Text>
                            {dateToTime(item[1])}
                        </Text>
                    </TouchableOpacity>
                )}
            />


            {showTimePicker && (
                <RNDateTimePicker
                    mode="time"
                    value={new Date()}
                    onChange={handleTimeDatePicked}
                />
            )}

            <Button
                title='Save'
                onPress={() => {
                    masjid.iqamah = iqamah;
                    console.log('updated iqamah' +  JSON.stringify(masjid))

                    updateMasjid(masjid);

                    navigation.navigate({
                        name: 'Masjid Profile',
                        params: {
                            masjid
                        }
                    });
                }}
            />
        </View>
    );
};

function capitalize(str: String) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default EditIqamahScreen;