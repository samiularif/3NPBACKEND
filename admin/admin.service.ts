import { Injectable } from "@nestjs/common";
import { AdminInfo, AdminProfileInfo } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { AdminProfileEntity } from "./adminProfile.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
    constructor(@InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
        @InjectRepository(AdminProfileEntity) private adminProfileRepo: Repository<AdminProfileEntity>) { }
    getHello(): string {
        return "hello from boss"
    }
    getAdmins(): string[] {
        return ['john', 'jane', 'doe'];
    }
    // getAdminById(id: string): string {
    //     return `Admin ID is ${id}`;
    //}
    postAdmin(data): string {
        return data;
    }
    // createAdmin(createAdminDto: CreateAdminDto): string {
    //     const { name, email } = createAdminDto;
    //     return `User Createdd: ${name} (${email})`;
    // }
    async createAdmin(admin: AdminInfo): Promise<AdminEntity> {
        const password = admin.password;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        admin.password = hashedPassword;
        return this.adminRepo.save(admin);
    }
    // async getAdminWithProfile(id: number): Promise<AdminEntity> {
    //     return this.adminRepo.findOneBy(id, { relations: ['admin-Profile'] });
    // }
    //async createAdminProfile(newAdminProfile: AdminProfileInfo)

    async createAdminProfile(adminProfile: AdminProfileInfo): Promise<AdminProfileEntity> {
        return this.adminProfileRepo.save(adminProfile);
    }

    async getAllAdmins(): Promise<AdminEntity[]> {
        return this.adminRepo.find({
            select: {
                username: true,
                isActive: true,
            },
        });
    }
    async getAdminById(id: number): Promise<AdminEntity> {
        return this.adminRepo.findOne({
            where: {
                id: id
            },
            select: {
                username: true,
                isActive: true,
            },
        });
    }
    async updateAdmin(id: number, updateAdmin: AdminEntity): Promise<AdminEntity> {
        await this.adminRepo.update(id, updateAdmin);
        return this.adminRepo.findOneBy({ id: id, });
    }
    async deleteAdmin(id: number): Promise<void> {
        await this.adminRepo.delete(id);
    }

    // async signIn(data: AdminInfo): Promise<boolean> {
    //     console.log("data" + { data });
    //     const userdata: AdminInfo = await this.adminRepo.findOneBy({ email: data.email });
    //     console.log(userdata);
    //     if (userdata != null) {
    //         const match: boolean = await bcrypt.compare(data.password, userdata.password);
    //         return match;
    //     }
    //     else {
    //         return false;
    //     }
    // }

}