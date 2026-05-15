import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("usuarios") 
export class Utilizador {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type:"varchar"
  })
  nome!: string;

  @Column( {
    type:"varchar"
  })
  email!: string;

  @Column({
    type:"varchar"
  })
  senha!: string;

  @Column({
    type:"int"
  })
  idade!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}