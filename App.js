import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "./constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import MainApp from "./screens/MainApp";
import Signup from "./screens/Signup";
import ConfirmEmail from "./screens/ConfirmEmail";
import ConfirmCode from "./screens/ConfirmCode";
import ConfirmPassword from "./screens/ConfirmPassword";
import FAQ from "./screens/FAQ";
import MyApplied from "./screens/MyApplied";
import { firebase } from "./configFirebase";
import HomePage from "./screens/HomePage";

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();
	const [isFirstLaunch, setIsFirstLaunch] = useState(null);

	const checkFirstLaunch = async () => {
		try {
			const value = await AsyncStorage.getItem("isFirstLaunch");
			if (value === null) {
				// No value set, meaning this is the first launch
				await AsyncStorage.setItem("isFirstLaunch", "false");
				setIsFirstLaunch(true);
			} else {
				setIsFirstLaunch(false);
			}
		} catch (error) {
			console.error("Error checking first launch", error);
		}
	};

	useEffect(() => {
		checkFirstLaunch();
		const subscriber = firebase
			.auth()
			.onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	if (initializing || isFirstLaunch === null) return null;

	return (
		<Stack.Navigator
			initialRouteName={
				!user ? (isFirstLaunch ? "Welcome" : "Login") : "MainApp"
			}
			screenOptions={{ headerShown: false }}
		>
			{!user ? (
				<>
					<Stack.Screen name="Welcome" component={Welcome} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Signup" component={Signup} />
					<Stack.Screen
						name="ConfirmEmail"
						component={ConfirmEmail}
					/>
					<Stack.Screen name="ConfirmCode" component={ConfirmCode} />
					<Stack.Screen
						name="ConfirmPassword"
						component={ConfirmPassword}
					/>
					<Stack.Screen name="FAQ" component={FAQ} />
				</>
			) : (
				<Stack.Screen name="MainApp" component={MainApp} />
			)}
		</Stack.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Screen
					name="WelcomeStack"
					component={WelcomeStack}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
