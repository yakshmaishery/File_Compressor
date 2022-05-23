const { ipcRenderer } = require("electron")
const compressing = require('compressing');
const fs = require('fs');
const path = require('path');
const process = require('process');

window.addEventListener("DOMContentLoaded",() => {
    // Close Button
    document.getElementById("closebtn").addEventListener("click", () => {ipcRenderer.send("close_action")})
    // Maximize Button
    document.getElementById("maxbtn").addEventListener("click", () => {ipcRenderer.send("max_action")})
    // Minimize Button
    document.getElementById("minbtn").addEventListener("click", () => {ipcRenderer.send("min_action")})


    // File Compress
    document.getElementById("FILE_BTN").addEventListener("click", () => {ipcRenderer.send("file_compression_action")})
    
    ipcRenderer.on("file_allow", (e,arr) => {
        const zipstream = new compressing.zip.Stream()
        zipstream.addEntry(arr.data)
        process.chdir(path.dirname(arr.data))
        zipstream.pipe(fs.createWriteStream(`${path.basename(arr.data).split(".")[0]}.zip`))
        ipcRenderer.send("finish_popup",{data:`${path.join(path.dirname(arr.data),path.basename(arr.data).split(".")[0])}.zip`})
    })
    // Folder Compress
    document.getElementById("FOLDER_BTN").addEventListener("click", () => {ipcRenderer.send("folder_compression_action")})
    
    ipcRenderer.on("folder_allow", (e,arr) => {
        const zipstream = new compressing.zip.Stream()
        zipstream.addEntry(arr.data)
        process.chdir(path.dirname(arr.data))
        zipstream.pipe(fs.createWriteStream(`${path.basename(arr.data).split(".")[0]}.zip`))
        ipcRenderer.send("finish_popup",{data:`${path.join(path.dirname(arr.data),path.basename(arr.data).split(".")[0])}.zip`})
    })
})