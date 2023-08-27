interface IAddress {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    landmark?: string;
}

interface IPhone {
    countryCode: string;
    phone: number;
}

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password?: string;
    passwordHash?: string;
    phone: IPhone;
    dob?: Date,
    isAdmin?: boolean;
    address: IAddress;
    profilePhoto?: null;
    createdAt?: Date;
    updatedAt?: Date;
}
