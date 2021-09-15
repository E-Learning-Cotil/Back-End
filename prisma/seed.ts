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

	const createManyCores = await prisma.cores.createMany({
		data: [
			{
				corPrim: "#9F18DF",
				corSec: "#6C1795"
			},
			{
				corPrim: "#3D84C4",
				corSec: "#041958"
			},
			{
				corPrim: "#0CBE29",
				corSec: "#009418"
			},
			{
				corPrim: "#DE8114",
				corSec: "#A43B00"
			},
			{
				corPrim: "#E03131",
				corSec: "#820000"
			}
		]
	})

	const createManyIcones = await prisma.icones.createMany({
		data: [
			{ link: "https://imgur.com/hI42Ima.png", altLink: "https://imgur.com/sLFPBVG.png"}, //Cadeira de rodas
			{ link: "https://imgur.com/RqB36Ic.png", altLink: "https://imgur.com/qABVeOS.png"}, //Alergia
			{ link: "https://imgur.com/ICxvJ0R.png", altLink: "https://imgur.com/0PgKx6m.png"}, //Língua de sinais
			{ link: "https://imgur.com/M5rQU9k.png", altLink: "https://imgur.com/Qu6Bu8l.png"}, //Android
			{ link: "https://imgur.com/bEzrJ51.png", altLink: "https://imgur.com/TFReefH.png"}, //Maçã
			{ link: "https://imgur.com/49bM31x.png", altLink: "https://imgur.com/oz3Ef6Y.png"}, //Bebê
			{ link: "https://imgur.com/q1Z4xAq.png", altLink: "https://imgur.com/y19mjT2.png"}, //Bactérias
			{ link: "https://imgur.com/mFdPQwa.png", altLink: "https://imgur.com/4Pf2Ecx.png"}, //Justiça
			{ link: "https://imgur.com/MvQx25I.png", altLink: "https://imgur.com/I1WMz2U.png"}, //Mini primeiros socorros
			{ link: "https://imgur.com/D2NvXNo.png", altLink: "https://imgur.com/5eMY7Ve.png"}, //Basquete
			{ link: "https://imgur.com/lRHSpbP.png", altLink: "https://imgur.com/wmARD9H.png"}, //Cama
			{ link: "https://imgur.com/nkdyWtK.png", altLink: "https://imgur.com/EqPCzWA.png"}, //Bíblia
			{ link: "https://imgur.com/KTxFezy.png", altLink: "https://imgur.com/Oq7aBwb.png"}, //Bitcoin
			{ link: "https://imgur.com/RwAqO6d.png", altLink: "https://imgur.com/gUAMj77.png"}, //Osso
			{ link: "https://imgur.com/LQJRqMt.png", altLink: "https://imgur.com/0I6aNQN.png"}, //Livro de medicina
			{ link: "https://imgur.com/LQJRqMt.png", altLink: "https://imgur.com/0I6aNQN.png"}, //Livro de medicina
			{ link: "https://imgur.com/zUC9ayI.png", altLink: "https://imgur.com/NpnDwvC.png"}, //Braille
			{ link: "https://imgur.com/p5zwIzA.png", altLink: "https://imgur.com/T8vVzgP.png"}, //Cérebro
			{ link: "https://imgur.com/5cCh94l.png", altLink: "https://imgur.com/zn0sS8d.png"}, //Maleta
			{ link: "https://imgur.com/mjmcPrq.png", altLink: "https://imgur.com/vAfnx6z.png"}, //Inseto
			{ link: "https://imgur.com/tuEMyos.png", altLink: "https://imgur.com/KxDgsiO.png"}, //Prédio
			{ link: "https://imgur.com/KZ0j8RR.png", altLink: "https://imgur.com/orL9tEB.png"}, //Calendário
			{ link: "https://imgur.com/NE9yG0N.png", altLink: "https://imgur.com/RjnRHap.png"}, //Câmera
			{ link: "https://imgur.com/MjOss7B.png", altLink: "https://imgur.com/lNkBi6V.png"}, //Bengala doce
			{ link: "https://imgur.com/3R9E238.png", altLink: "https://imgur.com/wvmL3qf.png"}, //Pílulas
			{ link: "https://imgur.com/XPi2row.png", altLink: "https://imgur.com/Hafggk1.png"}, //Carro
			{ link: "https://imgur.com/F98AU3Z.png", altLink: "https://imgur.com/GFDOPf9.png"}, //Cenoura
			{ link: "https://imgur.com/WX7CiPD.png", altLink: "https://imgur.com/oXPNStr.png"}, //Professor e lousa
			{ link: "https://imgur.com/C8As9qC.png", altLink: "https://imgur.com/LKH1iBd.png"}, //Estatísticas
			{ link: "https://imgur.com/CqeYgGQ.png", altLink: "https://imgur.com/7c3GBZ8.png"}, //Xadrez
			{ link: "https://imgur.com/S3xLkt8.png", altLink: "https://imgur.com/Ttc4qZF.png"}, //Criança
			{ link: "https://imgur.com/N7QEwIL.png", altLink: "https://imgur.com/xkg48Dx.png"}, //Cidade
			{ link: "https://imgur.com/8AFXjY2.png", altLink: "https://imgur.com/uabF0Vi.png"}, //Prancheta
			{ link: "https://imgur.com/xoe8JLN.png", altLink: "https://imgur.com/IzdzQum.png"}, //Clima
			{ link: "https://imgur.com/s7CYzIZ.png", altLink: "https://imgur.com/o4pyO5W.png"}, //Código
			{ link: "https://imgur.com/259woRj.png", altLink: "https://imgur.com/bJvW9ph.png"}, //Muleta
			{ link: "https://imgur.com/y8bUlK3.png", altLink: "https://imgur.com/O3mXNak.png"}, //Banco de dados
			{ link: "https://imgur.com/mRULZDy.png", altLink: "https://imgur.com/WnqCHuk.png"}, //Monitor
			{ link: "https://imgur.com/PM6Jk1k.png", altLink: "https://imgur.com/bZMLnAd.png"}, //Germes
			{ link: "https://imgur.com/UtQzLSk.png", altLink: "https://imgur.com/oVYXEaE.png"}, //Divisão
			{ link: "https://imgur.com/w9Z95Pw.png", altLink: "https://imgur.com/qdgabqO.png"}, //DNA
			{ link: "https://imgur.com/JfJVTsP.png", altLink: "https://imgur.com/jHIs9Ch.png"}, //Cachorro
			{ link: "https://imgur.com/l2k6Kab.png", altLink: "https://imgur.com/5kV7SZo.png"}, //Dinheiro
			{ link: "https://imgur.com/Fg5sLPu.png", altLink: "https://imgur.com/pAvsTe5.png"}, //Pássaro
			{ link: "https://imgur.com/tJ3ppOX.png", altLink: "https://imgur.com/RSQPwka.png"}, //Bússola
			{ link: "https://imgur.com/31r9Qsl.png", altLink: "https://imgur.com/nkUzzqW.png"}, //Tambor
			{ link: "https://imgur.com/fkC9ySq.png", altLink: "https://imgur.com/kFb4Rdt.png"}, //Frango
			{ link: "https://imgur.com/VvEIiPV.png", altLink: "https://imgur.com/RdlJNaY.png"}, //Folha de árvore
			{ link: "https://imgur.com/j1vBkFI.png", altLink: "https://imgur.com/3dgarPP.png"}, //Olho
			{ link: "https://imgur.com/13TKLPv.png", altLink: "https://imgur.com/D8leDXu.png"}, //Catavento
			{ link: "https://imgur.com/5wtiNcA.png", altLink: "https://imgur.com/55uzGvw.png"}, //Arquivo
			{ link: "https://imgur.com/vPghBcs.png", altLink: "https://imgur.com/kAwn5qC.png"}, //Filme
			{ link: "https://imgur.com/s3L6ULg.png", altLink: "https://imgur.com/7DFqrry.png"}, //Fogo
			{ link: "https://imgur.com/EGn17dZ.png", altLink: "https://imgur.com/8WKxHa8.png"}, //Extintor 
			{ link: "https://imgur.com/ukShPWH.png", altLink: "https://imgur.com/iGbaBVG.png"}, //Primeiros socorros
			{ link: "https://imgur.com/X1k2lva.png", altLink: "https://imgur.com/se7ICN3.png"}, //Peixe
			{ link: "https://imgur.com/UtXPumM.png", altLink: "https://imgur.com/qgAqB16.png"}, //Erlenmeyer
			{ link: "https://imgur.com/acef1ts.png", altLink: "https://imgur.com/i4jeNq9.png"}, //Sapo
			{ link: "https://imgur.com/TBuYOwr.png", altLink: "https://imgur.com/zgke9vE.png"}, //Jogos
			{ link: "https://imgur.com/lliy56B.png", altLink: "https://imgur.com/oG9IL4d.png"}, //Diamante
			{ link: "https://imgur.com/8YkMkJY.png", altLink: "https://imgur.com/hdmWf0I.png"}, //Planeta Terra
			{ link: "https://imgur.com/WCX1HNq.png", altLink: "https://imgur.com/xYQOLOQ.png"}, //Globo
			{ link: "https://imgur.com/1kWYUjE.png", altLink: "https://imgur.com/wOQKKbq.png"}, //Violão
			{ link: "https://imgur.com/KxDSkG6.png", altLink: "https://imgur.com/sLfzXib.png"}, //Martelo
			{ link: "https://imgur.com/WPOCwZd.png", altLink: "https://imgur.com/9oCt9IU.png"}, //Capacete de segurança
			{ link: "https://imgur.com/j5xaDF4.png", altLink: "https://imgur.com/GWZmz6A.png"}, //Disco rígido
			{ link: "https://imgur.com/ABFeb56.png", altLink: "https://imgur.com/FkcEQcr.png"}, //Pessoa com máscara
			{ link: "https://imgur.com/NZ5eoen.png", altLink: "https://imgur.com/JOSBqlD.png"}, //Fone de ouvido
			{ link: "https://imgur.com/Jvliz6x.png", altLink: "https://imgur.com/gS4nzyM.png"}, //Helicóptero
			{ link: "https://imgur.com/7WUnaSk.png", altLink: "https://imgur.com/mxAjBsv.png"}, //Hospital
			{ link: "https://imgur.com/IbXDDBr.png", altLink: "https://imgur.com/WMoxjE2.png"}, //Imagem
			{ link: "https://imgur.com/h1iiU6i.png", altLink: "https://imgur.com/kkZCv8G.png"}, //Indústria
			{ link: "https://imgur.com/v8hyq2J.png", altLink: "https://imgur.com/zl8IIAc.png"}, //Teclado
			{ link: "https://imgur.com/H5aZIOj.png", altLink: "https://imgur.com/ejsOyNm.png"}, //Notebook com código
			{ link: "https://imgur.com/LHgcDQw.png", altLink: "https://imgur.com/WQPCcW1.png"}, //Notebook
			{ link: "https://imgur.com/ztCteCp.png", altLink: "https://imgur.com/l2lXgA1.png"}, //Lâmpada
			{ link: "https://imgur.com/P8tSeqD.png", altLink: "https://imgur.com/OdqdrSN.png"}, //Pulmões
			{ link: "https://imgur.com/fI04qrC.png", altLink: "https://imgur.com/YFd0h3e.png"}, //Mapa
			{ link: "https://imgur.com/nMR4lJx.png", altLink: "https://imgur.com/kfVu4K3.png"}, //Placas/Rotas
			{ link: "https://imgur.com/7V2VfdU.png", altLink: "https://imgur.com/LlN27no.png"}, //MicroChip
			{ link: "https://imgur.com/a5Ek25r.png", altLink: "https://imgur.com/8aGV3HF.png"}, //Microfone
			{ link: "https://imgur.com/cDlZYuw.png", altLink: "https://imgur.com/3SFq1rm.png"}, //Microscópio
			{ link: "https://imgur.com/Def3xJr.png", altLink: "https://imgur.com/tTXKv0e.png"}, //Celular
			{ link: "https://imgur.com/Sgjivf0.png", altLink: "https://imgur.com/jFuEmXv.png"}, //Jornal
			{ link: "https://imgur.com/MqTnzXF.png", altLink: "https://imgur.com/eCZhrkT.png"}, //Pincel
			{ link: "https://imgur.com/duj0558.png", altLink: "https://imgur.com/yBZQMwq.png"}, //Paleta de cores
			{ link: "https://imgur.com/0RTUryf.png", altLink: "https://imgur.com/lX1HFSX.png"}, //Atlas
			{ link: "https://imgur.com/vdGcx6w.png", altLink: "https://imgur.com/gj7FI90.png"}, //Lápis
			{ link: "https://imgur.com/ddOkX65.png", altLink: "https://imgur.com/H5eB4DY.png"}, //Porcentagem
			{ link: "https://imgur.com/FSMrVnA.png", altLink: "https://imgur.com/FbDBQ88.png"}, //Foto-Vídeo
			{ link: "https://imgur.com/rVWqogt.png", altLink: "https://imgur.com/ZYhIrNr.png"}, //Remédios
			{ link: "https://imgur.com/4Zwe3ic.png", altLink: "https://imgur.com/KoSGqld.png"}, //Avião
			{ link: "https://imgur.com/KYdUCe5.png", altLink: "https://imgur.com/4RqJXpE.png"}, //Tomada
			{ link: "https://imgur.com/JVmkCAG.png", altLink: "https://imgur.com/4zPWUBi.png"}, //Pote de remédios
			{ link: "https://imgur.com/IBI9d4S.png", altLink: "https://imgur.com/oWMgiTJ.png"}, //Átomo
			{ link: "https://imgur.com/NxdvFSN.png", altLink: "https://imgur.com/NKZRXAt.png"}, //Robô
			{ link: "https://imgur.com/5MB5Eod.png", altLink: "https://imgur.com/oExSe5l.png"}, //Foguete
			{ link: "https://imgur.com/2ZBJwCO.png", altLink: "https://imgur.com/SuIMBV8.png"}, //Régua
			{ link: "https://imgur.com/K0pWjdM.png", altLink: "https://imgur.com/hS6eNLw.png"}, //Formas geométricas
			{ link: "https://imgur.com/u5pCxMQ.png", altLink: "https://imgur.com/MbsOhcT.png"}, //Imunização
			{ link: "https://imgur.com/zrtgPfz.png", altLink: "https://imgur.com/WdIOsQy.png"}, //Van
			{ link: "https://imgur.com/iZxIcgX.png", altLink: "https://imgur.com/Mz3nrch.png"}, //Diagrama
			{ link: "https://imgur.com/zzL9355.png", altLink: "https://imgur.com/68rZNHb.png"}, //Caveira
			{ link: "https://imgur.com/gy0bKSX.png", altLink: "https://imgur.com/hONlybV.png"}, //Floco de neve
			{ link: "https://imgur.com/foYg5yw.png", altLink: "https://imgur.com/ETne5kF.png"}, //Sabonete
			{ link: "https://imgur.com/rl8wzn0.png", altLink: "https://imgur.com/UoWmZud.png"}, //Placa solar
			{ link: "https://imgur.com/TLGsHAE.png", altLink: "https://imgur.com/vmjaV0v.png"}, //Aranha
			{ link: "https://imgur.com/WAgvwi0.png", altLink: "https://imgur.com/htKaFKu.png"}, //Perfume
			{ link: "https://imgur.com/lqZCwxN.png", altLink: "https://imgur.com/JTEsTam.png"}, //Raíz quadrada
			{ link: "https://imgur.com/vC9lxvs.png", altLink: "https://imgur.com/U2SeEP8.png"}, //Estetoscópio
			{ link: "https://imgur.com/60cOS6g.png", altLink: "https://imgur.com/mFlxwfc.png"}, //Natação
			{ link: "https://imgur.com/CZlX1RH.png", altLink: "https://imgur.com/3cNix3I.png"}, //Tablet
			{ link: "https://imgur.com/xgO0PAU.png", altLink: "https://imgur.com/Uu5SUN0.png"}, //Dentes
			{ link: "https://imgur.com/1T2sQIF.png", altLink: "https://imgur.com/uLE1Tav.png"}, //Termômetro
			{ link: "https://imgur.com/20MXVeR.png", altLink: "https://imgur.com/JdfqBgr.png"}, //Teatro
			{ link: "https://imgur.com/ao5xEB5.png", altLink: "https://imgur.com/aRDP0KU.png"}, //Ferramentas
			{ link: "https://imgur.com/4eg7VAI.png", altLink: "https://imgur.com/JvxhbBb.png"}, //Dente
			{ link: "https://imgur.com/wHeiTf3.png", altLink: "https://imgur.com/BWLoo9S.png"}, //Semáforo
			{ link: "https://imgur.com/0IWSbP6.png", altLink: "https://imgur.com/vavTUYR.png"}, //Pinheiro
			{ link: "https://imgur.com/fb6lRKd.png", altLink: "https://imgur.com/ux6iF2f.png"}, //Camiseta
			{ link: "https://imgur.com/i9TH9pC.png", altLink: "https://imgur.com/8Xe04mU.png"}, //TV
			{ link: "https://imgur.com/PTjeqT6.png", altLink: "https://imgur.com/VAtQFOX.png"}, //Talheres
			{ link: "https://imgur.com/wDpYzaX.png", altLink: "https://imgur.com/ATGSnPl.png"}, //Tubo de ensaio
			{ link: "https://imgur.com/gh5mcZm.png", altLink: "https://imgur.com/KnITmGQ.png"}, //Gravação
			{ link: "https://imgur.com/X8hRZKz.png", altLink: "https://imgur.com/oWT1snw.png"}, //Vírus
			{ link: "https://imgur.com/M8bmglI.png", altLink: "https://imgur.com/88TkZOU.png"}, //Chave de boca
		]
	})

	const createManyTurmas = await prisma.turmas.createMany({
		data: [
			{
				nome: 'Química',
				idIcone: 1,
				idCores: 1,
				idSerie: 1,
				rgProfessor: '12.345.678-1'
			},
			{
				nome: 'Física',
				idIcone: 2,
				idCores: 2,
				idSerie: 1,
				rgProfessor: '12.345.678-2'
			},
			{
				nome: 'Matemática',
				idIcone: 3,
				idCores: 3,
				idSerie: 2,
				rgProfessor: '12.345.678-3'
			},
			{
				nome: 'Português',
				idIcone: 4,
				idCores: 4,
				idSerie: 2,
				rgProfessor: '12.345.678-4'
			},
			{
				nome: 'Química',
				idIcone: 1,
				idCores: 2,
				idSerie: 3,
				rgProfessor: '12.345.678-1'
			},
			{
				nome: 'Física',
				idIcone: 2,
				idCores: 3,
				idSerie: 3,
				rgProfessor: '12.345.678-2'
			},
			{
				nome: 'Matemática',
				idIcone: 3,
				idCores: 4,
				idSerie: 4,
				rgProfessor: '12.345.678-3'
			},
			{
				nome: 'Português',
				idIcone: 4,
				idCores: 5,
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
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 1"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 2,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 2"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 3,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 3"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 4,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 4"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 5,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 5"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 6,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 6"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 7,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 7"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 8,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 8"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 9,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 9"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 10,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 10"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 11,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 11"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 12,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 12"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 13,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 13"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 14,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 14"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 15,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 15"
			},
			{
				conteudo: 'Conteúdo do teste',
				idTopico: 16,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
				nome: "Teste 16"
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
		createManyCores,
		createManyIcones,
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
