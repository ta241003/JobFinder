import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
    const navigation = useNavigation();
    const handleBack = () => {
    navigation.goBack();
    };
    return (
    <TouchableOpacity onPress={handleBack} style={{top: 20, left: 20, zIndex: 1 }}>
        <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
    );
};

export default BackButton;
