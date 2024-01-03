import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostsDto } from './dto/CreatePosts.dto';
import { PostsService } from './posts.services';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('create')
  createPost(@Body() createPostDto: CreatePostsDto) {
    return this.postsService.createPost(createPostDto);
  }
}
