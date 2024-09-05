import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="EditProfile" />
      <Stack.Screen name="Posts" />
      <Stack.Screen name="AddPost" />
      <Stack.Screen name="UpdatePost" />
    </Stack>
  );
}
