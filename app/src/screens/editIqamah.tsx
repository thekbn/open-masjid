import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, FlatList, Text, View, Dimensions, TextInput, Button, TouchableOpacity } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import apiClient from '../util/masjidApi';

import Iqamah from '../components/iqamah';
import MasjidListContext from '../contexts/MasjidListContext'
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

const initialIqamah = [
    { salah: 'Fajr', time: '' },
    { salah: 'Zuhr', time: '' },
    { salah: 'Asr', time: '' },
    { salah: 'Maghrib', time: '' },
    { salah: 'Isha', time: '' },
];

const EditIqamahScreen = ({ navigation, route }) => {
    const { loadData } = useContext(MasjidListContext);
    const { masjid } = route.params;

    useEffect(() => {
        const title = masjid?.iqamah ? 'Edit Iqamah' : 'New Iqamah';
        navigation.setOptions({ title: title });
    })

    const [iqamah, setIqamah] = useState(masjid?.iqamah?.length ? masjid?.iqamah : initialIqamah);
    const [saving, setSaving] = useState(false);

    return (
        <View>
            <Iqamah iqamah={iqamah} />

            <Button
                title='Save'
                disabled={saving}
                onPress={async () => {
                    setSaving(true);

                    await apiClient.post(`/masjid/${masjid.id}/iqamah`,
                        JSON.stringify(sanitizeIqamah(iqamah)),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    ).then(response =>{
                        loadData();

                        navigation.navigate({
                            name: 'Masjid Profile',
                            params: {
                                masjidId: masjid.id
                            }
                        });
                    })
                    .catch(err => console.error(err));

                }}
            />
        </View>
    );
};

/**
 * Updated iqamah time from JS date to military time format
 * @param iqamahList 
 * @returns 
 */
function sanitizeIqamah(iqamahList) {
    return iqamahList.map(i => {
        const cleanIaqmah = {...i};
        cleanIaqmah.time = cleanIaqmah.time ? dateToClockTime(cleanIaqmah.time, true) : null;

        return cleanIaqmah;
    });
}

export default EditIqamahScreen;