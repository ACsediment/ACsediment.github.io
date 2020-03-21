---
layout: post
title: "Uninstall AutoCAD using batch"
date: 2019-05-10 18:23:21 -0000
categories: Win
---

# Description 简介
AutoCAD批量卸载脚本，支持多个版本的静默卸载。

As a system administrator, sometimes it could be hard to stop your user from installing(even they never actually use it) pirated software such as AutoCAD or Photoshop, especially when you are not allowed to use any method to enforce the installation restriction. This batch script is designed to uninstall AutoCAD automatically and quietly.

# Usage 使用方式
Usually you can just use Windows AD domain policy to hand out this script.

通常使用域控推送下发即可。这边提供使用360企业软件管家发布的方法：
## 打包为exe
此推送方式首先需要使用7z打包为自释放exe。
## 发布推送
1. 在360天擎内添加白名单，包括自释放exe和释放出来的bat等
2. 在360企业软件管家中上传
3. 设置推送软件，规则如下：

<dl>
<dt>存放于：</dt>
<dd>“系统根目录”</dd>
<dt>分发条件(存在文件)：</dt>
<dd>%ProgramFiles(x86)%\AutoCAD 2010\acad.exe</dd>
<dd>%ProgramFiles%\AutoCAD 2010\acad.exe</dd>
<dd>%ProgramFiles(x86)%\AutoCAD 2008\acad.exe</dd>
<dd>%ProgramFiles%\AutoCAD 2008\acad.exe</dd>
<dd>%ProgramFiles(x86)%\AutoCAD 2014\acad.exe</dd>
<dd>%ProgramFiles%\AutoCAD 2014\acad.exe</dd>
<dd>%ProgramFiles(x86)%\Autodesk\AutoCAD 2014\acad.exe</dd>
<dd>%ProgramFiles%\Autodesk\AutoCAD 2014\acad.exe</dd>
<dt>成功条件(不存在文件)：</dt>
<dd>%CommonProgramFiles%\Autodesk Shared</dd>
<dt>推送方式：</dt>
<dd>弹窗由用户选择接受</dd>
<dt>弹窗文案：</dt>
<dd>亲爱的同事，系统检测到您安装了AutoCAD软件。根据集团正版化有关规定，请您点击确定启动自动卸载</dd>
</dl>

# Script 脚本内容
See [this file](https://github.com/ACsediment/GithubWangPan/blob/master/RemoveAutoCAD.bat) for full batch script.

在[这里](https://github.com/ACsediment/GithubWangPan/blob/master/RemoveAutoCAD.bat)查看完整脚本。