import inquirer from 'inquirer';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const mainMenu = async (): Promise<void> => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      { name: 'List all users', value: 'listUsers' },
      { name: 'Create a user', value: 'createUser' },
      { name: 'Exit', value: 'exit' },
    ],
  });

  switch (action) {
    case 'listUsers':
      await listUsers();
      break;
    case 'createUser':
      await createUser();
      break;
    case 'exit':
      process.exit();
  }
}
