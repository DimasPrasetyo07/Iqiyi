import { View, Image, TextInput, StyleSheet, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';

const Header = () => {
  return (
    // <SafeAreaView>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/iqiyi-logo.png")}
        />
        <TextInput
          style={styles.input}
          // onChangeText={onChangeText}
          // value={text}
        />
        <AntDesign style={styles.searchIcon} name="search1" size={40} color="white" />
        <Button style={styles.button}
        title="VIP"
        onPress={() => Alert.alert('Jadi VIP NGAB')}
      />
      </View>
      // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingTop: 10,    
    alignContent: "center",
    marginTop: 30
  },
  logo: {
    flex: 1,
    width: 50,
    height: 40,
    borderWidth: 1
  },
  input: {
    flex: 5,
    height: 40,
    borderWidth: 1,
    backgroundColor: 'gray',
    borderWidth: 1,
    opacity: .5,
    borderRadius: 5,
    color: 'white',


    
  },
  searchIcon: {
    flex : 1,
    marginLeft: 5
    
  },
  button: {
    
  }
});

export default Header;
