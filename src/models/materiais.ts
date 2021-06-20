import * as yup from 'yup';

class Material {
	public create = yup.object().shape({
		conteudo: yup.string().required("Campo 'conteudo' é obrigatório!"),
		nome: yup.string().required("Campo 'nome' é obrigatório!"),
		idTopico: yup.number().required("Campo 'idTopico' é obrigatório!"),
	});

	public update = yup.object().shape({
		conteudo: yup.string(),
		nome: yup.string(),
	});
}

export default new Material();