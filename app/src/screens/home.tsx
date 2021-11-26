import React, { useEffect, useState, createContext, useContext } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Button, SafeAreaView } from 'react-native';

import MasjidListContext from '../contexts/MasjidListContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

const Home = ({ navigation, route }) => {
    const { masjids, isLoading } = useContext(MasjidListContext);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <ActivityIndicator /> :
                <View>
                    <FlatList
                        data={masjids}
                        renderItem={({ item }) => (
                            <Text style={styles.item} onPress={() =>
                                navigation.navigate('Masjid Profile', { masjid: item })
                            }>{item.name}</Text>
                        )}
                    />
                    <Button 
                        title='Add Masjid' 
                        onPress={() => navigation.navigate({
                            name: 'Edit Masjid'
                        })}
                    />
                </View>
            }
        </SafeAreaView>
    );
}

export default Home;