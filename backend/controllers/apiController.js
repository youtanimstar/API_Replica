const db = require("../config/db");

const createNewApi = async (req, res) => {
  const { name, description, user_id } = req.body;
  if (!name || !description || !user_id) {
    return res
      .status(400)
      .json({ error: "Name, description, and user_id are required." });
  }


try {
    // const newApi = await table.createApiList(connection, { name, description, user_id });
    db.connection.query(
      "INSERT INTO api_list (name, description) VALUES (?, ?)",
      [name, description],
      (error, results) => {
        if (error) {
          console.error("Error inserting new API:", error.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        res
          .status(201)
          .json({
            message: "API created successfully",
            apiId: results.insertId,
          });
      }
    );
  } catch (error) {
    console.error("Error creating API:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createNewEndpoint = async (req, res) => {
  const { name, path } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .json({ error: "Name and description are required." });
  }


try {
    // const newApi = await table.createApiList(connection, { name, description, user_id });
    db.connection.query(
      "INSERT INTO api_list (name, description) VALUES (?, ?)",
      [name, description],
      (error, results) => {
        if (error) {
          console.error("Error inserting new API:", error.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        res
          .status(201)
          .json({
            message: "API created successfully",
            apiId: results.insertId,
          });
      }
    );
  } catch (error) {
    console.error("Error creating API:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  createNewApi,
};
