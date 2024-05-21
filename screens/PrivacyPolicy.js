import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../buttons/BackButton';

const Policy = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton></BackButton>
      <View style={styles.header}>
        <Text style={styles.title}>Privacy & Policy</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Information Collection</Text>
          <Text style={styles.answerText}>
          Describes the types of personal information your app may collect from users, including information such as names, email addresses, IP addresses, and more. Clearly state the purpose of collecting the information and how the information will be used.
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Information security</Text>
          <Text style={styles.answerText}>
          Describe the security measures you have adopted to protect users' personal information. Includes cybersecurity measures, data access policies, data encryption, and more.
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Information sharing</Text>
          <Text style={styles.answerText}>
          Describes whether a user's personal information will be shared with third parties, and if so, how and for what purpose it will be shared.
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Cookies and similar technologies</Text>
          <Text style={styles.answerText}>
          If your application uses cookies or similar technologies to collect information, you need to provide information about your use and management of cookies.
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>User privacy</Text>
          <Text style={styles.answerText}>
          Provides information about user privacy rights, including their rights to access, amend, and delete personal information, and how they can contact you to request to exercise those rights This.
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Policy changes</Text>
          <Text style={styles.answerText}>
          Describe how you will communicate and implement changes to your privacy policy.
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Contact</Text>
          <Text style={styles.answerText}>
          Provide users with contact information if they have any questions or concerns about your privacy policy.
          </Text>
        </View>        

      </ScrollView>
    </SafeAreaView>
  );
}

export default Policy;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomColor: '#ccc',
    marginTop:-5
  },
  title: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  questionContainer: {
    marginBottom: 20,
    marginLeft: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answerText: {
    fontSize: 16,
  },
});
