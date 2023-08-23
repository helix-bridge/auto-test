import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
import { TesterModule } from "./tester/tester.module";
import { ConfigureModule } from "./configure/configure.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    TesterModule,
    ConfigureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
