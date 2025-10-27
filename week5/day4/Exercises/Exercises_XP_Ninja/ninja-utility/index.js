import {Command} from 'commander';
import { greet } from './commands/greet.js';
import { fetchData } from './commands/fetch.js';
import { readFile } from './commands/read.js';

const program = new Command();

program
  .name('ninja-utility')
  .description('A CLI utility with multiple commands')
  .version('1.0.0');

program
  .command('greet')
  .description('Greet a user')
  .action(() => {
    console.log(greet('User'));
  });

program
  .command('fetch')
  .description('Fetch data from a public API')
  .action(() => {
    console.log(fetchData());
  });

program
  .command('read')
  .description('Read and display the contents of a file')
  .action(() => {
    console.log(readFile());
  });