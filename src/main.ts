import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8082;
  app.enableCors();

  app.setGlobalPrefix('api/v1');
  // app.useGlobalFilters(new ResponseFiler());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Server up on port ${PORT} !!!`));
}
bootstrap();
