import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, name: 'name' })
  name!: string;

  @Column('varchar', { nullable: false, name: 'size' })
  size!: string;

  @Column('varchar', { nullable: false, name: 'color' })
  color!: string;

  @Column('double precision', { nullable: false, name: 'price' })
  price!: number;

  @Column('int', { nullable: false, name: 'quantity' })
  quantity!: number;
}
