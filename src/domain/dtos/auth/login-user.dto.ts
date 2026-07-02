export class LoginUserDto {
    private constructor(
        public readonly email: string,
        public readonly password: string
    ) {}

    static create(props: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = props;
        if (!email) return ['Email is required'];
        if (!password) return ['Password is required'];
        return [undefined, new LoginUserDto(email, password)];
    }
}
