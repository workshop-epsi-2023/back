import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'commentaire' })
export class UserEntity {
    @PrimaryGeneratedColumn()
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