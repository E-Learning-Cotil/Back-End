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
				curso: 'INFORMATICA',
				ano: '3',
				tipo: 'MEDIOTECNICO',
				periodo: 'DIURNO',
				sigla: 'M-INFD'
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
				email: 'eduardo@email.com',
				nome: 'Eduardo Correia',
				idSerie: 1,
				foto: 'https://avatars.githubusercontent.com/u/60967470?v=4',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19912345678',
				email: 'gianni@email.com',
				nome: 'Gianni Labella',
				idSerie: 1,
				foto: 'https://avatars.githubusercontent.com/u/59416872?v=4',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19987651234',
				email: 'bruno@email.com',
				nome: 'Bruno Corrêa',
				idSerie: 2,
				foto: 'https://avatars.githubusercontent.com/u/60991787?v=4',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19987651234',
				email: 'matheus@email.com',
				nome: 'Matheus Mastelini',
				idSerie: 2,
				foto: 'https://avatars.githubusercontent.com/u/60967298?v=4',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			}
		],
		skipDuplicates: true,
	});

	const createManyProfessores = await prisma.professores.createMany({
		data: [
			{
				telefone: '19987654323',
				email: 'priscila@email.com',
				nome: 'Priscila Frizzarin',
				rg: '12.345.678-1',
				foto: 'https://www.cotil.unicamp.br/wp-content/uploads/2019/03/Priscila-Keli-de-Lima-Pinto-Frizzarin-150x150.jpeg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19912345678',
				email: 'rosana@email.com',
				nome: 'Rosana Ribeiro',
				rg: '12.345.678-2',
				foto: 'https://www.cotil.unicamp.br/wp-content/uploads/2019/03/Rosana-Ribeiro-150x150.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19987651234',
				email: 'tania@email.com',
				nome: 'Tânia Basso',
				rg: '12.345.678-3',
				foto: 'https://www.cotil.unicamp.br/wp-content/uploads/2019/03/Tania-Basso-150x150.jpg',
				senha: '$2b$10$UMhTts2J9TZ73yYnhpoVz.X374teS6sIff29VntcbFvLlx5RdTBqi'
			},
			{
				telefone: '19956784321',
				email: 'simone@email.com',
				nome: 'Simone Dapólito',
				rg: '12.345.678-4',
				foto: 'https://www.cotil.unicamp.br/wp-content/uploads/2019/02/Simone-Berbert-150x150.jpg',
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
				nome: 'Des. Aplic. Web',
				idIcone: 1,
				idCores: 1,
				idSerie: 1,
				rgProfessor: '12.345.678-4'
			},
			{
				nome: 'Ling. Prog. Mult.',
				idIcone: 2,
				idCores: 2,
				idSerie: 1,
				rgProfessor: '12.345.678-3'
			},
			{
				nome: 'Des. de Projetos',
				idIcone: 3,
				idCores: 3,
				idSerie: 1,
				rgProfessor: '12.345.678-2'
			},
			{
				nome: 'Sistemas Operacionais',
				idIcone: 4,
				idCores: 4,
				idSerie: 1,
				rgProfessor: '12.345.678-2'
			},
			{
				nome: 'Introdução à informática',
				idIcone: 1,
				idCores: 2,
				idSerie: 1,
				rgProfessor: '12.345.678-2'
			},
			{
				nome: 'Redes',
				idIcone: 2,
				idCores: 3,
				idSerie: 1,
				rgProfessor: '12.345.678-1'
			},
			{
				nome: 'Técnicas Digitais',
				idIcone: 3,
				idCores: 4,
				idSerie: 1,
				rgProfessor: '12.345.678-3'
			},
			{
				nome: 'APSI',
				idIcone: 4,
				idCores: 5,
				idSerie: 1,
				rgProfessor: '12.345.678-4'
			},
		],
		skipDuplicates: true,
	});

	const createManyTopicos = await prisma.topicos.createMany({
		data: [
			{
				nome: 'Bootstrap',
				descricao: 'Bootstrap é um framework web com código-fonte aberto para desenvolvimento de componentes de interface e front-end para sites e aplicações web usando HTML, CSS e JavaScript, baseado em modelos de design para a tipografia, melhorando a experiência do usuário em um site amigável e responsivo.',
				idTurma: 1
			},
			{
				nome: 'PHP',
				descricao: 'PHP é uma linguagem interpretada livre, usada originalmente apenas para o desenvolvimento de aplicações presentes e atuantes no lado do servidor, capazes de gerar conteúdo dinâmico na World Wide Web.',
				idTurma: 1
			},
			{
				nome: 'JTable',
				descricao: 'O JTable é um componente visual utilizado para visualizar dados em forma de grid, com cabeçalho, colunas e linhas e é um dos componentes mais complexos do pacote Swing. ... Model: Cuida dos dados da tabela, ou seja, é quem controla e distribui os mesmos. É implementado pela interface TableModel.',
				idTurma: 2
			},
			{
				nome: 'API',
				descricao: 'API é um conjunto de rotinas e padrões de programação para acesso a um aplicativo de software ou plataforma baseado na Web. A sigla API refere-se ao termo em inglês "Application Programming Interface" que significa em tradução para o português "Interface de Programação de Aplicativos".',
				idTurma: 2
			},
			{
				nome: 'Orientações 1ª apresentação',
				descricao: 'Orientações para a nossa primeira apresentação do ano do TCC da sala do diurno do ano de 2021',
				idTurma: 3
			},
			{
				nome: 'Android',
				descricao: 'Android é um sistema operacional baseado no núcleo Linux, desenvolvido por um consórcio de desenvolvedores conhecido como Open Handset Alliance, sendo o principal colaborador o Google.',
				idTurma: 4
			},
			{
				nome: 'Linux',
				descricao: 'Linux é um termo popularmente empregado para se referir a sistemas operativos ou sistemas operacionais que utilizam o Kernel Linux. O núcleo foi desenvolvido pelo programador finlandês Linus Torvalds, inspirado no sistema Minix.',
				idTurma: 4
			},
			{
				nome: 'macOS',
				descricao: 'macOS é um sistema operativo proprietário desenvolvido e distribuído pela empresa Apple Inc. desde 2001 e destinado exclusivamente aos computadores Mac. Dentro do mercado de desktops, laptops e pelo uso da web, é o segundo sistema operacional desktop mais usado, depois do Microsoft Windows.',
				idTurma: 4
			},
			{
				nome: 'Windows',
				descricao: 'Windows é um sistema operacional de multitarefas para computadores e dispositivos móveis, desenvolvido pela Microsoft. A palavra Windows significa literalmente “janelas”, na tradução do inglês para o português.',
				idTurma: 4
			}
		],
		skipDuplicates: true,
	});

	const createManyMateriais = await prisma.materiais.createMany({
		data: [
			{
				conteudo: '"<h3>Responsividade</h3><p>Responsabilidade é o dever de arcar com as consequências do próprio comportamento ou do comportamento de outras pessoas. É uma <b>obrigação jurídica</b> concluída a partir do desrespeito de algum direito, no decurso de uma ação contrária ao ordenamento jurídico.</p>"',
				nome: 'Responsividade',
				idTopico: 1
			},
			{
				conteudo: '"<h3>Entrada de arquivos</h3><ul><li>1º passo: Adicionar o jumbotron</li><li>2º passo: Adicionar o código javascript</li><li>3º passo: Pronto! Agora é só usar o arquivo!</li></ul>"',
				nome: 'Arquivos',
				idTopico: 1
			},
			{
				conteudo: '"<h2>Windows 7</h2><p>Windows 7 é uma versão do Microsoft Windows, uma série de sistemas operativos produzidos pela Microsoft para uso em computadores pessoais, incluindo computadores domésticos e empresariais, laptops, tablets e PCs de centros de mídia, entre outros.[4] Windows 7 foi lançado para empresas no dia 22 de julho de 2009, e começou a ser vendido livremente para usuários comuns às 00h00 do dia 22 de outubro de 2009, menos de três anos depois do lançamento de seu predecessor, Windows Vista. Pouco mais de três anos depois, o seu sucessor, Windows 8, foi lançado em 26 de outubro de 2012.</p><br /><p><a href="https://pt.wikipedia.org/wiki/Windows_7">Saiba mais aqui</a></p>"',
				nome: 'Windows 7',
				idTopico: 9
			},
			{
				conteudo: '"<h2>Windows 10</h2><p>Windows 10 é uma versão do Microsoft Windows, uma série de sistemas operativos comercializados pela Microsoft. A sua primeira versão de testes foi lançada a 1 de outubro de 2014 e o lançamento oficial foi em 29 de julho de 2015.[2] Foi o sucessor do Windows 8.1. O Windows 10 foi disponibilizado para download via MSDN e Technet como uma atualização gratuita para cópias de varejo de usuários do Windows 8 e Windows 8.1 através da Windows Store e também para usuários do Windows 7 via Windows Update no primeiro ano de lançamento.[3] O sistema recebe novas atualizações de forma contínua, que estão disponíveis sem custo adicional para os usuários, além de compilações de testes adicionais do Windows 10 que estão disponíveis para o usuários do Windows Insider.</p><br /><p><a href="https://pt.wikipedia.org/wiki/Windows_10">Saiba mais aqui</a></p>"',
				nome: 'Windows 10',
				idTopico: 9
			}
		],
		skipDuplicates: true,
	});

	const createManyAtividades = await prisma.atividades.createMany({
		data: [
			{
				conteudo: '"<h2>Boostrap - JUMBOTRON</h2><p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p><br /><p><a href="https://getbootstrap.com/docs/4.5/components/jumbotron/">Documentação do Jumbotron</a></p>"',
				nome: 'Aplicando Jumbotron',
				idTopico: 1,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: '"<h2>Boostrap - MODAL</h2><p>Before getting started with Bootstrap’s modal component, be sure to read the following as our menu options have recently changed. Modals are built with HTML, CSS, and JavaScript. They’re positioned over everything else in the document and remove scroll from the so that modal content scrolls instead.</p><br /><p><a href="https://getbootstrap.com/docs/4.5/components/modal/">Documentação do Modal</a></p>"',
				nome: 'Aplicando Modal',
				idTopico: 1,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: '"<h2>Atividade - Resumo do Windows 7</h2><p>Faça um resumo do conteúdo aprendido sobre o windows 7</p><br /><p><a href="https://pt.wikipedia.org/wiki/Windows_7">Saiba mais aqui</a></p>"',
				nome: 'Resumo Windows 7',
				idTopico: 9,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			},
			{
				conteudo: '"<h2>Atividade - Resumo do Windows 10</h2><p>Faça um resumo do conteúdo aprendido sobre o windows 10</p><br /><p><a href="https://pt.wikipedia.org/wiki/Windows_10">Saiba mais aqui</a></p>"',
				nome: 'Resumo Windows 10',
				idTopico: 9,
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`
			}
		],
		skipDuplicates: true,
	});

	const createManyTestes = await prisma.testes.createMany({
		data: [
			{
				conteudo: '[{\"pergunta\":\"Qual o componente mais difícil de implementar?\",\"imagem\":\"https://www.alura.com.br/artigos/assets/bootstrap/bootstrap.png\",\"certo\": 2, \"alternativas\":[{\"texto\":\"Modal\"},{\"texto\":\"Jumbotron\"},{\"texto\":\"Carousel\"},{\"texto\":\"Toast\"}]},\n{\"pergunta\":\"Qual o componente mais fácil de implementar?\",\"imagem\": null, \"certo\": 3, \"alternativas\":[{\"texto\":\"Modal\"},{\"texto\":\"Jumbotron\"},{\"texto\":\"Carousel\"},{\"texto\":\"Toast\"}]}]',
				idTopico: 1,
				nome: "P1 - Componentes",
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
			},
			{
				conteudo: '[{\"pergunta\":\"Qual o componente mais difícil de implementar?\",\"imagem\":\"https://www.alura.com.br/artigos/assets/bootstrap/bootstrap.png\",\"certo\": 2, \"alternativas\":[{\"texto\":\"Modal\"},{\"texto\":\"Jumbotron\"},{\"texto\":\"Carousel\"},{\"texto\":\"Toast\"}]},\n{\"pergunta\":\"Qual o componente mais fácil de implementar?\",\"imagem\": null, \"certo\": 3, \"alternativas\":[{\"texto\":\"Modal\"},{\"texto\":\"Jumbotron\"},{\"texto\":\"Carousel\"},{\"texto\":\"Toast\"}]}]',
				idTopico: 1,
				nome: "P2 - Componentes Pt.2",
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
			},
			{
				conteudo: '[{\"pergunta\":\"Qual o Windows foi lançado em 2009?\",\"imagem\":\"https://files.tecnoblog.net/wp-content/uploads/2015/07/windows-10-wallpaper-700x438.jpg\",\"certo\": 3, \"alternativas\":[{\"texto\":\"Windows XP\"},{\"texto\":\"Windows 9\"},{\"texto\":\"Windows 10\"},{\"texto\":\"Windows 7\"}]}]',
				idTopico: 1,
				nome: "Teste sobre Windows",
				dataInicio: `${tomorrow.toISOString()}`,
				dataFim: `${nextWeek.toISOString()}`,
			}
		],
		skipDuplicates: true,
	});

	const createManyAtividadesAluno = await prisma.atividadesAluno.createMany({
		data: [
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 1,
				idAtividade: 1,
				idTurma: 1
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 3,
				idAtividade: 4,
				idTurma: 4
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 2,
				idAtividade: 4,
				idTurma: 4
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 1,
				idAtividade: 4,
				idTurma: 4
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 2,
				idAtividade: 2,
				idTurma: 3
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 2,
				idAtividade: 3,
				idTurma: 3
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 2,
				idAtividade: 1,
				idTurma: 4
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 2,
				idAtividade: 2,
				idTurma: 4
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 3,
				idAtividade: 1,
				idTurma: 5
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 3,
				idAtividade: 4,
				idTurma: 5
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 3,
				idAtividade: 3,
				idTurma: 6
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 3,
				idAtividade: 2,
				idTurma: 6
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 4,
				idAtividade: 3,
				idTurma: 7
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 4,
				idAtividade: 1,
				idTurma: 7
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 4,
				idAtividade: 4,
				idTurma: 8
			},
			{
				link: 'https://res.cloudinary.com/educorreia/image/upload/v1633368266/kyipefmyelhktetkblml.pdf',
				nome: 'arquivo1.pdf',
				raAluno: 4,
				idAtividade: 1,
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
