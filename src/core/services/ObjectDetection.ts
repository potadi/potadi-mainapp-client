import axios from "axios";

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const Detection = async (file) => {
  const base64Image = await convertToBase64(file);

  const response = await axios({
    method: "POST",
    url: "https://detect.roboflow.com/leaf-uqpn1/3",
    params: {
      api_key: "NfQmJK9TEElwpC7XkJaU",
      confidence: 40,
      overlap: 30,
      format: "json",
    },
    data: base64Image,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: false,
  });
  return response.data;
};
