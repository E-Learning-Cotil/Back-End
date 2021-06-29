import * as yup from 'yup';

class Icone {
    public create = yup.object().shape({
        link: yup.string().required("Campo 'link' é obrigatório!").url("URL inválido!"),
    });
}

export default new Icone();