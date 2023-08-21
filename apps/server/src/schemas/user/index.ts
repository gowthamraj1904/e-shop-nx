import { Schema, model, CallbackWithoutResultAndOptionalError } from 'mongoose';
import { IUser } from '@libs/shared/interfaces';

const nameDefinition = {
    firstName: { type: String, required: true, minLength: 2 },
    lastName: { type: String, required: true, minLength: 1 }
};

const nameSchema: Schema = new Schema(nameDefinition);

const addressDefinition = {
    doorNo: { type: String, default: '' },
    apartment: { type: String, default: '' },
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zip: { type: String, default: '' },
    country: { type: String, default: '' },
    landmark: { type: String, default: '' }
};

const addressSchema: Schema = new Schema(addressDefinition);

const phoneDefinition = {
    countryCode: { type: String, required: true },
    phone: { type: Number, required: true, minLength: 10, maxLength: 10 }
};

const phoneSchema: Schema = new Schema(phoneDefinition);

const userDefinition = {
    name: nameSchema,
    email: {
        type: String,
        required: true
        // validate: {
        //     validator: (v: any): boolean => v < 60,
        //     message: (props: any): string => `${props.value} is not correct`
        // }
    },
    passwordHash: { type: String, required: true },
    phone: phoneSchema,
    age: { type: String, required: true, min: 18 },
    address: addressSchema,
    isAdmin: { type: Boolean, default: false },
    profilePhoto: { type: { data: Buffer, contentType: String } },
    dateCreated: { type: Date, immutable: true, default: () => Date.now() },
    dateModified: { type: Date, default: () => Date.now() }
};
const schemaOptions = { timestamps: true };

const userSchema: Schema = new Schema(userDefinition, schemaOptions);

// Create a virtual property
userSchema.virtual('id').get(function () {
    return this._id;
});

userSchema.set('toJSON', {
    virtuals: true
});

// Create custom methods
// It applies to the document
// const user = await UserSchema.findOne({id});
// user.customMethodName()
userSchema.methods.customMethodName = function () {
    console.log('Custom Method');
};

// It applies to the document
// await UserSchema.find().customQueryMethod("name")
// userSchema.query.customQueryMethod = function (name: string) {
//     return this.where({ name: new RegExp(name, 'i') });
// };

// It applies to the Collection
// await UserSchema.customStaticMethod("name")
userSchema.statics.customStaticMethod = function (name) {
    return this.where({ name: new RegExp(name, 'i') });
};

//  pre
userSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    this.dateModified = Date.now();
    next();
});

// Middleware post
userSchema.post(
    'save',
    function (res, next: CallbackWithoutResultAndOptionalError) {
        res.customMethodName();
        next();
    }
);

export default model<IUser>('User', userSchema);
