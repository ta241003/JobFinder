import { ScrollView } from "react-native";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
} from "react-native";
import BackButton from "../buttons/BackButton";
import COLORS from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UploadCVSuccess = ({ navigation, route }) => {
	const { company, cvFile } = route.params;
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
							{company.job}
						</Text>
						<Text style={{ marginBottom: 3 }}>
							{company.description}
						</Text>
						<Text>{company.name}</Text>
					</View>
				</View>
				<View style={styles.upload_container}>
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<MaterialCommunityIcons
							name="file-pdf-box"
							size={70}
							color="#b22222"
						/>
						<Text>{cvFile.name}</Text>
					</View>
				</View>
				<View
					style={{ justifyContent: "center", alignItems: "center" }}
				>
					<Image
						style={{ height: 200, width: 200 }}
						source={require("../assets/success_cv.png")}
					></Image>
				</View>

				<View
					style={{ justifyContent: "center", alignItems: "center" }}
				>
					<Text
						style={{
							fontWeight: 800,
							fontSize: 20,
							marginBottom: 5,
						}}
					>
						Successful
					</Text>
					<Text style={{ fontSize: 18, marginBottom: 30 }}>
						Congratulations, your CV has been sent
					</Text>
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
					onPress={() => navigation.navigate("HomeDetails")}
				>
					<Text style={{ color: "#fff", fontSize: 18 }}>
						Back Home
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default UploadCVSuccess;

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
