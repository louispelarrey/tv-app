import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    return user;
  }

  async findByIdentifier(identifier: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: [
        { email: identifier },
        { username: identifier },
      ]
    });

    return user;
  }


  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, username: string, email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    user.username = username;
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }

  /**
   * Deletes User
   *
   * @param {number} id
   * @returns {Promise<User>} userDeleted
   */
  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return await this.userRepository.remove(user);
  }

}
