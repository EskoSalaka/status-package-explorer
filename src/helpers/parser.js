const parseStatusFile = rawText => {
  /* 
  Parses the raw text of the status file into an array of paragraph objects of the following format:
  
  paragraph: {
    Package: String
    Description: String
    Depends: Array(Array(String))
    ReverseDepends: Array(String)
  }
  
  The dependencies can include multiple optional ones, so they are implemented as arrays of arrays which 
  include all the options. In case of no options, the inner array contains only a single element.
  */

  // First, a quick and dirty check if the format of the file is correct. Probably works well enough
  validateControlFile(rawText);

  // Next, we parse the Package, Description and Depends fields as strings from each paragraph
  let paragraphs = rawText
    .split(/\n\s*\t*\n/)
    .filter(Boolean)
    .map(paragraph => {
      return parseParagrah(paragraph);
    });

  // Next, knowing all the package names in the file, we can parse the dependencies
  parseDepends(paragraphs);

  // Lastly, knowing all the dependecies of each package, we can parse the reverse dependencies
  parseReverseDepends(paragraphs);

  // Sorted by package name
  return paragraphs.sort((a, b) => {
    if (a.Package < b.Package) return -1;
    else return 1;
  });
};

const parseParagrah = paragraph => {
  let paragraphContents = {};

  paragraphContents.Package = parseField(paragraph, "Package");
  paragraphContents.Description = parseField(paragraph, "Description");
  paragraphContents.Depends = parseField(paragraph, "Depends");

  return paragraphContents;
};

const parseField = (paragraph, fieldName) => {
  if (paragraph.includes(fieldName)) {
    let fieldLines = paragraph
      .split(`${fieldName}:`)[1]
      .trim()
      .split("\n");

    let fieldContents = fieldLines[0];

    for (var i = 1; i < fieldLines.length; i++) {
      if (/^\s/.test(fieldLines[i]) && i > 0) {
        fieldContents = fieldContents + "\n" + fieldLines[i];
      } else break;
    }

    return fieldContents.trim();
  } else {
    return "";
  }
};

const parseDepends = paragraphs => {
  paragraphs.forEach(paragraph => {
    if (paragraph.Depends === "") {
      paragraph.Depends = [];
    } else {
      // Ignore versions
      let depends = paragraph.Depends.replace(/ *\([^)]*\) */g, "")
        .split(",")
        .map(dependency => {
          return dependency.trim();
        });

      paragraph.Depends = [];

      depends.forEach(dependency => {
        if (dependency.includes("|")) {
          paragraph.Depends.push(
            dependency.split("|").map(optionalDependency => {
              return optionalDependency.trim();
            })
          );
        } else {
          // Removes duplicate single dependencies (these come from ignoring versions)
          if (!paragraph.Depends.flat().includes(dependency)) paragraph.Depends.push([dependency]);
        }
      });

      paragraph.Depends.sort((a, b) => {
        if (a < b) return -1;
        else return 1;
      });
    }
  });
};

const parseReverseDepends = paragraphs => {
  paragraphs.forEach(paragraph => {
    paragraph.ReverseDepends = [];

    paragraphs.forEach(other => {
      if (other.Depends.flat().includes(paragraph.Package))
        paragraph.ReverseDepends.push(other.Package);
    });

    paragraph.ReverseDepends.sort((a, b) => {
      if (a < b) return -1;
      else return 1;
    });
  });
};

const validateControlFile = rawText => {
  if (
    !rawText.includes("Package: ") ||
    !rawText.includes("Description: ") ||
    !rawText.includes("Architecture: ")
  ) {
    throw new Error("Invalid control file");
  }
};
export default { parseStatusFile };
