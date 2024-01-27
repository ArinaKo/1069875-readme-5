import { PrismaClient } from '@prisma/client';

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
const TypeIds = [
  '39614113-7ad5-45b6-8093-06455437e1e2',
  'efd775e2-df55-4e0e-a308-58249f5ea202',
  'c3783039-5255-4296-8696-5e22db623e28',
  'fd6112bd-da77-40c8-95b1-cd56f8275e30',
  'a49a89b8-0e02-4e05-8c66-09d59fcbba73',
];
const TagsIds = [
  '2bc60958-b919-452c-b579-034159f6bf68',
  '7e0f7f02-e091-4071-b0ca-67a3d9175755',
  '260cdad1-3ee9-49e6-80a1-95079798fd20',
  '7cb60b30-b88c-4ba1-8666-49c0bd63a573',
  '3ee78b2b-6514-4ecf-a293-e084b02f317c',
];

function getTypes() {
  return [
    { id: TypeIds[0], title: 'video' },
    { id: TypeIds[1], title: 'text' },
    { id: TypeIds[2], title: 'quote' },
    { id: TypeIds[3], title: 'photo' },
    { id: TypeIds[4], title: 'link' },
  ];
}

function getTags() {
  return [
    { id: TagsIds[0], title: 'happy' },
    { id: TagsIds[1], title: 'useful' },
    { id: TagsIds[2], title: 'swag' },
    { id: TagsIds[3], title: 'yolo' },
    { id: TagsIds[4], title: 'life' },
  ];
}

function getPosts() {
  return [
    {
      id: PostsIds[0],
      title: 'Nice content',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=k98j8ZsqD3xiqFZU',
      userId: UsersIds[0],
      type: {
        connect: { id: TypeIds[0] },
      },
      tags: {
        connect: [{ id: TagsIds[0] }, { id: TagsIds[1] }],
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
      type: {
        connect: { id: TypeIds[1] },
      },
      tags: {
        connect: [{ id: TagsIds[2] }, { id: TagsIds[3] }],
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
      type: {
        connect: { id: TypeIds[2] },
      },
      tags: {
        connect: [{ id: TagsIds[4] }],
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
      type: {
        connect: { id: TypeIds[3] },
      },
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
      type: {
        connect: { id: TypeIds[4] },
      },
      tags: {
        connect: [{ id: TagsIds[0] }, { id: TagsIds[4] }],
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
  const mockTypes = getTypes();
  for (const type of mockTypes) {
    await prismaClient.type.upsert({
      where: { id: type.id },
      update: {},
      create: {
        id: type.id,
        title: type.title,
      },
    });
  }

  const mockTags = getTags();
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        title: tag.title,
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
