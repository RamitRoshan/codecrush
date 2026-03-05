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