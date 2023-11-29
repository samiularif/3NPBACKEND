import { IsString, IsEmail, IsNotEmpty, IsBoolean } from "class-validator";

export class AdminInfo {
    @IsString() @IsEmail() @IsNotEmpty({ message: "Please enter a valid username" })
    username: string;
    @IsString() @IsNotEmpty()
    password: string;
    @IsBoolean()
    isActive: boolean;
}
export class AdminProfileInfo {
    @IsString() @IsNotEmpty({ message: "Please enter your firstname!!!" })
    firstname: string;
    @IsString() @IsNotEmpty({ message: "Please enter your lastname!!!" })
    lastname: string;
    @IsEmail() @IsNotEmpty({ message: "Please enter a valid email address!!!" })
    email: string;
    @IsString() @IsNotEmpty({ message: "Please enter your lastname!!!" })
    phonenumber: string;
    @IsString() @IsNotEmpty({ message: "Please enter your lastname!!!" })
    address: string;
    filename: string;
}