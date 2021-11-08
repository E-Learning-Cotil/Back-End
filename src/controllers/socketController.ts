import { PrismaClient, OrigemMensagem } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface TokenInterface{
    user: string;
    role: OrigemMensagem;
}

class SocketController{
    public connection = async (socket: any) => {
        //Identifica o usuário e lista suas conversas
        socket.on("identify", async ({token}) => {
            if(!token) return;

            const { identity, role } = validateToken(token);

            if(!identity || !role) return;

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
                })
    
                //Busca as conversas do professor
                result = await prisma.conversas.findMany({
                    where: {
                        rgProfessor: String(identity)
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
                        ra: parseInt(identity)
                    }
                })
                
                //Busca as conversas do aluno

                //Busca a série do aluno
                const aluno = await prisma.alunos.findFirst({
                    where: {
                        ra: parseInt(identity)
                    },
                    select:{
                        idSerie: true
                    }
                });
    
                //Busca os professores que o aluno tem aula
                const turmas = await prisma.turmas.findMany({
                    where: {
                        idSerie: aluno.idSerie 
                    },
                    select: {
                        rgProfessor: true
                    }
                })
    
                //Faz um vetor só com os RGs dos professores
                const professoresList = turmas.map(turma => turma.rgProfessor);
    
                //Para cada professor ele acha a primeira conversa
                for (const prof of professoresList) {
                    const conversas = await prisma.conversas.findFirst({
                        where: {
                            rgProfessor: prof,
                            raAluno: parseInt(identity)
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
                        const professor = await prisma.professores.findFirst({
                            where: {
                                rg: prof
                            },
                            select: {
                                nome: true,
                                foto: true,
                                rg: true, 
                                email: true
                            }
                        })
                        result.push({rgProfessor: prof, data: null, mensagem: null, professor})
                    }
                }
            }

            const property = role === "ALUNO" ? 'rgProfessor' : 'raAluno';

            const uniqueValuesSet = new Set();

            const uniqueResults = result.filter((obj) => {
                const isPresentInSet = uniqueValuesSet.has(obj[property]);
                uniqueValuesSet.add(obj[property]);
                return !isPresentInSet;
              });
                
            socket.emit("conversations", uniqueResults);

            return;
        });
			
		//Abre a conversa com o outro usuário e lista as mensagens anteriores
        socket.on("open_chat", async ({token, otherUser}) => {
            if(!token) return;

            const { identity, role } = validateToken(token);

            if(!identity || !role) {
                return;
            } 
    
            const rg = role === "PROFESSOR" ? String(identity) : String(otherUser);
            const ra = role !== "PROFESSOR" ? parseInt(identity) : parseInt(otherUser);
    
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
            });

            const modifiedPrevious = previous.map((prev: any) => {
                prev.origem = {role: prev.origem};

                return prev;
            });
    
            socket.emit("previous_messages", modifiedPrevious);
    
            return;
        });
    
        //Manda a mensagem
        socket.on('new_message', async ({token, message, otherUser}) => {
            if(!token) return;

            const { identity, role } = validateToken(token);

            if(!identity || !role) return;
    
            let otherUserId = null;
            let originName = null;

            //Pegar o socket do outro usuário
            if(role === "PROFESSOR"){
                const aluno = await prisma.alunos.findFirst({
                    where: {
                        ra: parseInt(otherUser)
                    }, 
                    select:{
                        socket: true
                    }
                });
    
                if (aluno) {
                    otherUserId = aluno.socket;
                }
    
            }else{
                const professor = await prisma.professores.findFirst({
                    where: {
                        rg: String(otherUser)
                    },
                    select: {
                        socket: true
                    }
                })
    
                if (professor) {
                    otherUserId = professor.socket;
                }
            }

            if(role === "PROFESSOR"){
                const professor = await prisma.professores.findFirst({
                    where: {
                        rg: String(identity)
                    },
                    select: {
                        nome: true
                    }
                })
                
                if (professor) {
                    originName = professor.nome;
                }
    
            }else{
                const aluno = await prisma.alunos.findFirst({
                    where: {
                        ra: parseInt(identity)
                    }, 
                    select:{
                        nome: true
                    }
                });
    
    
                if (aluno) {
                    originName = aluno.nome;
                }
            }

            const data = new Date();
            const formattedDate = data.toISOString();
                
            if(otherUserId) {
                socket.broadcast.to(otherUserId).emit("new_message", [{
                    origem: {
                        role,
                        identity,
                        nome: originName
                    }, 
                    data: formattedDate, 
                    mensagem: message
                }]);
            }
    
            socket.emit("new_message", [{origem: {
                role,
                identity,
                nome: originName
            }, data: formattedDate, mensagem: message}]);
    
            const rg = role === "PROFESSOR" ? String(identity) : String(otherUser);
            const ra = role !== "PROFESSOR" ? parseInt(identity) : parseInt(otherUser);

            await prisma.conversas.create({
                data: {
                    mensagem: message,
                    origem: role,
                    rgProfessor: rg,
                    raAluno: ra
                }
            })
            
            return;
        });
    
        //Desconecta o usuário
        socket.on("disconnect", async () => {
            if(!socket.role){
                return;
            }

            console.log(socket);
    
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
    
            return;
        });
	}
}

function validateToken(token){
    if(!token) return;

    const decoded = <TokenInterface>jwt.verify(token, process.env.SECRET);

    const { user, role } = decoded;

    return ({ identity: user, role });
}

export default new SocketController();