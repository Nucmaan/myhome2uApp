import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
                        ),
                }}
            />

            <Tabs.Screen
                name="adminlist"
                options={{
                    title: "Listings",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome name="building" size={24} color="#FFFFFF" />
                        ) : (
                            <FontAwesome name="building-o" size={24} color="#7D7D7D" />
                        ),
                }}
            />

            <Tabs.Screen
                name="userlist"
                options={{
                    title: "Users",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome5 name="user-alt" size={24} color="#FFFFFF" />
                        ) : (
                            <FontAwesome5 name="user" size={24} color="#7D7D7D" />
                        ),
                }}
            />

            <Tabs.Screen
                name="post"
                options={{
                    title: "Posts",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="post" size={24} color="#FFFFFF" />
                        ) : (
                            <MaterialCommunityIcons name="post-outline" size={24} color="#7D7D7D" />
                        ),
                }}
            />

            <Tabs.Screen
                name="heroimage"
                options={{
                    title: "Hero",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <AntDesign name="camera" size={24} color="#FFFFFF" />
                        ) : (
                            <AntDesign name="camerao" size={24} color="#7D7D7D" />
                        ),
                }}
            />

            <Tabs.Screen
                name="sociallinks"
                options={{
                    title: "Links",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="link-box" size={24} color="#FFFFFF" />
                        ) : (
                            <MaterialCommunityIcons name="link-box-outline" size={24} color="#7D7D7D" />
                        ),
                }}
            />

            <Tabs.Screen
                name="aboutepage"
                options={{
                    title: "About",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="book-open-page-variant" size={24} color="#FFFFFF" />
                        ) : (
                            <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color="#7D7D7D" />
                        ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome5 name="user-cog" size={24} color="#FFFFFF" />
                        ) : (
                            <FontAwesome5 name="user" size={24} color="#7D7D7D" />
                        ),
                }}
            />
        </Tabs>
    );
}
