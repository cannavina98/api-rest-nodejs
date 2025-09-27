import mongoose, { mongo } from 'mongoose';
import config from 'config';

const mongoUrl = process.env.MONGO_URI || config.get('database.mongoUrl');
console.log(process.env.MONGO_URI)
console.log(mongoUrl)

const connect = async () => {
    mongoose.connect(mongoUrl);

    await new Promise((resolve, reject) => {
        mongoose.connection.once('open', resolve)
        mongoose.connection.on('error', reject);
    });

}

export default {
    connect,
    connection: mongoose.connection
}