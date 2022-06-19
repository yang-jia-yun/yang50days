# day01 搭建项目环境

```sh
yarn init -y # 初始化项目
yarn add typescript # 引入 ts
npx tsc --init # 生成 ts 配置文件
yarn add jest @types/jest # 引入 jest 以及对应声明文件
yarn add --dev babel-jest @babel/core @babel/preset-env # jest 使用 babel
yarn add --dev @babel/preset-typescript # 通过 babel 支持 ts
#添加 执行命令 jest
```
