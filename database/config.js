import mongoose from "mongoose";

const connectDB = async() => {

    try {
       await mongoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true
       })
        console.log('Base de datos en línea');
    } catch (error) {
        console.log(error);
        throw new Error('Ha ocurrido un error con la base de datos')
    }

}

export default connectDB