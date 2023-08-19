import ApiConfig from "../config/ApiConfig";
import axios from "axios";

const { media } = ApiConfig;

export const uploadMedia = async (data) => {
  // console.log(data);
  // return;
  try {
    const response = await axios({
      url: media,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data ",
      },
      data,
    });
    console.log(response);
  } catch (err) {
    console.log(err.message);
  }
};
