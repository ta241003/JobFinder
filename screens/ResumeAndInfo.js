import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TextInput,
} from "react-native";
import BackButton from "../buttons/BackButton";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const ListExperience = ({ job, company, time, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.item_container}>
				<View style={styles.leftSquare}>
					<MaterialIcons
						name="work"
						size={24}
						color={COLORS.maugach}
					/>
				</View>
				<View style={{ flex: 1, flexDirection: "column" }}>
					<Text style={styles.text}>{job}</Text>
					<Text style={{ color: COLORS.hidetitle }}>{company}</Text>
					<Text style={{ color: COLORS.hidetitle }}>{time}</Text>
				</View>
				<Feather name="edit-3" size={20} color={COLORS.maugach} />
			</View>
		</TouchableOpacity>
	);
};

const ListSkill = ({ skill }) => {
	return (
		<View
			style={{
				borderWidth: 1,
				borderColor: COLORS.maugach,
				borderStyle: "solid",
				borderRadius: 20,
				height: 35,
				paddingLeft: 10,
				paddingRight: 10,
				margin: 5,
				marginLeft: 0,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ color: COLORS.maugach }}>{skill}</Text>
		</View>
	);
};

const ResumeAndInfo = () => {
	const [editing, setEditing] = useState(false);
	const [content, setContent] = useState(
		"Hi, I’m users, a web designer with 3 year experience..."
	); // Nội dung ban đầu

	const handleEditPress = () => {
		setEditing(true);
	};

	const handleSavePress = () => {
		setEditing(false);
	};

	const navigation = useNavigation();
	const AddExperience = () => {
		navigation.navigate("AddExperience");
	};

	const ChangeExperience = () => {
		navigation.navigate("ChangeExperience");
	};

	return (
		<SafeAreaView>
			<BackButton></BackButton>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: -5,
				}}
			>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					Resume and Info
				</Text>
			</View>
			<ScrollView>
				<View style={styles.resume_container}>
					<View style={{ paddingBottom: 10, fontSize: 18 }}>
						<Text>CV.pdf</Text>
					</View>
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<Feather
							name="edit-3"
							size={24}
							color={COLORS.maugach}
						/>
						<Text style={{ color: COLORS.maugach, paddingLeft: 5 }}>
							Edit resume
						</Text>
					</View>
				</View>
				<View style={styles.resume_container}>
					<View
						style={{ flexDirection: "row", justifyItems: "center" }}
					>
						<Text
							style={{ flex: 1, fontSize: 18, marginBottom: 10 }}
						>
							About me
						</Text>
					</View>
					{editing ? (
						<View>
							<TextInput
								style={{ fontSize: 15 }}
								multiline
								value={content}
								onChangeText={setContent}
							/>
							<TouchableOpacity onPress={handleSavePress}>
								<Text style={{ color: COLORS.maugach }}>
									Save
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity onPress={handleEditPress}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Text
									style={{
										flex: 1,
										fontSize: 15,
										marginBottom: 10,
										color: COLORS.hidetitle,
									}}
								>
									{content}
								</Text>
							</View>
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.resume_container}>
					<View
						style={{ flexDirection: "row", justifyItems: "center" }}
					>
						<Text
							style={{ flex: 1, fontSize: 18, marginBottom: 10 }}
						>
							Experience
						</Text>
						<MaterialIcons
							name="add"
							size={24}
							color={COLORS.maugach}
							onPress={AddExperience}
						/>
					</View>
					<View style={styles.listExperience}>
						<ListExperience
							job="UX/UI"
							company="Facebook"
							time="Jan 2018 - 3 year 8 month"
							onPress={ChangeExperience}
						/>
						<ListExperience
							job="UX/UI"
							company="Facebook"
							time="Jan 2018 - 3 year 8 month"
							onPress={ChangeExperience}
						/>
					</View>
				</View>
				<View style={styles.skill_container}>
					<View
						style={{ flexDirection: "row", justifyItems: "center" }}
					>
						<Text
							style={{ flex: 1, fontSize: 18, marginBottom: 10 }}
						>
							Skill
						</Text>
						<MaterialIcons
							name="add"
							size={24}
							color={COLORS.maugach}
						/>
					</View>
					<View style={styles.listSkill}>
						<ListSkill skill="Singing" />
						<ListSkill skill="Team work" />
						<ListSkill skill="Communication" />
						<ListSkill skill="Leader" />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ResumeAndInfo;

const styles = StyleSheet.create({
	resume_container: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		padding: 20,
	},
	listExperience: {
		marginTop: 10,
		justifyContent: "center",
	},
	item_container: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomColor: "#CCCCCC",
		paddingVertical: 10,
	},
	leftSquare: {
		width: 50,
		height: 60,
		backgroundColor: "#FFE7E1",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	text: {
		flex: 1,
		fontSize: 15,
		marginRight: 10,
	},
	skill_container: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		marginBottom: 60,
		padding: 20,
	},
	listSkill: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
});
