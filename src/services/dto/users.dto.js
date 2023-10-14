export default class UsersDto {
    constructor(user) {
        this.id = user._id.toString()
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.age = user.age;
        this.email = user.email;
        this.rol = user.rol;
        this.fullName = `${this.first_name}  ${this.last_name}`;
        this.cartId = user.cartId.toString();
        this.rol = user.rol;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}