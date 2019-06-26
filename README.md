# Stack Overflow Light

## Demo

URL: [https://www.youtube.com/watch?v=WLqsk7EvtG0](https://www.youtube.com/watch?v=WLqsk7EvtG0)

## Project setup

make sure to run the API first: [https://github.com/JarneDeschacht/StackOverflow-Light-Backend](https://github.com/JarneDeschacht/StackOverflow-Light-Backend)<br/>
clone this project:

	git clone https://github.com/JarneDeschacht/StackOverflow-Light-Frontend.git

Cd into it:

	cd StackOverflow-Light-Frontend

You need to have `Node.js` and `npm` installed on your PC/Mac.

Install dependencies:

	npm install

## Run Project

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## App Description 

-	The web application makes it possible to ask questions and allow other users to
answer them.
- People can upvote or downvote questions.
- Most popular questions are at the top.
- When opening the web application, the user can see a list of questions asked.
- Questions also visualize the amount of answers & votes.
- Users can click on questions and see a detail screen of the questions with the answers
given by other users.
- Users can not pose questions, give answers or vote questions without authenticating.

## Features

-	Angular 7
-	Routing
-	Lazy loading (authentication & post modules)
-	Material Design & Bootstrap 4: MDBootstrap
-	Responsive layout
-	RxJS/Observables
-	JSON Web Token based authentication
-	Route Guards & Interceptors
- 	Angular Reactive forms
- 	Scalable architecture
-	Following the best practices!

## Why Angular

- I feel comfortable using it
- It makes application stable and fast
- Out of box support for navigation ( with almost every other framework, you need a separate library for this)
- Support for data maintenance using services
- Support for lazy loading
- Support for progressive webapps
- Loads of inbuilt filters, pipes for modulating your data on UI
- Reactive forms
- Possibility to create your own Pipes, custom validators, ...
- There are many many other features which I can't think of now

## Notes

- when a unauthorized user wants to navigate to an authorized route, he will be redirected to a login page in order to log in. There is a small unsolved issue where you have to click twice on the login button to go the original page you wanted to visit.
