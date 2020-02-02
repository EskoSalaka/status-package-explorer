import React, { useRef, useState } from "react";
import statusFileParser from "../helpers/parser";
import { Link } from "react-router-dom";
import usePackages from "../hooks/usePackages";

const styles = {
  packageLink: { fontWeight: "bold", textDecoration: "none", fontSize: 18 },
  fileUploadContainer: { display: "flex", alignItems: "center" },
  fileUploadContents: { paddingRight: 10 },
  errorMessage: { color: "#D8000C", backgroundColor: "#FFBABA", borderRadius: 15, padding: 10 },
  listBox: {
    flexDirection: "column",
    flexWrap: "wrap",

    columnCount: 3,
    columnFill: "balance"
  },
  listItem: { justifyContent: "center", flexDirection: "column", textAlign: "start" },
  card: {
    minHeight: 100,
    minWidth: 300,
    display: "inline-block",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    padding: 20
  }
};

const PackageListView = () => {
  const fileInput = useRef();
  const [errorMessage, setErrorMessage] = useState(null);
  const [packages, setPackages] = usePackages();

  const handleFileUpload = event => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      event.preventDefault();

      var reader = new FileReader();
      reader.onload = function(event) {
        try {
          let parsedResult = statusFileParser.parseStatusFile(event.target.result);
          setPackages(parsedResult);
          setErrorMessage(null);
        } catch (error) {
          setErrorMessage(
            "Failed reading the given file. Make sure that the given file is a correct control file."
          );
        }
      };

      reader.readAsText(fileInput.current.files[0]);
    } else {
      setErrorMessage("Looks like your browser doesn't support the HTML5 file API");
    }
  };

  return (
    <div>
      <div style={styles.fileUploadContainer}>
        <h3 style={styles.fileUploadContents}>Upload the control file </h3>
        <input
          style={styles.fileUploadContents}
          type="file"
          id="fileInput"
          ref={fileInput}
          onChange={handleFileUpload}
        ></input>
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      </div>
      <div style={styles.card}>
        <h1>Packages</h1>
        <div>
          <ul style={styles.listBox}>
            {packages.map(pckg => {
              return (
                <li style={styles.listItem} key={pckg.Package}>
                  <Link style={styles.packageLink} to={pckg.Package}>
                    {pckg.Package}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PackageListView;
