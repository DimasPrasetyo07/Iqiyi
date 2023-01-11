import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_DETAIL } from "../config/queries";
import YoutubePlayer from "react-native-youtube-iframe"
import Vidio from "../components/Video";
import DetailView from "../components/DetailView";

export default function DetailMovie({ route, navigation }) {
  const { itemId } = route.params;
  const { data, loading, error } = useQuery(GET_MOVIE_DETAIL, {
    variables: {
      getMovieDetailId: itemId,
    },
  });
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={"#00ff00"} />
      </View>
    );
  }
  return (
    <SafeAreaView>
    <DetailView data={data?.getMovieDetail}/>
    </SafeAreaView>
  );
}

