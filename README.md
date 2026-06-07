# 📦 wjk — 个人知识管理 API

基于 **Cloudflare Workers** + **Supabase** 构建的轻量级个人效率工具后端，支持笔记、书签和文件记录的增删改查，无需自建服务器，免费额度即可运行。

---

## ✨ 功能特性

- 📝 **笔记管理** — 支持标题、正文、标签
- 🔖 **书签管理** — 保存网址与标签分类
- 📁 **文件记录** — 记录文件名称与大小
- ⚡ **边缘部署** — 运行在 Cloudflare 全球节点，低延迟
- 🆓 **免费运行** — Cloudflare Workers 免费额度 + Supabase 免费层

---

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| 运行时 | [Cloudflare Workers](https://workers.cloudflare.com/) |
| 数据库 | [Supabase](https://supabase.com/)（PostgreSQL） |
| 语言 | JavaScript |

---

## 🗄️ 数据库结构

```sql
-- 笔记表
notes (id, title, content, tags, created_at)

-- 书签表
bookmarks (id, title, url, tags, created_at)

-- 文件表
files (id, name, size, date)
```

---

## 🚀 部署流程

### 第一步：创建 Supabase 数据库

1. 前往 [supabase.com](https://supabase.com) 注册并新建一个项目
2. 进入项目后，点击左侧菜单 **SQL Editor** → **New query**
3. 将 [`New query`](./New%20query) 文件中的全部 SQL 粘贴进去，点击 **Run** 执行
4. 执行成功后，三张表（`notes`、`bookmarks`、`files`）即创建完毕

---

### 第二步：获取 Supabase 配置信息

1. 进入项目 → 左侧菜单 **Project Settings** → **API**
2. 复制以下两项内容备用：

| 字段 | 位置 |
|------|------|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_KEY` | Project API Keys → `anon` / `public` |

---

### 第三步：部署 Cloudflare Worker

#### 方式一：通过 Cloudflare 控制台（推荐新手）

1. 前往 [dash.cloudflare.com](https://dash.cloudflare.com) 登录，进入 **Workers & Pages**
2. 点击 **Create** → **Create Worker**
3. 将 [`worker.js`](./worker.js) 的内容粘贴到编辑器中，点击 **Deploy**

#### 方式二：通过 Wrangler CLI（推荐开发者）

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 克隆本项目
git clone https://github.com/lalal1711/wjk.git
cd wjk

# 部署
wrangler deploy worker.js
```

---

### 第四步：配置环境变量

在 Cloudflare Workers 控制台中：

1. 进入你部署的 Worker → **Settings** → **Variables and Secrets**
2. 添加以下两个变量：

| 变量名 | 值 | 类型 |
|--------|-----|------|
| `SUPABASE_URL` | `https://你的地址.supabase.co` | Plain text |
| `SUPABASE_KEY` | `eyJ...`（anon key） | Plain text |

3. 点击 **Save** 保存后，Worker 会自动重新部署

---

## ⚙️ 环境变量说明

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `SUPABASE_URL` | Supabase 项目 URL | ✅ |
| `SUPABASE_KEY` | Supabase anon key | ✅ |

---

## ⚠️ 安全说明

当前数据库 RLS 策略为**完全开放**（`Allow all`），任何人只要知道你的 Worker 地址就可以读写数据。

如需限制访问，建议：

- 在 Worker 中添加请求头鉴权（如自定义 `Authorization` Token）
- 或在 Supabase 中收紧 RLS 策略，配合用户登录态使用

---

## 📄 License

MIT
