## Hackaday

### Install NVM (Node Version Manager)
```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
**Note:** On Linux, after running the install script, if you get `nvm: command not found` or see no feedback from your terminal after you type:
```bash
command -v nvm
```
### Install Node.js and npm (npm will been installed automatically with node)
```bash
$ source ~/.nvm/nvm.sh
$ nvm install node
```
### App Initial and install dependace
```bash
$ npm init -f
$ npm install formidable --save
```
### App Install
```bash
Linux因为symlink安装不成功时，可以在Windows上安装，因为有vagrant可以同步两边文件，所以在哪边安装差别不大。
$ npm install
```
### Run App
```bash
$ node server
```
### Review web page
Go To `http://localhost:3001`

### Check List
1. Use Express.js as web server.
2. Use EJS as template engine.
3. Render single web page at server-side by using EJS.
4. Use Vanilla Javascript implemented `AJAX`, `Datagrid`, `Tooltip` classes.
5. Implemented dynamic loading tooltip data.
6. Implemented local prev/next functions, which not trigger server-side reload.
