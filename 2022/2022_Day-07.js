class Folder {
    constructor(name, parent) {
        this.type = 'FOLDER';
        this.name = name;
        this.parent = parent;
        this.contents = [];
        this.size = 0;
    }

    addFile = (newName, size) => {
        const newFile = new File(newName, size, this);
        this.contents.push(newFile);
        return newFile;
    }

    addFolder = (newName) => {
        const newFolder = new Folder(newName, this);
        this.contents.push(newFolder);
        return newFolder;
    }

    getContent = (name) => {
        return this.contents.find(cont => cont.name == name);
    }

    getSize = () => {
        this.size = this.contents.reduce((a, b) => a + b.getSize(), 0);
        return this.size;
    }

    getSubFolderSizes = () => {
        return [...(this.contents.filter(content => content.type == 'FOLDER').map(fold => fold.getSubFolderSizes()).flatMap(num => num)), this.size];
    }
}

class File {
    constructor(name, size, parent) {
        this.type = 'FILE';
        this.name = name;
        this.size = parseInt(size);
        this.parent = parent;
    }

    getSize = () => {
        return this.size;
    }
}

class CmdLine {
    constructor() {
        this.fileSystem = new Folder('/', null);
        this.current = this.fileSystem;
    }


    navCmd = (loc) => {
        if (loc == '/') this.current = this.fileSystem;
        else if (loc == '..') this.current = this.current.parent;
        else this.current = this.current.getContent(loc);
    }

    addFolderCmd = (name) => {
        this.current.addFolder(name);
    }

    addFileCmd = (name, size) => {
        this.current.addFile(name, size);
    }

    processCmd = (stringCmd) => {
        const splitCmd = stringCmd.split(' ');
        if (splitCmd[0] == '$' && splitCmd[1] == 'cd') this.navCmd(splitCmd[2]);
        else if (splitCmd[0] == 'dir') this.addFolderCmd(splitCmd[1]);
        else if (!isNaN(parseInt(splitCmd[0]))) this.addFileCmd(splitCmd[1], splitCmd[0]);
    }

    processCmdBatch = (stringCmds) => {
        stringCmds.split('\n').filter(cmd => cmd.length > 0).forEach(cmd => this.processCmd(cmd));
    }
}

const fullCmdData = document.getElementsByTagName('pre')[0].textContent;
const cmdLine = new CmdLine();
cmdLine.processCmdBatch(fullCmdData);
cmdLine.fileSystem.getSize();
const allFolderSizes = cmdLine.fileSystem.getSubFolderSizes();
console.log('Part 1:', allFolderSizes.filter(num => num <= 100000).reduce((a, b) => a+b, 0));
const targetSpace = 30000000 - 70000000 + cmdLine.fileSystem.size;
let closestMatch = cmdLine.fileSystem.size;
allFolderSizes.forEach(val => {
    if (val > targetSpace && val < closestMatch) closestMatch = val;
});
console.log('Part 2:', closestMatch);