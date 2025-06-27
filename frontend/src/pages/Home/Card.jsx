import React from "react";

const Card = ({title,description}) => {
  return (
    <div className="card">
      <h2 className="cardTitle">{title}</h2>
      <p className="cardDescription">
        {description}
      </p>
    </div>
  );
};

export default Card;
