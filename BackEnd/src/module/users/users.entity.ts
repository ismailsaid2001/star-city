import { AnnoncesEntity } from 'src/module/annonces/annonces.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('users')
export class UsersEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar',
    length: 30,
   })
  name: string;

  @Column({ 
    type: 'varchar',
    length: 30,
   })
  lastName: string;

  @Column({ 
    type: 'varchar',
    length: 80,
    unique: true,
   })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;
  
  @OneToMany(
  type => AnnoncesEntity,
  annonces => annonces.id)
  annonces: AnnoncesEntity[];
}