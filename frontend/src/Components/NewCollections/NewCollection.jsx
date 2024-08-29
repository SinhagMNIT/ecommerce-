import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Items from "../Items/Items";

const NewCollection = () => {
  const [new_collection, setNewCollections] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((response) => response.json())
      .then((data) => (setNewCollections (data)));
  }, []);
  return (
    <div className="newcollections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Items
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollection;
