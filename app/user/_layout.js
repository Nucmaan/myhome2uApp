import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

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
                name="booking"
                options={{
                    title: "My Booking List",
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
                name="contracts"
                options={{
                    title: "My Contracts",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome name="file" size={24} color="#FFFFFF" />
                        ) : (
                            <FontAwesome name="file-o" size={24} color="#7D7D7D" />
                        )
                }}
            />

            <Tabs.Screen
                name="bills"
                options={{
                    title: "My Bills",
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
                name="profile"
                options={{
                    title: "My Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome5 name="user-cog" size={24} color="#FFFFFF" />
                        ) : (
                            <FontAwesome5 name="user" size={24} color="#7D7D7D" />
                        )
                }}
            />
        </Tabs>
    );
}
