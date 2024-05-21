import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../buttons/BackButton';

const FAQ = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton></BackButton>
      <View style={styles.header}>
        <Text style={styles.title}>FAQ</Text>
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>How to register an account?</Text>
            <Text style={styles.answerText}>
            If it's your first time using this app, you'll need to create an account. With just some simple information such as full name, email address and an optional password of your choice (with some security conditions), you can create your own account.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>How to apply the jobs?</Text>
            <Text style={styles.answerText}>
              Find a job according to your profile then click the apply this job button, then wait for a Notification from the company you are applying for, maybe HRD will contact you.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>What are the benefits?</Text>
            <Text style={styles.answerText}>
              You can search for jobs according to the skills you have, we always update 24 hours for the latest jobs. use the search feature or go to jobs there you can find the latest jobs and you can use filters according to your needs.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>What is a job?</Text>
            <Text style={styles.answerText}>
            Our app provides automatically updated jobs, and you can view additional job descriptions posted by employers. and if you feel suitable, you can apply.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>What is a bookmark?</Text>
            <Text style={styles.answerText}>
            If you like a certain job and want to save it to apply later, you can use the bookmark function. This function is used to save jobs that users "pay attention to" so they can apply later when appropriate.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FAQ;

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
    marginLeft: 5,
  },
  questionContainer: {
    marginBottom: 20,
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
