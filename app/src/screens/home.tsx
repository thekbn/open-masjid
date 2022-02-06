import React, { useEffect, useState, createContext, useContext } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, SafeAreaView, TouchableHighlight } from 'react-native';
import { Button, FAB } from 'react-native-elements';

import MasjidListContext from '../contexts/MasjidListContext';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

const Home = ({ navigation, route }) => {
    const { masjids, loadData, isLoading, errorMessage } = useContext(MasjidListContext);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>{errorMessage}</Text>
                </View>
                :
                errorMessage ?
                    <View style={styles.center}>
                        <Button title='Reload' onPress={loadData}/>
                        <Text>{errorMessage}</Text>
                    </View>
                    :
                    <View style={{ height: '100%' }}>
                        <FlatList
                            data={masjids}
                            renderItem={({ item }) => (
                                <Text style={styles.item} onPress={() =>
                                    navigation.navigate('Masjid Profile', { masjidId: item.id })
                                }>{item.name}</Text>
                            )}
                        />
                        <FAB
                            placement='right'
                            onPress={() => navigation.navigate({
                                name: 'Edit Masjid'
                            })}
                            icon={{ name: 'add', color: 'white' }}
                            color="green"
                        />
                    </View>
            }
        </SafeAreaView>
    );
}

export default Home;