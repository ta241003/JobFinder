import { StyleSheet, TouchableOpacity, Image, Text, View, } from "react-native"
import COLORS from "../constants/colors";
import placeholder from "../assets/none_avatar.jpg";
import { Ionicons } from '@expo/vector-icons';

const Avatar = ({
    uri,
    style,
    imgStyle,
    onPress,
    onButtonPress,
    aviOnly = false,
    ...props
}) => {
    return(
        <View style={[styles.container, {marginBottom: aviOnly ? 0 : 15}, style]}{...props}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.avatarContainer}>
                    <Image 
                        source={uri ? {uri} : placeholder} 
                        style={[styles.image, 
                        aviOnly && {height: 35, width:35, borderWidth:0}, 
                        imgStyle]}
                    />

                    {!aviOnly && (
                        <TouchableOpacity 
                            style={styles.editButton} 
                            onPress={onButtonPress}>
                            <Ionicons name="camera" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Avatar;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        position: 'relative'
    },
    avatarContainer: {
        position: 'relative',
        backgroundColor: '#ccc',
        borderRadius: 100,
        width: 120,
        height: 120,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        borderRadius: 75,
        width: 120,
        height: 120,
        borderColor: "#ccc",
        borderWidth:5,
    },
    editButton:{
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '30%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    }
})