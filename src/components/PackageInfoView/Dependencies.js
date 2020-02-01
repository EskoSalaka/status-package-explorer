import React from "react";
import { Link } from "react-router-dom";

const styles = {
  innerDisplayHeader: {
    marginRight: 20,
    fontWeight: "bold"
  },
  link: {
    textDecoration: "none"
  }
};

const Dependencies = ({ depends, packageNames }) => {
  return (
    <>
      <p style={styles.innerDisplayHeader}>Dependencies</p>
      <p>
        {depends.map((dependencyList, i) => {
          if (dependencyList.length === 1) {
            let dependency = dependencyList[0];

            return packageNames.includes(dependency) ? (
              <Link key={dependency} style={styles.link} to={dependency}>
                {depends.length === i + 1 ? dependency : dependency + ", "}
              </Link>
            ) : (
              <span>{depends.length === i + 1 ? dependency : dependency + ", "}</span>
            );
          } else {
            return dependencyList.map((optionalDependency, j) => {
              return packageNames.includes(optionalDependency) ? (
                <Link key={optionalDependency} style={styles.link} to={optionalDependency}>
                  {dependencyList.length !== j + 1
                    ? optionalDependency + " | "
                    : depends.length === i + 1
                    ? optionalDependency
                    : optionalDependency + ", "}
                </Link>
              ) : (
                <span>
                  {dependencyList.length !== j + 1
                    ? optionalDependency + " | "
                    : depends.length === i + 1
                    ? optionalDependency
                    : optionalDependency + ", "}
                </span>
              );
            });
          }
        })}
      </p>
    </>
  );
};

export default Dependencies;
