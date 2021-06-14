-- CreateTable
CREATE TABLE `Alunos` (
    `ra` INTEGER NOT NULL AUTO_INCREMENT,
    `telefone` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `idSerie` INTEGER NOT NULL,
UNIQUE INDEX `Alunos.email_unique`(`email`),

    PRIMARY KEY (`ra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Series` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `curso` ENUM('ENFERMAGEM', 'EDIFICACOES', 'GEODESIA', 'INFORMATICA', 'MECANICA', 'QUALIDADE') NOT NULL,
    `tipo` ENUM('MEDIOTECNICO', 'TECNICO') NOT NULL,
    `ano` VARCHAR(191) NOT NULL,
    `periodo` ENUM('DIURNO', 'NOTURNO') NOT NULL,
    `sigla` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mensagem` VARCHAR(191) NOT NULL,
    `origem` ENUM('PROFESSOR', 'ALUNO') NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rgProfessor` VARCHAR(191) NOT NULL,
    `raAluno` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turmas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `icone` VARCHAR(191) NOT NULL,
    `corPrim` VARCHAR(191) NOT NULL,
    `corSec` VARCHAR(191) NOT NULL,
    `idSerie` INTEGER NOT NULL,
    `rgProfessor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professores` (
    `rg` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
UNIQUE INDEX `Professores.email_unique`(`email`),

    PRIMARY KEY (`rg`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArquivosProfessor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `rgProfessor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `idTurma` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materiais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `conteudo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `idTopico` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atividades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conteudo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `dataInicio` DATETIME(3) NOT NULL,
    `dataFim` DATETIME(3) NOT NULL,
    `idTopico` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AtividadesAluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataEnvio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `link` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nota` DECIMAL(65, 30),
    `raAluno` INTEGER NOT NULL,
    `idAtividade` INTEGER NOT NULL,
    `idTurma` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conteudo` VARCHAR(191) NOT NULL,
    `dataInicio` DATETIME(3) NOT NULL,
    `dataFim` DATETIME(3) NOT NULL,
    `idTopico` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestesAluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataEnvio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nota` DECIMAL(65, 30) NOT NULL,
    `idTeste` INTEGER NOT NULL,
    `raAluno` INTEGER NOT NULL,
    `idTurma` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArquivosMateriais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idArquivoProfessor` INTEGER NOT NULL,
    `idMaterial` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArquivosAtividades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idArquivoProfessor` INTEGER NOT NULL,
    `idAtividade` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alunos` ADD FOREIGN KEY (`idSerie`) REFERENCES `Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversas` ADD FOREIGN KEY (`rgProfessor`) REFERENCES `Professores`(`rg`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversas` ADD FOREIGN KEY (`raAluno`) REFERENCES `Alunos`(`ra`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turmas` ADD FOREIGN KEY (`idSerie`) REFERENCES `Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turmas` ADD FOREIGN KEY (`rgProfessor`) REFERENCES `Professores`(`rg`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArquivosProfessor` ADD FOREIGN KEY (`rgProfessor`) REFERENCES `Professores`(`rg`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Topicos` ADD FOREIGN KEY (`idTurma`) REFERENCES `Turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materiais` ADD FOREIGN KEY (`idTopico`) REFERENCES `Topicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atividades` ADD FOREIGN KEY (`idTopico`) REFERENCES `Topicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AtividadesAluno` ADD FOREIGN KEY (`raAluno`) REFERENCES `Alunos`(`ra`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AtividadesAluno` ADD FOREIGN KEY (`idAtividade`) REFERENCES `Atividades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AtividadesAluno` ADD FOREIGN KEY (`idTurma`) REFERENCES `Turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Testes` ADD FOREIGN KEY (`idTopico`) REFERENCES `Topicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestesAluno` ADD FOREIGN KEY (`idTeste`) REFERENCES `Testes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestesAluno` ADD FOREIGN KEY (`raAluno`) REFERENCES `Alunos`(`ra`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestesAluno` ADD FOREIGN KEY (`idTurma`) REFERENCES `Turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArquivosMateriais` ADD FOREIGN KEY (`idArquivoProfessor`) REFERENCES `ArquivosProfessor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArquivosMateriais` ADD FOREIGN KEY (`idMaterial`) REFERENCES `Materiais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArquivosAtividades` ADD FOREIGN KEY (`idArquivoProfessor`) REFERENCES `ArquivosProfessor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArquivosAtividades` ADD FOREIGN KEY (`idAtividade`) REFERENCES `Atividades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
