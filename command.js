'use strict';
const fs = require('fs');
const chalk = require('chalk');
const prompt = chalk.blue('\nprompt > ');

module.exports = {
  pwd: function(args) {
    process.stdout.write(process.cwd());
    process.stdout.write(prompt);
  },
  date: function(args) {
  	process.stdout.write(Date());
  	process.stdout.write(prompt);
  },
  ls: function(args) {
    fs.readdir('.', function(err, files) {
      if (err) throw new Error(err);
      process.stdout.write(files.join('\n'));
      process.stdout.write(prompt); 
    });
  },
  echo: function(args) {
  	const output = args.split(' ').map(function(arg) {
  			return (arg[0] === '$') ? process.env[arg.slice(1)] : arg;
  		}).join(' ');
  	process.stdout.write(output);
  	process.stdout.write(prompt); 
  },
  cat: function(filenames) {
  	filenames = filenames.split(' ');
  	const texts = [];
  	var count = 0;
  	filenames.forEach(function(filename, i) {
  		fs.readFile(filename, { encoding: 'utf8' }, function(err, text) {
  			if (err) throw err;
  			texts[i] = text;
  			count++;
  			if (count === filenames.length) process.stdout.write(texts.join(''));
  			process.stdout.write(prompt)
  		})
  	})
  },
  head: function(filename) {
  	fs.readFile(filename, { encoding: 'utf8' }, function() {
  		if (err) throw err;
  		process.stdout.write.text.split('\n').slice(0, 5).join('\n');
  		process.stdout.write(prompt);
  	});
  },
  tail: function(filename) {
  	fs.readFile(filename, { encoding: 'utf8' }, function() {
  		if (err) throw err;
  		process.stdout.write.text.split('\n').slice(-5).join('\n');
  		process.stdout.write(prompt);
  	});
  }

}
