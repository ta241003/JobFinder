import {
	View,
	Text,
	Image,
	Pressable,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { firebase } from "../configFirebase";

const Signup = ({ navigation }) => {
	const [isPasswordShown, setIsPasswordShown] = useState(true);
	const [isChecked, setIsChecked] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const validateInputs = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

		if (!fullName) {
			Alert.alert("Validation Error", "Full Name cannot be empty");
			return false;
		}
		if (!email || !emailRegex.test(email)) {
			Alert.alert("Validation Error", "Invalid email address");
			return false;
		}
		if (!password || !passwordRegex.test(password)) {
			Alert.alert(
				"Validation Error",
				"Password must be at least 8 characters long and include letters, numbers, and special characters"
			);
			return false;
		}
		if (password !== confirmPassword) {
			Alert.alert("Validation Error", "Passwords do not match");
			return false;
		}
		return true;
	};

	const handleSignUp = () => {
		console.log("Hello from handleSignUp");
		if (!validateInputs()) {
			registerUser(email, password, confirmPassword);
		}
	};

	const registerUser = async (email, password, confirmPassword) => {
		console.log("Hello from registerUser");
		try {
			const response = await fetch(
				"http://127.0.0.1:8000/api/auth/sign-up/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
						password2: confirmPassword,
					}),
				}
			);

			console.log(response);

			const responseData = await response.json();

			if (response.ok) {
				// Registration successful
				Alert.alert("Registration Successful", "You can now log in.", [
					{ text: "OK", onPress: () => navigation.navigate("Login") },
				]);
			} else {
				// Registration failed
				Alert.alert(
					"Registration Failed",
					responseData.detail ||
						"An error occurred. Please try again."
				);
			}
		} catch (error) {
			// Handle network errors or other exceptions
			Alert.alert(
				"Registration Error",
				error.message || "An error occurred. Please try again."
			);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22 }}
			>
				<View style={{ flex: 1 }}>
					<View style={{ marginVertical: 20 }}>
						<Text
							style={{
								fontSize: 33,
								fontWeight: "bold",
								marginBottom: 12,
								color: COLORS.black,
							}}
						>
							Register Account
						</Text>

						<Text
							style={{
								fontSize: 25,
								color: COLORS.black,
							}}
						>
							Fill your details or continue with social media!
						</Text>
					</View>

					<View style={{ marginBottom: 22 }}>
						<View
							style={{
								width: "100%",
								height: 58,
								backgroundColor: "#E6E4E6",
								borderRadius: 8,
								alignItems: "center",
								flexDirection: "row",
								justifyContent: "space-between",
								paddingLeft: 22,
							}}
						>
							<TextInput
								onChangeText={(fullName) =>
									setFullName(fullName)
								}
								placeholder="Full Name"
								placeholderTextColor={COLORS.textcolor}
								style={{
									width: "80%",
									fontSize: 20,
								}}
							/>
						</View>
					</View>

					<View style={{ marginBottom: 22 }}>
						<View
							style={{
								width: "100%",
								height: 58,
								backgroundColor: "#E6E4E6",
								borderRadius: 8,
								alignItems: "center",
								justifyContent: "center",
								paddingLeft: 22,
							}}
						>
							<TextInput
								onChangeText={(email) => setEmail(email)}
								placeholder="Email Address"
								placeholderTextColor={COLORS.textcolor}
								keyboardType="email-address"
								style={{
									width: "100%",
									fontSize: 20,
								}}
							/>
						</View>
					</View>

					<View style={{ marginBottom: 22 }}>
						<View
							style={{
								width: "100%",
								height: 58,
								backgroundColor: "#E6E4E6",
								borderRadius: 8,
								alignItems: "center",
								justifyContent: "center",
								paddingLeft: 22,
							}}
						>
							<TextInput
								onChangeText={(password) =>
									setPassword(password)
								}
								placeholder="Password"
								placeholderTextColor={COLORS.textcolor}
								secureTextEntry={isPasswordShown}
								style={{
									width: "100%",
									fontSize: 20,
								}}
							/>

							<TouchableOpacity
								onPress={() =>
									setIsPasswordShown(!isPasswordShown)
								}
								style={{
									position: "absolute",
									right: 12,
								}}
							>
								{isPasswordShown == false ? (
									<Ionicons
										name="eye-off"
										size={24}
										color={COLORS.grey}
									/>
								) : (
									<Ionicons
										name="eye"
										size={24}
										color={COLORS.grey}
									/>
								)}
							</TouchableOpacity>
						</View>
					</View>

					<View style={{ marginBottom: 22 }}>
						<View
							style={{
								width: "100%",
								height: 58,
								backgroundColor: "#E6E4E6",
								borderRadius: 8,
								alignItems: "center",
								justifyContent: "center",
								paddingLeft: 22,
							}}
						>
							<TextInput
								onChangeText={(confirmPassword) =>
									setConfirmPassword(confirmPassword)
								}
								placeholder="Confirm Password"
								placeholderTextColor={COLORS.textcolor}
								secureTextEntry={isPasswordShown}
								style={{
									width: "100%",
									fontSize: 20,
								}}
							/>

							<TouchableOpacity
								onPress={() =>
									setIsPasswordShown(!isPasswordShown)
								}
								style={{
									position: "absolute",
									right: 12,
								}}
							>
								{isPasswordShown == false ? (
									<Ionicons
										name="eye-off"
										size={24}
										color={COLORS.grey}
									/>
								) : (
									<Ionicons
										name="eye"
										size={24}
										color={COLORS.grey}
									/>
								)}
							</TouchableOpacity>
						</View>
					</View>

					<View
						style={{
							flexDirection: "row",
							marginLeft: 10,
							marginTop: 10,
						}}
					>
						<Text>• At least 8 characters</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							marginLeft: 10,
						}}
					>
						<Text>
							• Use a mix of letters, number and special
							characters (ex: @,#,...)
						</Text>
					</View>

					<Button
						onPress={handleSignUp}
						title="Sign Up"
						filled
						style={{
							backgroundColor: COLORS.maugach,
							borderColor: "transparent",
							marginTop: 18,
							marginBottom: 4,
						}}
					/>

					<View
						style={{
							flexDirection: "row",
						}}
					>
						<Text style={{ color: "#83829A" }}>
							You already have an account{" "}
						</Text>
						<Pressable onPress={() => navigation.navigate("Login")}>
							<Text style={{ color: "#FF7754" }}> Sign In</Text>
						</Pressable>
					</View>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginVertical: 20,
						}}
					>
						<View
							style={{
								flex: 1,
								height: 1,
								backgroundColor: COLORS.grey,
								marginHorizontal: 10,
							}}
						/>
						<Text style={{ fontSize: 14 }}>Or Sign up with</Text>
						<View
							style={{
								flex: 1,
								height: 1,
								backgroundColor: COLORS.grey,
								marginHorizontal: 10,
							}}
						/>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => console.log("Pressed")}
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "row",
								height: 52,
								borderWidth: 1,
								borderColor: COLORS.grey,
								marginRight: 4,
								borderRadius: 10,
							}}
						>
							<Image
								source={require("../assets/facebook.png")}
								style={{
									height: 36,
									width: 36,
									marginRight: 8,
								}}
								resizeMode="contain"
							/>

							<Text>Facebook</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => console.log("Pressed")}
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "row",
								height: 52,
								borderWidth: 1,
								borderColor: COLORS.grey,
								marginRight: 4,
								borderRadius: 10,
							}}
						>
							<Image
								source={require("../assets/google.png")}
								style={{
									height: 36,
									width: 36,
									marginRight: 8,
								}}
								resizeMode="contain"
							/>

							<Text>Google</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							marginTop: 12,
						}}
					>
						<Text style={{ fontSize: 16, color: COLORS.black }}>
							By continuing your confirm that you agree
						</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<Text style={{ fontSize: 16, color: COLORS.black }}>
							with our
						</Text>

						<Text
							style={{
								fontSize: 16,
								color: COLORS.primary,
								fontWeight: "bold",
								marginLeft: 6,
							}}
						>
							Term and Condition
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Signup;
