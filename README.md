## Motigram


Motigram is small replica of Instagram.  
This project contains two main folders:

- `backend/`
- `frontend/`


### backend

The backend is an `expressJs` server with `MongoDB` as database.

The database will use two collections:

- users
- posts

The __users__ collection will contain the information related to the user:

- username
- email
- password
- token: used for making calls
- profilePic
- joinedDate

And the __posts__ collection will contain the images posts that the user will upload through this project.

### frontend

In this section I will include the main interactions with the website.


#### Login/Signup


![login singup](./readme-images/login_singup.gif)

This is very basic, where we have a box of signup and login.

#### Main Page

![main page](./readme-images/main_page.gif)

The main page contains the posts of all the users as you can see.  
Each post has:

- owner of post
- picture of profile
- image
- caption
- number of likes
- like button


#### Profiles


![profile](./readme-images/profiles.gif)

As you can see, when clicking on the logged user, either from top bar or from any post, the user can update his profile picture.  
For the other users, you can just have a preview of their profile.


#### Profile Picture

![profile picture](./readme-images/profile_picture.gif)

When uploading a new picture, the profile picture will be updated in the server, but also in the frontend for all the concerned posts


#### Uploading a Post

![upload post](./readme-images/upload_post.gif)

As you can see when uploading a new post, it will be at the top of the feed.


#### Say Goodbye

![log out](./readme-images/log_out.gif)

Last but not least, the logout, which allow to log out from the client but also to remove token from server.

## Run:

To run the project, you will need to go under each of the two _main folders_ and run `npm install`.  
After that, if you are using Linux, go under `/backend` and run `./start-server` which will run both the MongoDB server and the server.  
If you are not using Linux, start by running the database, then run `npm start`.

Now, we need to run the frontend by going to its corresponding directory, and execute `npm install && npm start`.



## Author

This project was done by Oussema Hidri as a task for an internship at Motius.  
Email: d.oussema.d@gmail.com

Hope you like the work and looking forward to talking to you.  
Thank you.
