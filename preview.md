# How to build a role-based REST API with Firebase

In this tutorial we’ll build REST API to manage users and roles using Firebase and node.js. In addition, we'll see how we can consume the API to authorize or not which users can access specific resources.
## Introduction
Almost every app requires some level of authorization system. In some cases, validating username/password with our users table is enough, but often we need a more fine-grained permissions model to allow certain users access certain resources and restrict them from others. Building a system to support the latter is not trivial and can be very time consuming. In this tutorial we’ll learn how to build a role-based auth API using Firebase, which we’ll help us get quickly up and running. 
### Role Based Auth
In this authorization model, access is granted to roles, instead of specific users, and a user can have one or more depending on how you design your permission model. Resources, on the other hand, require certain roles, to allow a user to execute it.


### Firebase
In a nut-shell Firebase Auth is an extensible token-based auth system and provides out-of-the-box integrations with the most common providers such as Google, Facebook, Twitter among others. 
It enables us to use custom claims which we’ll leverage to build a flexible role-base API.
We can set any JSON value into the claims (i.e. { role: ‘admin’ }, { role: ‘manager’ }).
Once set, custom claims will be included in the token that Firebase generates, and we can read the value set to control access.
It also comes with a very generous free quota, which in most cases will be more than enough.
### Firebase Functions
Fireb
## What we’ll build
Rest APi
Our API is rest, so, we’ll have
## Building the API
In order to build the API we’ll need 
a Firebase project
`firebase-tools` installed

First, login to Firebase

`firebase login`

Next initialize a project:

```BASH
firebase init
? Select a default Firebase project for this directory: {your-project}
? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use TSLint to catch probable bugs and enforce style? Yes  ? Do you want to install dependencies with npm now? Yes
```

At this point if you run `firebase serve` you can check the helloWorld
### Creating a Firebase Http Function
Now, lets code our API,  we are going to create an Http Firebase Function .



On the `index.ts` we will:
Initialize the firebase-admin module with `admin.initializeApp();`
Set an Express app as the handler of our `api` https endpoint

```TS
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './users/routes-config';

admin.initializeApp();

const app = express();

export const api = functions.https.onRequest(app);
```

Now, all requests going to `/api` will be handled by the `app` instance.

The next thing we’ll do is configure the `app` instance to support CORS, and add JSON body parser middleware. This way we can make requests from any url and parse JSON formatted requests.

```TS
//...
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

export const api = functions.https.onRequest(app);
```

Finally we will configure the routes that the `app` will handle. 

```TS
//...
import { routesConfig } from './users/routes-config';
 
//...
routesConfig(app)

export const api = functions.https.onRequest(app);
```
Firebase Functions allows us to set an express app as the handler, and any path after the one you setup at `functions.https.onRequest(app);` in this case `api`, will also be handled by the `app`. This allows us to write specific endpoint such as `api/users` and set a handler for each HTTP verbs, which we’ll do next.

Let’s create the file
`users/routes-config.ts`


Here we’ll set a `create` handler at POST ‘/users’ 

```TS
import { Application } from "express";
import { create} from "./controller";

export function routesConfig(app: Application) {
   app.post('/users',
       create
   );
}
```

Now we’ll create the `users/controller.ts`
We first validate all fields are in the body request, next we create the user and set the custom claims.
We are just passing `{ role }` in the `setCustomUserClaims`, the other fields are already set by Firebase. 
If no errors ocurr we return a 201 code with the `uid` of the user created.

```TS
import { Request, Response } from "express";
import * as admin from 'firebase-admin'

export async function create(req: Request, res: Response) {
   try {
       const { displayName, password, email, role } = req.body

       console.info(req.body)

       if (!displayName || !password || !email || !role) {
           return res.status(400).send({ message: 'Missing fields' })
       }

       console.info(displayName, password, email, role)

       const { uid } = await admin.auth().createUser({
           displayName,
           password,
           email
       })
       await admin.auth().setCustomUserClaims(uid, { role })

       return res.status(201).send({ uid })
   } catch (err) {
       return handleError(res, err)
   }
}

function handleError(res: Response, err: any) {
   return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
```

Now, let’s add secure the API by adding authorization.

To do that, we’ll add of handlers, to our create endpoint.

Create a function to expose the api
Create/Update/Delete users
Add the CRUD users functionality
Adding role functionality
Using custom claims to set roles and access-level


Consuming the API
Deploy the API
Calling the API
How to use the api
Securing your app
Using role-based auth in your app 

Conclusion

In this post we covered how to build a role-based api with Firebase Auth, and how to use it to secure your app.
Firebase allows you to get quickly up and running with an enterprise-level auth api, which you can later on extend.


Almost every project requires some level role-based auth, Firebase Auth lets you get started very quickly.
Leveraging built-in auth claims you can create a role-based auth api and secure your app.
The API we’ll create in this tutorial allows you to set custom roles or permission to your app users.
Disabling sign-up is not yet supported but its on its way, meanwhile by leveraging auth claims you can make sure only users created via API will be able to work with your app.
Role-Auth can then be used to secure you Firebase Functions, Firestore DB, Realtime DB or even be used from an external API.
Auth claims are included in token, which is embedded on every request, make sure you don’t abuse the size of data you include.


----

and enable the use of custom claims to control access in your app.
Firebase Auth is one of the Firebase suite features and allows us to quickly build a flexible role-based auth API to grant or deny access to app’s resources based on the role the user has.
It comes with several auth options including the most common ones such as Google, Facebook, Twitter among others.





, and building a flexible and reliable sy Often, this means , to allow or not users from accessing our app. Some apps just require users to login to their app while others allow or restrict access given the role the user has. If you need the latter, you need to build  a role-based auth system.
Firebase Auth is the authorization module of Firebase and 


Sometimes, just authenticating a user via OAuth or username/password is not enough and we need to manage permissions via some kind of role
to authorize If you need to add authorization rules to your app, you can get quickly up and running by leveraging Firebase Auth and custom claims.
Firebase is a great product backed by Google, very stable, and allows us to setup an auth api very quickly and also gives us flexibility to adapt it to our requirements. Also it comes with a generous free-tier that is more than enough for small apps.
In this tutorial we’ll build REST API to manage users and roles using Firebase Functions and node.js. 
Finally we’ll see how we can consume the API to authorize or forbid not which user froms can accessing specific resources.


Role-based Auth
What is
The model
What we’ll build

Firebase Auth
What is
Firebase is Google product which provides out-of-the-box auth functionality, and allows you to sign up users from different providers (google, facebook, twitter, phone number). In this article we’ll combine the auth functionality with custom claims to create a role-based API.
How it works
Firebase Auth works with token
Custom claims
Custom claims allows you to add custom data on your tokens, which we can use to create a role-based auth API
Why Firebase?


If you need to add authorization rules to your app, you can get quickly up and running by leveraging Firebase Auth and custom claims.
Firebase is a great product backed by Google, very stable, and allows us to setup an auth api very quickly and also gives us flexibility to adapt it to our requirements. Also it comes with a generous free-tier that is more than enough for small apps.
In this tutorial we’ll build REST API to manage users and roles using Firebase Functions and node.js. 
Finally we’ll see how we can consume the API to authorize or not which users can access specific resources.

Let’s get started!
