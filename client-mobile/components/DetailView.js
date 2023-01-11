import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe"
import Vidio from "../components/Video";

const DetailView = (movie) => {
    // console.log(movie.data.Genre.name)
    return (
        // <Text> tes tes </Text>
        <>
        
        <YoutubePlayer
          height={240}
          play={false}
          videoId={movie.data.trailerUrl.slice(30)}
          >
          </YoutubePlayer>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 10,
              color: "white",
              textAlign: "center",
              fontSize: 24,
              marginBottom: 10
            }}
          >
            {movie.data.title}
          </Text>
          {/* <Vidio data={data?.getMovieDetail.trailerUrl} /> */}

          <View style={styles.innerContainer}>
            <Image
              style={styles.movieImage}
              source={{ uri: movie.data.imgUrl }}
            />
            <Text
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
                flex: 2,
                color: "white",
                textAlign: "justify",
                fontSize: 15,
              }}
            >
              {movie.data.synopsis}
            </Text>
            <Text
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
                flex: 2,
                color: "white",
                textAlign: "justify",
                fontSize: 15,
              }}
            >
              Genre : {movie.data.Genre.name}
            </Text>
            <Text
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
                flex: 2,
                color: "white",
                textAlign: "justify",
                fontSize: 15,
              }}
            >
              Rating : {movie.data.rating}
            </Text>
            <Text
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
                flex: 2,
                color: "white",
                textAlign: "justify",
                fontSize: 15,
              }}
            >
              Author : {movie.data.User.username}
            </Text>
            <Text
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
                flex: 2,
                color: "white",
                textAlign: "justify",
                fontSize: 15,
              }}
            >
              Cast : 
            </Text>
            <FlatList
              horizontal
              style={{
                color: "white",
                textAlign: "justify",
                fontSize: 15,
                // backgroundColor: "white",
                marginTop: 5,
                marginBottom: 5
              }}
              data={movie.data.Casts}
              renderItem={({ item }) => (
                <View>
                  <ImageBackground
                    source={{ uri: item.profilePict }}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={{
                      alignItems: 'center',
                      backgroundColor: 'gray',
                      opacity: .5
                    }}>
                    <Text style={styles.text}>{item.name}</Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            ></FlatList>
          </View>
        </View>
      </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      backgroundColor: "black",paddingBottom: 400
    },
    innerContainer: {
      flexDirection: "column",
      alignItems: "center",
      marginTop: 0,
    //   flex: 1,
      // backgroundColor: 'white'
    },
    movieImage: {
      width: 275,
      height: 300,
      flex: 8,
      marginTop: 15,
    },
    image: {
      flex: 1,
      justifyContent: "flex-start",
      width: 100,
      height: 200,
      padding: 5,
      margin: 5,
      marginBottom: 10,
      backgroundColor: 'black'
    },
    text: {
      color: 'white',
      fontSize: 8,
      textAlign: 'center',
      // alignItems: 'baseline'
      // alignSelf: 'center'
  
    }
  });

export default DetailView