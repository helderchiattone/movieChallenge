## Blue Coding's Movie Challenge
This is a **React Native** programming challenge I took as part of the recruitment process for Blue Coding.
The app is based on one of two designs provided by the recruiter (I chose number 2), and is composed of three basic screens:

1. Home Screen
2. List Screens (there are 4 of them)
3. Detail Screen

The data used on this app was from the [The Movie Database API](https://www.themoviedb.org/documentation/api).
It was developed using React Native, Typescript, RN Navigation and a few other libraries.
The app works on both Android and iOS and was created using React Native CLI.

The Home Screen has four API calls for different categories of movies (Trending, Popular, Coming Soon and Top Rated).
These were implemented using a simple fetch with FlatList and some styling.
The user can either press any of the movie posters to go into the Detail Screen or press the **Show All**, to go to a specific List Screen that lazy-loads the movies page by page.
This was done using a router component that took care of the header and routes provided in the app.
Inside the detail screen, there is some information about that specific movie, such as: title, tagline, images, cast, overview and some recommendations based on the movie of choice.
It was all styled using the react native StyleSheet.

Here are some screenshots of the Android version of the application.

![Home Screen](https://i.imgur.com/65gwAxQ.png) ![Listing Screen](https://i.imgur.com/JQDYCnN.png) ![Detail Screen 1](https://i.imgur.com/0DeXWLb.png) ![Detail Screen 2](https://i.imgur.com/6CNUF37.png)

I'm pretty happy with the final result considering I had just a few hours to complete it (the recruitment process required some urgency).

Any questions feel free to e-mail me at **helderbpf@gmail.com**.
