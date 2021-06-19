require("dotenv").config();    
import express from 'express';
import cors from 'cors';

import socketio from 'socket.io';
import http from 'http';
import path from 'path';

import { InternalError } from './errors/InternalError';

import routes from './routes';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();

const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.use('/chat', express.static(path.resolve(__dirname, '..', 'public')));

app.use((req, res, next) => {
    const err = new InternalError("Rota não encontrada", 404);
    next(err);
});

app.use((error, req, res, next) => {
    const err = new InternalError(error.message, error.status, error.description);
    
    res
    .status(err.status)
    .json({
        error: err.message,
        description: err.description
    });
});

io.on("connection", (socket: any) => {
    socket.on("identify", async  ({identity, role}) => {
        if(!identity) return;

        console.log(socket.id);
        socket.role = role;
        socket.identity = identity;

        let result = [];
        if(role === "PROFESSOR"){
            //Define o professor como "online"

            await prisma.professores.update({
                data: {
                    socket: socket.id
                },
                where: {
                    rg: String(identity)
                }
            }).catch(err => console.log(err))

            //Busca as conversas do professor
            result = await prisma.conversas.findMany({
                where: {
                    rgProfessor: String(socket.identity)
                },
                distinct: ['raAluno'],
                orderBy: {
                    data: 'desc'
                },
                select: {
                    raAluno: true,
                    data: true,
                    mensagem: true,
                    aluno: true
                }             
            });
        }else{
            //Define o aluno como "online"
            await prisma.alunos.update({
                data: {
                    socket: socket.id
                },
                where: {
                    ra: Number(identity)
                }
            }).catch(err => console.log(err))
            
            //Busca as conversas do aluno
            const aluno = await prisma.alunos.findFirst({
                where: {
                    ra: Number(socket.identity)
                },
                select:{
                    idSerie: true
                }
            });

            const turmas = await prisma.turmas.findMany({
                where: {
                    idSerie: aluno.idSerie 
                },
                select: {
                    rgProfessor: true
                }
            })

            const professoresList = turmas.map(turma => turma.rgProfessor);

            for (const prof of professoresList) {
                const conversas = await prisma.conversas.findFirst({
                    where: {
                        rgProfessor: prof,
                        raAluno: Number(socket.identity)
                    },
                    distinct: ['rgProfessor'],
                    orderBy: {
                        data: 'desc'
                    },
                    select: {
                        rgProfessor: true,
                        data: true,
                        mensagem: true,
                        professor: true
                    }
                });

                if(conversas !== null) {
                    result.push(conversas);
                }else{
                    const {nome} = await prisma.professores.findFirst({
                        where: {
                            rg: prof
                        },
                        select: {
                            nome: true
                        }
                    })
                    result.push({rgProfessor: prof, data: null, mensagem: null, professor: {nome}})
                }
            }
        }
        
        socket.emit("conversations", result);
    })

    socket.on("open_chat", async ({otherUser}) => {

        if(socket.role === "PROFESSOR"){
            const result = await prisma.alunos.findFirst({
                where: {
                    ra: Number(otherUser)
                }, 
                select:{
                    socket: true
                }
            })

            if(!result) return;
        }else{
            //
            const result = await prisma.professores.findFirst({
                where: {
                    rg: String(otherUser)
                }, 
                select:{
                    socket: true
                }
            })

            if(!result) return;
        }

        const rg = socket.role === "PROFESSOR" ? String(socket.identity) : String(otherUser);
        const ra = socket.role !== "PROFESSOR" ? Number(socket.identity) : Number(otherUser);

        const previous = await prisma.conversas.findMany({
            where: {
                rgProfessor: rg,
                raAluno: ra
            },
            orderBy: {
                data: 'asc'
            },
            select: {
                origem: true,
                data: true,
                mensagem: true
            }
        })

        socket.emit("previous_messages", previous);

        return;
    })

    //Manda a mensagem
    socket.on('new_message', async ({message, otherUser}) => {

        let otherUserId;
        if(socket.role === "PROFESSOR"){
            const {socket: otherUserSocket} = await prisma.alunos.findFirst({
                where: {
                    ra: otherUser
                }, 
                select:{
                    socket: true
                }
            });

            otherUserId = otherUserSocket;
        }else{
            const {socket: otherUserSocket} = await prisma.professores.findFirst({
                where: {
                    rg: otherUser
                },
                select: {
                    socket: true
                }
            })

            otherUserId = otherUserSocket;
        }
            
        if(otherUserId) {
            socket.broadcast.to(otherUserId).emit("new_message", [{origem: socket.role, data: Date.now(), mensagem: message}]);
        }

        socket.emit("new_message", [{origem: socket.role, data: Date.now(), mensagem: message}]);
            

        const rg = socket.role === "PROFESSOR" ? String(socket.identity) : String(otherUser);
        const ra = socket.role !== "PROFESSOR" ? Number(socket.identity) : Number(otherUser);

        await prisma.conversas.create({
            data: {
                mensagem: message,
                origem: socket.role,
                rgProfessor: rg,
                raAluno: ra
            }
        })

        console.log("mensagem criada");
        return;
    })

    //Desconecta o usuário
    socket.on("disconnect", async () => {
        if(socket.role === "PROFESSOR"){
            await prisma.professores.update({
                data: {
                    socket: null
                },
                where: {
                    socket: socket.id
                }
            })
        }else{
            await prisma.alunos.update({
                data: {
                    socket: null
                },
                where: {
                    socket: socket.id
                }
            })
        }

        console.log(`${socket.role} desconectou`);
    })

});

httpServer.listen(process.env.PORT, () => console.log("Server is running..."));