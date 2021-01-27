const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

app.on('ready', function () {
    //create New Window
    mainWindow = new BrowserWindow({
        // slves issue where "require is undefined"
        webPreferences: {
            nodeIntegration: true
        },
    })

    //load html file int window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/views/timer.html'),
        protocol: 'file',
        slashes: true
    }));

    // quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    } )

     //build menu from template
     const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
     //insert menu
     Menu.setApplicationMenu(mainMenu)
});

//create menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
        {
            label: 'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click() { app.quit(); }
        }]
    }
];

// if mac add empty obj to menu
if (process.platform =='darwin'){
    mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
              label: 'Toggle Dev Tools',
               accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
              click(item, focusedWindow){
                  focusedWindow.toggleDevTools();
               }
           },
           {
               role: 'reload'
           }
        ]
    })
   }