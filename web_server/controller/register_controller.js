const connection = require('./../models/connection_schema');
const connection_db_operations = require('./../dal/connection_operations');

register = (host_id, target_id) => {
    connection.findOne({ 'host': host_id }, (err, conn) => {
        if(err) {
            console.log(err);
            return;
        }

        if(conn) {
            connection_db_operations.add(conn, target_id);
        }
        else {
            connection_db_operations.create(host_id, target_id);
        }
    });
}

disconnect = (host_id, target_id) => {
    connection.findOne({ 'host': host_id, 'clients': target_id }, (err, conn) => {
        if(err) {
            console.log(err);
            return;
        }

        if(conn) {
            connection_db_operations.remove(conn, target_id);
        }
        else {
            console.log("NOT FOUND");
            console.log(host_id);
            console.log(target_id);
        }
    });
}

module.exports = {
    register: register,
    disconnect: disconnect
}