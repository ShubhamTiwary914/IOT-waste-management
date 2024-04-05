# HackIOT - UIT
## IoT-based system to track and manage food waste in grocery stores and restaurants. 
<br><br>

<h2> Contents </h2>
<h4> - Tech Stacks </h4>
<h4> - Files Structure 📂 </h4>
<h4> - Setup Guide 🧰 </h4>
<h4> - How to run 🧪 </h4>
<br><br><br>
<hr>



<h3> Tech Stacks used </h3>

**_Server Side script + Environment_** –   Node.js + npm[9.5.1] <br>
**_Database [NoSQL]_** –   MongoDB + mongoose <br>
**_Http Server + Routing_** –   Express.js <br>
**_Client Side Requests_** –  Axios <br>
**_IOT Side Requests_** - Wifi Library[Connection] + ArduinoHTTPClient[Requests] + ArduinoJSON[Packaging]  <br>


<br><br>
<hr>



<h3>  Files Structure 📂 </h3>

> **_api_**: server side applications [Express + Node + mongoDB + FastAPI] <br>
> **_web_**: client side application [React +_AJAX] <br>
> **_iot_**: hardware, IOTs & Sensors  [ESP32]

<br><br>




<hr>
<h3>  Setup Guide 🧰 </h3>


> Go inside a folder using change directory<br>

>> For Backend: 
``` cmd
  cd api
```
<br>

>> For Frontend
``` cmd
  cd web
```

<br>

> Then with the web or api directory --> Install the dependencies (since these do not appear here on github) you gotta install with the command:
```npm
  npm install 
```

<br><br>



<hr>
<h3> How to run 🧪 </h3>

> To run the web-application, there are two steps <br>
>> 1. First, open the terminal and run the backend server:

```cmd
  ./server
```
> It should give something like this: <br>
![image](https://github.com/ShubhamTiwary914/hackIOT-uit/assets/67773966/cfd45b86-e7d1-473b-a377-5c029e6f1d4d)

>> 2. Then, in another terminal(dont close the server's one), run the react server:
```cmd
  npm run dev
```

<br>

> [!NOTE]
> This is only during development, once server is deployed, there is no need to run the server


