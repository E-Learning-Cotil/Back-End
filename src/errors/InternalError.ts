export class InternalError extends Error{
    constructor(
        public message: string = "Algo deu errado!", 
        public status: number = 500, 
        public description: string = "Algum erro ocorreu enquanto você tentava realizar essa ação. Por favor, tente novamente mais tarde."
    ){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor)
    }
}