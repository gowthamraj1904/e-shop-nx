export interface IUser {
    id?: string;
    name: string;
    email: string;
    password?: string;
    passwordHash?: string;
    phone: string;
    isAdmin?: boolean;
    apartment: string;
    street: string;
    city: string;
    zip: string;
    country: string;
    profilePhoto?: null;
    dateCreated?: Date;
    dateModified?: Date;
}
