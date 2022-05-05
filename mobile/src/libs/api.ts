/**
 * get local IP on terminal:
 * `ifconfig en0`
 */
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.217:3333",
});
