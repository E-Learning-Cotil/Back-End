import * as yup from 'yup';

class Teste {
	public create = yup.object().shape({
		conteudo: yup.string().required("Campo 'conteudo' é obrigatório!"),
		dataInicio: yup.date().required("Campo 'dataInicio' é obrigatório!"),
		dataFim: yup.date().required("Campo 'dataFim' é obrigatório!"),
		idTopico: yup.number().required("Campo 'idTopico' é obrigatório!")
	});

    public update = yup.object().shape({
		conteudo: yup.string(),
		dataInicio: yup.date(),
		dataFim: yup.date()
	});
}

export default new Teste();