import * as yup from 'yup';

class Turma {
	public create = yup.object().shape({
		nome: yup.string().required("Campo 'nome' é obrigatório!"),
		idIcone: yup.number().required("Campo 'idIcone' é obrigatório!"),
		idCores: yup.number().required("Campo 'idCores' é obrigatório!"),
		idSerie: yup.number().required("Campo 'idSerie' é obrigatório!"),
		rgProfessor: yup.string().required("Campo 'rgProfessor' é obrigatório!").matches(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/, "Formato do campo 'rg' inválido!"),
	});
}

export default new Turma();