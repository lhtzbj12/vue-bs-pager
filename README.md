# vue-bs-pager
基于vue.js+Boostrap3开发的分页组件
# 前言
vue.js是2017年最火的前端框架了，笔者在年前抽出时间好好学习了一下，并结合自己积累的前端经验，写了一个简单的分页组件，笔者之前写过一个基于jQuery的分页插件，相比之下，使用vue.js开发要简单得多。
# 预览
![这里写图片描述](http://img.blog.csdn.net/20180222175355271?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGh0emJqMTI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
# props

| 名称      |    默认值 | 说明 |
| :-------- | --------:| :--: |
| total-count  | 0 |  数据总条数   |
| page-size     |   10 |  本页显示数量  |
| page-index      |    0 | 当前页数  |
|ext-class||扩展样式 如：pagination-lg  pagination-sm|
|show-nearby|3|当前按钮前后按钮数|
|info-template||默认为 '总共 {{totalCount}} 项 每页显示 {{pageSize}} 项 当前 {{pageIndex}}/{{totalPage}} 页'|

# 源码中文件说明
| 名称      |   说明 |
| :-------- |:---------- |
| vue-bs-pager.js | 分页组件源码 |  
| vue-bs-pager.scss |  css源码 |  
| index.html | 简单的使用组件的demo | 
| complexdemo.html | 复杂的使用组件的demo | 
其他文件略
