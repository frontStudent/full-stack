import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DraftModule } from './draft/draft.module';
import { SectionModule } from './section/section.module';
import { BoxModule } from './box/box.module';
import { TemplateModule } from './template/template.module';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abc740531',
      database: 'resume',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DraftModule,
    SectionModule,
    BoxModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
