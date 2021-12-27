import React, { useEffect, useState, createContext } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MasjidListContext from './src/contexts/MasjidListContext';
import Home from './src/screens/home';
import MasjidScreen from './src/screens/masjid';
import EditMasjidScreen from './src/screens/editMasjid';
import EditIqamahScreen from './src/screens/editIqamah';

const Stack = createNativeStackNavigator();

export default () => {
  const [masjids, setMasjids] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    
    const response = await fetch(`${process.env.API_URL}/masjids`)
      .then(r => r.json())
      .catch(err => console.error(err));
    let loadedMasjids: [] = [];

    response.forEach((i: any) => {
      const existingMasjid = loadedMasjids.find(m => m.id === i._id);
      if (existingMasjid) {
        existingMasjid.iqamah.push({ salah: i.salah, time: i.time })
      } else {
        const iqamah = i.salah ?
          [{
            salah: i.salah, time: i.time
          }]
          : [];

        loadedMasjids.push({
          id: i._id,
          name: i.name,
          iqamah: iqamah
        })
      }
    });

    setMasjids(loadedMasjids)
    setLoading(false);
  };

  const updateMasjid = (newMasjid: any) => {
    if (newMasjid?.id) {
      const newList = masjids.map(masjid => {
        if (masjid.id === newMasjid.id) {
          return newMasjid;
        }

        return masjid;
      });

      setMasjids(newList);
    } else {
      newMasjid.id = Date.now();
      setMasjids([...masjids, newMasjid]);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const value = { masjids, updateMasjid, loadData, isLoading, setLoading };

  return (
    <MasjidListContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Near by Masjid' }}
          />

          <Stack.Screen
            name="Masjid Profile"
            component={MasjidScreen} />

          <Stack.Screen
            name="Edit Masjid"
            component={EditMasjidScreen} />

          <Stack.Screen
            name="Edit Iqamah"
            component={EditIqamahScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MasjidListContext.Provider>
  );
};

