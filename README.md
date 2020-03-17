# BOT-O-MAT
From the description of the project, I decided to tackle the challenge with web technologies such as HTML, CSS and Javascript.
This decision was based on my understanding of the specifications which led me to design an easy to use application with Javascript taking care of all the logistics. With just a small amount of libraries used, the application is very lightweight. Also, a great benefit of using web technologies is that my application is cross-platform.

The application has a small alteration to the specifications provided which is worth mentioning. Since the tasks assigned to each bot are constant (5 tasks per bot), I decided to meassure the time it took to complete the set tasks instead of the amount of tasks completed. Also, each time to complete a task varies from bot to bot. A random variable value of time is added to each "eta" of the tasks per bot as to make some bots faster than others.

## Tutorial
The application layout has 3 main sections.

### The Input Section
This section provides the necessary fields to create your bot. 
The first field is the "name" field, where a name must be entered before creating a bot.
The second field is the "type" field, where a type for the bot must be selected, for simplicity, the previous type remains in the field.
Both fields must have values before pressing the "Add Button" which creates a bot and shows it in The Bots Section.

### The Bots Section
This section provides a container to store and show all the bots created. Here, a card is created for every instance of bots created containing the information of the bot (image, name, type, tasks).

### The Leader Board Section
This section shows the 3 bots that completed their 5 tasks in the least amount of time. The name and time it took the bot to complete the tasks are shown.

## Running The App
To run the app it is as easy as cloning the reposiory and running the folder with a live server, or downloading and extracting the zip file and opening the "index.html" in a Web browser. 

## Rules
Create as many bots as you want when the application starts.
Activate the bots and watch the tasks get done in the set amount of time.
Many bots can be activated and each work on their tasks in parallel.
No bots shall be created while other bots are working.
As soon as every created bot finished their tasks, more bots can be created.

## Tested On
The application is working with Google Chrome v.80.0 as well as Modzilla FireFox v.73.0.

## Authors
- Scott Hoffman <https://github.com/scottshane>
- Olivia Osby <https://github.com/oosby>
