
exports.createApiList = async(connection)=>{
    connection.query(`
        CREATE TABLE IF NOT EXISTS api_list (
            id INT PRIMARY KEY ,
            name VARCHAR(256) NOT NULL,
            description TEXT,
            user_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `, (error, results) => {
        if (error) {
            console.error("Error creating apilist table:", error.message);
        } else {
            console.log("api_list table created successfully or already exists.");
        }
    });
}