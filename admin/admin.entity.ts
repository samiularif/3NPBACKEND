import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { AdminProfileEntity } from "./adminProfile.entity"

@Entity("admin")
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    isActive: boolean;
    @OneToOne(() => AdminProfileEntity, adminProfile => adminProfile.admin, { cascade: true })
    @JoinColumn()
    adminProfile: AdminProfileEntity;
}
