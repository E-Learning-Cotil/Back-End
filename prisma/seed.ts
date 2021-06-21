import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1) // tomorrow.toISOString()

const nextWeek = new Date(today)
nextWeek.setDate(nextWeek.getDate() + 7) // nextWeek.toISOString()

async function main() {
	const createManySeries = await prisma.series.createMany({
		data: [
			{
				curso: 'ENFERMAGEM',
				ano: '1',
				tipo: 'TECNICO',
				periodo: 'DIURNO',
				sigla: 'CT-ENFD'
			},
			{
				curso: 'EDIFICACOES',
				ano: '2',
				tipo: 'MEDIOTECNICO',
				periodo: 'NOTURNO',
				sigla: 'M-EDFN'
			},
			{
				curso: 'INFORMATICA',
				ano: '3',
				tipo: 'TECNICO',
				periodo: 'DIURNO',
				sigla: 'CT-INFD'
			},
			{
				curso: 'MECANICA',
				ano: '1',
				tipo: 'MEDIOTECNICO',
				periodo: 'NOTURNO',
				sigla: 'M-MECN'
			},
		],
		skipDuplicates: true,
	});

	const createManyAlunos = await prisma.alunos.createMany({
		data: [
			{
				telefone: '19987654321',
				email: 'emailAluno1@email.com',
				nome: 'João',
				idSerie: 1,
				foto: 'https://i.imgur.com/5hT8bpz.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19912345678',
				email: 'emailAluno2@email.com',
				nome: 'José',
				idSerie: 2,
				foto: 'https://i.imgur.com/5hT8bpz.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19987651234',
				email: 'emailAluno3@email.com',
				nome: 'Jorge',
				idSerie: 3,
				foto: 'https://i.imgur.com/5hT8bpz.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19956784321',
				email: 'emailAluno4@email.com',
				nome: 'Josué',
				idSerie: 4,
				foto: 'https://i.imgur.com/5hT8bpz.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
		],
		skipDuplicates: true,
	});

	const createManyProfessores = await prisma.professores.createMany({
		data: [
			{
				telefone: '19987654321',
				email: 'emailProfessor1@email.com',
				nome: 'Maria',
				rg: '12.345.678-1',
				foto: 'https://i.imgur.com/bHx9lr1.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19912345678',
				email: 'emailProfessor2@email.com',
				nome: 'Márcia',
				rg: '12.345.678-2',
				foto: 'https://i.imgur.com/bHx9lr1.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19987651234',
				email: 'emailProfessor3@email.com',
				nome: 'Mônica',
				rg: '12.345.678-3',
				foto: 'https://i.imgur.com/bHx9lr1.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19956784321',
				email: 'emailProfessor4@email.com',
				nome: 'Mariana',
				rg: '12.345.678-4',
				foto: 'https://i.imgur.com/bHx9lr1.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
		],
		skipDuplicates: true,
	});

	const createManyTurmas = await prisma.turmas.createMany({
		data: [
			{
				nome: 'Química',
				icone: 'quimica',
				corPrim: 'cor1',
				corSec: 'cor2',
				idSerie: 1,
				rgProfessor: '12.345.678-1'
			},
			{
				nome: 'Física',
				icone: 'fisica',
				corPrim: 'cor1',
				corSec: 'cor2',
				idSerie: 1,
				rgProfessor: '12.345.678-2'
			},
			{
				nome: 'Matemática',
				icone: 'matematica',
				corPrim: 'cor1',
				corSec: 'cor2',
				idSerie: 2,
				rgProfessor: '12.345.678-3'
			},
			{
				nome: 'Português',
				icone: 'portugues',
				corPrim: 'cor1',
				corSec: 'cor2',
				idSerie: 2,
				rgProfessor: '12.345.678-4'
			},
			{
				nome: 'Química',
				icone: 'quimica',
				corPrim: 'cor1',
				corSec: 'cor2',
				idSerie: 3,
				rgProfessor: '12.345.678-1'
			},
			{
				nome: 'Física',
				icone: 'fisica',
				corPrim: 'cor1',
				corSec: 'cor2',
				idSerie: 3,
				rgProfessor: '12.345.678-2'
			},
			{
				nome: 'Matemática',
				icone: 'matematica',
				corPrim: 'cor1',
				corSec: 'cor2',
				idSerie: 4,
				rgProfessor: '12.345.678-3'
			},
			{
				nome: 'Português',
				icone: 'portugues',
				corPrim: 'cor1',
				corSec: 'cor2',
				idSerie: 4,
				rgProfessor: '12.345.678-4'
			},
		],
		skipDuplicates: true,
	});

	const createManyTopicos = await prisma.topicos.createMany({
		data: [
			{
				nome: 'Tópico Química 1',
				descricao: 'Descrição do tópico de química',
				idTurma: 1
			},
			{
				nome: 'Tópico Química 2',
				descricao: 'Descrição do tópico de química',
				idTurma: 1
			},
			{
				nome: 'Tópico Física 1',
				descricao: 'Descrição do tópico de física',
				idTurma: 2
			},
			{
				nome: 'Tópico Física 2',
				descricao: 'Descrição do tópico de física',
				idTurma: 2
			},
			{
				nome: 'Tópico Matemática 1',
				descricao: 'Descrição do tópico de matemática',
				idTurma: 3
			},
			{
				nome: 'Tópico Matemática 2',
				descricao: 'Descrição do tópico de matemática',
				idTurma: 3
			},
			{
				nome: 'Tópico Português 1',
				descricao: 'Descrição do tópico de português',
				idTurma: 4
			},
			{
				nome: 'Tópico Português 2',
				descricao: 'Descrição do tópico de português',
				idTurma: 4
			},
			{
				nome: 'Tópico Química 1',
				descricao: 'Descrição do tópico de química',
				idTurma: 5
			},
			{
				nome: 'Tópico Química 2',
				descricao: 'Descrição do tópico de química',
				idTurma: 5
			},
			{
				nome: 'Tópico Física 1',
				descricao: 'Descrição do tópico de física',
				idTurma: 6
			},
			{
				nome: 'Tópico Física 2',
				descricao: 'Descrição do tópico de física',
				idTurma: 6
			},
			{
				nome: 'Tópico Matemática 1',
				descricao: 'Descrição do tópico de matemática',
				idTurma: 7
			},
			{
				nome: 'Tópico Matemática 2',
				descricao: 'Descrição do tópico de matemática',
				idTurma: 7
			},
			{
				nome: 'Tópico Português 1',
				descricao: 'Descrição do tópico de português',
				idTurma: 8
			},
			{
				nome: 'Tópico Português 2',
				descricao: 'Descrição do tópico de português',
				idTurma: 8
			},
		],
		skipDuplicates: true,
	});

	const createManyMateriais = await prisma.materiais.createMany({
		data: [
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 1
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 2
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 3
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 4
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 5
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 6
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 7
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 8
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 9
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 10
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 11
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 12
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 13
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 14
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 15
			},
			{
				conteudo: 'Conteúdo do material',
				nome: 'Nome do Material',
				idTopico: 16
			},
		],
		skipDuplicates: true,
	});

	const createManyAtividades = await prisma.atividades.createMany({
		data: [
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 1,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 2,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 3,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 4,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 5,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 6,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 7,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 8,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 9,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 10,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 11,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 12,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 13,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 14,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 15,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo da atividade',
				nome: 'Nome da Atividade',
				idTopico: 16,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
		],
		skipDuplicates: true,
	});

	const createManyTestes = await prisma.testes.createMany({
		data: [
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 1,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 2,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 3,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 4,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 5,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 6,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 7,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 8,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 9,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 10,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 11,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 12,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 13,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 14,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 15,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 16,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
		],
		skipDuplicates: true,
	});

	const createManyAtividadesAluno = await prisma.atividadesAluno.createMany({
		data: [
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 1,
				idAtividade: 1,
				idTurma: 1
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 1,
				idAtividade: 2,
				idTurma: 1
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 1,
				idAtividade: 3,
				idTurma: 2
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 1,
				idAtividade: 4,
				idTurma: 2
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 2,
				idAtividade: 5,
				idTurma: 3
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 2,
				idAtividade: 6,
				idTurma: 3
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 2,
				idAtividade: 7,
				idTurma: 4
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 2,
				idAtividade: 8,
				idTurma: 4
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 3,
				idAtividade: 9,
				idTurma: 5
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 3,
				idAtividade: 10,
				idTurma: 5
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 3,
				idAtividade: 11,
				idTurma: 6
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 3,
				idAtividade: 12,
				idTurma: 6
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 4,
				idAtividade: 13,
				idTurma: 7
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 4,
				idAtividade: 14,
				idTurma: 7
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 4,
				idAtividade: 15,
				idTurma: 8
			},
			{
				link: 'https://linkResolucaoAtividade.com',
				nome: 'ResolucaoDaAtividade',
				raAluno: 4,
				idAtividade: 16,
				idTurma: 8
			},
		],
		skipDuplicates: true,
	});

	const createManyTestesAluno = await prisma.testesAluno.createMany({
		data: [
			{
				nota: 0,
				raAluno: 1,
				idTeste: 1,
				idTurma: 1
			},
			{
				nota: 1,
				raAluno: 1,
				idTeste: 2,
				idTurma: 1
			},
			{
				nota: 2,
				raAluno: 1,
				idTeste: 3,
				idTurma: 2
			},
			{
				nota: 3,
				raAluno: 1,
				idTeste: 4,
				idTurma: 2
			},
			{
				nota: 4,
				raAluno: 2,
				idTeste: 5,
				idTurma: 3
			},
			{
				nota: 5,
				raAluno: 2,
				idTeste: 6,
				idTurma: 3
			},
			{
				nota: 6,
				raAluno: 2,
				idTeste: 7,
				idTurma: 4
			},
			{
				nota: 7,
				raAluno: 2,
				idTeste: 8,
				idTurma: 4
			},
			{
				nota: 8,
				raAluno: 3,
				idTeste: 9,
				idTurma: 5
			},
			{
				nota: 9,
				raAluno: 3,
				idTeste: 10,
				idTurma: 5
			},
			{
				nota: 10,
				raAluno: 3,
				idTeste: 11,
				idTurma: 6
			},
			{
				nota: 9,
				raAluno: 3,
				idTeste: 12,
				idTurma: 6
			},
			{
				nota: 8,
				raAluno: 4,
				idTeste: 13,
				idTurma: 7
			},
			{
				nota: 7,
				raAluno: 4,
				idTeste: 14,
				idTurma: 7
			},
			{
				nota: 6,
				raAluno: 4,
				idTeste: 15,
				idTurma: 8
			},
			{
				nota: 5,
				raAluno: 4,
				idTeste: 16,
				idTurma: 8
			},
		],
		skipDuplicates: true,
	});

	console.log({
		createManySeries, 
		createManyAlunos, 
		createManyProfessores, 
		createManyTurmas,
		createManyTopicos,
		createManyMateriais,
		createManyAtividades,
		createManyTestes,
		createManyAtividadesAluno,
		createManyTestesAluno
	});
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	});
