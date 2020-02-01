# A simple package status file explorer

On a Debian and Ubuntu systems, there is a file called /var/lib/dpkg/status that holds information about software packages that the system knows about. Generally, these files are of the "binary package control file" - format described in https://www.debian.org/doc/debian-policy/ch-controlfields.html. With this app, you can select your status file and explore the packages, their dependecies and reverse dependecies.

The app works by using the local storage to save the parsed status file. In the package contents, every dependency and reverse dependency is a clickable link unless it's not found in the status file. Optional dependencies are separated with the pipe "|" character and they are also clickable in a similar manner.

The app is built with react and and react-router.
