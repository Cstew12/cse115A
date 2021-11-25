import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { Image } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useNavigation } from "@react-navigation/core";
import { auth, store } from "../../firebase";

/*
 * Currently the images all load for each habit you press into.
 * There are issues with the image sizing once it loads onto the gallery page
 * and I haven't quite figured out how to sort it by date yet.
 *
 * I don't think the images have anything date related once you save it into
 * Firebase storage, might wanna work something in from there.
 * 
 * Also, would be easier to debug if we removed the 1 record limit per day.
 */

function GalleryScreen({ route }) {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);

  /**
   *  Adds new image object to the image array
   * @param {uri: string, title: string} newObj
   */
  const addImageObjToArray = (newObj) => {
    setImages((images) => images.concat(newObj));
  };

  useEffect(() => {
    const habitName = route.params.name;
    // console.log("Habit name: " + habitName); // debug
    const listRef = store.ref(auth.currentUser.uid + "/" + habitName);
    var count = 1;

    /*
     * Lists all image name in a specified directory
     */
    listRef.listAll().then((file) => {
      file.items.forEach((ref) => {
        console.log(ref.name);

        // for each image reference in the habit folder, create a url and store it in gallery
        // the image path will be ('/' + current_uid + '/' + habitname + '/' ref.name)
        const imageRef = store.ref(
          "/" + auth.currentUser.uid + "/" + habitName + "/" + ref.name
        );
        imageRef
          .getDownloadURL()
          .then((url) => {
            // use add image url to the image array
            // console.log('Image location: ' + url); // debug
            addImageObjToArray({ uri: url, title: count });
            count++;
          })
          .catch((error) => alert(error.message)); // error while downloading the image
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
      <Image style={{ height: 200, width: 200 }} source={{ uri: item.uri }} />
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
          data={images}
          renderItem={renderItem}
          keyExtractor={() => Math.random().toString(36)}
          numColumns={3}
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
    flex: 1,
  },
  bottom: {
    flex: 7,
  },
});
export default GalleryScreen;
