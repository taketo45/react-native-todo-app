import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";

interface Task {
  id: string;
  text: string;
}

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTasks = () => {
    const newTask = { id: Date.now().toString(), text: taskText };
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const renderTasks = ({ item }:{item: Task}) => {
    return (
      <View style={styles.taskcontainer}>
        <Text>{item.text}</Text>
        <View style={styles.taskbuttoncontainer}>
          <TouchableOpacity>
            <Text>更新</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>削除</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}> 
      <Text style={styles.title}>Todo管理アプリ</Text>
      <TextInput 
      placeholder="タスクを入力" 
      style={styles.input} 
      onChangeText={setTaskText}
      value={taskText}
      />
      <TouchableOpacity style={styles.touchableButton}>
        <Text onPress={handleTasks}>追加</Text>
      </TouchableOpacity>
      <FlatList
        data= {tasks}
        renderItem={renderTasks}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 40,
  }, 
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 12,
    color: "black",
  },
  touchableButton: {
    backgroundColor: "skyblue",
    marginTop: 20,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  taskcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
  },
  taskbuttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 100,
  }
});

