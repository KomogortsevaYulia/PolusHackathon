export const users = [
  { id: 1, name: "Заказчик Игорь", role: { id: 1, name: "CLIENT" } },
  { id: 2, name: "Диспетчер Олег", role: { id: 2, name: "DISPATCHER" } },
];

export class UserApi {
  static async fetchById(id) {
    return users.find((user) => user.id === id);
  }
}
