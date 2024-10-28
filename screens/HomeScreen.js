import React, {useState} from 'react';
import { View, Image, SafeAreaView, TextInput, TouchableOpacity, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';



export default function HomeScreen(){
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([1,2,3]);

    const handleLocation = (loc) => {
        console.log('Luogo: ', loc);
    }

    return(
        <View style={{flex: 1, position: 'relative'}}>
            <StatusBar style='light' />
            <Image source={require('../assets/bg.jpg')} blurRadius={70} style={{position: 'absolute', height: '100%', width: '100%'}} />

            <SafeAreaView style={{display: 'flex', flex: 1}}>
                {/* sezione ricerca */}
                <View style={{height: '7%', marginLeft: 4, marginRight: 4, position: 'relative', zIndex: 50}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', borderRadius: 9999, backgroundColor: showSearch? 'rgba(255, 255,255, 0.2)': 'transparent'}}>
                        {
                            showSearch? (
                                <TextInput 
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
                                                    <Text style={{color: 'black', fontSize: 18, lineHeight: 18, marginLeft: 8}}>London, United Kingdom</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            ):null
                        }

                </View>
            </SafeAreaView>
        </View>
    )
}