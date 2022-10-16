import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = "/api";

export class RequestApi {
  static async addRequest(data) {
    console.log(data);
    return axios
      .post(`${apiUrl}/request`, data)
      .then((response) => response.data);
  }

  static async fetchRequestByClientId(id) {
    return axios
      .get(`${apiUrl}/request/byClient/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  static async fetchRequestAll() {
    return axios.get(`${apiUrl}/request`).then((response) => response.data);
  }

  static async appointRequest(requestId, carId) {
    return axios
      .patch(`${apiUrl}/request/appoint/${requestId}`, { carId })
      .then((response) => response.data);
  }
}
