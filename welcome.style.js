import { StyleSheet } from "react-native";

export default StyleSheet.create({
	head: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	menu: {
		width: 24,
		height: 24,
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
	},
	container: {
		padding: 16,
	},
	userName: {
		fontSize: 24,
		fontWeight: "bold",
	},
	resetPassword: {
		fontSize: 16,
		color: "blue",
		marginTop: 8,
	},
	welcomeMessage: {
		fontSize: 18,
		marginTop: 8,
	},
});
