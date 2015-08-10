# Project Name

> Pithy project description

## Team

  - __Product Owner__: Christopher Griffis
  - __Scrum Master__: Syed Jafri
  - __Development Team Members__: Andrey Azov, Cliff Saporta Cheng
  

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Setup
Have `gulp` inslalled

Enter `npm start` in one terminal window

Run `gulp` in the root of the project in a different terminal window. This will start the `gulp watch` task, which runs js-hint and builds the project files in the public folder.

Every time a change is made in the client folder, the project will be re-built and placed in the public folder in real-time. One of the tasks automatically run by gulp watcher during this step is `browserify-dev`, which executes very quickly, but produces a huge concatenated js file. Therefore this is suitable (and convenient) only for development purposes. 

### Installing Dependencies

Have bower and node installed.

From within the root directory run:

```
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
