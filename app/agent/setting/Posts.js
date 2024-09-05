import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../Config/api";
import { useSelector } from "react-redux";

const PostsScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const response = await api.get("/api/MyHome2U/Blog/AllPosts");
      const filteredPosts = response.data.posts.filter(post => post.author === user._id);
      setPosts(filteredPosts);
    //  console.log(posts);
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    getPosts();

  }, [getPosts]);

  const handleDelete = (postId) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await api.delete(`/api/MyHome2U/Blog/DeletePost/${postId}`);
              if (response.status === 200) {
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
                Alert.alert("Success", "Post deleted successfully");
              }
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Failed to delete the post.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddPost")}
      >
        <Text style={styles.addButtonText}>Add Post</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {posts.map((post) => (
          <View key={post._id} style={styles.postContainer}>
            <View style={styles.postDetails}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postDate}>{new Date(post.createdAt).toLocaleDateString()}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => navigation.navigate("UpdatePost", { postId: post._id })}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(post._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    backgroundColor: "#000000", // Primary color (black)
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    marginTop: 36, // Add marginTop to create space at the top
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postDetails: {
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  postDate: {
    fontSize: 14,
    color: "#6e6e6e",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#1e90ff", // Dodger Blue
  },
  deleteButton: {
    backgroundColor: "#ff6347", // Tomato
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default PostsScreen;
