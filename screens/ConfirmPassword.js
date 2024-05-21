import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../buttons/BackButton';
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';





const ConfirmPassword = () => {
    const navigation = useNavigation();
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
          <BackButton></BackButton>
          <View style={styles.header}>
            <Text style={styles.title}>Confirm Password</Text>
          </View>    
            
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Set up a new password</Text>
            </View>

            <View style={{ marginBottom: 22 }}>
                    

                    <View style={{
                        width: "100%",
                        height: 58,
                        backgroundColor: '#E6E4E6',                        
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='New Password'
                            placeholderTextColor={COLORS.textcolor}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                fontSize: 20,
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == false ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.grey} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.grey} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{  }}>
                    

                    <View style={{
                        width: "100%",
                        height: 58,
                        backgroundColor: '#E6E4E6',
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Confirm Password'
                            placeholderTextColor={COLORS.textcolor}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                fontSize: 20,
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == false ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.grey} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.grey} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    // marginVertical: 6,
                    marginLeft: 10,
                    marginTop: 20,                    
                }}>        
                    <Text style={{ fontSize: 18 }}>• At least 8 characters</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    // marginVertical: 6,
                    marginLeft: 10,
                                        
                }}>        
                    <Text style={{ fontSize: 18 }}>• Use a mix of letters, number and special characters (ex: @,#,...)</Text>
                </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ConfirmPassword")}>
                <Text style={styles.text}>Confirm</Text>
            </TouchableOpacity>
        </SafeAreaView>
      );
}


export default ConfirmPassword

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginHorizontal: 20,
      },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 40,
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
        alignItems: 'center',
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