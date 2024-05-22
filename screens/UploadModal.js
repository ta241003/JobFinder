import { StyleSheet, Text, View, Modal, Dimensions } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;

const UploadModal = ({
	modalVisible,
	onBackPress,
	onCameraPress,
	onGalleryPress,
	onRemovePress,
}) => {
	return (
		<Modal animationType="slide" visible={modalVisible} transparent={true}>
			<View style={styles.centeredView}>
				<View style={styles.modalBackground}></View>
				<View style={styles.modalView}>
					<View
						style={{
							alignItems: "flex-end",
							marginTop: 10,
							marginRight: 10,
						}}
					>
						<TouchableOpacity
							onPress={onBackPress}
							style={{ backgroundColor: "#f5f5f5", width: 25 }}
						>
							<MaterialCommunityIcons
								name="window-close"
								size={24}
								color="black"
							/>
						</TouchableOpacity>
					</View>
					<View
						style={{
							alignItems: "center",
							marginBottom: 10,
							fontWeight: 500,
						}}
					>
						<Text style={{ fontSize: 18 }}>Profile Photo</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-evenly",
							marginTop: 0,
						}}
					>
						<TouchableOpacity
							style={{
								alignItems: "center",
								backgroundColor: "#f5f5f5",
								padding: 7,
								borderRadius: 10,
							}}
							onPress={onCameraPress}
						>
							<MaterialCommunityIcons
								name="camera-outline"
								size={30}
								color={COLORS.maugach}
							></MaterialCommunityIcons>
							<Text>Camera</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={{
								alignItems: "center",
								backgroundColor: "#f5f5f5",
								padding: 7,
								borderRadius: 10,
							}}
							onPress={onGalleryPress}
						>
							<FontAwesome
								name="image"
								size={28}
								color={COLORS.maugach}
							/>
							<Text>Gallery</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={{
								alignItems: "center",
								backgroundColor: "#f5f5f5",
								padding: 7,
								borderRadius: 10,
							}}
							onPress={onRemovePress}
						>
							<AntDesign
								name="delete"
								size={30}
								color={COLORS.maugach}
							/>
							<Text>Remove</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default UploadModal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
	},
	modalBackground: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		margin: 20,
		width: "90%",
		height: windowHeight * 0.2,
	},
});
