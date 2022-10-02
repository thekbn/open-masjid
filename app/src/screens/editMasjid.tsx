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

const initialMasjid = {
    name: '',
    address: ''
}

const EditMasjidScreen = ({ navigation, route }) => {

    const { masjid } = route.params || {};

    console.log(route.params)

    const { masjids, loadData } = useContext(MasjidListContext);
    const [masjidUpdates, setMasjidUpdates] = useState(masjid ?? initialMasjid);

    useEffect(() => {
        const title = masjid ? 'Edit Masjid' : 'New Masjid';
        navigation.setOptions({ title: title });
    })

    const updateMasjidName = (name) => {
        setMasjidUpdates({...masjidUpdates, name: name})
    }

    const updateMasjidAddress = (address) => {
        setMasjidUpdates({...masjidUpdates, address: address})
    }



    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={updateMasjidName}
                placeholder='Name'
                value={masjidUpdates.name}
            />
            <TextInput
                style={styles.input}
                onChangeText={updateMasjidAddress}
                placeholder='Address'
                value={masjidUpdates.address}
            />
            <Button
                title='Save'
                onPress={async () => {
                    await apiClient.post('/masjid',
                        JSON.stringify({ ...masjidUpdates }),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    ).then(response => {
                        loadData();
                        navigation.navigate('Home');
                    }).catch(error => {
                        alert("Error encountered while saving")
                    });
                    
                }}
            />
        </View>
    );
};

function capitalize(str: String) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default EditMasjidScreen;