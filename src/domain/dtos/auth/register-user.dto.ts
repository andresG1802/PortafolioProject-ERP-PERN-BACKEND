export class RegisterUserDto {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ) {}

    static create(props: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password } = props;
        if (!name) return ['Name is required'];
        if (!email) return ['Email is required'];
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ['Invalid email format'];
        if (!password) return ['Password is required'];
        if (password.length < 6) return ['Password must be at least 6 characters'];
        return [undefined, new RegisterUserDto(name, email, password)];
    }
}
