import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, name: 'name' })
  name!: string;

  @Column('varchar', { nullable: false, name: 'email' })
  email!: string;

  @Column('varchar', { nullable: false, name: 'password' })
  password!: string;

  @Column('varchar', { nullable: false, name: 'cpf' })
  cpf!: string;
}
