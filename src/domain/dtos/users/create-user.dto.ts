export class CreateUserDto{
    private constructor(
        public name:string,
        public email:string,
        public password:string
    ){}
    static create(props:{[key:string]:any}){
        const {name,email,password} = props;
        if(!name || !email || !password){
            throw new Error('One field is missing');
        } 
        return new CreateUserDto(name,email,password);
    }    
}