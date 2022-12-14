import { Pressable, Text, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const headerHeight = 50;

export default ({
  onPressAlbum,
  onPressHeader,
  isDropdownOpen,
  albums,
  onPressAddAlbum,
  selectedAlbum,
  onLongPressAlbum,
}) => {
  return (
    <View>
      <Pressable
        onPress={onPressHeader}
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}>
        <Text style={{ fontWeight: "bold" }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          name={isDropdownOpen ? "arrow-up" : "arrow-down"}
          size={12}
          color="black"
          style={{ marginLeft: 8 }}
        />
        <Pressable
          onPress={onPressAddAlbum}
          style={{
            position: "absolute",
            right: 0,
            height: headerHeight,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}>
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </Pressable>
        {isDropdownOpen && (
          <View
            style={{
              width: "100%",
              position: "absolute",
              top: headerHeight,
              borderTopColor: "lightgrey",
              borderTopWidth: 0.5,
              borderBottomColor: "grey",
              borderBottomWidth: 0.5,
            }}>
            {albums.map((album, index) => {
              const isSelectedAlbum = album.id === selectedAlbum.id;
              return (
                <Pressable
                  key={`album = ${index}`}
                  onPress={() => onPressAlbum(album)}
                  onLongPress={() => onLongPressAlbum(album.id)}
                  style={{
                    paddingVertical: 12,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                  }}>
                  <Text
                    style={{
                      fontWeight: isSelectedAlbum ? "bold" : undefined,
                    }}>
                    {album.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </Pressable>
    </View>
  );
};
