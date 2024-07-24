import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LocalMiddleware } from './local-middleware';
import { Reflector } from '@nestjs/core';

export function setup(app: INestApplication) {
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
    })
  );
  const config = new DocumentBuilder()
    .setTitle('API Example')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('docs', app, document);
  const swaggerPath = 'api-docs';
  app.use(`/${swaggerPath}`, new LocalMiddleware().use);
  SwaggerModule.setup(swaggerPath, app, document);
  return app;
}
