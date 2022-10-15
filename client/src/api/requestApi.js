import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = "/api";

export class RequestApi {

  static async addRequest(data) {
    return axios
      .post(`${apiUrl}/transferRuble`, { ...data })
      .then((response) => response.data);
  }

  static async fetchRequestByUserId(id) {
    return axios
      .get(`${apiUrl}/car`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  
}
