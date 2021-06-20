import * as yup from 'yup';

class Topico {
	public create = yup.object().shape({
		nome: yup.string().required("Campo 'nome' é obrigatório!"),
		descricao: yup.string().required("Campo 'descricao' é obrigatório!"),
		idTurma: yup.number().required("Campo 'idTurma' é obrigatório!")
	});
}

export default new Topico();