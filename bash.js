const commands = require('./command');
const chalk = require('chalk');

const prompt = chalk.blue('\nprompt > ');

// Output a prompt
process.stdout.write(prompt);

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  const tokens = data.toString().trim().split(' ');
  const cmd = tokens[0];
  const args = tokens.slice(1).join(' ');

  if(commands[cmd]) commands[cmd]();
  else process.stderr.write(chalk.red('command not found: ' + cmd));
});

function done(output) {
	process.stdout.write(output + prompt);
}