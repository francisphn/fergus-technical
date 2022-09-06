# Tradify

Tradify is a full stack app designed for tradies to manage jobs effectively. It is dependent on Microsoft SQL Server, written with C# using ASP.NET Core Web API in the backend, and Create React App in the frontend.

This app was developed as a technical test solution to Fergus by Francis Phan.

## Using the app
[Access the deployed app here](https://tradify-d1ef0.web.app/). PLEASE NOTE: You will need to check the spam folder as Firebase domains always end up in there.

[Here is a quick guide to all features of the app and how to access them.](https://somber-town-507.notion.site/Tradify-b379cdd53a0d494e94b7b65dcf833388)

## Getting started

### Preliminary
1. To get started, deploy a Microsoft SQL database (local or on Azure) and run the script in `db/setup.sql`.
2. Then, deploy a Firebase project and set up Authentication (including passwordless sign-ins).

### Backend
1. In `appsettings.json` in the root folder, change the database connection string to that of your database. 
2. Go to your Firebase project and request access to the Firebase Admin SDK. You will then be given a json credential file. Copy the content into `firebase.json` at the root folder. For more information, refer to the *Intialize the SDK* section in [this official documentation](https://firebase.google.com/docs/admin/setup).
3. Run or deploy the API.
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

3. Instead of using Entity Framework Core, I use Dapper so querying the database is a *lot* faster.


## Things that we need to improve

Because of the limited time available, there are many things that could be fixed to improve performance, such as:

1. I did not use Redux (because the spec requirements specified I needed to spend less than 3 hours on this project) which means I have overused `React.useEffect()` throughout the project leading to significant latency rates. If I had had more time to complete I would have used Redux or Zustand.

1. Sorting and filtering. These are currently done at the frontend. If there were more time, doing it at the backend is better.

2. Firebase Authentication was used to quickly get things done but it is not a good authentication system (and this shows in the controller). Ideally I would have implemented it with Azure Active Directory B2C.

3. The API has only one controller to so that I can complete everything in a reasonable timeframe. 

4. I could have encoded the five status values as enum but it was taking a bit of time to work that out so I skipped in order to finish this project in a reasonable timeframe.

5. If I had more time I would have incorporated better programming practices particularly on the frontend (with reusable components).

## Things that are worth investigating

Using MongoDB NoSQL may have been a better choice particularly in satisfying the many-notes requirements for this small-scale project. Using Microsoft SQL Server complete with a full backend allows you to scale but it is a bit verbose.

I could have also simply used Firebase Cloud Firestore and simply ditch the entire backend. However, Firebase has a request limit on its free plan (10,000 per month) and is not suitable for the long term.
