import { Module } from "@nestjs/common";
import { TesterService } from "./tester.service";
import { TasksModule } from "../tasks/tasks.module";
import { ConfigureModule } from "../configure/configure.module";

@Module({
  imports: [TasksModule, ConfigureModule],
  providers: [TesterService],
})
export class TesterModule {}
