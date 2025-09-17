# GitHub部署指南

## 认证问题解决方案

推送到GitHub时遇到了认证错误，这是因为GitHub不再支持简单的密码认证。您需要使用以下方法之一来完成部署：

### 方法1：使用个人访问令牌(PAT)

1. 登录您的GitHub账户
2. 点击右上角头像 -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic)
3. 点击"Generate new token" -> "Generate new token (classic)"
4. 给令牌一个描述性名称，如"金刚经网页部署"
5. 选择权限范围：至少需要选择`repo`权限
6. 点击底部的"Generate token"按钮
7. **重要：** 复制生成的令牌（离开页面后将无法再次查看）
8. 使用以下命令推送代码，当提示输入密码时，粘贴您的个人访问令牌：

```bash
git push -u origin main
```

### 方法2：使用SSH密钥

1. 生成SSH密钥（如果您还没有）：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. 将SSH公钥添加到GitHub：
   - 复制公钥内容：`cat ~/.ssh/id_ed25519.pub`
   - 登录GitHub -> Settings -> SSH and GPG keys -> New SSH key
   - 粘贴公钥并保存

3. 更改远程仓库URL为SSH格式：

```bash
git remote set-url origin git@github.com:Jay666-max/jingwen.git
```

4. 推送代码：

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

## 更新网站

当您对网站进行更改后，只需执行以下命令来更新部署：

```bash
git add .
git commit -m "更新网站内容"
git push
```

## 注意事项

- 部署后，可能需要等待几分钟才能看到更改生效
- 如果您的仓库是私有的，请确保您有足够的GitHub权限来使用GitHub Pages
- 如果您想使用自定义域名，可以在GitHub Pages设置中配置