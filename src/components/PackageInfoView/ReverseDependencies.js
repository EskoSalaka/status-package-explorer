import React from "react";
import { Link } from "react-router-dom";

const styles = {
  descriptionFieldDisplay: {},
  innerDisplayHeader: {
    marginRight: 20,
    fontWeight: "bold"
  },
  link: {
    textDecoration: "none"
  }
};

const ReverseDependecies = ({ reverseDepends }) => {
  return (
    <>
      <p style={styles.innerDisplayHeader}>
        Reverse <br />
        Dependencies
      </p>
      <p>
        {reverseDepends.map((reverseDependency, i) => {
          return (
            <Link key={reverseDependency} style={styles.link} to={reverseDependency}>
              {reverseDepends.length === i + 1 ? reverseDependency : reverseDependency + ", "}
            </Link>
          );
        })}
      </p>
    </>
  );
};

export default ReverseDependecies;
