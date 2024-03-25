# S4
Our software is an easy to implement scheduling software.  Utilizing a clear interface, users are able to enter available hours of many employees 
and let the built-in algorithm make the schedules for them.  This offloads the hours of work of using trial and error to create a schedule that 
makes everyone happy.  This could be applicable to any industry where shifts are used.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
If you do not wish to modify the project, we will have a website up and running for ease of use.

### Prerequisites
You will need the following items to run this project. Just follow the links and download from their respective websites.
- MySQL Workbench: https://dev.mysql.com/downloads/workbench/
- Visual Studio Code (to look at and possibly modify code): https://code.visualstudio.com/
- Node JS: https://nodejs.org/en/download
- Next JS: https://sourceforge.net/projects/next-js.mirror/

### Installing
Once everything is downloaded, you will need to head to the server file folder in the repository to continue.
In this folder, you will find everything you need to properly set up the system for use.

- To start, you will need to open the MySQL Workbench and create a new connection called S4
- Then, you will need to go into the sql folder in the src folder of the server folder and copy the
  buildS4Database.sql text into a new schema file and run that
- After that, you will need to open a new SQL tab and run the text from the InsertExampleData Rebuild From Scratch.sql file
- Once this is complete, you will need to go into the .env file inside the src file and change the MYSWL_PASSWORD to your S4 password
- Then, you will go into your command line and cd into the src file. From there, you will run the npm i commande and then npm server.js.
  For front end, run npm i and then npm run dev
- After this is done, you should be able to find the project local hosted on your computer.

### Running the tests
- To make sure all code is working properly, you can run the [scheduleGenerator.ccp](https://github.com/elivatsaas/S4/blob/main/server/src/cppsrc/scheduleGenerator.cpp) file and set testing on line 270 to true,
  and testVal on line 271 to 1.

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## Version
Currently, the project is in v0.1.0 and is in a very early stage.

## Authors
- Brady Wisniewski
- Eli Vatsaas
- Tyler Austin
- Joseph Laity
- Elliot Hull

## License
This project is under the GNU General Public License v3.0 - see the [LICENSE.md](https://github.com/elivatsaas/S4/blob/main/LICENSE) file for details.

