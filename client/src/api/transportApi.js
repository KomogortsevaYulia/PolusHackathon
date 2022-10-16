import axios from "axios";
const apiUrl = "/api";

export class TransportApi {
  static async fetchTransport(type, name, status) {
    let query = "";

    if (type || name || status) {
      query += "?";
    }

    query += `name=${name}`;

    return axios
      .get(`${apiUrl}/car${query}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  static async fetchTransportName(carType) {
    return axios
      .get(`${apiUrl}/car?sub_type=${carType}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}
