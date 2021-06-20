import * as yup from 'yup';

class TesteAluno {
	public create = yup.object().shape({
		idTeste: yup.number().required("Campo 'idAtividade' é obrigatório!"),
		idTurma: yup.number().required("Campo 'idTurma' é obrigatório!"),
        nota: yup.number().required("Campo 'nota' é obrigatório!").min(0).max(10)
	});

	public update = yup.object().shape({
        nota: yup.number().min(0).max(10)
	});
}

export default new TesteAluno();