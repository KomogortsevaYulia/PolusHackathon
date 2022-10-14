
export class UserApi {
  static async fetchById(id) {


    return { data: { id } };
  }


  static async fetchUser() {
    
    console.log(user)
    return {user };
  }
}
