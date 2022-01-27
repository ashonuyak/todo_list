import { MigrationInterface, QueryRunner } from 'typeorm'

export class Todo1643306103359 implements MigrationInterface {
  name = 'Todo1643306103359'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "task" character varying NOT NULL, "isDone" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL, "doneAt" TIMESTAMP, "titleId" integer, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "title" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_30e6ea2dcc2aae4a4d1f5d9e183" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_99c4cfd8217ab30067b29b405d7" FOREIGN KEY ("titleId") REFERENCES "title"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `INSERT INTO "title" (name) VALUES ('Home'), ('Work'), ('Shopping'), ('Sport'), ('Other')`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_99c4cfd8217ab30067b29b405d7"`)
    await queryRunner.query(`DROP TABLE "title"`)
    await queryRunner.query(`DROP TABLE "todo"`)
  }
}
