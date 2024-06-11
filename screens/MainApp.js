import React, { useState, useEffect } from "react";
import { Keyboard, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import SearchPage from "./SearchPage";
import SavedJob from "./SavedJob";
import HomePage from "./HomePage";
import Profile from "./Profile";
import EmptyNotify from "./EmptyNotify";
import PersonalData from "./PersonalData";
import ResumeAndInfo from "./ResumeAndInfo";
import Settings from "./Settings";
import AddExperience from "./AddExperience";
import ChangeExperience from "./ChangeExperience";
import FAQ from "./FAQ";
import Policy from "./PrivacyPolicy";
import DescribeJob from "./DescribeJob";
import UploadCV from "./UploadCV";
import UploadCVSuccess from "./UploadCVSuccess";
import MyApplied from "./MyApplied";
import Welcome from "./Welcome";
import Login from "./Login";
import Signup from "./Signup";
import ConfirmCode from "./ConfirmCode";
import ConfirmEmail from "./ConfirmEmail";
import ConfirmPassword from "./ConfirmPassword";
import ShowAllPopularJob from "./ShowAllPopularJob";
import ShowAllNearbyJob from "./ShowAllNearbyJob";
import SearchResultFromHomePage from "./SearchResultFromHomePage";
import ShowRecommendJobs from "./ShowRecommendJobs";

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = () => (
	<Stack.Navigator
		initialRouteName="Profile"
		screenOptions={() => ({ headerShown: false })}
	>
		<Stack.Screen name="ProfileDetails" component={Profile} />
		<Stack.Screen name="PersonalData" component={PersonalData} />
		<Stack.Screen name="ResumeAndInfo" component={ResumeAndInfo} />
		<Stack.Screen name="Settings" component={Settings} />
		<Stack.Screen name="Welcome" component={Welcome} />
		<Stack.Screen name="Login" component={Login} />
		<Stack.Screen name="Signup" component={Signup} />
		<Stack.Screen name="MainApp" component={MainApp} />
		<Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
		<Stack.Screen name="ConfirmCode" component={ConfirmCode} />
		<Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
		<Stack.Screen name="AddExperience" component={AddExperience} />
		<Stack.Screen name="ChangeExperience" component={ChangeExperience} />
		<Stack.Screen name="MyApplied" component={MyApplied} />
		<Stack.Screen name="FAQ" component={FAQ} />
		<Stack.Screen name="Policy" component={Policy} />
	</Stack.Navigator>
);

const HomeStack = () => (
	<Stack.Navigator
		initialRouteName="Home"
		screenOptions={() => ({ headerShown: false })}
	>
		<Stack.Screen name="HomeDetails" component={HomePage} />
		<Stack.Screen
			name="SearchResultFromHomePage"
			component={SearchResultFromHomePage}
		/>
		<Stack.Screen name="DescribeJob" component={DescribeJob} />
		<Stack.Screen name="UploadCV" component={UploadCV} />
		<Stack.Screen name="UploadCVSuccess" component={UploadCVSuccess} />
		<Stack.Screen name="ShowAllPopularJob" component={ShowAllPopularJob} />
		<Stack.Screen name="ShowAllNearbyJob" component={ShowAllNearbyJob} />
		<Stack.Screen name="ShowRecommendJobs" component={ShowRecommendJobs} />
	</Stack.Navigator>
);

const SavedJobStack = () => (
	<Stack.Navigator
		initialRouteName="Favorite"
		screenOptions={() => ({ headerShown: false })}
	>
		<Stack.Screen name="SavedJobDetails" component={SavedJob} />
		<Stack.Screen name="DescribeJob" component={DescribeJob} />
		<Stack.Screen name="UploadCV" component={UploadCV} />
		<Stack.Screen name="UploadCVSuccess" component={UploadCVSuccess} />
		<Stack.Screen name="HomeDetails" component={HomePage} />
	</Stack.Navigator>
);

const SearchPageStack = () => (
	<Stack.Navigator
		initialRouteName="Favorite"
		screenOptions={() => ({ headerShown: false })}
	>
		<Stack.Screen name="SearchPageDetails" component={SearchPage} />
		<Stack.Screen name="DescribeJob" component={DescribeJob} />
		<Stack.Screen name="UploadCV" component={UploadCV} />
		<Stack.Screen name="UploadCVSuccess" component={UploadCVSuccess} />
		<Stack.Screen name="HomeDetails" component={HomePage} />
	</Stack.Navigator>
);

const MainApp = () => {
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
			() => {
				setKeyboardVisible(true);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
			() => {
				setKeyboardVisible(false);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<NavigationContainer independent={true}>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={({ route }) => ({
					tabBarActiveTintColor: COLORS.maugach,
					tabBarInactiveTintColor: "gray",
					tabBarStyle: {
						display: isKeyboardVisible ? "none" : "flex",
					},
					headerShown: false,
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Home") {
							iconName = "home";
						} else if (route.name === "Favorite") {
							iconName = "heart";
						} else if (route.name === "Profile") {
							iconName = "user";
						} else if (route.name === "Search") {
							iconName = "search";
						} else if (route.name === "Notify") {
							iconName = "bell";
						}

						return (
							<FontAwesome
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
				})}
			>
				<Tab.Screen
					name="Search"
					component={SearchPageStack}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							// Prevent default action
							e.preventDefault();

							// Reset the stack to the initial route
							navigation.navigate("Search");
						},
					})}
				/>
				<Tab.Screen
					name="Favorite"
					component={SavedJobStack}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							// Prevent default action
							e.preventDefault();

							// Reset the stack to the initial route
							navigation.navigate("Favorite");
						},
					})}
				/>
				<Tab.Screen
					name="Home"
					component={HomeStack}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							// Prevent default action
							e.preventDefault();

							// Reset the stack to the initial route
							navigation.reset({
								index: 0,
								routes: [{ name: "Home" }],
							});
						},
					})}
				/>
				<Tab.Screen name="Notify" component={EmptyNotify} />
				<Tab.Screen
					name="Profile"
					component={ProfileStack}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							// Prevent default action
							e.preventDefault();

							// Reset the stack to the initial route
							navigation.reset({
								index: 0,
								routes: [{ name: "Profile" }],
							});
						},
					})}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default MainApp;
