import React from 'react';
import { View, Image, SafeAreaView, TextInput, TouchableOpacity, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';


export default function HomeScreen(){
    return(
        <View style={{flex: 1, position: 'relative'}}>
            <StatusBar style='light' />
            <Image source={require('../assets/bg.jpg')} blurRadius={70} style={{position: 'absolute', height: '100%', width: '100%'}} />

            <SafeAreaView style={{display: 'flex', flex: 1}}>
                {/* sezione ricerca */}
                <View style={{height: '7%', marginLeft: 4, marginRight: 4, position: 'relative', zIndex: 50}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', borderRadius: 9999, backgroundColor: 'rgba(255, 255,255, 0.2)'}}>
                        <TextInput 
                            placeholder='Cerca una città'  
                            placeholderTextColor={'lightgray'} 
                            style={{paddingLeft: 24, height: 48, flex: 1,  fontSize: 16, lineHeight: 24, color: 'white'}}
                            />
                        <TouchableOpacity style={{backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 9999, padding: 12, margin: 4}}>
                            <MagnifyingGlassIcon size={25} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}