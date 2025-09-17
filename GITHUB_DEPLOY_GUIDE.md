# GitHub部署指南（详细版）

## 认证问题解决方案

推送到GitHub时遇到了认证错误（`Authentication failed for 'https://github.com/Jay666-max/jingwen.git/'`），这是因为GitHub不再支持简单的密码认证。您需要使用以下方法之一来完成部署：

### 方法1：使用个人访问令牌(PAT)（推荐）

1. **登录您的GitHub账户**
2. **创建个人访问令牌**：
   - 点击右上角头像 -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic)
   - 点击"Generate new token" -> "Generate new token (classic)"
   - 给令牌一个描述性名称，如"金刚经网页部署"
   - 设置过期时间（根据需要选择，如果是个人项目可以选择较长时间）
   - 选择权限范围：至少需要选择`repo`权限（完全控制私有仓库）
   - 点击底部的"Generate token"按钮
   - **重要：** 复制生成的令牌（离开页面后将无法再次查看）

3. **配置Git凭据**：

   方法A：使用凭据管理器存储（推荐）
   ```bash
   git config --global credential.helper store
   ```
   然后执行推送，当提示输入用户名和密码时：
   - 用户名：输入您的GitHub用户名
   - 密码：粘贴您刚才生成的个人访问令牌

   方法B：临时使用（每次都需要输入）
   ```bash
   git push -u origin main
   ```
   当提示输入用户名和密码时：
   - 用户名：输入您的GitHub用户名
   - 密码：粘贴您刚才生成的个人访问令牌

### 方法2：使用SSH密钥

1. **生成SSH密钥**（如果您还没有）：

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
   按照提示完成密钥生成（可以直接按Enter使用默认设置）

2. **将SSH公钥添加到GitHub**：
   - 复制公钥内容：
     ```bash
     cat ~/.ssh/id_ed25519.pub
     ```
   - 登录GitHub -> 点击右上角头像 -> Settings -> SSH and GPG keys -> New SSH key
   - 在"Title"字段中，添加一个描述性标签，如"我的MacBook"
   - 在"Key"字段中，粘贴您的公钥内容
   - 点击"Add SSH key"按钮保存

3. **测试SSH连接**：
   ```bash
   ssh -T git@github.com
   ```
   如果看到"Hi username! You've successfully authenticated..."的消息，则表示SSH设置成功

4. **更改远程仓库URL为SSH格式**：

   ```bash
   git remote set-url origin git@github.com:Jay666-max/jingwen.git
   ```

5. **推送代码**：

   ```bash
   git push -u origin main
   ```

## 分支名称问题解决方案

如果您遇到分支名称问题（例如，本地分支是`master`而不是`main`），可以使用以下方法解决：

1. **查看当前分支**：
   ```bash
   git branch
   ```

2. **如果当前分支是`master`，将其重命名为`main`**：
   ```bash
   git branch -M main
   ```

3. **然后推送到远程仓库**：
   ```bash
   git push -u origin main
   ```

## 启用GitHub Pages

成功推送代码后，您需要启用GitHub Pages来部署网站：

1. 在GitHub仓库页面，点击"Settings"
2. 在左侧菜单中找到"Pages"
3. 在"Source"部分，选择"Deploy from a branch"
4. 在"Branch"下拉菜单中选择"main"，文件夹选择"/ (root)"，然后点击"Save"
5. 等待几分钟，您的网站将被部署到类似`https://jay666-max.github.io/jingwen/`的URL

## 完整部署流程（从头开始）

如果您想重新开始整个部署过程，可以按照以下步骤操作：

1. **配置Git用户信息**（如果尚未配置）：
   ```bash
   git config --global user.name "您的名字"
   git config --global user.email "您的邮箱"
   ```

2. **初始化本地Git仓库**：
   ```bash
   cd /Users/jie/Desktop/编程AI/金刚经网页
   git init
   ```

3. **添加所有文件到暂存区**：
   ```bash
   git add .
   ```

4. **创建初始提交**：
   ```bash
   git commit -m "初始提交：金刚经和六祖坛经网页"
   ```

5. **添加远程仓库**：
   ```bash
   git remote add origin https://github.com/Jay666-max/jingwen.git
   ```
   或者使用SSH方式：
   ```bash
   git remote add origin git@github.com:Jay666-max/jingwen.git
   ```

6. **推送到GitHub**：
   ```bash
   git push -u origin main
   ```
   如果使用的是个人访问令牌，当提示时输入您的GitHub用户名和令牌作为密码

## 更新网站

当您对网站进行更改后，只需执行以下命令来更新部署：

```bash
git add .
git commit -m "更新网站内容"
git push
```

## 常见问题解决

### 1. 推送被拒绝（rejected）

如果您看到类似"Updates were rejected because the remote contains work that you do not have locally"的错误，可以尝试：

```bash
git pull --rebase origin main
git push -u origin main
```

### 2. 合并冲突

如果出现合并冲突，请解决冲突后再提交：

```bash
# 解决冲突后
git add .
git rebase --continue
git push
```

### 3. 强制推送（谨慎使用）

如果您确定要覆盖远程仓库的内容，可以使用强制推送（**注意：这可能会丢失远程仓库的更改**）：

```bash
git push -f origin main
```

## 注意事项

- 部署后，可能需要等待几分钟才能看到更改生效
- 如果您的仓库是私有的，请确保您有足够的GitHub权限来使用GitHub Pages
- 如果您想使用自定义域名，可以在GitHub Pages设置中配置
- 个人访问令牌有过期时间，过期后需要重新生成