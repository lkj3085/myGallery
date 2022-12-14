import { View, Modal, Pressable, Image, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        height: "100%",
        justifyContent: "center",
      }}
      onPress={onPress}
      disabled={disabled}>
      <SimpleLineIcons
        name={iconName}
        size={20}
        color={disabled ? "transparent" : "black"}
      />
    </TouchableOpacity>
  );
};

export default ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `rgba(115,115,115,0.5)`,
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ArrowButton
            iconName="arrow-left"
            onPress={onPressLeftArrow}
            disabled={!showPreviousArrow}
          />

          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{ width: 280, height: 280, resizeMode: "contain" }}
            />
          </Pressable>

          <ArrowButton
            iconName="arrow-right"
            onPress={onPressRightArrow}
            disabled={!showNextArrow}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
