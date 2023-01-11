import MovieCard from "../components/MovieCard";
import Header from "../components/Headers";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../config/queries";
import { ActivityIndicator, StatusBar } from "react-native";
import { Text, View, SafeAreaView } from "react-native";
// import { StatusBar } from "expo-status-bar";

export default function LandingPage() {
  const { data, loading, error } = useQuery(GET_MOVIES);
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={"#00ff00"} />
      </View>
    );
  }

  return (
    <>
    <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
      <StatusBar barStyle="light-content"/>
      <Header />
      <MovieCard data={data?.getMovies} />
      </SafeAreaView>
    </>
  );
}
