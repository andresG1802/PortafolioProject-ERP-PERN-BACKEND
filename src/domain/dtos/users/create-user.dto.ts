export class CreateUserDto{
    private constructor(
        public name:string,
        public email:string,
        public password:string
    ){}
    static create(props:{[key:string]:any}): [string?, CreateUserDto?] {
        const {name,email,password} = props;
        if(!name) return ['Name is required'];
        if(!email) return ['Email is required'];
        if(!password) return ['Password is required'];
        return [undefined, new CreateUserDto(name,email,password)];
    }
}