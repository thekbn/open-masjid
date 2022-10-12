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

const Iqamah = (props) => {
    const [disabled, setDisabled] = useState(props.disabled);
    const [salahPicked, setSalahPicked] = useState('');
    const [timePicked, setTimePicked] = useState(new Date());
    const [iqamah, setIqamah] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const updateIqamah = (salah, time) => {
        if (!time) return;
        
        const newIqamah = [...iqamah];
        newIqamah.find(i => i.salah === salah).time = time;

        setIqamah(newIqamah);
    };

    const handleTimeDatePicked = (event, date) => {
        if(event.type === "set"){
            updateIqamah(salahPicked, date);
        }
        setShowTimePicker(false);
    };


    const displayTimerPicker = (prayer) => {
        console.log(prayer);

        setSalahPicked(prayer.salah);
        setTimePicked(prayer.time instanceof Date ? prayer.time : new Date());

        console.log(timePicked instanceof Date);

        setShowTimePicker(true);
    };

    useEffect(() => {
        setIqamah(props.iqamah);
    }, [props.iqamah]);

    return (
        <View>
            <FlatList
                data={iqamah}
                keyExtractor={({index}) => index}
                renderItem={({item}) => (
                    <TouchableOpacity
                        disabled={disabled}
                        style={styles.item}
                        onPress={() => displayTimerPicker(item)}
                    >
                        <Text style={styles.name}>
                            {item.salah}
                        </Text>
                        <Text>
                            {dateToClockTime(item.time)}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            {showTimePicker && (
                <RNDateTimePicker
                    mode="time"
                    value={timePicked}
                    onChange={handleTimeDatePicked}
                />
            )}
        </View>
    );
}

export default Iqamah;