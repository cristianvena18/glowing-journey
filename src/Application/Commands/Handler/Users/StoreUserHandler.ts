import StoreUserCommand from "../../Command/Users/StoreUserCommand.ts";
import User from "../../../../Domain/Entities/User.ts";

class StoreUserHandler {
  public async execute(command: StoreUserCommand) {
    const user = new User(command.getEmail(), command.getPassword());
    user.setName(command.getName());
    user.setSurname(command.getSurname())

    return user;
  }
}

export default StoreUserHandler;