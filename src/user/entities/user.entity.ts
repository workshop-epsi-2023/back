import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'Pseudo', type: "varchar", length: 255 })
    pseudo: string;

    @Column({ name: 'Adresse_E_mail', type: "varchar", length: 255 })
    email: string;

    @Column({ name: 'Mot_de_passe', type: "varchar", length: 15 })
    password: string;

    @Column({ name: 'level', type: "int", nullable: true })
    level: number;

    @Column({ name: 'nbcommentaire', type: "int", nullable: true })
    commentCount: number;
}