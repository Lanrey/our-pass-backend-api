import {
    Injectable,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Posts } from './post.entity';
  
  @Injectable()
  export class PostService {
    constructor(
      @InjectRepository(Posts)
      private postRepository: Repository<Posts>,
    ) {}
  
    findAll(user: number): Promise<Posts[]> {
      return this.postRepository.find({
        where: {
          user,
        },
      });
    }
  
    findOne(id: number, user: number): Promise<Posts> {
      return this.postRepository.findOne({
        where: {
          id,
          user,
        },
      });
    }
  
    async remove(id: string, user: number): Promise<void> {
      const post = await this.postRepository.find({
        where: {
          id,
          user,
        },
      });
  
      if (!post) {
        throw new BadRequestException({
          status: 'error',
          message: 'Post Not found',
        });
      }
      await this.postRepository.delete(id);
    }
  
    async create(data: any, userId): Promise<Posts> {
      const { title } = data;
      const post = await this.postRepository.findOne({
        where: {
          title,
        },
      });
  
      if (post) {
        throw new BadRequestException({
          status: 'error',
          message: 'A post with that title already exists',
        });
      }
      const updatedPost = { ...data, user: userId };
      return this.postRepository.save(updatedPost);
    }
  
    async update(id: number, data: any, user: number): Promise<Posts> {
      const post = await this.postRepository.findOne({
        where: {
          id,
          user,
        },
      });
  
      if (!post) {
        throw new BadRequestException({
          status: 'error',
          message: 'Post Not found',
        });
      }
  
      await this.postRepository.update(
        {
          id,
        },
        {
          ...data,
        },
      );
      const postObject = await post.getBlogJSON();
      return { ...postObject };
    }
  }