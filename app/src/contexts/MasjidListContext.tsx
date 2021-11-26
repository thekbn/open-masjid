import { createContext } from 'react';

const initialState = [
    {
        "id": 1,
        "name": "Madina Masjid",
        "image": 'http://www.nycreligion.info/wp-content/uploads/2015/07/Madni-Masjid-834-Brady-Avenue.jpg',
        "iqamah": {
            "fajr": "1:23:23",
            "zuhr": "1:23:23",
            "asr": "1:23:23",
            "maghrib": "1:23:23",
            "isha": "1:23:23"
        }
    },
    {
        "id": 2,
        "name": "Macca Masjid",
        "iqamah": {
            "fajr": "1:23:23",
            "zuhr": "1:23:23",
            "asr": "1:23:23",
            "maghrib": "1:23:23",
            "isha": "1:23:23"
        }
    },
    {
        "id": 3,
        "name": "Masjid Quba",
        "iqamah": {
            "fajr": "1:23:23",
            "zuhr": "1:23:23",
            "asr": "1:23:23",
            "maghrib": "1:23:23",
            "isha": "1:23:23"
        }
    },
    {
        "id": 4,
        "name": "Al Aqsa",
        "iqamah": {
            "fajr": "1:23:23",
            "zuhr": "1:23:23",
            "asr": "1:23:23",
            "maghrib": "1:23:23",
            "isha": "1:23:23"
        }
    },
    {
        "id": 5,
        "name": "Masjid Manhattan",
        "iqamah": {
            "fajr": "1:23:23",
            "zuhr": "1:23:23",
            "asr": "1:23:23",
            "maghrib": "1:23:23",
            "isha": "1:23:23"
        }
    }
]

const MasjidListContext = createContext(initialState);

export default MasjidListContext;
export { initialState };