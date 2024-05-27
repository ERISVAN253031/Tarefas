import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const image = require("./resources/img/image.jpg");
  const [tarefas, setarTarefas] = useState([
 
  ]);

  const [modal, setModal] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState("");

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        let tarefaAtual = await AsyncStorage.getItem("tarefa");
        if (tarefaAtual == null) setarTarefas([]);
        else setarTarefas(JSON.parse(tarefaAtual));
      } catch (error) {
        
      }
    };

    fetchTarefas();
  }, []);

  function deletarTarefas(id) {
    alert("Tarefa com id " + id + " foi deletada com sucesso!");

    let newTarefas = tarefas.filter(function (val) {
      return val.id != id;
    });

    setarTarefas(newTarefas);
  }

  function addTarefa() {
    setModal(!modal);
    let id = 0;
    if (tarefas.length > 0) {
      id = tarefas[tarefas.length - 1].id + 1;
    }
    let novaTarefa = { id: id, tarefa: tarefaAtual };
    setarTarefas([...tarefas, novaTarefa]);
    (async () => {
      try {
        await AsyncStorage.setItem(
          "tarefa",
          JSON.stringify([...tarefas, novaTarefa])
        );
      } catch (error) {
        
      }
    })();
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("O modal foi fechado..");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              onChangeText={(text) => setTarefaAtual(text)}
              autoFocus={true}
            />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#14146e" }}
              onPress={() => addTarefa()}
            >
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <ImageBackground source={image} style={styles.image}>
        <View style={styles.coverView}>
          <Text style={styles.textHeader}>Lista de Tarefas</Text>
        </View>
      </ImageBackground>

      {tarefas.map(function (val) {
        return (
          <View style={styles.tarefas} key={val.id}>
            <View style={{ flex: 1, width: "100%", padding: 10 }}>
              <Text>{val.tarefa}</Text>
            </View>
            <View style={{ alignItems: "flex-end", flex: 1, padding: 10 }}>
              <TouchableOpacity onPress={() => deletarTarefas(val.id)}>
                <AntDesign name="minuscircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <TouchableOpacity
        style={styles.btnAddTarefa}
        onPress={() => setModal(true)}
      >
        <Text style={{ textAlign: "center", color: "white" }}>
          Adicionar Tarefa!
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 90,
    resizeMode: "cover",
  },

  coverView: {
    width: "100%",
    height: 90,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  textHeader: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },

  tarefas: {
    marginTop: 30,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flexDirection: "row",
    paddingBottom: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
  btnAddTarefa: {
    width: 200,
    padding: 8,
    backgroundColor: "#4287f5",
    marginTop: 20,
    marginLeft: 90,
    borderRadius: 10,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
