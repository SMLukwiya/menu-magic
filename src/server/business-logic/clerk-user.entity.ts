import { clerkClient, type User } from "@clerk/nextjs/dist/api";

export default class ClerkUserEntity {
  async findUserForClient(userId: string) {
    const user = await this.find(userId);
    const userForClient = this.filterUserForClient(user);
    return userForClient;
  }

  async listUsersForClient(userIds: string[]) {
    const users = await this.list(userIds);
    const usersForClient = users.map(this.filterUserForClient.bind(this));
    return usersForClient;
  }

  private async find(userId: string) {
    return await clerkClient.users.getUser(userId);
  }

  private async list(userIds: string[]) {
    const users = await clerkClient.users.getUserList({
      userId: userIds,
    });

    return users;
  }

  private filterUserForClient(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      profileImageUrl: user.profileImageUrl,
    };
  }
}
