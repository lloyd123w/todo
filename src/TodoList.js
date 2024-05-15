import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useStore } from './store';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const TodoList = () => {
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const updateTodo = useStore((state) => state.updateTodo);

  const [newTodo, setNewTodo] = useState('');
  const [updatedText, setUpdatedText] = useState('');
  const [editItemId, setEditItemId] = useState(null);

  const handleAddTodo = () => {
    if (newTodo) {
      addTodo({
        id: Date.now(),
        text: newTodo
      });
      setNewTodo('');
    }
  };

  const handleUpdate = (id) => {
    updateTodo(id, updatedText);
    setEditItemId(null);
    setUpdatedText('');
  };

  const handleStartEdit = (id, text) => {
    setEditItemId(id);
    setUpdatedText(text);
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <Button title="+" onPress={handleAddTodo} color="#004927" />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Animatable.View
            style={styles.itemContainer}
            animation="fadeIn"
            duration={1000}
          >
            {editItemId === item.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  value={updatedText}
                  onChangeText={setUpdatedText}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => handleUpdate(item.id)}>
                  <FontAwesome5 name="check" size={24} color="#004927" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.contentContainer}>
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleStartEdit(item.id, item.text)}>
                    <FontAwesome5 name="pencil-alt" size={20} color="#004927" />
                  </TouchableOpacity>
                  <View style={styles.buttonSpacer} />
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <FontAwesome5 name="trash-alt" size={20} color="#d32f2f" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animatable.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF', // Light background for minimalist look
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8, // Slightly reduced margin
    padding: 10, // Consistent padding
    backgroundColor: '#F0F0F0', // Light gray background
    borderRadius: 8, // Slightly rounded corners
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333', // Dark gray text
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light border color
  },
  header: {
    fontSize: 24,
    fontWeight: '500', // Medium font weight
    marginBottom: 16,
    color: '#333333', // Dark gray text
    textAlign: 'center', // Centered text
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F9F9F9', // Light background for list items
    elevation: 1, // Subtle shadow for depth
    borderRadius: 8,
    marginVertical: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333333', // Dark gray text
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonSpacer: {
    width: 16, // Consistent spacing between buttons
  },
});

export default TodoList;
