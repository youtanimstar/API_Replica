const db = require("../config/db");
const { generateData } = require("../utils/generateData");

const createNewApi = async (req, res) => {
  const { name, description, user_id } = req.body;
  if (!name || !description || !user_id) {
    return res
      .status(400)
      .json({ error: "Name, description, and user_id are required." });
  }

  try {
    db.connection.query(
      "INSERT INTO api_list (name, description,user_id) VALUES (?, ?, ?)",
      [name, description, user_id],
      (error, results) => {
        if (error) {
          console.error("Error inserting new API:", error.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({
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
  const { path, api_id } = req.body;
  if (!path || !api_id) {
    return res.status(400).json({ error: "path, and api_id are required." });
  }

  const data = {
    message: "No data provided",
  };

  try {
    db.connection.query(
      "INSERT INTO api_endpoints (path, api_id, data_, method) VALUES (?, ?,?,?)",
      [path, api_id, JSON.stringify(data), "GET"],
      (error, results) => {
        if (error) {
          console.error("Error inserting new API:", error.message);
          return res.status(500).json({ error: "Internal server error" });
        }

        res.status(201).json({
          message: "API endpoint created successfully",
          endpointId: results.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error creating API:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addDataToEndpoint = async (req, res) => {
  const { path, api_id, format, type, method } = req.body;
  if (!path || !api_id || !format || !type || !method) {
    return res
      .status(400)
      .json({ error: "path, api_id, type and format are required." });
  }

  try {
    // let data = JSON.stringify({
    //   message: "No data provided",
    // });

    // if (type == 1) {
    //   data = JSON.stringify(format);
    //   console.log("Type of data:", typeof data);
      
    // }

    const data = generateData(format, type);

    db.connection.query(
      "UPDATE api_endpoints SET data_ = ?, method = ? WHERE path = ? AND api_id = ?",
      [data, method, path, api_id],
      (error, results) => {
        if (error) {
          console.error("Error updating API endpoint data:", error.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json({
          message: "API endpoint data updated successfully",
        });
      }
    );
  } catch (error) {
    console.error("Error updating API endpoint data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createNewApi,
  createNewEndpoint,
  addDataToEndpoint
};
