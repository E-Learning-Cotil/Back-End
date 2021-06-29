import * as yup from 'yup';

class Cor {
    public create = yup.object().shape({
        corPrim: yup.string().required("Campo 'corPrim' é obrigatório!"),
        corSec: yup.string().required("Campo 'corSec' é obrigatório!")
    });
}

export default new Cor();