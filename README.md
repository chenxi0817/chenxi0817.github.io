# 姚懿宸 · 个人主页（酷炫动效风格）

深色霓虹 + Canvas 粒子背景 + 3D tilt 项目卡片的单页个人作品集。
**纯 HTML / CSS / 原生 JS，零构建零依赖**，直接部署 GitHub Pages。

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## ✏️ 修改内容（只改一个文件）

所有文案、技能、项目、链接集中在 **`js/content.js`**，改完刷新页面即生效，不需要动 HTML 和动效代码。

### 替换项目截图

1. 把你的截图（建议 16:9，1280×720 以上）放进 `assets/img/projects/`
2. 在 `js/content.js` 的 `projects` 数组里，把对应项目的 `img` 从
   `assets/img/projects/placeholder-xxx.svg` 改成你的截图路径，例如：

   ```js
   img: 'assets/img/projects/unirl-teaser.png',
   ```

### 补充论文 / Demo 链接

`projects[].links` 里的 `paper` / `demo` / `code` 为 `null` 时按钮自动不显示；
填入 URL 后按钮自动出现。发布 arXiv 后记得把 UniRL / MUSE 的 `paper` 补上。

### 其它待办（部署前检查）

- [ ] `profile.email`：目前是简历里的脱敏邮箱 `yyi***@zju.edu.cn`，请替换为你愿意公开的邮箱（`social` 里的 mailto 链接也同步改）
- [ ] 各项目的 `links.code` 目前指向 GitHub 主页，有具体仓库后逐个替换

## 目录结构

```
index.html          页面骨架（6 区块）
css/base.css        设计 tokens（配色/字体变量）
css/layout.css      布局与响应式（768/1024 断点）
css/effects.css     霓虹辉光、渐显、动画
js/content.js       ★ 全站内容数据（改这里）
js/main.js          渲染入口 + 导航逻辑
js/particle-bg.js   Canvas 粒子连线背景
js/cursor-glow.js   鼠标跟随光效
js/typewriter.js    Hero 打字机
js/tilt-card.js     3D tilt 项目卡片
js/scroll-reveal.js 滚动渐显
assets/             favicon、头像、项目截图
```

## 部署（GitHub Pages）

仓库根目录已含 `.nojekyll`。推送后在 Settings → Pages 选择 `main` 分支根目录即可，
或参考 `gh api` 命令一键开启。所有资源使用相对路径，部署在任意子路径下均可用。

动效均尊重系统「减少动态效果」偏好（prefers-reduced-motion），移动端自动降低粒子数、关闭鼠标光效与 tilt。
