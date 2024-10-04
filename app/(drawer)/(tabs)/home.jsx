import React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { expense, income } from "~/constants/images";

const screenWidth = Dimensions.get("window").width;

const Home = () => {
  const data = {
    datasets: [
      {
        data: [50, 10, 40, 95, 85, 30, 20],
      },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5] dark:bg-black px-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Balance Section */}
        <View className="items-center mt-4">
          <Text className="text-lg text-gray-500 dark:text-white">
            Account Balance
          </Text>
          <Text className="text-4xl font-bold text-black mt-1 dark:text-white">
            $9400
          </Text>

          <View className="flex-row justify-between w-full mt-4">
            <View className="bg-green-500 flex-1 p-4 rounded-lg mr-2 flex-row justify-between">
              <View>
                <Text className="text-white font-bold">Income</Text>
                <Text className="text-2xl font-bold text-white">$5000</Text>
              </View>
              <View>
                <Image source={income} />
              </View>
            </View>
            <View className="bg-red-500 flex-1 p-4 rounded-lg ml-2 flex-row justify-between">
              <View>
                <Text className="text-white font-bold">Expenses</Text>
                <Text className="text-2xl font-bold text-white">$1200</Text>
              </View>
              <View>
                <Image source={expense} />
              </View>
            </View>
          </View>
        </View>

        {/* Income Section */}
        <View className="mt-6">
          <Text className="text-lg font-semibold dark:text-white">Incom</Text>
          {/* Placeholder for  Income Graph */}
          <View className="h-40 mt-4">
            <LineChart
              data={data}
              width={screenWidth}
              height={160}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(162, 89, 255, ${opacity})`,
                strokeWidth: 2,
                fillShadowGradient: "#A259FF",
                fillShadowGradientOpacity: 0.8,
              }}
              bezier
            />
          </View>
        </View>

        {/* Expense Section */}
        <View className="mt-6">
          <Text className="text-lg font-semibold dark:text-white">
            Expenses
          </Text>
          {/* Placeholder for  Expense Graph */}
          <View className="h-40 mt-4">
            <LineChart
              data={data}
              width={screenWidth}
              height={160}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(255, 69, 58, ${opacity})`,
                strokeWidth: 2,
                fillShadowGradient: "#FF4558",
                fillShadowGradientOpacity: 0.8,
              }}
              bezier
            />
          </View>
        </View>

        {/* Recent History */}
        <View className="mt-6">
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Recent History
          </Text>
          <TransactionItem
            type="Shopping"
            details="Buy some grocery"
            amount="$120"
            time="10:00 AM"
            color="bg-gray-300"
          />
          <TransactionItem
            type="Subscription"
            details="Disney+ Annual"
            amount="$80"
            time="03:30 PM"
            color="bg-gray-300"
          />
          <TransactionItem
            type="Food"
            details="Buy a ramen"
            amount="$32"
            time="07:30 PM"
            color="bg-gray-300"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

function TransactionItem({ type, details, amount, time, color }) {
  return (
    <View
      className={`flex-row justify-between items-center p-4 rounded-lg mb-2 ${color}`}
    >
      <View>
        <Text className="text-base font-bold">{type}</Text>
        <Text className="text-sm text-gray-700">{details}</Text>
      </View>
      <View className="items-end">
        <Text className="text-red-600 text-base font-bold">- {amount}</Text>
        <Text className="text-sm text-gray-700">{time}</Text>
      </View>
    </View>
  );
}
