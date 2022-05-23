const {app,BrowserWindow, ipcMain, dialog} = require("electron")
const path = require("path")

let root;

const AppWindow = () => {
    root = new BrowserWindow({
        webPreferences:{
            webSecurity:true,
            nodeIntegration:false,
            preload:path.join(app.getAppPath(),"renderer.js")
        },
        frame:false
    })
    root.loadFile("index.html")
}

// Hardware
app.disableHardwareAcceleration()

// Initial Start
app.on("ready", () => {AppWindow()})

// File Compress
ipcMain.on("file_compression_action",(e,arr) => {
    dialog.showOpenDialog(root,{
        title:"Open File",
        properties:["openFile"]
    }).then(getdata => {
        if(getdata.canceled == false){
            e.reply("file_allow",{data:getdata.filePaths[0]})
        }
    })
})

// Folder Compress
ipcMain.on("folder_compression_action",(e,arr) => {
    dialog.showOpenDialog(root,{
        title:"Open File",
        properties:["openDirectory"]
    }).then(getdata => {
        if(getdata.canceled == false){
            e.reply("folder_allow",{data:getdata.filePaths[0]})
        }
    })
})

// finish Popups
ipcMain.on("finish_popup",(e,arr) => {
    dialog.showMessageBoxSync(root,{
        title:"Done",
        message:`${arr.data}`
    })
})

// Close Action
ipcMain.on("close_action", () => {app.quit()})

// Max Action
ipcMain.on("max_action", () => {root.isMaximized()?root.unmaximize():root.maximize()})

// Min Action
ipcMain.on("min_action", () => {root.minimize()})