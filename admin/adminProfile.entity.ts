import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { AdminEntity } from "./admin.entity";

@Entity("adminprofile")
export class AdminProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column()
    email: string;
    @Column()
    phonenumber: string;
    @Column()
    address: string;
    @Column()
    filename: string;
    @OneToOne(() => AdminEntity, admin => admin.adminProfile)
    admin: AdminEntity;
}