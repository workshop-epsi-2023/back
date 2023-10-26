import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'commentaire' })
export class CommentsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'Commentaire', type: "text", nullable: true })
    comment: string;

    @Column({ name: 'id_restaurant', type: "int" })
    restaurantId: number;

    @Column({ name: 'id_user', type: "int" })
    userId: number;

    @Column({ name: 'Note', type: "double", nullable: true })
    note: number;

    @Column({ name: 'date_commentaire', type: "datetime", default: () => "NOW()" })
    date?: string;

}