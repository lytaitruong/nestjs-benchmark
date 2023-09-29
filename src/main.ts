import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const platform = process.argv[2]

  console.log(!platform || platform.split('=')?.[1] !== 'fastify')
  const app =
    !platform || platform.split('=')?.[1] !== 'fastify'
      ? await NestFactory.create(AppModule)
      : await NestFactory.create(AppModule, new FastifyAdapter())
  await app.listen(3000, '0.0.0.0')
}

bootstrap()
