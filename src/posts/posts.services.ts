import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { User } from 'src/schemas/User.schema';
import { CreatePostsDto } from './dto/CreatePosts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostsDto) {
    const foundUser = await this.userModel.findById(userId);

    if (!foundUser) throw new HttpException('Invalid ID', 404);

    const newPost = new this.postModel(createPostDto);

    const savedPost = await newPost.save();

    await foundUser.updateOne({ $push: { posts: savedPost._id } });

    return savedPost;
  }
}
