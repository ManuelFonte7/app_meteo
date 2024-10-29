import React, {useCallback, useEffect, useState} from 'react';
import { View, Image, SafeAreaView, TextInput, TouchableOpacity, Text, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon, CalendarDaysIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants/constants';
import * as Progress from 'react-native-progress';
import { getData, storeData } from '../utils/asyncStorage';


export default function HomeScreen(){
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);
    
    const handleLocation = (loc) => {
        setLocations([]);
        toggleSearch(false);
        setLoading(true);
        fetchWeatherForecast({
            cityName: loc.name,
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
            storeData('city', loc.name);
        })
    };

    const handleSearch = value => {
        if(value.length>2){
            fetchLocations({cityName: value}).then(data =>{
                setLocations(data);
            })
        }
    };

    useEffect(() => {
        fetchMyWeatherData();
    }, []);

    const fetchMyWeatherData = async () => {
        let myCity = await getData('city');
        let cityName = 'Rome';
        if(myCity) cityName = myCity;
        fetchWeatherForecast({
            cityName,
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
        })
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

    const {current, location} = weather;

    return(
        <View style={{flex: 1, position: 'relative'}}>
            <StatusBar style='light' />
            <Image source={require('../assets/bg.jpg')} blurRadius={70} style={{position: 'absolute', height: '100%', width: '100%'}} />
            {
                loading? (
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
                    </View>
                ):(
                    <SafeAreaView style={{display: 'flex', flex: 1}}>
                {/* sezione ricerca */}
                <View style={{height: '7%', marginLeft: 4, marginRight: 4, position: 'relative', zIndex: 50}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', borderRadius: 9999, backgroundColor: showSearch? 'rgba(255, 255,255, 0.2)': 'transparent'}}>
                        {
                            showSearch? (
                                <TextInput
                                    onChangeText={handleTextDebounce}
                                    placeholder='Cerca una città' 
                                    placeholderTextColor={'lightgray'} 
                                    style={{paddingLeft: 24, height: 48, flex: 1,  fontSize: 16, lineHeight: 24, color: 'white', paddingBottom: 4}}/>
                            ):null
                        }
                        
                        <TouchableOpacity 
                            style={{backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 9999, padding: 12, margin: 4}}
                            onPress={() => toggleSearch(!showSearch)}>
                            <MagnifyingGlassIcon size={25} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                        {
                            locations.length>0 && showSearch ? (
                                <View style={{position: 'absolute', width: '100%', backgroundColor: 'rgb(156, 163, 175)', top: 64, borderRadius: 24}}>
                                    {
                                        locations.map((loc, index)=>{
                                
                                            return(
                                                <TouchableOpacity key={index} 
                                                    style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0, padding: 12, paddingLeft: 16, paddingRight: 16, marginBottom: 4}}
                                                    onPress={() => handleLocation(loc)}>

                                                    <MapPinIcon size={20} color={'gray'}/>
                                                    <Text style={{color: 'black', fontSize: 18, lineHeight: 18, marginLeft: 8}}>{loc?.name}, {loc?.country}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            ):null
                        }

                </View>
                {/* Sezione previsioni */}
                <View style={{marginLeft: 16, marginRight: 16, display: 'flex', justifyContent: 'space-around', flex: 1, marginBottom: 8}}>

                        {/* Luoghi */}
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 24, lineHeight: 32, fontWeight: 'bold'}}>
                            {location?.name}, 
                            <Text style={{fontWeight: 'semibold', fontSize: 18, lineHeight: 28, color: 'gray'}}>{" " + location?.country}</Text>
                        </Text>

                         {/* Immagine meteo */}
                         <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Image source={weatherImages[current?.condition?.text]} style={{width: 208, height: 208}}/>
                         </View>

                         {/* Gradi */}
                         <View style={{marginTop: 8}}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 60, marginLeft: 20}}>{current?.temp_c}&#176;</Text>
                            <Text style={{textAlign: 'center', color: 'white', lineHeight: 28, fontSize: 20, marginLeft: 20, letterSpacing: 0.1}}>{current?.condition?.text}</Text>
                         </View>

                         {/* Altri dati */}
                         <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16}}>
                            <View style={{flexDirection: 'row', marginLeft: 2, alignItems: 'center'}}>
                                <Image source={require('../assets/wind.png')} style={{height: 28, width: 28}}/>
                                <Text style={{color: 'white', fontWeight: 'semibold', fontSize: 16, lineHeight: 24, marginLeft: 6}}>{current?.wind_kph}km</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginLeft: 2, alignItems: 'center'}}>
                                <Image source={require('../assets/humidity.png')} style={{height: 28, width: 28}}/>
                                <Text style={{color: 'white', fontWeight: 'semibold', fontSize: 16, lineHeight: 24, marginLeft: 6}}>{current?.humidity}%</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginLeft: 2, alignItems: 'center'}}>
                                <Image source={require('../assets/alba.png')} style={{height: 28, width: 28}}/>
                                <Text style={{color: 'white', fontWeight: 'semibold', fontSize: 16, lineHeight: 24, marginLeft: 6}}>{weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
                            </View> 
                         </View>
                </View>
                {/* previsione per i prossimi giorni */}
                <View style={{marginBottom: 8, marginTop: 12}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20, marginLeft: 8}}>
                        <CalendarDaysIcon size={22} color={'white'}/>
                        <Text style={{color: 'white', fontSize: 16, lineHeight: 24, marginLeft: 6}}>Previsione giornaliera</Text>
                    </View>
                    <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 15}} showsHorizontalScrollIndicator={false}>
                        {
                            weather?.forecast?.forecastday?.map((item, index) => {
                                let date = new Date(item.date);
                                let options = {weekday: 'long'};
                                let dayName = date.toLocaleDateString('it-IT', options);
                                return(
                                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 96, borderRadius: 24, paddingBottom: 12, paddingTop: 12, marginTop: 4, marginRight: 16, backgroundColor: 'rgba(255, 255,255, 0.15)'}} key={index}>
                                    <Image source={weatherImages[item?.day?.condition?.text] } style={{height: 44, width: 44}} />
                                    <Text style={{color: 'white', marginTop: 8}}>{dayName}</Text>
                                    <Text style={{color: 'white', fontSize: 20, lineHeight: 20, fontWeight: 'semibold', marginTop: 6}}>{item?.day?.avgtemp_c}&#176;</Text>
                                </View>
                                )
                            })
                        }
                        
                        
                    </ScrollView>
                </View>
            </SafeAreaView>
                )
            }
            
        </View>
    )
}