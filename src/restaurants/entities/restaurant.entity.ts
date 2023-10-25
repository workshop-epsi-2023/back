import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Restaurant' })
export class RestaurantEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'Libelle', type: "varchar", length: 255 })
    libelle: string;

    @Column({ name: 'latitude', type: "double" })
    latitude: string;

    @Column({ name: 'longitude', type: "double" })
    longitude: string;

    @Column({ name: 'rating', type: "float" })
    rating: number;

    @Column({ name: 'Categorie', type: "varchar", length: 255 })
    category: string;

    @Column({ name: 'number_rating', type: "float" })
    rating_count: number;

    @Column({ name: 'adress', type: "varchar", length: 255 })
    address: string;
}