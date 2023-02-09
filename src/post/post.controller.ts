import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { CreatePostDto } from './dto/create.dto';
  import { PostService } from './post.service';
  import { Posts } from './post.entity';
  import { AuthenticatedUser } from '../user/user.decorator';
  
  @UsePipes(ValidationPipe)
  @Controller('user')
  export class PostController {
    constructor(private readonly postService: PostService) {}
  
    @Get()
    findAll(): Promise<Posts[]> {
      return this.postService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id): Promise<Posts> {
      return this.postService.findOne(id);
    }
  
    @Post('')
    create(
      @Body() createData: CreatePostDto,
      @AuthenticatedUser() user: any,
    ): Promise<Posts> {
      return this.postService.create(createData, user.id);
    }
  
    @Delete(':id')
    delete(@Param('id') id): Promise<void> {
      return this.postService.remove(id);
    }
  
    @Put(':id')
    update(@Body() createData: CreatePostDto, @Param('id') id): Promise<Posts> {
      return this.postService.update(id, createData);
    }
  }
  