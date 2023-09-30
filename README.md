<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://bun.sh/" alt="Bun" target="_blank">
    <img src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" />
  </a>
  <a href="https://node.js.org/" alt="NodeJS" target="_blank">
    <img src="https://img.shields.io/badge/node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white" />
  </a>
  <a href="https://nestjs.com/" alt="NestJS" target="_blank">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

<h1 align="center">NESTJS BENCHMARKING NODEJS AND BUN</h1>

## TLDR

- I prefer using NestJS + Fastify + Bun
- We will test 12 threads with 100 connections in 30s and 3 rounds
- These results are measured in req/s:

| Rank | Framework      | Threads | Connections | Total 30s |  Req/s  |
| -----| ---------------| --------| ------------| ----------| --------|
| 1    | fastify (node) | 12      | 100         | 2,154,949 |  71,593 |
| 2    | fastify (bun)  | 12      | 100         | 1,756,451 |  58,349 |
| 3    | express (bun)  | 12      | 100         | 1,134,314 |  37,776 |
| 4    | express (node) | 12      | 100         |   541,815 |  18,018 |

- These results are measured in build/s

| Rank | Package manager  | Time   |
| -----| -----------------| -------|
| 1    | bun lock-file    |  0.9s  |
| 2    | pnpm lock-file   |  5.1s  |
| 3    | bun unlock-file  |  5.9s  |
| 4    | pnpm unlock-file | 24.1s  |


## Test Performance

- All tests are executed on MacBook Air M1 with 16G RAM 256 GB.
- Benchmarking tool:
  - [Wrk](https://github.com/wg/wrk)
- The software version:
  - [Nest](https://nestjs.com/) v10.0.0
  - [Node](https://nodejs.org/en) v20.1.0
  - [Bun](https://bun.sh/) v1.0.3

Node v20 Express ~ 18k req/30s
<p align="left">
<img src="./archive/performance/Nest_Node_Express.png" />
</p>

Node v20 Fastify ~ 71k req/30s
<p align="left">
<img src="./archive/performance/Nest_Node_Fastify.png" />
</p>

Bun v1 Express  ~ 38k req/30s (211% with Node Express)
<p align="left">
<img src="./archive/performance/Nest_Bun_Express.png" />
</p>

Bun v1 Fastify ~ 58k req/30s (80% with Node Fastify)
<p align="left">
<img src="./archive/performance/Nest_Bun_Fastify.png" />
</p>

- The benchmark result tell us:
  - Fastify is 4x faster than Express when using NodeJS 😍!
  - Fastify is 1.5x faster than Express when using Bun 🙌
  - Bun Fastify is slower than NodeJS Fastify??? 😮
  - Bun Express is 2x faster than NodeJS Express 😂

## Test Build Package Dependencies

- All tests are executed on MacBook Air M1 with 16G RAM 256 GB.
- Now we try to install with >= 1000 packages dependencies so that we can checkout Bun or Pnpm faster
  - Bun v1.0.3
  - Pnpm v8.2.0

### Without lockfile
Pnpm -> Done 24.1s
<p align="left">
<img src="./archive/build/pnpm-without-lock-file.png" />
</p>
Bun -> Done 5.9s (x4.8 with pnpm)
<p align="left">
<img src="./archive/build/bun-without-lock-file.png" />
</p>

### With lockfile
Pnpm without lockfile -> 5.9s
<p align="left">
<img src="./archive/build/pnpm-with-lock-file.png" />
</p>
Bun without lockfile -> 0.93s (x6.3 with pnpm)
<p align="left">
<img src="./archive/build/bun-with-lock-file.png" />
</p>

## Feeling

- With the benchmark result above. I surprise when Express (Bun) is increase performance but Fastify (Bun) is decrease performance
- But this is only testing healthcheck so it not represent Bun can be improve NestJS faster than NodeJS
- If your project is dependencies a lot of library or third-party so using Bun with Fastify is the good option to choose

## Want to try in your computer

- Install [a HTTP benchmarking tool](https://github.com/wg/wrk)

```bash
brew install wrk
```

- To start with NodeJS

```bash
# install package dependencies
pnpm install
# start server
## Express
pnpm run start:dev
## Fastify
pnpm run start:dev -- --platform=fastify
```

- To start with Bun

```bash
# install package dependencies
bun install
# start server
## Express
bun run src/main.ts
## Fastify
bun run src/main.ts --platform=fastify
```
