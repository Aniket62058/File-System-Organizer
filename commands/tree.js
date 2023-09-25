let fs=require("fs");
const { basename } = require("path");
let path=require("path")

let types = {
    media: ["mp4","mkv"],
    archives:["zip","7z","rar","tar","gz","ar","iso","xz"],
    documents:["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex"],
    app:['exe','dmg','pkg',"deb"]
}

function tree(dirPath)
{
    if(dirPath==undefined){
        helpTree(process.cwd(),"");
        return;
    }
    else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            helpTree(dirPath,"");
        }
        else{
            console.log("Please enter right path!!");
            return;
        }
    }
}

function helpTree(dirPath,indent)
{
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile){
        let fileName=path.basename(dirPath);
        console.log(indent+"├─── "+fileName);
    }
    else{
        let dirName=path.basename(dirPath);
        console.log(indent+"└─── "+dirName);
        let child=fs.readdirSync(dirPath);
        for(let i=0;i<child.length;i++)
        {
            let childPath=path.join(dirPath,child[i]);
            helpTree(childPath,indent+"\t");
        }
    }
}

module.exports={
    treeKey:tree
}
