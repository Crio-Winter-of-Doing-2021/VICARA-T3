## Storage Drive for digital assets which can be adopted by enterprises and integrated with their other systems. Features include:

- Upload file.
- View all files.
- Download file.
- Rename file.
- Delete file.
- Add to favorites.
- Trash storage.
- Share file with a url for certain expiry time.
- Recent files by modified time.
- Error handling for all routes.
- Authentication for users to login.
- Created and updated time of file.

### SETUP INSTRUCTIONS

Node.js version 14+ and npm must be installed on your machine. MongoDb must be installed and runing on port:27017. In terminal type the following commands to run the api server:

```
git clone https://github.com/Crio-Winter-of-Doing-2021/VICARA-T3
cd backend
touch dev.env
vim dev.env
sudo npm install
npm run dev
```

Insert the following lines in `dev.env`, replacing all `<content>` with your own information:

```
PORT=3000
MONGODB_URL=<mongodb connection string>
JWT_SECRET=<unique key of your choice to generate JSON web tokens>
ACCESS_KEY_ID=<aws s3 access key>
SECRET_ACCESS_KEY=<aws s3 secret access key>
BUCKET_NAME=<aws s3 bucket name>
```

In another terminal to run the application

```
cd frontend
touch dev.env
vim dev.env
sudo npm install
npm run dev
```

Insert the following lines in `dev.env`, replacing all `<content>` with your own information:

```
PORT=8000
```

## Server

The server is made on `nodejs` (v14.15.4)

`Express.js` is used as the server framework

## NPM Library

- `cors` - to provide a Connect/Express middleware that can be used to enable CORS .

- `env-cmd` - to use env variables.

- `mongoose` - MongoDB library for JS.

- `hbs` - to render hbs files.

- `aws-sdk` - to use aws s3 bucket.

- `jsonwebtoken` - to create authentication token..

- `bcryptjs` - to encrypt plain password.

- `validator` - to validate and sanitize string.

## API

- The various requests and endpoints are:-

- Use POSTMAN to fire off the requests to the endpoints.
