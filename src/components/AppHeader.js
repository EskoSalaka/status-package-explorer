import React from "react";

const styles = {
  header: {
    backgroundColor: "#432b4e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  div: {
    width: "800px"
  },
  a: { color: "inherit" }
};

const AppHeader = () => {
  return (
    <header style={styles.header}>
      <div style={styles.div}>
        <h1>A simple software package status file explorer</h1>
        <p>
          To explore the contents of the status file containing the information on packages that the
          system knows about, just locate the file and click on the packages. On Debian and Ubuntu
          systems, the status file is located in <i>/var/lib/dpkg/status/</i>.
        </p>
        <p>
          Generally, the status file should be of the "binary package control file" - format
          described in:{" "}
          <a style={styles.a} href="https://www.debian.org/doc/debian-policy/ch-controlfields.html">
            https://www.debian.org/doc/debian-policy/ch-controlfields.html
          </a>
        </p>
      </div>
    </header>
  );
};

export default AppHeader;
