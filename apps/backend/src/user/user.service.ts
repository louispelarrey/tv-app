import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.entity";
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  /**
   * Get Specific User based on his ID
   *
   * @param id
   * @returns {Promise<User>} Found user
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  /**
   * Get a specific user by Email
   *
   * @param email
   * @returns {Promise<User | undefined>} Found User, or undefined if user doesn't exists
   */
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    return user;
  }

  /**
   * Get a specific user by either his email or username
   *
   * @param {string} identifier Email or Username
   * @returns {Promise<User | undefined>} Found User, or undefined if user doesn't exists
   */
  async findByIdentifier(identifier: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: [
        { email: identifier },
        { username: identifier },
      ]
    });

    return user;
  }

  /**
   * Find all users
   *
   * @returns {Promise[User]} All users
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Creates User
   *
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<User>} Promise User Created
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save(user);
  }



  /**
   * Update User
   *
   * @param {number} id
   * @param {UpdateUserDto} updateUserDto
   * @returns {Promise<User>} Promise User Updated
   */
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.password = await bcrypt.hash(updateUserDto.password, 10);
    return this.userRepository.save(user);
  }

  /**
   * Deletes User
   *
   * @param {number} id
   * @returns {Promise<User>} Promise User Deleted
   */
  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if(!user) throw new NotFoundException('User not found');

    return this.userRepository.remove(user);
  }


  /**
   * Verify that user can make request because he is the owner of the entity
   *
   * @param {string} currentUserNickname
   * @param {number} requestedUserId
   *
   * @returns {Promise<boolean>}
   */
  async checkOwner(currentUserNickname: string, requestedUserId: number): Promise<boolean> {
    const currentUser = await this.findByIdentifier(currentUserNickname);
    const requestedUser = await this.findOne(requestedUserId);

    return currentUser === requestedUser;
  }
}
