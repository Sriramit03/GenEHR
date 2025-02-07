import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const symptomsList = [
  "Neurogenic Pain",
  "FEVER",
  "HEADACHE",
  "BODYACHE",
  "COLD",
  "COUGH",
  "LOOSE STOOLS",
  "CONSTIPATION",
  "ABDOMINAL PAIN",
  "VOMITING",
  "BACK PAIN",
  "INJURY",
];

const CheckboxList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Toggle selection
  const toggleSelection = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Filter list based on search
  const filteredList = symptomsList.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Add or search"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => toggleSelection(item)}
          >
            <View
              style={[
                styles.checkbox,
                selectedItems.includes(item) && styles.checked,
              ]}
            >
              {selectedItems.includes(item) && (
                <Text style={styles.checkmark}>✔</Text>
              )}
            </View>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setSelectedItems([])}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "white", borderRadius: 10 },
  searchBox: { padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checked: { backgroundColor: "green", borderColor: "green" },
  checkmark: { color: "white", fontWeight: "bold" },
  text: { fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  clearButton: { color: "red", fontWeight: "bold" },
  doneButton: { color: "green", fontWeight: "bold" },
});

export default CheckboxList;
