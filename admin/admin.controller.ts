import { Controller, Get } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(private readonly appService: AdminService) { }

    @Get()
    getHello(): string {
        return "Hello from admin";
    }
}