const db = require("../config/db");
const { generateData } = require("../utils/generateData");

// Create New API on the Database
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

const updateNewApi = async (req, res) => {
  const { apiId } = req.params;
  const { name, description } = req.body;

  if (!apiId || (!name && !description)) {
    return res.status(400).json({ error: "apiId and at least one of name or description are required." });
  }

  const fields = [];
  const values = [];

  if (name) {
    fields.push("name = ?");
    values.push(name);
  }
  if (description) {
    fields.push("description = ?");
    values.push(description);
  }

  values.push(apiId);

  try {
    db.connection.query(
      `UPDATE api_list SET ${fields.join(", ")} WHERE id = ?`,
      values,
      (error, results) => {
        if (error) {
          console.error("Error updating API:", error.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "API not found" });
        }
        res.status(200).json({ message: "API updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error updating API:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNewApi = async (req, res) => {
  const { apiId } = req.params;

  if (!apiId) {
    return res.status(400).json({ error: "apiId is required." });
  }

  try {
    db.connection.query(
      "DELETE FROM api_list WHERE id = ?",
      [apiId],
      (error, results) => {
        if (error) {
          console.error("Error deleting API:", error.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "API not found" });
        }
        res.status(200).json({ message: "API deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error deleting API:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create New Endpoint for the API
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

const updateNewEndpoint = async (req, res) => {
  const { endpointId } = req.params;
  const { path, method } = req.body;

  if (!endpointId || (!path && !method)) {
    return res.status(400).json({ error: "endpointId and at least one of path or method are required." });
  }

  const fields = [];
  const values = [];

  if (path) {
    fields.push("path = ?");
    values.push(path);
  }
  if (method) {
    fields.push("method = ?");
    values.push(method);
  }

  values.push(endpointId);

  try {
    db.connection.query(
      `UPDATE api_endpoints SET ${fields.join(", ")} WHERE id = ?`,
      values,
      (error, results) => {
        if (error) {
          console.error("Error updating endpoint:", error.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Endpoint not found" });
        }
        res.status(200).json({ message: "Endpoint updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error updating endpoint:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNewEndpoint = async (req, res) => {
  const { endpointId } = req.params;

  if (!endpointId) {
    return res.status(400).json({ error: "endpointId is required." });
  }

  try {
    db.connection.query(
      "DELETE FROM api_endpoints WHERE id = ?",
      [endpointId],
      (error, results) => {
        if (error) {
          console.error("Error deleting endpoint:", error.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Endpoint not found" });
        }
        res.status(200).json({ message: "Endpoint deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error deleting endpoint:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add Data to Endpoint
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
  updateNewApi,
  deleteNewApi,

  createNewEndpoint,
  updateNewEndpoint,
  deleteNewEndpoint,

  addDataToEndpoint
};
