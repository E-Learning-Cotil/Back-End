import * as yup from 'yup';

class Serie {
    public create = yup.object().shape({
        ano: yup.string().required("Campo 'ano' é obrigatório!"),
        curso: yup.string().required("Campo 'curso' é obrigatório!").oneOf(['ENFERMAGEM', 'EDIFICACOES', 'GEODESIA', 'INFORMATICA', 'MECANICA', 'QUALIDADE']),
        periodo: yup.string().required("Campo 'periodo' é obrigatório!").oneOf(['DIURNO', 'NOTURNO']),
        tipo: yup.string().required("Campo 'tipo' é obrigatório!").oneOf(['MEDIOTECNICO', 'TECNICO'])
    });
}

export default new Serie();