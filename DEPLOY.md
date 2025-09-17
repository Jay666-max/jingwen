# 部署指南：将金刚经网页部署到GitHub Pages

本指南将帮助您将金刚经网页项目部署到GitHub Pages，使其可以在互联网上访问。

## 步骤1：准备工作

确保您已经：
- 安装了Git（如果没有，请访问 https://git-scm.com/downloads 下载安装）
- 拥有GitHub账号（如果没有，请访问 https://github.com/join 注册）

## 步骤2：创建GitHub仓库

1. 登录您的GitHub账号
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 仓库名称填写 "jingangjing" 或您喜欢的名称
4. 描述可以填写 "金刚经网页项目"
5. 选择 "Public"（公开）
6. 点击 "Create repository" 创建仓库

## 步骤3：将本地项目上传到GitHub

打开终端（Terminal），执行以下命令：

```bash
# 进入项目目录
cd /Users/jie/Desktop/编程AI/金刚经网页

# 初始化Git仓库
git init

# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "初始提交：金刚经网页项目"

# 添加远程仓库（请将 YOUR_USERNAME 替换为您的GitHub用户名，REPO_NAME 替换为您创建的仓库名称）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

## 步骤4：启用GitHub Pages

1. 在GitHub上访问您的仓库
2. 点击 "Settings"（设置）选项卡
3. 在左侧菜单中找到并点击 "Pages"
4. 在 "Source" 部分，选择 "Deploy from a branch"
5. 在 "Branch" 下拉菜单中选择 "main"，文件夹选择 "/ (root)"
6. 点击 "Save"（保存）
7. 等待几分钟，GitHub会自动构建您的网站

## 步骤5：访问您的网站

部署完成后，您可以通过以下URL访问您的网站：

```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

请将 YOUR_USERNAME 替换为您的GitHub用户名，REPO_NAME 替换为您的仓库名称。

## 更新网站

当您对项目进行更改后，可以通过以下命令更新GitHub上的网站：

```bash
git add .
git commit -m "更新：描述您的更改"
git push
```

更新后，GitHub Pages会自动重新构建您的网站。