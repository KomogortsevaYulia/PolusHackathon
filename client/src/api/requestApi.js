

export class RequestApi {
    static async fetchRequestByUserId(id) {
      return request.find((user) => user.id === id);
    }
  }