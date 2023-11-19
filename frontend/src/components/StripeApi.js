import axios from 'axios';
export const API_URL ='https://drivo.ae'
export const api = axios.create({
  baseURL :API_URL,
  headers :{
    'Content-type': 'application/json'
  }
});
export default class ApiService{
  static saveStripeInfo(data={}){
    return api.post(`/api/v1/air/save-stripe-info/`, data)
  }
}
