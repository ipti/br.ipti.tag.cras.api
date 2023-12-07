import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);
  await seedService.onModuleInit();
  app.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
