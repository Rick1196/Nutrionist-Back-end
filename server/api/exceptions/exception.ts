class CustomException extends Error{
    constructor(args){
        super();
        this.message = args;
    }
}

export default  CustomException;