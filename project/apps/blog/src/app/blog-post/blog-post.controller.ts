import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostService } from './blog-post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostQuery } from './query/blog-post.query';
import { UpdatePostDto } from './dto/update-post.dto';
import { fillDto } from '@project/shared/helpers';
import { BlogPostRdo } from './rdo/blog-post.rdo';
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
import { PostDtoValidationPipe } from '@project/shared/core';
import { CreateDtoListing, UpdateDtoListing } from './blog-post.const';

@ApiTags('blog-posts')
@Controller('posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @ApiResponse({
    type: BlogPostWithPaginationRdo,
    status: HttpStatus.FOUND,
    description: 'Posts found',
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((entity) => entity.toPOJO()),
    };
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  })
  @Post('/')
  public async create(@Body(new PostDtoValidationPipe(CreateDtoListing)) dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.FOUND,
    description: 'Post found',
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);
    return fillDto(BlogPostRdo, post.toPOJO());
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated',
  })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body(new PostDtoValidationPipe(UpdateDtoListing)) dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);
    return fillDto(BlogPostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post has been successfully deleted',
  })
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    await this.blogPostService.deletePost(id);
  }
}
