import { Dimensions, Pressable, Text, Image, FlatList } from "react-native";

const width = Dimensions.get("screen").width;

const minColumSize = width >= 500 ? 200 : 130;
const divisor = width / minColumSize;

const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

export default ({
  imagesWithAddButton,
  onPressOpenGallery,
  onLongPressImage,
  onPressImage,
}) => {
  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <Pressable
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ fontWeight: "100", fontSize: 40 }}>+</Text>
        </Pressable>
      );
    }

    return (
      <Pressable
        onLongPress={() => onLongPressImage(id)}
        onPress={() => onPressImage(image)}>
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </Pressable>
    );
  };
  return (
    <FlatList
      data={imagesWithAddButton}
      renderItem={renderItem}
      numColumns={numColumns}
      style={{ zIndex: -1 }}
    />
  );
};
