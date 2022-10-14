export class UserApi {
  static async fetchById(id) {
    return { data: { id } };
  }
}
