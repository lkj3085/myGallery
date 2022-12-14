import { Alert, Platform, SafeAreaView, StyleSheet } from "react-native";
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from "./src/TextInputModal";
import { useGallery } from "./src/use-gallery";
import BigImgModal from "./src/BigImgModal";
import { useRewordAd } from "./src/use-reword-ad";
import { useEffect } from "react";
import ImageList from "./src/ImageList";

export default function App() {
  const {
    images,
    pickImage,
    deleteImage,
    imagesWithAddButton,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const { loadRewordAd, isRewarded, isClosed, resetAdValue } = useRewordAd();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);

  const onPressWatchAd = () => {
    loadRewordAd();
  };

  const onPressAddAlbum = () => {
    if (albums.length >= 2) {
      Alert.alert("광고 시청해야 앨범 추가", "", [
        {
          style: "cancel",
          text: "닫기",
        },
        {
          text: "광고 보기",
          onPress: onPressWatchAd,
        },
      ]);
    } else {
      openTextInputModal();
    }
    openTextInputModal();
  };

  const onSubmitEditing = () => {
    // 1. 앨범 타이틀
    // 2. TextInput 의 value 초기화 & 모달 닫기
    addAlbum();
    closeTextInputModal();
    resetAlbumTitle();

    if (!albumTitle) return;
  };

  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
  };

  const onPressHeader = () => {
    openDropDown();
    if (isDropdownOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
  };

  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropDown();
  };

  const onLongPressAlbum = (albumId) => deleteAlbum(albumId);

  const onPressImage = (image) => {
    selectImage(image);
    openBigImgModal();
  };

  const onPressBigImgModalBackdrop = () => {
    closeBigImgModal();
  };

  const onPressLeftArrow = () => {
    moveToPreviousImage();
  };

  const onPressRightArrow = () => {
    moveToNextImage();
  };

  useEffect(() => {
    if (isRewarded && isClosed) {
      openTextInputModal();
      resetAdValue();
    }
  }, [isRewarded, isClosed]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 드롭다운, 앨범 추가 버튼 */}
      <MyDropDownPicker
        isDropdownOpen={isDropdownOpen}
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />

      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal
        modalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
      />

      {/* 이미지 리스트 */}
      <ImageList
        imagesWithAddButton={imagesWithAddButton}
        onPressOpenGallery={onPressOpenGallery}
        onLongPressImage={onLongPressImage}
        onPressImage={onPressImage}
      />

      {/* 이미지 크게 보는 모달 */}
      <BigImgModal
        modalVisible={bigImgModalVisible}
        onPressBackdrop={onPressBigImgModalBackdrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});
