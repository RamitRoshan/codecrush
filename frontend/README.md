# React
 
- Install tailwind 
- daisyUI(component Design library, and it's work absolutely fine with tailwidn)
[daisyUI](https://daisyui.com/?lang=en)

- [How to use daisyUI](https://daisyui.com/docs/install/)

- Install daisyUI (make sure we already installed tailwind) 
  
```js
npm i -D daisyui@latest
```

### DaisyUI is a Tailwind CSS plugin, not a runtime library like React.

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

1. git log  (do on root directory codecrush)
2. git pull (or git pull origin main)
3. (again we can run: git log , to check we pulled the newchanged or not)
4. then go (cd backend)
5. again install dependencies(npm install)
6. once you will write `git log` then second to exit press `q`
7. when we will run the server using (npm start), it will fail because we are using .env where all the secret keys is there .
8. so We have to create .env file in remote using:
    - `nano . env` (sudo nano . env)
    - THen write this:
    ```
    PORT="3000"
    DB_URL="mongodb+srv://ramitroshan:TYFseLnRunGTNtik@codecrs.uw65imz.mongodb.net/codeCrush"
    JWT_SECRET="CodeCrush@123"
    ``` 
    - Save the file (`cntrl + x) then Y Enter
    - Again write this to start the server : `npm start`

- Now go to aws instance(https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#InstanceDetails:instanceId=i-0401cb308e249ff98) , then went too security and click on the link og  security grous and then edit enbounce rules then do `Add rule` and add your local port `3000` and add customs where we have to write `0.0/0`

- Public IP : (13.62.104.47) and we can add now backend port (**13.62.104.47:3000**)
- When we write : `http://13.62.104.47:3000/user/feed` then it will show **Please Login or Signup**
- Here like in vs code terminal when we stop server or exit then it doesnot show any api in backend , **same happens in GitBash**. so once we stop the terminal in Git Bash then this link does not work (`13.62.104.47:3000`)
- We have to do something so that `npm start` keeps running in the backend.
- For this we will use **`pm2`** package.
    - [pm2](https://pm2.keymetrics.io/) 
    - **pm2** says:, **PM2** is a daemon process manager that will help you manage and keep your **application online 24/7.**
    - Install **pm2** : **`npm install pm2 -g`**
    > ubuntu@ip-172-31-41-40:~/codecrush/backend$ npm install pm2 -g

    - Now to start the server after installing pm2, we will use : `pm2 start npm -- start` ((must give space -- start)this will run via a process manager and it will run 24/7 in the background)


- This is a public IP instance of aws (13.62.104.47) and we added this in the mongodb Atlas network service to make db safe , so from now only from local computer and from aws we can get access of it.
- **To do copy paste in GitBash we use `shift + Insert`**

![GitBash Images](image.png)

- In this image pm2 is passed, suppose it shows it failed so how we will saw this, then we will use: 
    - **`pm2 logs`**
    - Suppose we write `pm2 start npm -- start` and our application does not start then to check it, we will run this commands: `pm2 logs`
    - Write now the name of pm2 is **npm**.
    - To check list we use:  pm2 list
    - To remove or flush we use : pm2 flush <name>(pm2 flush npm)
    - To stop we use: `pm2 stop <name>`
    - To delete we use: `pm2 delete <name>`

- To run our applications 24/7 we need to run this inside backend: `pm2 start npm -- start`


## Connection frontend with backend:

- Frontend is running on IP: http://13.62.104.47/
- Backend is running on: http://13.62.104.47:3000/(http://13.62.104.47:3000/user/feed)

1. if we do mapping (DNS mapping) with Domain name.
    - Domain name = codecrush.com =>  13.62.104.47
    - Frontend running on = codecrush.com
    - Backend running on = codecrush.com:3000 => codecrush.com/api (lets see how we map port(:3000) no. with path(/api) )
    - For that we will use [nginx proxy pass]
    - nginx also works as a load balancer
    - Command we will use here inside the remote in GitBash:
        - `sudo nano /etc/nginx/sites-available/default`  (here edit server_name 13.62.104.47; with IP address)
        - **nginx config:** (Also add reverse proxy)
            -  server_name 13.62.104.47; 
        ```
        location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        }
        ```  
![alt text](image-1.png)

- After adding these all save with (cntrl + x)
- Ctrl + X
   Y
   Enter

- Again restart `nginx`
    - sudo systemctl restart nginx
    - Now its working and frontend and backend mapped (`http://13.62.104.47/api/`)

- Modify the BASEURL in frontend project to "/api"
    - export const BASE_URL="/api";  
    - push code to github from local and from remote(Git Bash)
    - (use git log, use q to escape and finally git pull origin main)


## If we changed something on frontend then again we have to deplaoy with same methods

### steps to follow again:

1. cd codecrush
2. cd frontend
3. npm run build
4. `sudo scp -r dist/* /var/www/html/` (copied, now chaned and nginx will show new update one)


## If we changed something on **backend** then again we have to deplaoy with same methods

### steps to follow again:

**1️⃣ Push code from local to GitHub**
```
git add .
git commit -m "backend update"
git push origin main
```
**2️⃣ Pull code on server**
```
cd ~/codecrush
git pull origin main
```
**3️⃣ Go to backend**
```
cd backend
```
> If dependencies changed (package.json updated):
```
npm install
```

**4️⃣ Restart backend with PM2**
```
pm2 restart npm
```
Note: write `sudo nano .env` if u have to add something new in the env in remote(GitBash).

## Quick Commands Summary

**Frontend change:**
```
cd ~/codecrush
git pull
cd frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

**Backend change:**

```
cd ~/codecrush
git pull
cd backend
npm install
pm2 restart codecrush-backend
pm2 save
```
---

## Adding a custom Domain name:

- I wants cloudflare to manage DNS of my domain name which I purchase from GoDaddy
- Purchased domain name from godaddy
- signup on cloudflare and add a new domain name
- change the nameservers on godaddy and point it to cloudflare.
- wait for sometime till nameservers updated.
- Read about Registarar domain name
- Enable SSL in cloudflare, to make it more strong.
- Enable SSL for website

---
# Managing DNS: GoDaddy vs Cloudflare

**1. Managing DNS in GoDaddy**

When we buy a domain from GoDaddy, it already provides DNS management.

This means we can directly connect our domain to a server (like an AWS EC2 instance) using DNS records.

**Example flow:**
```
User → Domain (GoDaddy DNS) → EC2 Server → Nginx → Backend/Fronten
```

**Example DNS records in GoDaddy:**

| Type | Name | Value         |
| ---- | ---- | ------------- |
| A    | @    | EC2 Public IP |
| A    | www  | EC2 Public IP |

**Explanation:**

- @ → main domain (codecrush.cloud)

- www → www.codecrush.cloud

After this, the domain will point to our server.

So GoDaddy DNS is enough to make a website live.


## 2. Why Many Developers Use Cloudflare

Even though GoDaddy DNS works, developers often move DNS management to Cloudflare because it provides extra benefits.

**Key advantages of Cloudflare:**

**1. Free SSL (HTTPS):** <br>
Cloudflare can automatically provide HTTPS for the website.

<br>

2. **Security (DDoS protection)** <br>
Cloudflare protects the server from attacks.

<br>

3. **CDN (Content Delivery Network):** <br>
Website content is cached on global servers, making the site faster for users worldwide.

<br>

4. **Hide server IP:** <br>
Users see Cloudflare's IP instead of the actual EC2 IP.
<br>

5. **Performance optimization:** <br>
Cloudflare can compress files, cache responses, and improve loading speed.

<br>

**Example flow when using Cloudflare:**

```
User → Cloudflare → EC2 Server → Nginx → Backend
```

## 3. Steps to Connect GoDaddy Domain with Cloudflare

When we move DNS management to Cloudflare, **we usually perform these steps:**

**Step 1 – Add domain in Cloudflare**

Add the domain in Cloudflare dashboard.

**Step 2 – Cloudflare gives 2 nameservers**

Example:

```
alex.ns.cloudflare.com
lisa.ns.cloudflare.com
```

**Step 3 – Paste these nameservers in GoDaddy**

**In GoDaddy:**
```
Domain Settings → Nameservers → Custom
```

> Then paste the two nameservers from Cloudflare.

**This tells the internet:**
 - This domain's DNS is now managed by Cloudflare

## 4. Final Architecture

**Without Cloudflare:**

```
User
 ↓
GoDaddy DNS
 ↓
EC2 Server
 ↓
Nginx
 ↓
Node Backend + Frontend
```

**With Cloudflare:**

```
User
 ↓
Cloudflare (Security + CDN + SSL)
 ↓
EC2 Server
 ↓
Nginx
 ↓
Node Backend + Frontend
```


We can manage DNS directly in GoDaddy, but many developers move DNS to Cloudflare because it provides free SSL, CDN, DDoS protection, and performance optimization. To connect Cloudflare with GoDaddy, we simply replace the domain's nameservers in GoDaddy with the two nameservers provided by Cloudflare.



##  Sending Email via SES - Amazon Simple Email Service [Amazon SES](https://aws.amazon.com/ses/)

1. Sign in to console 
2. Now choose Mumbai region
3. On the left side search bar Search: IAM (Identity and Access Management (IAM))
4. Go there, create a user, click on user and it went to create a new user 
5. On User Detials pages Give user name like: **ses-user** and click on next. 
6. Now on the next page, click on `Attach Policy Directly` and in the Permissions policies search: **AmazonSESFullAccess** and click on this, **AmazonSESFullAccess**(it will give all access like send email, get email, read email). Now click on next and click on `create new user`
7. Now a new user will be created 
8. Now go AWS console back and search: [**Amazon Simple Email Service**](https://ap-south-1.console.aws.amazon.com/ses/home?region=ap-south-1#/account) and went to its dashboard.
9. Now set-up  ses and click on [`View Get Set Up page`](https://ap-south-1.console.aws.amazon.com/ses/home?region=ap-south-1#/onboarding-wizard)
10. Now verify it by sending domain name: (codecrush.cloud), and complete all the required process and then went to configuration -> IIdentities and there click on your Domain name(codecrush.cloud) [Identities](https://ap-south-1.console.aws.amazon.com/ses/home?region=ap-south-1#/identities/codecrush.cloud)
    
11. Here I will get  this error (`Action required
To verify ownership of this identity, DKIM must be configured in the domain's DNS settings using the CNAME records provided.`)

12. There are the 3 CNAME which I have to set-up on our DNS Settings;

(![Publish DNS records CNAME](image-2.png))

13. Amazon SES wants to verify that codecrush.cloud is my domain, then it will create an identity and it will give an access to send emails. I have to verify it like I am the owner of this domain name.
14. Now go to [cloudflare](https://dash.cloudflare.com/fb152839c2c2bc0a1e56b82d0b2a4a42/codecrush.cloud/dns/records) website, and went to overview then DNS -> Records. <br>
Here I will create few more DNS records , and turn off the proxy and this will show like this:
![CNAME](image-3.png) . 
<br>

15. In the above image we did for one CNAME , do it same for another 2 more CNAME.
16. Now I have set-up all 3 DNS record on our cloudflare
![all 3 DNS CNAME](image-4.png)


17. Now we have to wait here [Identity status](https://ap-south-1.console.aws.amazon.com/ses/home?region=ap-south-1#/identities/codecrush.cloud), here it shows `Verification pending`. once it will verify then we will move forward..

18. After verification, Now go to [Get set up](https://ap-south-1.console.aws.amazon.com/ses/home?region=ap-south-1#/get-set-up) and here Go to Open Tasks here then click on `Request production access
(Recommended)` (here we will use full capability of ses)

![Request Production access](image-5.png)

- click on submit button here 
- Now went to IAM and click on user and go to security credentials, and here go down and **create acess key** and here choose `other` and click on **next button** and here there is a Description tag value which is optional leave it and click on `create access key`.

![alt text](image-6.png)

19.  put this Secret access key and Access key in .env file..
20.  Now we have to write code for this: [aws ses nodejs documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html). 
<br> here go to: Sending an Email. there is a code here which helps us to send emails. ( we will use v3 i.e latest one)

21. [ AWS SDK for JavaScript V3 ](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html)
22. We will use this to send email, [Amazon SES](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_ses_code_examples.html)
23. Install AWS SDK - v3 -  [AWS Code Examples Repository](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples)
24. create a sesClient in backend project and write code there and install : npm i @aws-sdk/client-ses