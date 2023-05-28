import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  await app.listen(PORT, async () => {
    console.log(`server is running on ${await app.getUrl()}`);
  });
}
bootstrap();
