import axios from "axios";
const apiUrl = "/api";

export class TransportApi {
  static async fetchTransport() {
    return axios
      .get(`${apiUrl}/car`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}
