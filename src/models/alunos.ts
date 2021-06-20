import * as yup from 'yup';

class Aluno {
    public create = yup.object().shape({
        telefone: yup.string().required("Campo 'telefone' é obrigatório!").matches(/(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)/, "Telefone inválido!"),
        email: yup.string().required("Campo 'email' é obrigatório!").email("Email inválido!"),
        nome: yup.string().required("Campo 'nome' é obrigatório!"),
        foto: yup.string().required("Campo 'foto' é obrigatório!").url("URL da foto inválido!"),
        idSerie: yup.number().required("Campo 'idSerie' é obrigatório!"),
    }); 

    public update = yup.object().shape({
        telefone: yup.string().min(9),
        senha: yup.string(),
        email: yup.string().email(),
        nome: yup.string(),
        foto: yup.string().url(),
        idSerie: yup.number(),
    });
}

export default new Aluno();