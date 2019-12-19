# React SSR

## SSR vs CSR

**客户端渲染(Client Side Render), 简称 CSR**, 服务端返回 html 的 body 中只会包括 id 为 root 的标签，依靠引入的 script 中的代码进行控制渲染后，浏览器进行渲染。

**服务端渲染(Server Side Render), 简称 SSR**, 服务端返回 html 包含完整的结构，浏览器直接渲染。

CSR 的弊端

- 由于需要 JS 代码拉取及执行后进行渲染，首屏加载速度会比较慢

- 因为搜索引擎爬虫只认识 html 结构的内容，不能识别 JS 代码，所以对 SEO(Search Engine Optimazition, 搜索引擎优化)无能为力

SSR 就是为了解决 CSR 的弊端而出现。
