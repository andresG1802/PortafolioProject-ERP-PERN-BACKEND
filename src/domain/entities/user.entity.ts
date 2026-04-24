export class UserEntity{
    constructor(
        public id:string,
        public name:string,
        public email:string,
        public password:string
    ){}
    public static fromObject(object : {[key:string]:any}){
        const {id,name,email,password} = object;
        if(!id || !name || !email || !password){
            throw new Error('Invalid user object');
        }
        return new UserEntity(id,name,email,password);
    }
}