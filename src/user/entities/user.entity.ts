import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'Commentaire' })
    pseudo: string;

    @Column({ name: 'Adresse_E_mail' })
    email: string;

    @Column({ name: 'Mot_de_passe' })
    password: string;

    @Column({ name: 'level' })
    level: boolean;

    @Column({ name: 'nbcommentaire' })
    commentCount: boolean;
}