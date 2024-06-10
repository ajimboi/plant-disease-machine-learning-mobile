import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const TypeOfAerosol = () => {
  const route = useRoute();
  const { predictClass } = route.params;
  return (
    <View>
      <Text>{predictClass}</Text>
    </View>
  );
};

export default TypeOfAerosol;
