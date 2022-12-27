# AudioDB

## Description

Discovering new songs that you enjoy is a difficult task. Discovering new songs that you and your best friend both enjoy is even more difficult. We hope that our application will be able to streamline this process by implementing two additional functionalities to help with this problem. Our first feature will allow the user to input a set of parameters such as genre, mood, and weather and we will recommend a list of songs best suited to the user input. Our second feature includes functionality to recommend similar songs between two users based on their favorite playlists.

## Usefulness

We plan to implement two main functions to help users discover new songs and to help recommend new songs between two users. There are similar applications such as Spotify and other music streaming platforms. However, we plan to improve the functionalities that are already available on these applications by making them more personalized. For our first functionality, we will help users discover new songs by providing an advanced keyword search query. Current applications only provide one search bar so the user is unable to search as specific as they would like. The keyword search will contain options such as the genre, the weather, the mood, etc. This search query will be a lot more specific to the user’s tastes. The second functionality will recommend similar songs between two users based on their favorite playlists. Spotify currently has a similar feature that allows two users to make a playlist together, but this playlist would be made up of songs that both users listen to. Our functionality will recommend new songs that both users would possibly want to listen to. All in all, our application will provide a platform for users to search for music that is more specific to their tastes at the current moment and allow for users to discover new songs for themselves and with another user.

## Realness

The main pieces of data will be taken from the Spotify web API (https://developer.spotify.com/documentation/web-api/). We will use data from the API about the musical artists, genre, and track of the song. Other pieces of data will be collected from the user. This includes the username and password of the user's account as well as the data for the probability distribution of the user's favorite songs list which will be used in the data visualization column.

## Functionality

The main goal for this project is to deliver an application that allows the user to discover new songs that they could enjoy. 

#### The User Interface

There will be 4 main parts to the UI.

1. **Discover Page (Complex functionality)**:
The Discover Page will allows users to search for music based on their current mood, the weather of the day, the genre, and also any other keywords they would  like to search for in the search bar. The user will be allowed to choose a mood/weather/genre from a dropdown list. When the user presses the Search button, a list of recommended songs will pop up below with the song name, the artist name, and the Spotify link to the song. There will also be an add button to the side of every song to allow the user the add a song to their favorite songs list which is located in the My Songs Page.

2. **My Songs Page (Simple functionality)**:
The My Songs Page is the Home page of the application. It will contain a list of favorite songs that the user has added from the Discover or the Find Similar Page. In the favorites list, there will also be a delete button next to each song to allow the user to remove songs from their favorites list. Next to the favorites list, there will also be a data visualization column which will allow the user to view their favorites list the form of two pie charts. One pie chart will describe the different genres in the list and the other pie chart will describe the different artists in the list. The pie charts update as the favorites list is updated.
If the user did not login through the Login page, the favorites list and the data visualization column will be empty.

3. **Find Similar Page (Complex functionality)**:
The Find Similar Page allows for users to interact with other users on the application. There will be a search bar where the user can input another user's id. When the user hits the Search button, as long as the user id entered is valid, the application will recommend a list of songs for the user that is based on the favorite songs list for both users. Just like the Discover Page, the user can add songs from the recommended list to their favorites list.

4. **Login/Create Account Page (Simple functionality)**:
The Login/Create Account Page allows the user to enter their own account to see their favorites list as well the data visualization column. This page also allows new users to create an account. The username for the accounts will be the user's ID to input into the Find Similar page.

#### The Database

Our database will consist of several tables. 

The main table will contain data taken from the Spotify Web API. This table will contain attributes like the song name, artist name, genre, Spotify link, etc. This table is very important as our application will be recommending songs from this table.

We will have a table that stores all user login credentials. The data for this table comes from the user creating their account. This table will contain attributes like the username and password. This table will be a private table, and only accessible by admin users.

We will have a table that stores a user's favorite songs. The data for this table will update as the user adds songs from the Discover/Find Similar pages to their favorites list and deletes songs from their favorites list. This table will contain attributes like the song name, artist name, and Spotify Link.

We will also have tables corresponding to the attributes of mood, weather, and genre. This table will help with determining music to recommend.

#### The Creative Component

To add some creativity to our project, we decided to add the data visualization column to the My Songs page. This column will contain data analytics of the user's current favorite songs list. As described in the description of the My Songs page, this column will have to pie charts that analyze the user's artist and genre distribution. We decided to add this column because it will provide the user with some interesting analytics that the user can use to understand which artists or genres they like the most.
