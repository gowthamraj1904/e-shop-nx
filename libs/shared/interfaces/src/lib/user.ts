interface IName {
    firstName: string;
    lastName: string;
}

interface IAddress {
    doorNo: string;
    apartment: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    landmark?: string;
}

interface IPhone {
    countryCode: string;
    phone: number;
}

export interface IUser {
    id?: string;
    name: IName;
    email: string;
    password?: string;
    passwordHash?: string;
    phone: IPhone;
    isAdmin?: boolean;
    address: IAddress;
    profilePhoto?: null;
    dateCreated?: Date;
    dateModified?: Date;
}
