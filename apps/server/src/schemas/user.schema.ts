import { Schema, model } from 'mongoose';
import { IUser } from '@libs/shared/interfaces';

const addressDefinition = {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
    landmark: { type: String }
};

const addressSchema: Schema = new Schema(addressDefinition);

const phoneDefinition = {
    countryCode: { type: String },
    phone: { type: Number, minLength: 10, maxLength: 10 }
};

const phoneSchema: Schema = new Schema(phoneDefinition);

const userDefinition = {
    name: { type: String },
    email: {
        type: String,
        required: true
        // validate: {
        //     validator: (v: any): boolean => v < 60,
        //     message: (props: any): string => `${props.value} is not correct`
        // }
    },
    passwordHash: { type: String },
    phone: phoneSchema,
    dob: { type: Date },
    address: addressSchema,
    isAdmin: { type: Boolean, default: false },
    profilePhoto: { type: String }
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
// userSchema.methods.customMethodName = function () {
//     console.log('Custom Method');
// };

// It applies to the document
// await UserSchema.find().customQueryMethod("name")
// userSchema.query.customQueryMethod = function (name: string) {
//     return this.where({ name: new RegExp(name, 'i') });
// };

// It applies to the Collection
// await UserSchema.customStaticMethod("name")
// userSchema.statics.customStaticMethod = function (name) {
//     return this.where({ name: new RegExp(name, 'i') });
// };

//  pre
// userSchema.pre('findByIdAndUpdate', function (next: CallbackWithoutResultAndOptionalError) {
//     console.log("Pre")
//     this.dateModified = new Date().toISOString();
//     next();
// });

// Middleware post
// userSchema.post(
//     'findByIdAndUpdate',
//     function (res, next: CallbackWithoutResultAndOptionalError) {
//         console.log("Post")
//         // res.customMethodName();
//         next();
//     }
// );

export default model<IUser>('User', userSchema);
