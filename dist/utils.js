"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const debug_1 = __importDefault(require("debug"));
const dlog = (0, debug_1.default)("nstat");
// check git and repository
const checkGit = () => {
    if (!shelljs_1.default.which("git")) {
        throw "The application depends on git, please make sure git is installed";
    }
    // show all file
    const currentDirFile = shelljs_1.default.ls("-A");
    if (!currentDirFile.find((i) => i === ".git")) {
        throw "The current directory is not a git repository";
    }
};
// regx time
const checkTime = (start, end) => {
    const regx = /\d{4}(-\d{2}){2}/;
    if (regx.exec(start) && regx.exec(end)) {
        return true;
    }
    throw "The date entered does not conform to the specification e.g. 2022-01-01";
};
const buildGitCommand = (start, end, auth) => {
    let baseCommand = `git log --pretty=tformat: --numstat `;
    if (start && end && checkTime(start, end)) {
        baseCommand += `--since=${start} --until=${end} `;
    }
    if (auth) {
        baseCommand += `--author=${auth}`;
    }
    return baseCommand;
};
const getAuthorCommitString = (start, end, auth) => {
    checkGit();
    console.log(buildGitCommand(start, end, auth));
    return shelljs_1.default.exec(buildGitCommand(start, end, auth), { silent: true }).stdout;
};
module.exports = {
    checkGit,
    getAuthorCommitString,
};
