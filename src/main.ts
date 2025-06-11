import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import { join } from "path";
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      {cors: {origin: ["http://localhost:3000"], credentials: true,},
  });
  console.log('STATIC PATH:', join(process.cwd(), "uploads"));

  app.useStaticAssets(join(process.cwd(), "uploads"), {
    prefix: "/uploads/"
  });

  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
