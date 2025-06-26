import mongoose from 'mongoose';
import bcrypt, { hashSync } from 'bcrypt'

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

//test user 
/*
    "name": "User 1",
    "birthDate": "2025-06-25",
    "email": "user1@mail.com",
    "password": "123456",
    "role": "admin"
*/
const userSchema = new Schema({
    name: {type: String},
    birthDate: {type: Date},
    email: {type: String},
    password: {type: String},
    role: {type: String}
});

userSchema.pre('save', async function(next){
    if(!this.password || !this.isModified('password')){
        return next();
    }
    try {
        const hashedPassword = await hashSync(this.password, 10);
        this.password = hashedPassword;
    } catch(err){
        return next(err);
    }
});

userSchema.set('toJSON', {
    transform: (doc, ret) => ({
        _id: ret._id,
        name: ret.name,
        birthDate: ret.birthDate,
        email: ret.email,
        role: ret.role
    })
});

const User = mongoose.model('User', userSchema);

export default User;