export class BuscaAtivaException{
    public readonly message: string;
    public readonly code: number;
    constructor(message: string, code = 200){
        this.message = message;
        this.code = code;
    }
}