import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class LogUserDto {
    @IsEmail({}, {message: 'Adresse email non valide'})
    email: string;

    @IsNotEmpty()
    @MinLength(6, {message: 'Le mot de passe doit contenir au moins 6 caractères'})
    password: string;
}
