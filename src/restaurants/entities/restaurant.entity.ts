import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Restaurant' })
export class RestaurantEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'Libelle' })
    libelle: string;

    @Column({ name: 'latitude' })
    latitude: string;

    @Column({ name: 'longitude' })
    longitude: string;

    @Column({ name: 'rating' })
    rating: number;

    @Column({ name: 'Categorie' })
    category: string;

    @Column({ name: 'number_rating' })
    rating_count: number;

    @Column({ name: 'adress' })
    address: string;
}