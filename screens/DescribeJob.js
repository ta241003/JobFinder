import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import BackButton from "../buttons/BackButton";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import COLORS from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";

const DescribeJob = ({ navigation, route }) => {
	const [selectedTab, setSelectedTab] = useState("Company");

	const handleTabPress = (tab) => {
		setSelectedTab(tab);
	};

	const { company } = route.params;
	return (
		<SafeAreaView>
			<BackButton></BackButton>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: 30,
				}}
			>
				<Image
					style={styles.avatar}
					source={require("../assets/ig.png")}
				></Image>
			</View>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: 15,
				}}
			>
				<Text
					style={{ marginBottom: 3, fontWeight: 800, fontSize: 18 }}
				>
					{company.job}
				</Text>
				<Text style={{ marginBottom: 3 }}>{company.location}</Text>
				<Text>{company.name}</Text>
			</View>
			<View
				style={{ flexDirection: "row", marginTop: 20, marginLeft: 30 }}
			>
				<TouchableOpacity onPress={() => handleTabPress("Company")}>
					<View
						style={[
							styles.choose_button,
							selectedTab === "Company" && styles.selected,
						]}
					>
						<Text
							style={[
								selectedTab === "Company" &&
									styles.selected_text,
							]}
						>
							Company
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleTabPress("Description")}>
					<View
						style={[
							styles.choose_button,
							selectedTab === "Description" && styles.selected,
						]}
					>
						<Text
							style={[
								selectedTab === "Description" &&
									styles.selected_text,
							]}
						>
							Description
						</Text>
					</View>
				</TouchableOpacity>
			</View>

			{selectedTab === "Company" && (
				<View
					style={[
						styles.content,
						selectedTab === "Company" && styles.contentVisible,
					]}
				>
					<Text>{company.companyinfo}</Text>
				</View>
			)}

			{selectedTab === "Description" && (
				<View
					style={[
						styles.content,
						selectedTab === "Description" && styles.contentVisible,
					]}
				>
					<Text>{company.description}</Text>
				</View>
			)}

			<View
				style={{
					flexDirection: "row",
					marginLeft: 30,
					marginRight: 30,
				}}
			>
				<View style={styles.tym_area}>
					<AntDesign name="hearto" size={30} color={COLORS.maugach} />
				</View>
				<TouchableOpacity
					style={{
						backgroundColor: COLORS.maugach,
						marginLeft: 10,
						borderRadius: 10,
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => navigation.navigate("UploadCV", { company })}
				>
					<Text style={{ color: "#fff", fontSize: 18 }}>
						Apply for jobs
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default DescribeJob;

const styles = StyleSheet.create({
	avatar: {
		width: 70,
		height: 70,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	choose_button: {
		backgroundColor: "#ccc",
		marginRight: 10,
		padding: 8,
		justifyContent: "center",
		borderRadius: 10,
	},
	selected: {
		backgroundColor: COLORS.finding,
	},
	selected_text: {
		color: "#fff",
	},
	content: {
		backgroundColor: "#fff",
		height: 300,
		padding: 10,
		margin: 30,
		marginTop: 20,
		marginBottom: 25,
		display: "none",
	},
	contentVisible: {
		display: "flex",
	},
	tym_area: {
		borderWidth: 2,
		borderRadius: 10,
		borderColor: COLORS.maugach,
		color: COLORS.maugach,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
});
