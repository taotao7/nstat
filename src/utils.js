const shell = require("shelljs");
const chalk = require("chalk");
const dlog = require("debug")("nstat");

const checkGit = () => {
  if (!shell.which("git")) {
    console.log(
      chalk.red(
        "The application depends on git, please make sure git is installed"
      )
    );
    return false;
  }
  // show all file
  const currentDirFile = shell.ls("-A");
  if (!currentDirFile.find((i) => i === ".git")) {
    console.log(chalk.red("The current directory is not a git repository"));
    return false;
  }
  return true;
};

// regx time
const checkTime = (start, end) => {
  const regx = /\d{4}(-\d{2}){2}/;
  if (regx.exec(start) && regx.exec(end)) {
    return true;
  }
  console.log(
    chalk.red(
      "The date entered does not conform to the specification e.g. 2022-11-21"
    )
  );
  return false;
};

const getAuthorCommit = (start, end) => {
  let stat;

  if (start && end) {
    if (!checkTime(start, end)) {
      return;
    }

    if (checkGit()) {
      console.log(
        shell.exec(
          `git log --pretty=tformat: --numstat --since=${start} --until=${end}`,
          { silent: true }
        ).stdout
      );
      return;
    }
  }

  if (checkGit()) {
    console.log(
      shell.exec(`git log --pretty=tformat: --numstat `, { silent: true })
        .stdout
    );
    return;
  }
};

getAuthorCommit();

module.exports = {
  checkGit,
  getAuthorCommit,
};
