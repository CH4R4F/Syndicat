# SYNDICAT

syndicat is a wep app for managing the syndicate of a building, it provides a dashboard to manage the buildings, apartments, tenants, and payments.

## run the app

> this app is under continuous development, so this instructions may change later

- First clone the project

```bash
git clone https://github.com/CH4R4F/Syndicat.git
```

- Inside the project you have two layers, frontend and server, locate to each directory and install all needed dependencies

  ```bash
  cd frontend
  npm install
  ```

  ```bash
  cd server
  npm install
  ```

- run the containers in the root folder using docker-compose (you need to have docker installed)

  ```bash
  docker-compose up
  ```

- the app will be running on http://localhost:3000

> the Dockerfile contains different running modes, (development, production, test), you can uncomment the one you want to use
