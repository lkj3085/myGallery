import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";

export default ({
  modalVisible,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackdrop,
}) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Pressable style={{ flex: 1 }} onPress={onPressBackdrop}>
          <SafeAreaView
            style={{ width: "100%", position: "absolute", bottom: 0 }}>
            <TextInput
              style={{
                width: "100%",
                padding: 10,
                borderWidth: 0.5,
                borderColor: "lightgrey",
                backgroundColor: "white",
              }}
              placeholder="새로 만들 앨범명"
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              autoFocus={true}
            />
          </SafeAreaView>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};
