import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Icon } from '@rneui/themed';

interface Task {
  id: string;
  text: string;
}

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditting, setIsEditting] = useState(null);

  const handleSaveTasks = () => {
    if(!taskText.trim()) return;
    if (isEditting) {
      const newTasks = tasks.map((task) => {
        return (task.id === isEditting) ? { id: task.id, text: taskText } : task;
      });
      setTasks(newTasks);
      setIsEditting(null);
    } else {
      const newTask = { id: Date.now().toString(), text: taskText };
      setTasks([...tasks, newTask]);
    }
    setTaskText("");
  };

  const handleEdit = (item:any) => {
    setTaskText(item.text);
    setIsEditting(item.id);
  };

  const handleDelete = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const renderTasks = ({ item }:{item: Task}) => {
    return (
      <View style={styles.taskcontainer}>
        <Text>{item.text}</Text>
        <View style={styles.taskbuttoncontainer}>
          <TouchableOpacity>
            <Icon 
            name="edit" 
            color="#0CC"
            onPress={() => {handleEdit(item)}}
            >更新</Icon>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon 
            name="delete" 
            color="#0CC"
            onPress={() => {handleDelete(item.id)}}
            >削除</Icon>
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
        <Text 
        onPress={handleSaveTasks}>{isEditting ? "編集" : "追加"}</Text>
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

