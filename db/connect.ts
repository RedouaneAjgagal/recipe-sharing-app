import mongoose from 'mongoose';

const connect = async (URI: string) => {
    mongoose.connect(URI);
}

export default connect;