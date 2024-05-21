import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../buttons/BackButton";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";

import { firebase } from "../configFirebase";

// Forget Password
const forgetPassword = (email, setEmail, navigation) => {
	firebase
		.auth()
		.sendPasswordResetEmail(email)
		.then(() => {
			alert("Password reset email sent");
			setEmail(""); // Làm trống ô TextInput
			navigation.navigate("Login"); // Điều hướng đến trang đăng nhập
		})
		.catch((error) => {
			alert(error.message); // Cải tiến thông báo lỗi
		});
};

const ConfirmEmail = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");

	return (
		<SafeAreaView style={styles.safeArea}>
			<BackButton />
			<View style={styles.header}>
				<Text style={styles.title}>Confirm Email</Text>
			</View>

			<View style={styles.questionContainer}>
				<Text style={styles.questionText}>
					Enter your email to verify account
				</Text>
			</View>

			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={(text) => setEmail(text)}
					style={styles.input}
					placeholder="Enter Email"
					placeholderTextColor={"#B7B7B7"}
					value={email} // Đảm bảo rằng giá trị email luôn được cập nhật
				/>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					forgetPassword(email, setEmail, navigation); // Truyền biến email, setEmail và navigation vào hàm forgetPassword
				}}
			>
				<Text style={styles.text}>Continue</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default ConfirmEmail;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		marginHorizontal: 20,
	},
	header: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		marginBottom: 50,
		borderBottomColor: "#ccc",
		marginTop: -5,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
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
		fontWeight: "bold",
		marginBottom: 20,
	},
	answerText: {
		fontSize: 18,
	},
	inputContainer: {
		borderBottomWidth: 1,
		borderBottomColor: "#B7B7B7",
		paddingTop: 5,
		paddingBottom: 5,
	},
	input: {
		fontSize: 19,
	},
	button: {
		backgroundColor: "#FF7754",
		marginTop: 100,
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "bold",
	},
});
