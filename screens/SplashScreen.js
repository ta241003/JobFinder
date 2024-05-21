import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../configFirebase";

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const user = await AsyncStorage.getItem("user");
				if (user) {
					const parsedUser = JSON.parse(user);
					const userDoc = await firebase
						.firestore()
						.collection("users")
						.doc(parsedUser.uid)
						.get();

					if (userDoc.exists) {
						const userData = userDoc.data();
						navigation.navigate("HomePage", { userData });
					} else {
						navigation.navigate("Login");
					}
				} else {
					navigation.navigate("Login");
				}
			} catch (error) {
				console.error("Error checking login status: ", error);
				navigation.navigate("Login");
			}
		};

		checkLoginStatus();
	}, [navigation]);

	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	);
};

export default SplashScreen;
