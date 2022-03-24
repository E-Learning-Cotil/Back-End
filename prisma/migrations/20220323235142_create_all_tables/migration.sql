-- CreateEnum
CREATE TYPE "Periodo" AS ENUM ('DIURNO', 'NOTURNO');

-- CreateEnum
CREATE TYPE "Curso" AS ENUM ('ENFERMAGEM', 'EDIFICACOES', 'GEODESIA', 'INFORMATICA', 'MECANICA', 'QUALIDADE');

-- CreateEnum
CREATE TYPE "TipoSerie" AS ENUM ('MEDIOTECNICO', 'TECNICO');

-- CreateEnum
CREATE TYPE "OrigemMensagem" AS ENUM ('PROFESSOR', 'ALUNO');

-- CreateTable
CREATE TABLE "Alunos" (
    "ra" SERIAL NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "socket" TEXT,
    "idSerie" INTEGER NOT NULL,

    PRIMARY KEY ("ra")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "curso" "Curso" NOT NULL,
    "tipo" "TipoSerie" NOT NULL,
    "ano" TEXT NOT NULL,
    "periodo" "Periodo" NOT NULL,
    "sigla" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversas" (
    "id" SERIAL NOT NULL,
    "mensagem" TEXT NOT NULL,
    "origem" "OrigemMensagem" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rgProfessor" TEXT NOT NULL,
    "raAluno" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turmas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idCores" INTEGER NOT NULL,
    "idIcone" INTEGER NOT NULL,
    "idSerie" INTEGER NOT NULL,
    "rgProfessor" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professores" (
    "rg" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "socket" TEXT,

    PRIMARY KEY ("rg")
);

-- CreateTable
CREATE TABLE "ArquivosProfessor" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "rgProfessor" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topicos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idTurma" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materiais" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conteudo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idTopico" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atividades" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "idTopico" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtividadesAluno" (
    "id" SERIAL NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nota" DECIMAL(65,30),
    "raAluno" INTEGER NOT NULL,
    "idAtividade" INTEGER NOT NULL,
    "idTurma" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testes" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "idTopico" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestesAluno" (
    "id" SERIAL NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nota" DECIMAL(65,30) NOT NULL,
    "idTeste" INTEGER NOT NULL,
    "raAluno" INTEGER NOT NULL,
    "idTurma" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArquivosMateriais" (
    "id" SERIAL NOT NULL,
    "idArquivoProfessor" INTEGER NOT NULL,
    "idMaterial" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArquivosAtividades" (
    "id" SERIAL NOT NULL,
    "idArquivoProfessor" INTEGER NOT NULL,
    "idAtividade" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icones" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "altLink" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cores" (
    "id" SERIAL NOT NULL,
    "corPrim" TEXT NOT NULL,
    "corSec" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alunos.email_unique" ON "Alunos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Alunos.socket_unique" ON "Alunos"("socket");

-- CreateIndex
CREATE UNIQUE INDEX "Professores.email_unique" ON "Professores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professores.socket_unique" ON "Professores"("socket");

-- AddForeignKey
ALTER TABLE "Alunos" ADD FOREIGN KEY ("idSerie") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversas" ADD FOREIGN KEY ("rgProfessor") REFERENCES "Professores"("rg") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversas" ADD FOREIGN KEY ("raAluno") REFERENCES "Alunos"("ra") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turmas" ADD FOREIGN KEY ("idCores") REFERENCES "Cores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turmas" ADD FOREIGN KEY ("idIcone") REFERENCES "Icones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turmas" ADD FOREIGN KEY ("idSerie") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turmas" ADD FOREIGN KEY ("rgProfessor") REFERENCES "Professores"("rg") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArquivosProfessor" ADD FOREIGN KEY ("rgProfessor") REFERENCES "Professores"("rg") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topicos" ADD FOREIGN KEY ("idTurma") REFERENCES "Turmas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materiais" ADD FOREIGN KEY ("idTopico") REFERENCES "Topicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividades" ADD FOREIGN KEY ("idTopico") REFERENCES "Topicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadesAluno" ADD FOREIGN KEY ("raAluno") REFERENCES "Alunos"("ra") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadesAluno" ADD FOREIGN KEY ("idAtividade") REFERENCES "Atividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadesAluno" ADD FOREIGN KEY ("idTurma") REFERENCES "Turmas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testes" ADD FOREIGN KEY ("idTopico") REFERENCES "Topicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestesAluno" ADD FOREIGN KEY ("idTeste") REFERENCES "Testes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestesAluno" ADD FOREIGN KEY ("raAluno") REFERENCES "Alunos"("ra") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestesAluno" ADD FOREIGN KEY ("idTurma") REFERENCES "Turmas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArquivosMateriais" ADD FOREIGN KEY ("idArquivoProfessor") REFERENCES "ArquivosProfessor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArquivosMateriais" ADD FOREIGN KEY ("idMaterial") REFERENCES "Materiais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArquivosAtividades" ADD FOREIGN KEY ("idArquivoProfessor") REFERENCES "ArquivosProfessor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArquivosAtividades" ADD FOREIGN KEY ("idAtividade") REFERENCES "Atividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
