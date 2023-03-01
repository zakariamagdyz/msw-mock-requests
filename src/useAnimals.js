import { useQuery } from "react-query";
import axios from "axios";

export function useAnimals() {
  const getAnimals = () => {
    return axios.get("https://made.up/api/usage");
  };

  const { error, isLoading, data } = useQuery("animalsData", getAnimals);
  const animals = data ? data.data : [];

  return { error, isLoading, animals };
}
