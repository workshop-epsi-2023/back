import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'commentaire' })
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'Commentaire' })
    comment: string;

    @Column({ name: 'id_restaurant' })
    restaurantId: string;

    @Column({ name: 'id_user' })
    userId: string;

    @Column({ name: 'Note' })
    note: boolean;
}