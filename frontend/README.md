# React + Vite
 
- Install tailwind 
- daisyUI(component Design library, and it's work absolutely fine with tailwidn)
[daisyUI](https://daisyui.com/?lang=en)

- [How to use daisyUI](https://daisyui.com/docs/install/)

- Install daisyUI (make sure we already installed tailwind) 
  
```js
npm i -D daisyui@latest
```

### daisyui is a Tailwind CSS plugin, not a runtime library like React.

**It is:**

- Used during development/build time
- Processed by Tailwind
- Not shipped directly to the browser as JS

**So installing it as a dev dependency is correct and recommended.**


#### library

- npm install react-router-dom
- npm install axios
- CORS - install cors in backend => add middleware to app with configuration: origin , credintials : true
- Whenever you are making an API call so pass, axios =>  {withCredentials: true} //to access cookies  ( if we don't pass then authentication will going to fail)
- We will create a body component(which is a main components) and under this , we will write rest component like: Navbar, Login


Body
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile

- <Outlet/> => any children routes of body, will render over here. 
- 127.0.0.1 (this is exactly same as localhost)


### Redux Toolkit

Install Redux Toolkit and React-Redux
Add the Redux Toolkit and React-Redux packages to your project:

```javascript
npm install @reduxjs/toolkit react-redux 
```



## Deployment: 

- signup on AWS
- Launch Instance
- chmod 400 "codeCrush-secret.pem" (run this command on gitbash, on download(cd Downloads))
- `ssh -i "codeCrush-secret.pem" ubuntu@ec2-13-62-104-47.eu-north-1.compute.amazonaws.com` 
(whenever we have to  start the aws in gitbash then this command we have to use)
- Install Nodejs
    - curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    - sudo apt install -y nodejs
    - node -v (both used to check node is installed or not)
    - npm -v

- In aws system using git bash we installed same local node version (v22.13.0)
    - nvm install 22.13.0

### Git Clone

- git clone https://github.com/RamitRoshan/codecrush.git
    - cd code crush -> cd frontend
    - npm install (install all dependdencies)
    - npm run build 

- We have make a bundler of vite project 1st, and for that we cannot run `npm run dev` it is good to run on local .
- but for build we have to run `npm run build`
    - It will bundle up our project and create a `dist` folder inside the frontend folder . 
    - `dist` will contains all the neccessary files/package of frontend project inside the dist folder.
    - `dist` is the code we will going to deploy.
    - `src` is the folder where we write code, but when we are deploying on the production then we will need a compiled code, we will need a built code

- Remote machine means `aws`, now on aws we are making built of frontend projects
- `dist` folder contains all the code, that we need to run on server.

- To deploy `frontend` project we need something known as, `nginx`
    - `nginx` is a open source web server we will use to host `frontend` projects. 
    - To use `nginx` we first have to install it..
        - before installing Nginx on Ubuntu, it’s a good practice to update your package lists. This ensures you get the latest available version of Nginx and avoids potential issues. You can do it with:
        - `sudo apt update`
    - After that, you can install Nginx: 
        - `sudo apt install nginx`
    -  To start `nginx` we use this commands:
        - `sudo systemctl start nginx` (then)
        - `sudo systemctl enable nginx`   # so it starts on boot 
   - copy code from `dist`(build files) folder to **/var/www/html/**(nginx http server)
        - Now go to ubuntu@ip-172-31-41-40:~/codecrush/frontend$: `cd /var/www/html/`
        ```js
        ubuntu@ip-172-31-41-40:~/codecrush/frontend$ cd /var/www/html/
        ubuntu@ip-172-31-41-40:/var/www/html$ ls
        index.nginx-debian.html
        ubuntu@ip-172-31-41-40:/var/www/html$ 
        ````

- use command to copy(scp) all the folder of dist : `sudo scp -r dist/* /var/www/html/`
- Now go to **cd /var/www/html/**
- do `ls`(it will show we have copy pasted all the file and it will show like this: )
  
```javascript
ubuntu@ip-172-31-41-40:~/codecrush$ cd frontend
ubuntu@ip-172-31-41-40:~/codecrush/frontend$ scp -r dist/* /var/www/html/
cp: cannot create directory '/var/www/html/assets': Permission denied
cp: cannot create regular file '/var/www/html/index.html': Permission denied
cp: cannot create regular file '/var/www/html/vite.svg': Permission denied
ubuntu@ip-172-31-41-40:~/codecrush/frontend$ sudo scp -r dist/* /var/www/html/
ubuntu@ip-172-31-41-40:~/codecrush/frontend$ cd /var/www/html/
ubuntu@ip-172-31-41-40:/var/www/html$ ls
assets  index.html  index.nginx-debian.html  vite.svg
ubuntu@ip-172-31-41-40:/var/www/html$

``` 
- Now we are ready to see our application live 

### TO restart Gitbash , everytimes we have to go :
`cd Downloads`
- then write this `ssh -i "codeCrush-secret.pem" ubuntu@ec2-13-62-104-47.eu-north-1.compute.amazonaws.com`
- then, went to `cd codecrush` 
- This is the Public IPv4 adress where we will get our server(got from aws instance): **13.62.104.47**
- Enable port :80 of your instance ( to run our server)



## Backend Deployment:

- Open Git Bash 
- go to Downloads(cd Downloads)
- Then run this commands to start the system:
    - `ssh -i "codeCrush-secret.pem" ubuntu@ec2-13-62-104-47.eu-north-1.compute.amazonaws.com` 

- Go to codecrush (cd codecrush)
- Now go Backend(cd backend)
- Install the required packages(npm install)
- Move to vs code and go to `backend` directory and run this commands to start the server for production :


#### When you change something on code and push to GitHub then you have to push this into Remote(Git Bash)

1. git log 
2. git pull
3. (again we can run: git log , to check we pulled the newchanged or not)