# CLNDR
CSE 110 project. A web app that allows people to create and host events at UCSD, built using Firebase, Express, and React.

## How to download and set up this project:
0. Make sure you have the following downloaded and installed:
    * `git` (Windows users: [Git Bash](https://git-scm.com/download/win) is an excellent terminal and git client)
    * Node.js (You should from the lab, but if not it is [here](https://nodejs.org/en/))
0. Open a terminal, and clone the repository (`git clone https://github.com/alvinsandiego/CLNDR`)
0. Go to the newly downloaded repository (`cd CLNDR`)
0. Notice a few things:
    * The root of the project is the server, based on Express (ideally it would be in a subfolder, but Node was giving me a hard time with that)
    * There is a directory called `client`, inside which there is a React app, that will serve as the frontend.
0. In the CLNDR directory, run `npm install` and `npm i -S reactstrap` and `npm install react-datepicker --save` and `npm install bootstrap --save` to pull the project dependencies.
0. Go to the `client` directory (`cd client`), and again run `npm install` and `npm i -S reactstrap` to pull the dependencies for the React project.
0. You are done!

## How to run this project:
0. There are a couple things to note here:
   * React will communicate with Express by requesting endpoints of an API that we will program in Express.
   * As for MVC: Firebase is the Model, React is the View, and Express is the Controller.
   * React has a proxy configured so that all fetches get routed to Express properly (If you want to see how that is configured, go to `client/package.json` and look at the line labeled `proxy`).
0. Now that that's out of the way, open a terminal of some sort and navigate to the `CLNDR` directory.
0. Again, open another terminal, but this time navigate to the `CLNDR/client` directory.
0. In the first terminal, type `npm start` to start the Express server.
0. In the second terminal, type `npm start` to start the React app.
0. A browser window should open with our React app.
0. That's it!
