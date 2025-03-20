
# Rollcallr
  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

  ## Description 
  **Rollcallr** is a simple and intuitive employee tracker. It allows you to view, add, and manage departments, roles, and employees in a user-friendly database interface.  

 ## Table of Contents 
- [Installation](#installation) 
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Walkthrough](#walkthrough)
- [Questions](#questions)
- [Credits](#credits)
  
## Installation 
1. Clone or download this repository to your local machine.  
2. Navigate to the project directory and install dependencies:  
   ```bash
   npm install
3. Create a `.env` file in the root directory and add the following:
    ```bash
   DB_NAME=rollcallr_db  
   DB_USER=your_postgres_username  
   DB_PASSWORD=your_postgres_password

## Usage 
1. Open your terminal in the root directory and start your PostgreSQL server.
2. Run the following command inside PostgreSQL to create the database:
   ```bash
   \i db/schema.sql
3. Then make your way back to your terminal and run:
   ```bash
   npm run build
   npm run start
4. At this point the application is up and running!


## License
This project is licensed under the MIT license.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
[Learn more about this license](https://opensource.org/licenses/MIT)

  ## Contributing
  This project is completely open to any modifications that would help aid in the smoothness of the process. If you'd like to, let's chat! Email me with your contact information and github username, resources to contact me are listed below.

  ## Tests
  To test the application, we'll use seed data: 
1. You'll start up the schema.sql in PostgreSQL as the [Usage](#usage) section says but before moving on, make sure to run the command:
    ```bash
    \i db/seeds.sql 
2. This will provide you with some premade data to experiment with!

  ## Walkthrough
  If you're like me and need a visual aid, you can follow this link here:
  https://drive.google.com/file/d/1KbHTSdP1BOhkTg3XGNRdxWnkPv_mVjED/view?usp=sharing

  ## Questions
  If you have any questions, feel free to contact me at [hannahbry05@gmail.com](mailto:hannahbry05@gmail.com).
  
  You can also explore more of my work on GitHub here: [hanhasbeenbanned](https://github.com/hanhasbeenbanned).

  ## Credits 
  The tracker was created with the help of fellow classmates, CoPilot, ChatGPT, and class instruction.
  
