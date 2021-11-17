import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { Image } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useNavigation } from "@react-navigation/core";
import { store, auth } from "../../firebase";

/*
 * Currently this screen is only pulling a single picture with a hard coded image name
 * (name of the image in the parent directory of Firebase Storage). I would like to meet up
 * with you guys to discuss design ideas on how we can load the most recent images from all
 * user posts to display in the main feed of our app.
 *
 * Concerns:
 * 
 * How to access images nested within folders. -> Need to figure out the format of the creating 
 * a path to feed into the ref() function.
 * 
 * Organization of image data within Firebase storage - nesting images within habit folders which belong to 
 * user folders. Sort the images by date somme how so we can fill the feed with the most recent image from
 * each user. 
 * 
 * Loading multiple images from the database
 * 
 */

function HomeScreen(props) {
  const [imageUrl, setImageUrl] = useState(undefined);

  // Pulls a single image from the Firebase storage given the image name to ref()
  useEffect(() => {
    store
      .ref("/" + "StreetEats&Beats_11062021_126.jpg") //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log("Errors while downloading => ", e));
  }, []);

  const images = [
    {
      title: "first picture",
      uri: imageUrl,
    },
    {
      title: "second picture",
      uri: imageUrl,
    },
  ];

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        marginVertical: 40,
        alignItems: "center",
      }}
    >
      <Image style={{ height: 350, width: 350 }} source={{ uri: item.uri }} />
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
            Home
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={() => Math.random().toString(36)}
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
    flex: 8,
  },
});
export default HomeScreen;
