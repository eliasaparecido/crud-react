import axios from "axios";

export default axios.create({
  baseURL: "https://sped-nfe.herokuapp.com/api/admin/cadastros/",
  headers: {
    "Content-type": "application/json"
  }
});