const db = require("../config/db");

const customApiControllerGET = async (req, res) => {
  const path = req.params || "";
  
  const user_id = path.splat[0] ;
  
const method = (path.splat[1]).toUpperCase() || "GET";

  const api = path.splat[2];
  
const cleanPath = "/" + path.splat.slice(3).join("/");

  if (!user_id || !method || !api || !path) {
    return res.status(400).json({ error: "user_id, method , api and path are required." });
  }

  try {
    db.connection.query(
      "SELECT * FROM api_endpoints JOIN api_list ON api_endpoints.api_id = api_list.id WHERE api_list.user_id = ? AND api_endpoints.method=? AND api_list.name = ? AND api_endpoints.path = ?",
      [user_id, method,api, cleanPath],
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
