import axios from "axios";

const getToken = () => localStorage.getItem("token");

const fetchData = async () => {
  try {
    const token = getToken();

    if (token) {
      const response = await axios.get("your-api-endpoint", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    } else {
      console.error("Please authenticate");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

fetchData();
