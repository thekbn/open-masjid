import React, { useEffect, useState, useCallback, useContext } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { dateToClockTime } from '../util/date'

const styles = StyleSheet.create({
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
    { salah: 'Fajr', time: '' },
    { salah: 'Zuhr', time: '' },
    { salah: 'Asr', time: '' },
    { salah: 'Maghrib', time: '' },
    { salah: 'Isha', time: '' },
];

const Iqamah = (props) => {

    console.log("props:\n" + JSON.stringify(props))

    const [disabled, setDisabled] = useState(props.disabled);
    const [salahPicked, setSalahPicked] = useState('');
    const [iqamah, setIqamah] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const updateIqamah = (salah, time) => {
        if (!time) return;
        console.log("updating iqamah after time picked: \n" + JSON.stringify(time))
        const newIqamah = [...iqamah];
        newIqamah.find(i => i.salah === salah).time = time;

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

    useEffect(() => {
        setIqamah(props.iqamah);
    }, [props.iqamah]);

    return (
        <View>
            <FlatList
                data={Object.entries(iqamah)}
                keyExtractor={(item, index) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        disabled={disabled}
                        style={styles.item}
                        onPress={() => displayTimerPicker(item[1].salah)}
                    >
                        <Text style={styles.name}>
                            {item[1].salah}
                        </Text>
                        <Text>
                            {dateToClockTime(item[1].time)}
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
        </View>
    );
}

export default Iqamah;