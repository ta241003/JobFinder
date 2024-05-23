import { SafeAreaView } from "react-native-safe-area-context";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	Text,
	ScrollView,
} from "react-native";
import BackButton from "../buttons/BackButton";
import { AntDesign } from "@expo/vector-icons";
import styles from "./welcome.style";

const nearbyjob = [
	{
		id: 1,
		name: "Google",
		logo: require("../assets/google.png"),
		job: "React-native Developer",
		location: "Hai Chau, Da Nang",
		companyinfo: "abcde",
		description:
			"Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có cơ hội làm việc trong một môi trường sáng tạo, năng động và đóng góp trực tiếp vào việc phát triển sản phẩm của chúng tôi.",
	},
	{
		id: 2,
		name: "Facebook",
		logo: require("../assets/facebook.png"),
		job: "Load Product Manager",
		location: "Hai Chau, Da Nang",
		companyinfo: "abcde",
		description:
			"Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có cơ hội làm việc trong một môi trường sáng tạo, năng động và đóng góp trực tiếp vào việc phát triển sản phẩm của chúng tôi.",
	},
	{
		id: 3,
		name: "Google",
		logo: require("../assets/google.png"),
		job: "Tech Leader",
		location: "Hai Chau, Da Nang",
		companyinfo: "abcde",
		description:
			"Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có cơ hội làm việc trong một môi trường sáng tạo, năng động và đóng góp trực tiếp vào việc phát triển sản phẩm của chúng tôi.",
	},
	{
		id: 4,
		name: "Google",
		logo: require("../assets/google.png"),
		job: "Tech Leader",
		location: "Hai Chau, Da Nang",
		companyinfo: "abcde",
		description:
			"Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có cơ hội làm việc trong một môi trường sáng tạo, năng động và đóng góp trực tiếp vào việc phát triển sản phẩm của chúng tôi.",
	},
	// Add more company here...
];

const Nearby_Job = ({ company, onPress }) => {
	const truncateDescription = (text, maxLength) => {
		if (text.length <= maxLength) {
			return text;
		}
		// Cắt chuỗi đến maxLength ký tự
		let truncatedText = text.substr(0, maxLength);
		// Đảm bảo cắt chuỗi tại khoảng trắng gần nhất để tránh cắt giữa từ
		truncatedText = truncatedText.substr(
			0,
			Math.min(truncatedText.length, truncatedText.lastIndexOf(" "))
		);
		// Thêm dấu ... nếu cần
		if (truncatedText.length < text.length) {
			truncatedText += "...";
		}
		return truncatedText;
	};

	return (
		<TouchableOpacity onPress={onPress} style={styles.nearby_job_container}>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Image source={company.logo} style={styles.logo} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.company}>{company.name}</Text>
				<Text style={styles.jobname}>{company.job}</Text>
				<Text style={styles.location}>{company.location}</Text>
				<Text style={styles.describe}>
					{truncateDescription(company.description, 110)}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const ShowAllNearbyJob = ({ navigation }) => {
	return (
		<SafeAreaView>
			<ScrollView>
				<BackButton></BackButton>
				<View style={{ marginHorizontal: 20, marginVertical: 30 }}>
					{nearbyjob.map((company) => (
						<Nearby_Job
							key={company.id}
							company={company}
							onPress={() =>
								navigation.navigate("DescribeJob", { company })
							}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ShowAllNearbyJob;
