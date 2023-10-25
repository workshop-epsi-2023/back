import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'commentaire' })
export class CommentsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'Commentaire' })
    comment: string;

    @Column({ name: 'id_restaurant' })
    restaurantId: number;

    @Column({ name: 'id_user' })
    userId: number;

    @Column({ name: 'Note' })
    note: boolean;
}