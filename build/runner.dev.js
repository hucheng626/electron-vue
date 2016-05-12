/**
 * Credits to https://github.com/bradstewart/electron-boilerplate-vue/blob/master/build/dev-runner.js
 */
'use strict'

const exec = require('child_process').exec

let YELLOW = '\x1b[33m'
let BLUE = '\x1b[34m'
let END = '\x1b[0m'

function format (command, data, color) {
  return color + command + END +
    '  ' + // Two space offset
    data.trim().replace(/\n/g, '\n' + repeat(' ', command.length + 2)) +
    '\n'
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

let children = []

function run (command, color, name) {
  let child = exec(command)

  child.stdout.on('data', data => {
    console.log(format(name, data, color))
  })

  child.stderr.on('data', data => {
    console.error(format(name, data, color))
  })

  child.on('exit', code => {
    exit(code)
  })

  children.push(child)
}

function exit (code) {
  children.forEach(child => {
    child.kill()
  })
  process.exit(code)
}

run('webpack-dev-server --inline --hot --content-base app/', YELLOW, 'webpack')
run('electron build/electron.dev.js', BLUE, 'electron')
