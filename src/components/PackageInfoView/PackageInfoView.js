import React from "react";
import { Link } from "react-router-dom";
import usePackages from "../../hooks/usePackages";
import Dependencies from "./Dependencies";
import ReverseDependecies from "./ReverseDependencies";

const styles = {
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    maxWidth: 600,
    padding: 20,
    marginTop: 20
  },
  cardContainer: {
    display: "grid",
    justifyItems: "start",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    gridTemplateAreas: "Header Content"
  },
  innerDisplayHeader: {
    marginRight: 20,
    fontWeight: "bold"
  }
};

const PackageInfoView = ({ match }) => {
  const [packages] = usePackages();
  const packageName = match.url.replace("/", "").trim();
  const pckg = packages.find(p => p.Package === packageName);

  return (
    <div>
      <Link to="/">
        <button type="button">&lArr; Home</button>
      </Link>
      {pckg ? (
        <div style={styles.card}>
          <h1>{pckg.Package}</h1>
          <div style={styles.cardContainer}>
            <p style={styles.innerDisplayHeader}>Description</p>
            <p>
              {pckg.Description.split("\n").map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                );
              })}
            </p>
            <Dependencies
              depends={pckg.Depends}
              packageNames={packages.map(pckg => {
                return pckg.Package;
              })}
            />
            <ReverseDependecies reverseDepends={pckg.ReverseDepends} />
          </div>
        </div>
      ) : (
        <b>{` No info on the package "${packageName}" can't be found on the given control file`}</b>
      )}
    </div>
  );
};

export default PackageInfoView;
