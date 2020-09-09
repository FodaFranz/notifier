const connection_schema = new mongoose.Schema({
    host: String,
    clients: [String]
});

const Connection = mongoose.model('Connection', connection_schema);

module.exports = Connection;