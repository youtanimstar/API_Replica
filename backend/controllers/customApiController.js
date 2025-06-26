const db = require("../config/db");

const customApiControllerGET = async (req, res) => {
  const path = req.params || "";
const method = (path.splat[0]).toUpperCase() || "GET";

  const api = path.splat[1];
  
const cleanPath = "/" + path.splat.slice(2).join("/");

  if (!method || !api || !path) {
    return res.status(400).json({ error: "method , api and path are required." });
  }

  try {
    db.connection.query(
      "SELECT * FROM api_endpoints JOIN api_list ON api_endpoints.api_id = api_list.id WHERE api_endpoints.method=? AND api_list.name = ? AND api_endpoints.path = ?",
      [method,api, cleanPath],
      (error, results) => {
        if (error) {
          console.error("Error in API:", error.message);
          return res
            .status(500)
            .json({ error: "Internal server error", message: error.message });
        }


        if (results.length === 0) {
          return res.status(404).json({ error: "API endpoint not found." });
        }

        res.status(200).json(JSON.parse(results[0].data_));
      }
    );
  } catch (error) {
    console.error("Error in API:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  customApiControllerGET,
};
