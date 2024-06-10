import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import Toast from "react-native-toast-message";

export default function TabOneScreen() {
  const [image, setImage] = useState(null);
  const [uploadEnabled, setUploadEnabled] = useState(false);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setUploadEnabled(true);
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setUploadEnabled(true);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/jpeg",
        name: "image.jpg",
      });

      const response = await fetch("http://192.168.0.200:5000/predict", {
        method: "POST",
        body: formData,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let result = await response.json();

      if (result.predicted_class != 3) {
        navigation.navigate("scannedimage", {
          predictClass: result.predicted_class,
          predictProbability: result.predicted_class_probability,
          image: image,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Scan Fail",
          text2: "Your picture cannot be scann please try again",
          visibilityTime: 3000,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors that occur
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.green600,
      }}
    >
      <Toast />
      {image ? (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      ) : (
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: Colors.containermachine,
          }}
        ></View>
      )}

      <View style={{ flexDirection: "row", gap: 5, marginTop: 20 }}>
        <View>
          <TouchableOpacity
            onPress={pickImage}
            style={{ backgroundColor: Colors.green100, borderRadius: 20 }}
          >
            <Text style={{ marginVertical: 10, marginHorizontal: 20 }}>
              Upload from gallery
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={takePicture}
            style={{ backgroundColor: Colors.green100, borderRadius: 20 }}
          >
            <Text style={{ marginVertical: 10, marginHorizontal: 20 }}>
              Upload from gallery
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 10, width: "90%" }}>
        <TouchableOpacity
          onPress={uploadImage}
          style={{
            backgroundColor: image ? Colors.green100 : Colors.primary,
            borderRadius: 20,
          }}
          disabled={!image}
        >
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
              textAlign: "center",
            }}
          >
            UPLOAD IMAGE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
