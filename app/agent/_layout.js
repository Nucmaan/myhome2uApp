import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#000000', // Black background for the tab bar
                    borderTopColor: '#7D7D7D', // Gray border on top
                    height: 60, // Increased height for better touch targets
                },
                tabBarActiveTintColor: '#FFFFFF', // White color for active icons and text
                tabBarInactiveTintColor: '#7D7D7D', // Gray color for inactive icons and text
                tabBarLabelStyle: {
                    fontSize: 12, // Font size for tab labels
                    fontWeight: '600', // Bold text for better readability
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="home-sharp" size={24} color="#FFFFFF" />
                        ) : (
                            <Ionicons name="home-outline" size={24} color="#7D7D7D" />
                        )
                }}
            />

            <Tabs.Screen
            name="propertylist"
            options={{
                title: "Listing",
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <MaterialCommunityIcons name="city-variant" size={24} color="#FFFFFF" />
                    ) : (
                        <MaterialCommunityIcons name="city-variant-outline" size={24} color="#7D7D7D" />
                    )
            }}
        />


            <Tabs.Screen
                name="booking"
                options={{
                    title: "Booking",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome name="bookmark" size={24} color="#FFFFFF" />
                        ) : (
                            <FontAwesome name="bookmark-o" size={24} color="#7D7D7D" />
                        )
                }}
            />

            <Tabs.Screen
                name="contract"
                options={{
                    title: "Contract",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Fontisto name="player-settings" size={24} color="#FFFFFF" />
                        ) : (
                            <FontAwesome name="file-o" size={24} color="#7D7D7D" />
                        )
                }}
            />

            <Tabs.Screen
                name="bill"
                options={{
                    title: "Bill",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome5 name="money-bill" size={24} color="#FFFFFF" />
                        ) : (
                            <FontAwesome5 name="money-bill-wave" size={24} color="#7D7D7D" />
                        )
                }}
            />


            <Tabs.Screen
                name="setting"
                options={{
                    title: "More",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome5 name="user-cog" size={24} color="#FFFFFF" />
                        ) : (
                            <Feather name="settings" size={24} color="#7D7D7D" />
                        )
                }}
            />
        </Tabs>
    );
}
