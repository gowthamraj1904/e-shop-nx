import { Schema, model } from 'mongoose';
import { IUser } from '@libs/shared/interfaces';

const userSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        phone: { type: String, required: true },
        apartment: { type: String, default: '' },
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        zip: { type: String, default: '' },
        country: { type: String, default: '' },
        isAdmin: { type: Boolean, default: false },
        profilePhoto: { type: { data: Buffer, contentType: String } },
        dateCreated: { type: Date, default: null },
        dateModified: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

userSchema.virtual('id').get(function () {
    return this._id;
});

userSchema.set('toJSON', {
    virtuals: true
});

export default model<IUser>('User', userSchema);
