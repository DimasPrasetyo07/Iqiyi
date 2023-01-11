import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MovieCard = (movie) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ backgroundColor: 'black', height:40, marginBottom:20, marginTop:20}}>
          <Text style={{textAlign: "center" , color: "white", fontSize: 24, fontWeight: "400" }}>
            Our Recommendations
          </Text>
          </View>
      
        <View style={styles.outerContainer}>

           <FlatList 
            numColumns={2}
            data={movie.data}
            renderItem={({ item }) => (
              <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailMovie', {
                  itemId: item.id
                })} >
                  <Image
                    style={styles.movieImage}
                    source={{ uri: item.imgUrl }}
                  />
                </TouchableOpacity  >
                <Text
                  style={{
                    marginTop: 5,
                    color: "white",
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            )} 
          ></FlatList>
        
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: 'black'
  },
  movieImage: {
    width: 200,
    height: 250,
    marginHorizontal: 4,
  },
  innerContainer: {
    flexDirection: "column",
    marginBottom: 10
  },
});

export default MovieCard;
