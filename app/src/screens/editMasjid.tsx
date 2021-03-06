import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, FlatList, Text, View, Dimensions, TextInput, Button } from 'react-native';
import apiClient from '../util/masjidApi';

import MasjidListContext from '../contexts/MasjidListContext';

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

const EditMasjidScreen = ({ navigation, route }) => {

    const { masjidId } = route.params || {};

    const { masjids, loadData } = useContext(MasjidListContext);
    const [masjid, setMasjid] = useState(null);

    useEffect(() => {
        const masjid = masjids.find(m => m.id === masjidId);
        setMasjid(masjid);

        const title = masjidId ? 'Edit Masjid' : 'New Masjid';
        navigation.setOptions({ title: title });
    })

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');


    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                placeholder='Name'
                value={name}
            />
            <TextInput
                style={styles.input}
                onChangeText={setAddress}
                placeholder='Address'
                value={address}
            />
            <Button
                title='Save'
                onPress={async () => {
                    await apiClient.post('/masjid',
                        JSON.stringify({ name, address }),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    loadData();
                    navigation.navigate('Home');
                }}
            />
        </View>
    );
};

function capitalize(str: String) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default EditMasjidScreen;