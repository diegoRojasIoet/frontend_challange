import { OPTIONS, API_URL } from "./constants.js";

export const get_movies = async() => {
  try {
    const response = await fetch(API_URL, OPTIONS);
    console.log("the response")
    console.log(response)
    const result = await response.text();
    console.log("the result")
    console.log(result)
    debugger
    return JSON.parse(result).results;
  } catch (error) {
    console.error(error);
  }
}