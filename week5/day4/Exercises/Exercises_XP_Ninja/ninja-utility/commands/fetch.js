import axios from 'axios';
export async function fetchData() {
  try {
    const response = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true"
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}