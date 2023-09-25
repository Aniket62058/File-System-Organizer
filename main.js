#!/usr/bin/env node
let fs=require("fs");
const { basename } = require("path");
let path=require("path")
let input=process.argv.slice(2);
let command=input[0];

let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize");



switch(command)
{
    case "tree":
        treeObj.treeKey(input[1]);
        break;
    case "organize":
        organizeObj.organizeKey(input[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please 🙏 enter right command.");
        break;
}




