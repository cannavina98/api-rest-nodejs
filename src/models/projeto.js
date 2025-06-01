import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const projetoSchema = new Schema({
    name: {type: String},
    description: {type: String},
    url: {type:String}
});

const Projeto = mongoose.model('Projeto', projetoSchema);

export default Projeto;