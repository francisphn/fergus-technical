# Tradify

Tradify is a full stack app designed for tradies to manage jobs effectively. It is dependent on Microsoft SQL Server, written with C# using ASP.NET Core Web API in the backend, and Create React App in the frontend.

This app was developed as a technical test solution to Fergus by Francis Phan.

Access the live version here. PLEASE NOTE: You will need to check the spam folder as Firebase domains always end up in there.

## Getting started

### Preliminary
1. To get started, deploy a Microsoft SQL database (local or on Azure) and run the script in `db/setup.sql`.
2. Then, deploy a Firebase project and set up Authentication (including passwordless sign-ins).

### Backend
3. In `appsettings.json` in the root folder, change the database connection string to that of your database. Then you're ready to deploy!
3. Go to your Firebase project and request access to the Firebase Admin SDK. You will then be given a json credential file. Copy the content into `firebase.json` at the root folder.

### Frontend
4. Run `npm install` to install all dependencies.
5. In the `src` folder, create a new `.env` file with the following format. Replace with your Firebase credentials.

```
REACT_APP_FIREBASE_API_KEY = "---"
REACT_APP_FIREBASE_AUTH_DOMAIN = "---"
REACT_APP_FIREBASE_PROJECT_ID = "---"
REACT_APP_FIREBASE_STORAGE_BUCKET = "---"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "---"
REACT_APP_FIREBASE_APP_ID = "---"
```

6. In `Services/firebase.ts`, have a look at `actionCodeSettings`. Change the callback URL to your domain if you're deploying/running it locally etc.
7. In `Services/JobsSevices.ts`, replace the `basicUrl` with your deployed/development URL. 
7. Run `npm start` or deploy your frontend.

## Good things about Tradify

1. It is a full-featured full stack app complete with both the frontend and the backend.

2. It has a secure authentication/authorization system with Firebase with some basic React and API route protection, which implements passwordless authentication.

2. I have invested in the UI a bit using Tailwind CSS.


## Things that we need to improve

Because of the limited time available, there are many things that could be fixed to improve performance, such as:

1. Sorting and filtering. These are currently done at the frontend. If there were more time, doing it at the backend is better.

2. Firebase Authentication was used to quickly get things done but it is not a good authentication system (and this shows in the controller). Ideally I would have implemented it with Azure Active Directory B2C.

3. The API has only one controller to so that I can complete everything in a reasonable timeframe. 

4. I could have encoded the five status values as enum but it was taking a bit of time to work that out so I skipped in order to finish this project in a reasonable timeframe.

5. If I had more time I would have incorporated better programming practices particularly on the frontend (with reusable components).

## Things that are worth investigating

Using MongoDB NoSQL may have been a better choice particularly in satisfying the many-notes requirements for this small-scale project. Using Microsoft SQL Server complete with a full backend allows you to scale but it is a bit verbose.