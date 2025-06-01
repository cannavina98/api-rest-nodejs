import mongoose from 'mongoose';
import config from 'config';

const mongoUrl = config.get('database.mongoUrl');


const connect = async () => {
    mongoose.connect(mongoUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    await new Promise((resolve, reject) => {
        mongoose.connection.once('open', resolve)
        mongoose.connection.on('error', reject);
    });

}

export default {
    connect,
    connection: mongoose.connection
}