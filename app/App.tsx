import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import apiClient from './src/util/masjidApi';

import MasjidListContext from './src/contexts/MasjidListContext';
import Home from './src/screens/home';
import MasjidScreen from './src/screens/masjid';
import EditMasjidScreen from './src/screens/editMasjid';
import EditIqamahScreen from './src/screens/editIqamah';



const Stack = createNativeStackNavigator();

export default () => {
  const [masjids, setMasjids] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    setErrorMessage('');

    let loadedMasjids: [] = [];

    apiClient.get('/masjids')
      .then(r => r.data)
      .then(data => {
        setMasjids(data)
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setErrorMessage("Error from server")
        console.error(err);
      });
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

  const value = { masjids, updateMasjid, loadData, isLoading, setLoading, errorMessage };

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

