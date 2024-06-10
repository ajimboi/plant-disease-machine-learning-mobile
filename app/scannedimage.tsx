import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";

const ScannedImage = () => {
  const route = useRoute();
  const { predictClass, predictProbability, image } = route.params;
  const navigation = useNavigation();

  const handleAerosolButton = () => {
    navigation.navigate("typeofaerosol", {
      predictClass: predictClass,
    });
  };

  const formattedProbability =
    predictProbability == 1 ? "100" : (predictProbability * 100).toFixed(2);
  return (
    <View
      style={{
        flex: 1,

        height: "100%",
        width: "100%",
        backgroundColor: Colors.green600,
      }}
    >
      <ScrollView style={{ width: "100%" }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: Colors.white }}>
              Probability:{formattedProbability}%
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <Text style={{ fontSize: 18, color: Colors.white }}>
                Detected Image:{" "}
              </Text>
              <Text style={{ fontSize: 18, color: Colors.white }}>
                {predictClass === 0
                  ? "Anthracnose"
                  : predictClass === 1
                  ? "Healthy"
                  : predictClass === 2
                  ? "Pestalotiopsis"
                  : ""}
              </Text>
            </View>
          </View>
          <View style={{ width: "90%" }}>
            {predictClass === 0 ? (
              <Text>
                Anthracnose is a common fungal disease affecting mango trees,
                including the Harumanis variety. It is caused by the fungus
                <Text> </Text>
                <Text style={{ fontWeight: "bold" }}>
                  Colletotrichum gloeosporioides
                </Text>
                . Here’s an overview of anthracnose in Harumanis mango leaves:
              </Text>
            ) : predictClass === 1 ? (
              <Text>
                Through your dedication and meticulous care, your plants thrive
                with vitality and promise, embodying the true spirit of healthy,
                flourishing agriculture. Great Job farmers.
              </Text>
            ) : predictClass === 2 ? (
              <Text>
                <Text style={{ fontWeight: "bold" }}>Pestalotiopsis</Text>
                <Text> </Text>
                species are known to infect various plants, including mangoes.
                Specifically, the Harumanis mango (a popular variety in
                Malaysia) can be affected by Pestalotiopsis, leading to issues
                in leaves and fruits. Here’s an overview of Pestalotiopsis
                infection in Harumanis mango leaves:
              </Text>
            ) : (
              ""
            )}
          </View>

          <View style={{ width: "90%", marginTop: 10 }}>
            {predictClass === 0 ? (
              <>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
                >
                  Characteristic on Harumanis Mango Leaves
                </Text>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    1. Leaf Spots:
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    Small, dark brown to black spots appear on the leaves. These
                    spots may enlarge and merge, forming larger necrotic areas.
                  </Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    2. Leaf Blight:
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    In severe cases, the infection can cause extensive blighting
                    of leaves, leading to significant tissue damage.
                  </Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    3. Defoliation:
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    The disease can cause premature defoliation, where infected
                    leaves fall off the tree, reducing the plant’s ability to
                    photosynthesize and affecting overall health.
                  </Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    4. Lesions on Young Leaves:
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    Young leaves are particularly susceptible and can develop
                    large, irregularly shaped lesions that may be slightly
                    sunken
                  </Text>
                </View>
              </>
            ) : predictClass === 1 ? (
              <Text>
                Through your dedication and meticulous care, your plants thrive
                with vitality and promise, embodying the true spirit of healthy,
                flourishing agriculture. Great Job farmers.
              </Text>
            ) : predictClass === 2 ? (
              <>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
                >
                  Characteristic on Harumanis Mango Leaves
                </Text>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    1. Leaf Spots:
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    The most common symptom is the appearance of spots on the
                    leaves. These spots are typically brown to dark brown and
                    may have a yellow halo around them.
                  </Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    2. Leaf Blight:
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    In severe cases, the infection can cause leaf blight, where
                    large areas of the leaf tissue become necrotic and die off.
                  </Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    3. Defoliation:
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    Persistent infection can lead to premature defoliation,
                    affecting the plant's overall health and fruit production.
                  </Text>
                </View>
              </>
            ) : (
              ""
            )}
          </View>

          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <TouchableOpacity
              style={{ backgroundColor: Colors.green100, borderRadius: 20 }}
              onPress={handleAerosolButton}
            >
              <Text style={{ marginVertical: 10, marginHorizontal: 20 }}>
                Type Of Aerosol To Use
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScannedImage;
