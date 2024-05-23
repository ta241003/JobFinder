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
	const [selectedTab, setSelectedTab] = useState("Description");

	const handleTabPress = (tab) => {
		setSelectedTab(tab);
	};

	const { company } = route.params;

  	const lines_job_description = company.job_description.split('-');
  	const lines_requirements = company.requirements.split('-');
  	const lines_benefit = company.benefit.split('-');

	return (
		<SafeAreaView>
			<ScrollView>
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
						source={{uri : company.image_company}}
					></Image>
				</View>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						marginTop: 15,
						marginHorizontal: 30,
					}}
				>
					<Text
						style={{ marginBottom: 3, fontWeight: 800, fontSize: 18 }}
					>
						{company.job_name}
					</Text>
					<Text style={{ marginBottom: 5 }}>{company.company_name}</Text>
					<Text style={{ marginBottom: 5 }}>Job Type: {company.job_type}</Text>
					<Text style={{ marginBottom: 5 }}>Salary: {company.salary} milions</Text>
					<Text style={{ marginBottom: 5,  textAlign: 'center'}}>Address: {company.company_info}</Text>
					<Text >Deadline for submittion: {company.deadline}</Text>
			
				</View>
				<View
					style={{ flexDirection: "row", marginTop: 20, marginLeft: 30 }}
				>
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
					<TouchableOpacity onPress={() => handleTabPress("Requirements")}>
						<View
							style={[
								styles.choose_button,
								selectedTab === "Requirements" && styles.selected,
							]}
						>
							<Text
								style={[
									selectedTab === "Requirements" &&
										styles.selected_text,
								]}
							>
								Requirements
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleTabPress("Benefits")}>
						<View
							style={[
								styles.choose_button,
								selectedTab === "Benefits" && styles.selected,
							]}
						>
							<Text
								style={[
									selectedTab === "Benefits" &&
										styles.selected_text,
								]}
							>
								Benefits
							</Text>
						</View>
					</TouchableOpacity>
				</View>

				{selectedTab === "Description" && (
					<View
						style={[
							styles.content,
							selectedTab === "Description" && styles.contentVisible,
						]}
					>
						<ScrollView nestedScrollEnabled={true}>
							{lines_job_description.slice(1).map((line, index) => (
							<Text key={index+1}>
								{line.startsWith(' ') ? '\u2022 ' + line.trim() : line.trim()}
							</Text>
							))}
						</ScrollView>
					</View>
				)}

				{selectedTab === "Requirements" && (
					<View
						style={[
							styles.content,
							selectedTab === "Requirements" && styles.contentVisible,
						]}
					>
						<ScrollView nestedScrollEnabled={true}>
							{lines_requirements.slice(1).map((line, index) => (
							<Text key={index+1}>
								{line.startsWith(' ') ? '\u2022 ' + line.trim() : line.trim()}
							</Text>
							))}
						</ScrollView>
					</View>
				)}

				{selectedTab === "Benefits" && (
					<View
						style={[
							styles.content,
							selectedTab === "Benefits" && styles.contentVisible,
						]}
					>
						<ScrollView nestedScrollEnabled={true}>
							{lines_benefit.slice(1).map((line, index) => (
							<Text key={index+1}>
								{line.startsWith(' ') ? '\u2022 ' + line.trim() : line.trim()}
							</Text>
							))}
						</ScrollView>
					</View>
				)}

				<View
					style={{
						flexDirection: "row",
						marginHorizontal: 30,
						marginBottom: 20,
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
			</ScrollView>
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
		display:"none",
	},
	contentVisible: {
		display:'flex',
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
