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
    UseGuards,
  } from '@nestjs/common';
  import { CreatePostDto } from './dto/create.dto';
  import { PostService } from './post.service';
  import { Posts } from './post.entity';
  import { AuthenticatedUser } from '../user/user.decorator';
  import { UserAuthGuard } from '../user/user.guard';
  @UsePipes(ValidationPipe)
  @Controller('post')
  export class PostController {
    constructor(private readonly postService: PostService) {}
  
    @Get()
    @UseGuards(UserAuthGuard)
    findAll(@AuthenticatedUser() user: any): Promise<Posts[]> {
      return this.postService.findAll(user.id);
    }
  
    @Get(':id')
    @UseGuards(UserAuthGuard)
    findOne(@Param('id') id, @AuthenticatedUser() user: any): Promise<Posts> {
      return this.postService.findOne(id, user.id);
    }
  
    @Post('')
    @UseGuards(UserAuthGuard)
    create(
      @Body() createData: CreatePostDto,
      @AuthenticatedUser() user: any,
    ): Promise<Posts> {
      return this.postService.create(createData, user.id);
    }
  
    @Delete(':id')
    @UseGuards(UserAuthGuard)
    delete(@Param('id') id, @AuthenticatedUser() user: any): Promise<void> {
      return this.postService.remove(id, user.id);
    }
  
    @Put(':id')
    @UseGuards(UserAuthGuard)
    update(
      @Body() createData: CreatePostDto,
      @Param('id') id,
      @AuthenticatedUser() user: any,
    ): Promise<Posts> {
      return this.postService.update(id, createData, user.id);
    }
  }