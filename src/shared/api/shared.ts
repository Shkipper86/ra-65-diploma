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

  static async post(apiUrl: string, body: string) {
    const queryOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    };
    try {
      const apiResponse = await fetch(apiUrl, queryOptions);
      const json = await apiResponse.json();
      return json;
    } catch (error) {
      return error;
    }
  }
}
