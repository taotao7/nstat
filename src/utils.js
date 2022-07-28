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

const getAllAuthor = () => {
  if (checkGit()) {
    console.log(
      shell.exec(" git log --pretty=tformat: --numstat", { silent: true })
        .stdout
    );
  }
};

getAllAuthor();

module.exports = {
  checkGit,
  getAllAuthor,
};
