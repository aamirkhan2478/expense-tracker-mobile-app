import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Image, FlatList, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gainMoney, moneyGoes, planningAhead } from "~/constants/images";
import { H3, P } from "./ui/typography";

const { width: viewportWidth } = Dimensions.get("window");

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null); // Reference for the FlatList
  const carouselInterval = useRef(null); // Reference for the autoplay interval

  const data = [
    {
      id: "1",
      title: "Know where your money goes",
      subtitle:
        "Track your transaction easily, with categories and financial report",
      image: moneyGoes,
    },
    {
      id: "2",
      title: "Gain total control of your money",
      subtitle: "Become your own money manager and make every cent count",
      image: gainMoney,
    },
    {
      id: "3",
      title: "Planning ahead",
      subtitle: "Setup your budget for each category so you in control",
      image: planningAhead,
    },
  ];

  // Autoplay functionality
  const startAutoPlay = useCallback(() => {
    stopAutoPlay(); // Clear existing intervals if any
    carouselInterval.current = window.setInterval(() => {
      let nextSlide = activeSlide + 1;
      if (nextSlide >= data.length) {
        nextSlide = 0; // Reset to first slide after last one
      }
      scrollToIndex(nextSlide);
    }, 3000); // Autoplay every 3 seconds
  }, [activeSlide, data.length]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay(); // Cleanup interval on unmount
  }, [activeSlide, data.length, startAutoPlay]);

  const stopAutoPlay = () => {
    if (carouselInterval.current) {
      window.clearInterval(carouselInterval.current);
    }
  };

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveSlide(index);
  };

  const renderItem = ({ item }) => (
    <View
      style={{ width: viewportWidth }}
      className="justify-center items-center h-full mx-auto"
    >
      <Image source={item.image} className="h-80 mb-8" resizeMode="contain" />
      <H3 className="dark:text-white">{item.title}</H3>
      <P className="text-center w-[70%] dark:text-white">{item.subtitle}</P>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white gap-4">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "between" }}
      >
        <View className="flex-1 justify-center items-center">
          <FlatList
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onScroll={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / viewportWidth
              );
              setActiveSlide(index);
            }}
            ref={flatListRef}
            getItemLayout={(data, index) => ({
              length: viewportWidth,
              offset: viewportWidth * index,
              index,
            })}
            snapToAlignment="center"
          />

          {/* Pagination */}
          <View className="flex-row items-center my-8">
            {data.map((_, index) => (
              <View
                key={index}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === activeSlide ? "bg-purple-600" : "bg-purple-200"
                }`}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Carousel;
