const connection = require('./../models/connection_schema');

add_connection = (conn, target_id) =>  {
    console.log("Add");

    if(!is_target_in_connection(conn, target_id)) {
        conn.clients.push(target_id);
        conn.save((err, doc) => {
            if(err) {
                console.log(err);
            }
        });
    }
}

create_connection = (host_id, target_id) => {
    console.log("Create");

    const conn = new connection({ host: host_id, clients: [target_id] });
    conn.save((err, doc) => {
        if(err) {
            console.log(err);
        }
    });
}

remove_connection = (conn, target_id) => {
    console.log("Remove");

    conn.clients.remove(target_id);
    conn.save((err, doc) => {
        if(err) {
            console.log(err);
        }
    });
}

is_target_in_connection = (conn, target_id) => {
    return conn.clients.includes(target_id);
}

module.exports = {
    add: add_connection,
    create: create_connection,
    remove: remove_connection
}