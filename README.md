# akagi [![Build Status](https://img.shields.io/circleci/project/egoist/akagi/master.svg?style=flat-square)](https://circleci.com/gh/egoist/akagi/tree/master)

**赤城（akagi）** 是社区型空母 [**加贺（kaga）**](https://github.com/egoist/kaga) 的核心部分，负责弹药（数据）运输。

即负责和数据库建立联系和操作，赤城号空母装载 Mongoose 来操作 MongoDB。

## How-to

Create your **Akagi** instance in `akagi.js`

```javascript
// akagi.js
// require once in app entry
import Akagi from 'akagi'
new Akagi({url: 'mongodb://localhost/akagi-test'})

// in some other pages
// use the built-in models
import Akagi from 'akagi'
async function () {
  await Akagi.User.signUp(userdata)
}
```

## License

欧洲提督第 110 号许可。
