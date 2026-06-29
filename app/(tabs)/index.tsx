import { View, Text, useWindowDimensions } from "react-native";
import Header from "../../src/components/ui/Header"
import { ScrollView } from "../../src/components/ui/ScrollView";
import { Image } from "expo-image";

const CARD_GAP = 16;

export default function HomeScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth * 0.72;

  const trendingData = [
    {
      id: "id1",
      image: require("../../assets/images/trending_image.png"),
      title: "Sinigang na Bangus",
      author: "Clarence Lee",
      favorites: "516"
    },
    {
      id: "id2",
      image: require("../../assets/images/trending_image.png"),
      title: "Tinolang Manok",
      author: "Frederick Diaz",
      favorites: "252"
    },
    {
      id: "id3",
      image: require("../../assets/images/trending_image.png"),
      title: "Chicken Barbeque",
      author: "Clarence Diaz",
      favorites: "433"
    },
  ]
  const categoriesData = [
    {
      id: "id1",
      title: "Chicken"
    },
    {
      id: "id2",
      title: "Beef"
    },
    {
      id: "id3",
      title: "Fish",
    },
    {
      id: "id4",
      title: "Stew",
    },
    {
      id: "id5",
      title: "Beverages",
    },
  ]
  return (
    <View className="flex flex-col flex-1">
      <Header />
      <ScrollView
        className="flex-1 mt-8 mb-2"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-8 pb-8"
      >
        <View className="flex flex-col">
          <Text className="text-[18px] font-fredoka-medium mb-3">Trending</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: CARD_GAP }}
          >
            {trendingData.map((trending) => (
              <View key={trending.id} style={{ width: cardWidth }}>
                {trending.image ? (
                  <Image
                    source={trending.image}
                    style={{
                      width: cardWidth,
                      aspectRatio: 16 / 10,
                      borderRadius: 8,
                    }}
                    contentFit="cover"
                  />
                ) : (
                  <View
                    style={{
                      width: cardWidth,
                      aspectRatio: 16 / 10,
                      borderRadius: 8,
                      backgroundColor: "#E3E3E3",
                    }}
                  />
                )}
                <View className="mt-2 flex flex-row justify-between">
                  <View className="flex flex-col flex-1 pr-2">
                    <Text className="font-nunito-semibold">{trending.title}</Text>
                    <Text className="text-[#898989] font-nunito">by {trending.author}</Text>
                  </View>
                  <View className="flex-row gap-2 mt-1">
                    <Image
                      source={require("../../assets/icons/icon_heart.png")}
                      style={{
                        width: 14,
                        height: 14,
                        marginTop: 2
                      }}
                    />
                    <Text className="font-nunito text-primary">{trending.favorites}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View>
          <Text className="text-[18px] font-fredoka-medium mb-3">Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: CARD_GAP }}
          >
            {categoriesData.map((categ) => (
              <View key={categ.id} className="flex flex-col items-center gap-2">
                <View className="bg-gray-300 w-28 h-28 rounded-xl"></View>
                <Text className="font-nunito-medium text-[13px]">{categ.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="flex flex-col">
          <Text className="text-[18px] font-fredoka-medium mb-3">Recently Viewed</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: CARD_GAP }}
          >
            {trendingData.map((trending) => (
              <View key={trending.id} style={{ width: cardWidth }}>
                {trending.image ? (
                  <Image
                    source={trending.image}
                    style={{
                      width: cardWidth,
                      aspectRatio: 16 / 10,
                      borderRadius: 8,
                    }}
                    contentFit="cover"
                  />
                ) : (
                  <View
                    style={{
                      width: cardWidth,
                      aspectRatio: 16 / 10,
                      borderRadius: 8,
                      backgroundColor: "#E3E3E3",
                    }}
                  />
                )}
                <View className="mt-2 flex flex-row justify-between">
                  <View className="flex flex-col flex-1 pr-2">
                    <Text className="font-nunito-semibold">{trending.title}</Text>
                    <Text className="text-[#898989] font-nunito">by {trending.author}</Text>
                  </View>
                  <View className="flex-row gap-2 mt-1">
                    <Image
                      source={require("../../assets/icons/icon_heart.png")}
                      style={{
                        width: 14,
                        height: 14,
                        marginTop: 2
                      }}
                    />
                    <Text className="font-nunito text-primary">{trending.favorites}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}