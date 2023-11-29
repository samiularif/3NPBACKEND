import { Module, Controller } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { AdminProfileEntity } from "./adminProfile.entity";



@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity, AdminProfileEntity]),],
    controllers: [AdminController],
    providers: [AdminService]
}

)

export class AdminModule { }