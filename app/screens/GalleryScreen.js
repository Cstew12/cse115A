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

function GalleryScreen({ route}) {
  // console.log('The id in the gallery screen is' + id);

  const uid = route.params.uid;
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [noImages, setNoImages] = useState(true);

  /**
   *  Adds new image object to the image array
   * @param {uri: string, title: string} newObj
   */
  const addImageObjToArray = (newObj) => {
    setImages((images) => images.concat(newObj)); 
  };

  useEffect(() => {
    const habitName = route.params.name;
    // console.log('The habitname in the gallery screen is' + habitName);
    // console.log("Habit name: " + habitName); // debug
    const listRef = store.ref(uid + "/" + habitName);
    var count = 1;

    /*
     * Lists all image name in a specified directory
     */
    listRef.listAll().then((file) => {

      // sort the items in the file
      file.items.sort(function(a,b){

        // turn the items from string representations into milliseconds
        // const aTimeZero = Date.parse(a);
        // const bTimeZero = Date.parse(b);

        return new Date(b.date) - new Date(a.date);
      })
    
      file.items.forEach((ref) => {
        console.log(ref.name);

        // for each image reference in the habit folder, create a url and store it in gallery
        // the image path will be ('/' + current_uid + '/' + habitname + '/' ref.name)
        const imageRef = store.ref(
          "/" + uid + "/" + habitName + "/" + ref.name
        );
        imageRef
          .getDownloadURL()
          .then((url) => {
            // use add image url to the image array
            // console.log('Image location: ' + url); // debug
            const picDate = new Date(ref.name)
            const dateStr = 
              picDate.getMonth() + '/' + picDate.getDate() + ', ' + picDate.getHours() + ':' + picDate.getMinutes();
            addImageObjToArray({ uri: url, title: dateStr, date: ref.name });
            console.log(images);
            count++;
          })
          .catch((error) => alert(error.message)); // error while downloading the image
      });
    });
    
    console.log(images.size);
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
            data={images.sort((a,b) => {
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
    flex: 1,
  },
  bottom: {
    flex: 7,
  },
});
export default GalleryScreen;
