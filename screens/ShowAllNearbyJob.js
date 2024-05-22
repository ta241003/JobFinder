import { SafeAreaView } from "react-native-safe-area-context";
import {StyleSheet, View, TouchableOpacity, Image, Text, ScrollView} from "react-native";
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
		description: "Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có...",
	},
	{
		id: 2,
		name: "Facebook",
		logo: require("../assets/facebook.png"),
		job: "Load Product Manager",
		location: "Hai Chau, Da Nang",
		description: "Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có...",
	},
	{
		id: 3,
		name: "Google",
		logo: require("../assets/google.png"),
		job: "Tech Leader",
		location: "Hai Chau, Da Nang",
		description: "Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có...",
	},
    {
		id: 4,
		name: "Google",
		logo: require("../assets/google.png"),
		job: "Tech Leader",
		location: "Hai Chau, Da Nang",
		description: "Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có...",
	},
	// Add more company here...
];

const Nearby_Job = ({ company, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.nearby_job_container}>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Image source={company.logo} style={styles.logo} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.company}>{company.name}</Text>
				<Text style={styles.jobname}>{company.job}</Text>
				<Text style={styles.location}>{company.location}</Text>
                <Text style={styles.describe}>{company.description}</Text>
			</View>

		</TouchableOpacity>
	);
};

const ShowAllNearbyJob = ({navigation}) => {
    return(
        <SafeAreaView>
            <ScrollView>
                <BackButton></BackButton>
                <View style={{marginHorizontal:20, marginVertical:30}}>
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
}

export default ShowAllNearbyJob;