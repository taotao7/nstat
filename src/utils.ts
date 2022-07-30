import shell from "shelljs";
import debug from "debug";

const dlog = debug("nstat");

// check git and repository
const checkGit = () => {
  if (!shell.which("git")) {
    throw "The application depends on git, please make sure git is installed";
  }
  // show all file
  const currentDirFile = shell.ls("-A");
  if (!currentDirFile.find((i) => i === ".git")) {
    throw "The current directory is not a git repository";
  }
};

// regx time
const checkTime = (start: string, end: string) => {
  const regx = /\d{4}(-\d{2}){2}/;
  if (regx.exec(start) && regx.exec(end)) {
    return true;
  }

  throw "The date entered does not conform to the specification e.g. 2022-01-01";
};

const buildGitCommand = (start?: string, end?: string, auth?: string) => {
  let baseCommand = `git log --pretty=tformat: --numstat `;
  if (start && end && checkTime(start, end)) {
    baseCommand += `--since=${start} --until=${end} `;
  }
  if (auth) {
    baseCommand += `--author=${auth}`;
  }
  return baseCommand;
};

const getAuthorCommitString = (
  start?: string,
  end?: string,
  auth?: string
): string | void => {
  checkGit();
  return shell.exec(buildGitCommand(start, end, auth), { silent: true }).stdout;
};

module.exports = {
  checkGit,
  getAuthorCommitString,
};
