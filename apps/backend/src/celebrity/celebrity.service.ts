import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Celebrity } from './celebrity.entity';
import { CelebrityDto } from './dto/celebrity.dto';

@Injectable()
export class CelebrityService {
  // Injecting the Celebrity repository into the service
  constructor(
    @InjectRepository(Celebrity)
    private readonly celebrityRepository: Repository<Celebrity>,
  ) {}

  /**
   * Find all celebrities
   *
   * @returns {Promise<Celebrity[]>} An array of all celebrities
   */
  async findAll(): Promise<Celebrity[]> {
    return await this.celebrityRepository.find();
  }

  /**
   * Find a specific celebrity by ID
   *
   * @param {number} id
   * @returns {Promise<Celebrity>} The found celebrity
   * @throws {NotFoundException} If the celebrity with the specified ID is not found
   */
  async findOne(id: number): Promise<Celebrity> {
    const celebrity = await this.celebrityRepository.findOne({ where: { id } });
    if (!celebrity) {
      throw new NotFoundException(`Celebrity with ID "${id}" not found`);
    }
    return celebrity;
  }

  /**
   * Create a new celebrity
   *
   * @param {CelebrityDto} celebrityDto
   * @returns {Promise<Celebrity>} The created celebrity
   */
  async createCelebrity(celebrityDto: CelebrityDto): Promise<Celebrity> {
    const celebrity = this.celebrityRepository.create(celebrityDto);
    await this.celebrityRepository.save(celebrity);
    return celebrity;
  }

  /**
   * Update an existing celebrity
   *
   * @param {number} id
   * @param {CelebrityDto} celebrityDto
   * @returns {Promise<Celebrity>} The updated celebrity
   * @throws {NotFoundException} If the celebrity with the specified ID is not found
   */
  async updateCelebrity(id: number, celebrityDto: CelebrityDto): Promise<Celebrity> {
    const celebrity = await this.celebrityRepository.preload({
      id,
      ...celebrityDto,
    });
    if (!celebrity) {
      throw new NotFoundException(`Celebrity with ID "${id}" not found`);
    }
    return await this.celebrityRepository.save(celebrity);
  }

  /**
   * Delete an existing celebrity
   *
   * @param {number} id
   * @returns {Promise<Celebrity>} The deleted celebrity
   * @throws {NotFoundException} If the celebrity with the specified ID is not found
   */
  async deleteCelebrity(id: number): Promise<Celebrity> {
    const celebrity = await this.findOne(id);
    return await this.celebrityRepository.remove(celebrity);
  }
}
