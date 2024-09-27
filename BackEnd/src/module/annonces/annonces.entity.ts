
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { Length } from 'class-validator';

@Entity('annonces')
export class AnnoncesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar',
    nullable: false
  })
  @Length(3, 100)
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  categorie: string;

  @CreateDateColumn()
  dateCreation: Date;

  @Column({ 
    type: 'timestamp',
    nullable: true
   })
  date: Date;
  
  @Column({ 
    type: 'varchar',
    nullable: true,
   })
  image: string;

  @ManyToOne(
  type => UsersEntity,
  user => user.id,
  { nullable: false })
  user: UsersEntity;

}