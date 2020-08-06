import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseModule = MongooseModule.forRoot(
  'mongodb+srv://lgaricoix:7CodUmFvX6B1A2l9@cluster0.3m1mk.mongodb.net/developer?retryWrites=true&w=majority',
);
