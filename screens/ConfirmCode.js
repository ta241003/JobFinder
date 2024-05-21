import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../buttons/BackButton';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';





const ConfirmCode = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
          <BackButton></BackButton>
          <View style={styles.header}>
            <Text style={styles.title}>Confirm Code</Text>
          </View>    
            
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Enter the code we sent to your email below</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                keyboardType='numeric'  
                placeholder="Enter Code"
                placeholderTextColor={'#B7B7B7'}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ConfirmPassword")}>
                <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
      );
}


export default ConfirmCode

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginHorizontal: 20,
      },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 50,
        borderBottomColor: '#ccc',
        marginTop:-5
      },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
      },
      questionContainer: {
        marginBottom: 20,
      },
      questionText: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      answerText: {
        fontSize: 18,
      },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#B7B7B7',
        paddingTop: 5, 
        paddingBottom: 5,
    },
    input: {
        fontSize: 19,
    },  
    button: {
        backgroundColor: '#FF7754',
        marginTop: 100,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
      },
})