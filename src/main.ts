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
  const PORT = process.env.PORT || 5500;
  // const client = new mongo.MongoClient(process.env);
  await app.listen(PORT, async () => {
    console.log(`server is running on ${await app.getUrl()}`);
  });
}
bootstrap();
