import React from "react";

import Menu from "./Menu";
import { Link } from "react-router-dom";

const Card = ({ title, description, apiId, ...props }) => {
  return (
    <Link to={`/edit/${apiId}/${title}`} className="no-underline">
      <div className="card" {...props}>
        <h2 className="cardTitle">{title}</h2>
        <p className="cardDescription">{description}</p>
      </div>
    </Link>
  );
};

export default Card;
