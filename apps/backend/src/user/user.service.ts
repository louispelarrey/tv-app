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

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async createUser(email: string, password: string): Promise<User> {
        const user = new User();
        user.email = email;
        user.password = password;
        return await this.userRepository.save(user);
    }

    async updateUser(id: number, email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        user.email = email;
        user.password = password;
        return await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        return await this.userRepository.remove(user);
    }

}
