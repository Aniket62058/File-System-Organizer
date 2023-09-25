let fs=require("fs");
const { basename } = require("path");
let path=require("path")

let types = {
    media: ["mp4","mkv"],
    archives:["zip","7z","rar","tar","gz","ar","iso","xz"],
    documents:["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex"],
    app:['exe','dmg','pkg',"deb"]
}

function organize(dirPath)
{
    // 1. Input -> directory path given
    let desPath;
    //console.log("Welcome in organize function");
    if(dirPath==undefined){
        desPath=process.cwd();
        return;
    }
    else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){

            // 2. Create -> organized_files -> directory
            desPath=path.join(dirPath,"organized_files");
            if(fs.existsSync(desPath)==false){
                fs.mkdirSync(desPath);
            }

        }
        else{
            console.log("Please enter right path!!");
            return;
        }
    }
    organizeHelper(dirPath,desPath);
}

function organizeHelper(src,dest){
    //3. Identify categories of all the files present in the input directory.

    let childNames=fs.readdirSync(src);
    //console.log(childNames);
    for(let i=0; i<childNames.length; i++){
        let childAddress=path.join(src,childNames[i]);
        let isFile=fs.lstatSync(childAddress).isFile();
        if(isFile){
            //identifying the catogry of file using (user defined) getCategory function
            let category=getCategory(childNames[i]);
            console.log(childNames[i]," belongs to -->",category);
            //copy/cut files to that organized directory inside of any of category folder
            sendFiles(childAddress,dest,category);
        }
    }
}

function sendFiles(src,dest,category){
    let catPath=path.join(dest,category);
    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath);
    }
    let fileName=path.basename(src);
    let desPath=path.join(catPath,fileName);
    fs.copyFileSync(src,desPath);
    fs.unlinkSync(src);
    console.log(fileName," copied to ", category);
}

function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types){
        let curTypeArr=types[type];
        for(let i=0;i<curTypeArr.length;i++)
        {
            if(ext==curTypeArr[i])
            return type;
        }
    }
    return "others";
}

module.exports={
    organizeKey:organize
}
