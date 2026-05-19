# AIHR智聘 - AI智能招聘官网与招聘系统

<p align="left">
  <img src="https://img.shields.io/badge/Java-17-orange" alt="Java">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2.5-green" alt="Spring Boot">
  <img src="https://img.shields.io/badge/React-18-blue" alt="React">
  <img src="https://img.shields.io/badge/Ant%20Design-5.x-blue" alt="Ant Design">
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/License-AGPL-yellow" alt="License">
</p>

## 简介

AIHR智聘是一套面向企业招聘场景的 AI 智能招聘项目。第一版重点强化外部官网和招聘投递入口，让候选人看到统一、清晰、专业的品牌体验。

当前公开官网支持：

- 品牌首页：展示 AIHR智聘的定位、核心能力和招聘流程。
- 职位列表：支持关键词、城市、职位类型筛选。
- 职位详情：展示薪资、经验、学历、职责、要求和标签。
- 在线投递：支持手机号重复投递校验、简历上传和留言提交。
- 联系入口：当前仅展示 QQ：940834965。

## 技术栈

### 后端

- Java 17
- Spring Boot 3.2.5
- Sa-Token
- MyBatis-Plus
- PostgreSQL
- Redis

### 前端

- React 18
- TypeScript
- Ant Design 5
- Vite
- TailwindCSS

## 项目结构

```text
.
├── aihr-server/       # AIHR智聘后端服务
├── aihr-web/          # AIHR智聘官网与招聘投递前端
├── docs/              # 使用手册与项目文档
├── LICENSE            # AGPL 许可证
└── README.md
```

## 本地开发

### 后端

```bash
cd aihr-server
mvn spring-boot:run
```

后端默认端口为 `8080`，接口前缀为 `/api`。

### 前端

```bash
cd aihr-web
npm install
npm run dev
```

前端默认访问地址为 `http://localhost:3000`，Vite 会把 `/api` 代理到 `http://localhost:8080`。

## 公开接口

官网主要使用这些公开接口：

- `GET /api/public/company`
- `GET /api/public/jobs`
- `GET /api/public/jobs/{id}`
- `GET /api/public/cities`
- `GET /api/public/check-applied`
- `POST /api/public/upload-resume`
- `POST /api/public/apply`

## 联系方式

当前只开放 QQ 咨询：

- QQ：940834965

## 许可证

本项目遵循 AGPL 开源许可使用与二次开发。部署、分发和二次开发时请保留许可证文件，并遵守对应的源码开放义务。
