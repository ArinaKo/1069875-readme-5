import { PrismaClient } from '@prisma/client';
import { PostType } from '../../../app/types/src/index';

const UsersIds = [
  '658170cbb954e9f5b905ccf4',
  '6581762309c030b503e30512',
  '5272e0f00000000000000000',
  '507f1f77bcf86cd799439011',
  '507f1f77bcf86cd799439222',
];
const PostsIds = [
  '6d308040-96a2-4162-bea6-2338e9976540',
  'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
  '37dd9b79-80db-4b27-8a72-165dc24d694b',
  'fca47f7b-b05d-46f1-a83e-080a1d576796',
  '9cad67f3-cf34-4683-ab89-c2787dc014b9',
];

const Tags = [
  'happy',
  'useful',
  'swag',
  'yolo',
  'life',
] as const;

function getPosts() {
  return [
    {
      id: PostsIds[0],
      title: 'Nice content',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=k98j8ZsqD3xiqFZU',
      userId: UsersIds[0],
      type: PostType.Video,
      tags: {
        connect: [{ title: Tags[0] }, { title: Tags[1] }],
      },
      comments: [
        {
          message: 'Это отлично!',
          userId: UsersIds[3],
        },
        {
          message: 'Опять...',
          userId: UsersIds[3],
        },
      ],
      likes: [
        {
          userId: UsersIds[1],
        },
        {
          userId: UsersIds[2],
        },
        {
          userId: UsersIds[3],
        },
        {
          userId: UsersIds[4],
        },
      ],
    },
    {
      id: PostsIds[1],
      title: 'IF',
      description:
        '«If…» — одно из самых известных стихотворений Р. Киплинга, написанное в 1895 году.',
      content: `If you can talk with crowds and keep your virtue,
                Or walk with Kings—nor lose the common touch,
                If neither foes nor loving friends can hurt you,
                If all men count with you, but none too much;
                If you can fill the unforgiving minute
                With sixty seconds’ worth of distance run,
                Yours is the Earth and everything that’s in it,
                And—which is more—you’ll be a Man, my son!`,
      userId: UsersIds[0],
      type: PostType.Text,
      tags: {
        connect: [{ title: Tags[2] }, {title: Tags[3] }],
      },
      likes: [
        {
          userId: UsersIds[3],
        },
      ],
    },
    {
      id: PostsIds[2],
      description: 'Donald E. Knuth',
      content:
        'Опасайтесь багов в приведенном выше коде; я только доказал корректность, но не запускал его.',
      userId: UsersIds[1],
      type: PostType.Quote,
      tags: {
        connect: [{ title: Tags[4] }],
      },
      likes: [
        {
          userId: UsersIds[0],
        },
        {
          userId: UsersIds[4],
        },
      ],
    },
    {
      id: PostsIds[3],
      content: 'image.jpg',
      userId: UsersIds[1],
      type: PostType.Photo,
      comments: [
        {
          message: 'Это действительно отличное фото!',
          userId: UsersIds[2],
        },
        {
          message: 'Как красиво',
          userId: UsersIds[4],
        },
        {
          message: 'Какие замечательные цвета)',
          userId: UsersIds[3],
        },
      ],
    },
    {
      id: PostsIds[4],
      description: 'Мой любимый сайт',
      content: 'https://htmlacademy.ru/',
      userId: UsersIds[1],
      type: PostType.Link,
      tags: {
        connect: [{ title: Tags[0] }, { title: Tags[4] }],
      },
      comments: [
        {
          message: 'О, я тоже там учился',
          userId: UsersIds[0],
        },
      ],
      likes: [
        {
          userId: UsersIds[2],
        },
      ],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  for (const tag of Tags) {
    await prismaClient.tag.upsert({
      where: { title: tag },
      update: {},
      create: {
        title: tag,
      },
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        title: post.title ? post.title : undefined,
        description: post.description ? post.description : undefined,
        content: post.content,
        status: 'published',
        isRepost: false,
        userId: post.userId,
        type: post.type,
        tags: post.tags ?? undefined,
        comments: post.comments
          ? {
              create: post.comments,
            }
          : undefined,
        likes: post.likes
          ? {
              create: post.likes,
            }
          : undefined,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
