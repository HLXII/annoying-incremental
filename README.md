# Annoying Incremental
> For when you want to be annoyed

Uses the [Incremental Game Template](https://github.com/123ishaTest/incremental-game-template)

## Requirements
- [Nodejs](https://nodejs.org/en/) >= v12.13.0.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Troubleshooting

#### .flat is not a function
If you get the following error
```
Syntax Error: TypeError: [(...variantsValue),(...extensions)].flat is not a function
```
This is caused by not having Nodejs >= v12.13.0. Please update your node version.
