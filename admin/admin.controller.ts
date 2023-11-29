import { Controller, Get, Post, Body, Param, Put, ParseIntPipe, UsePipes, ValidationPipe, UploadedFile, UseInterceptors, Res } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { createSecureServer } from "http2";
import { AdminInfo, AdminProfileInfo } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { AdminProfileEntity } from "./adminProfile.entity"
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";
//import session from "express-session";


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get()
    getHello(): string {
        return this.adminService.getHello();
    }
    @Post()
    postAdmin(@Body() data: string) {
        return this.adminService.postAdmin(data);
    }
    @Get('users')
    getAllAdmins() {
        return this.adminService.getAllAdmins();
    }
    @Post('newadmin')
    @UsePipes(new ValidationPipe())
    createAdmin(@Body() adminInfo: AdminInfo) {
        this.adminService.createAdmin(adminInfo);
        return "New Admin created";
    }
    @Post('newadminprofile')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }))
    createAdminProfile(@Body() adminProfileInfo: AdminProfileInfo, @UploadedFile() file: Express.Multer.File) {
        adminProfileInfo.filename = file.filename;
        this.adminService.createAdminProfile(adminProfileInfo);
        return "Profile has been saved";
    }
    @Get(':id')
    getAdminById(@Param('id', ParseIntPipe) id: number) {
        let x = this.adminService.getAdminById(id);
    }
    @Put('update/:id')
    updateAdmin(@Param('id') id: number, @Body() adminInfo: AdminEntity) {
        return this.adminService.updateAdmin(id, adminInfo);
    }
    // @Post('signin')
    // signIn(@Body() mydata: AdminEntity, @Session() session) {
    //     const result = this.adminService.signIn(mydata);
    //     if (result) {
    //         session.email = mydata.email;
    //         console.log(session.email);
    //     }

    //     return result;
    // }

}