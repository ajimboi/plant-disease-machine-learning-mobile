import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function TabOneScreen() {
  const [image, setImage] = useState(null);
  const [uploadEnabled, setUploadEnabled] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("rsul;t", result.assets[0].uri);
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

      const response = await fetch(
        "https://ad56-175-145-120-105.ngrok-free.app/predict",
        {
          method: "POST",
          body: formData,
          redirect: "follow",
        }
      );

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let result = await response.json();
      console.log("Prediction Result:", result); // Log prediction result for debugging

      Alert.alert(
        "Prediction Result",
        `Predicted class: ${result.predicted_class}\nProbability: ${result.predicted_class_probability}`
      );
    } catch (error) {
      console.error("Error:", error); // Log any errors that occur
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}
