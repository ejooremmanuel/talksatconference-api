import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose, { connection, mongo } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Talk Service API')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);
  const PORT = parseInt(process.env.PORT, 10) || 5500;
  const client = new mongo.MongoClient(process.env.MONGO_URI);

  client
    .connect()
    .then(async () => {
      await app.listen(PORT, async () => {
        console.log(`server is running on ${await app.getUrl()}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
bootstrap();
