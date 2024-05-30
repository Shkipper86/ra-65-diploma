// import { IQueryParams } from "../../entities/slices/products/productsTypes";

export default class ApiShared {
  static async get(apiUrl: string) {
    try {
      const apiResponse = await fetch(apiUrl);
      const json = await apiResponse.json();
      return json;
    } catch (error) {
      return error;
    }
  }
}
