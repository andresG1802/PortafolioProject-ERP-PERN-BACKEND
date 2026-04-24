export class UpdateUserDto{
    private constructor(
        public readonly id:string,
        public readonly name?:string,
        public readonly email?:string,
        public readonly password?:string
    ){}
    get values(){
        const returnObj: {[key: string]: any} = {};
        if(this.name) returnObj.name = this.name;
        if(this.email) returnObj.email = this.email;
        if(this.password) returnObj.password = this.password;
        
        return returnObj;
    }
    static create(props:{[key:string]:any}) : [string | undefined, UpdateUserDto?]{
        const {id,name,email,password} = props;
        if(!id || isNaN(Number(id))){
            return ['Id is missing or invalid'];
        }
        return [undefined, new UpdateUserDto(id,name,email,password)];
    }
}