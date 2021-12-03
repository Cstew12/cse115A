import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { Image } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useNavigation } from "@react-navigation/core";
import { auth, store } from "../../firebase";

/*
 * This is the gallery screen for the user's collection of images under
 * each habit. The images are pulled from their account in Firebase and
 * displayed in a flat list.
 */

function GalleryScreen({ route }) {
  const uid = route.params.uid;
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [noImages, setNoImages] = useState(true);

  /*
   * newObj - image object being added to the array
   *
   * adds new image object to the array of images
   */
  const addImageObjToArray = (newObj) => {
    setImages((images) => images.concat(newObj));
  };

  useEffect(() => {
    const habitName = route.params.name;
    const listRef = store.ref(uid + "/" + habitName);

    // Lists all image name in a specified directory
    listRef.listAll().then((file) => {
      // sort the items in the file by date added
      file.items.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      file.items.forEach((ref) => {
        const imageRef = store.ref(
          "/" + uid + "/" + habitName + "/" + ref.name
        );
        imageRef
          .getDownloadURL()
          .then((url) => {
            // use add image url to the image array
            const picDate = new Date(ref.name);
            const dateStr =
              picDate.getMonth() +
              "/" +
              picDate.getDate() +
              ", " +
              picDate.getHours() +
              ":" +
              picDate.getMinutes();
            addImageObjToArray({ uri: url, title: dateStr, date: ref.name });
          })
          .catch((error) => alert(error.message)); // error handling if download fails
      });
    });
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        justifyContent: "center",
        marginVertical: 20,
        alignItems: "center",
      }}
    >
      <Image
        style={{ height: 200, width: 200 }}
        source={{ uri: item.uri }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text style={{ color: "white", marginTop: 20 }}>{item.title}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View
          style={{
            flexDirection: "row-reverse",
            marginTop: 40,
            marginLeft: 20,
          }}
        >
          <Button
            title=" Profile"
            type="solid"
            icon={
              <Icon
                name="user-circle"
                size={15}
                type="font-awesome"
                color="white"
              />
            }
            titleStyle={{
              color: "white",
              fontFamily: "AvenirNext-Bold",
            }}
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontFamily: "AvenirNext-Bold",
            }}
          >
            Gallery
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <FlatList
          data={images.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          })}
          renderItem={renderItem}
          keyExtractor={() => Math.random().toString(36)}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-evenly",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2e2d2d",
    flex: 1,
  },
  top: {
    flex: 1.2,
  },
  bottom: {
    flex: 7,
  },
});
export default GalleryScreen;
