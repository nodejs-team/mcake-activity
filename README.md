# mcake-activity
项目采用flexible布局方案，关于flexible可以参见[介绍](http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
* [初始化项目](#init)
* [开发项目](#develop)
* [打包项目](#build)
* [上传项目](#upload)
* [工具函数](#tools)

<h2 id="init">初始化项目</h2>
gulp init [-n projectName] [-t type]  
projectName：项目名称，默认获取package.json中的projectName  
type：pc或者wap，默认pc  
从template目录中拷贝对应类型的文件夹

* gulp init
* gulp init -n christmas
* gulp init -n christmas -t wap （初始化一个wap项目）

<h2 id="develop">开发项目</h2>
gulp develop [-n projectName]  
projectName：项目名称，默认获取package.json中的projectName  
执行sass:watch和server命令

* gulp develop
* gulp develop -n christmas

<h2 id="build">打包项目</h2>
gulp build [-n projectName] [-u]  
projectName：项目名称，默认获取package.json中的projectName  
-u：是否上传  
打包时会替换图片链接，读取package.json中的basePath
打包时会拷贝tinypng文件夹下的图片，如果没有此文件夹，则拷贝images下的图片

* gulp build
* gulp build -n christmas
* gulp build -n christmas -u （打包并且上传）

<h2 id="upload">上传项目</h2>
gulp upload [-n projectName]  
projectName：项目名称，默认获取package.json中的projectName  
ftp配置写在package.json中

* gulp upload -n christmas

<h2 id="tools">工具函数</h2>
**gulp tinypng [-n projectName] [-i imgName]**  
projectName：项目名称，默认获取package.json中的projectName  
imgName：图片名称，默认项目下所有图片

* gulp tinypng -n christmas （压缩christmas/images下的所有图片，并拷贝到tinypng目录）
* gulp tinypng -i a.png （压缩images/a.png，并拷贝到tinypng目录）

**gulp removeImgSrc [-n projectName]**  
移除img标签中的图片链接  
`<img src="images/abcd.png" />`  
执行完命令后变为：
`<img src="http://edm.mcake.com/weifengwang/common/no.jpg" src-fix="abcd_png" />`  
在图片较多的情况下，图片的加载会阻塞JS加载；有些情况下希望先加载JS，然后由JS去控制图片的loading。见例子[（图片阻塞JS，0%状态要等待很久）](http://edm.mcake.com/weifengwang/bugExample/loadingImgBug/)

**gulp addImgSrc [-n projectName]**  
将remove掉的图片链接再加回来
