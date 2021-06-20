import * as yup from 'yup';

class Professor {
    public create = yup.object().shape({
        telefone: yup.string().required("Campo 'telefone' é obrigatório!").matches(/(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)/, "Telefone inválido!"),
        email: yup.string().required("Campo 'email' é obrigatório!").email("Email inválido!"),
        nome: yup.string().required("Campo 'nome' é obrigatório!"),
        foto: yup.string().required("Campo 'foto' é obrigatório!").url("URL da foto inválido!"),
        rg: yup.string().matches(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/, "Formato do campo 'rg' inválido!").required("Campo 'rg' é obrigatório!"),
    }); 

    public update = yup.object().shape({
        telefone: yup.string().matches(/(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)/, "Telefone inválido!"),
        email: yup.string().email("Email inválido!"),
        nome: yup.string(),
        foto: yup.string().url("URL da foto inválido!"),
        senha: yup.string()
    });
}

export default new Professor();