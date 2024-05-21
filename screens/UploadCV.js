import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import BackButton from "../buttons/BackButton";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../constants/colors";

const UploadCV = ({ navigation }) => {
	return (
		<SafeAreaView>
			<ScrollView>
				<View style={{ marginTop: 20 }}>
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
							style={{
								marginBottom: 3,
								fontWeight: 500,
								fontSize: 18,
							}}
						>
							Product Designer
						</Text>
						<Text style={{ marginBottom: 3 }}>
							Full time / Hai Chau, Da Nang
						</Text>
						<Text>Salary: $5k</Text>
					</View>
				</View>
				<View style={{ marginLeft: 30, marginTop: 40 }}>
					<Text
						style={{
							fontWeight: 500,
							marginBottom: 5,
							fontSize: 16,
						}}
					>
						Upload CV
					</Text>
					<Text>Add your CV/resume to apply for a job</Text>
				</View>
				<View style={styles.upload_container}>
					<Text style={{ color: COLORS.maugach }}>
						Upload your file here
					</Text>
					<Feather name="upload" size={24} color={COLORS.maugach} />
				</View>
				<View style={{ flexDirection: "row", marginLeft: 30 }}>
					<AntDesign name="delete" size={24} color="black" />
					<View
						style={{
							marginLeft: 5,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text>Remove CV</Text>
					</View>
				</View>
				<View style={{ margin: 30, marginBottom: 10 }}>
					<Text
						style={{
							fontWeight: 500,
							fontSize: 16,
							marginBottom: 10,
						}}
					>
						Information
					</Text>
					<View
						style={{
							borderWidth: 1,
							borderColor: "#d9d9d9",
							height: 120,
						}}
					>
						<TextInput
							multiline={true}
							placeholder="Explain why you are the right person for this job"
						></TextInput>
					</View>
				</View>
				<TouchableOpacity
					style={{
						backgroundColor: COLORS.maugach,
						marginLeft: 30,
						marginRight: 30,
						height: 50,
						borderRadius: 20,
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => navigation.navigate("UploadCVSuccess")}
				>
					<Text style={{ color: "#fff", fontSize: 18 }}>
						Apply for jobs
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default UploadCV;

const styles = StyleSheet.create({
	avatar: {
		width: 70,
		height: 70,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	upload_container: {
		backgroundColor: "#edecf1",
		height: 80,
		margin: 30,
		marginTop: 20,
		marginBottom: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderStyle: "dashed",
		borderColor: "#83829a",
		justifyContent: "center",
		alignItems: "center",
	},
});
