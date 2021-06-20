import * as yup from 'yup';

class AtividadeAluno {
	public create = yup.object().shape({
		link: yup.string().required("Campo 'link' é obrigatório!").url("URL do link inválido!"),
		nome: yup.string().required("Campo 'nome' é obrigatório!"),
		idAtividade: yup.number().required("Campo 'idAtividade' é obrigatório!"),
		idTurma: yup.number().required("Campo 'idTurma' é obrigatório!"),
	});

	public update = yup.object().shape({
		nota: yup.number().min(0).max(10),
	});
}

export default new AtividadeAluno();