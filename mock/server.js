let http = require('http')
let fs = require('fs')
let url = require('url')
let sliders = require('./imgUrl.js')

const newLocal = '/sliders'
function readBook (cbx) {
// readFile 要用绝对路径
  fs.readFile('mock/book.json', 'utf8', function (err, data) {
    if (err || data.length === 0) {
      cbx([])
    } else {
      cbx(JSON.parse(data))
    }
  })
}

function writeFs (data, cvf) {
  fs.writeFile('mock/book.json', JSON.stringify(data), cvf)
}

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS') return res.end()
  /* 让options请求快速返回 */
  let {pathname} = url.parse(req.url)
  if (pathname === newLocal) {
    res.setHeader('Content-Type', 'application/json;charset=utf8')
    return res.end(JSON.stringify(sliders))
  }

  if (pathname === '/hot') {
    readBook(function (books) {
      console.log(books)
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      let hot = books.reverse().slice(0, 6)
      setTimeout(() => {
        return res.end(JSON.stringify(hot))
      }, 500)
    })
  }

  if (pathname === '/book') {
    // let id = parseInt(query.id)
    let oldid = url.parse(req.url, true).query
    switch (req.method) {
      case 'GET':
        if (parseInt(oldid.id)) {
          readBook(function (books) {
            let book = books.find(item => item.bookId === parseInt(oldid.id))
            if (!book) book = {}
            res.setHeader('Content-Type', 'application/json;charset=utf8')
            res.end(JSON.stringify(book))
          })
        } else {
          readBook(function (books) {
            res.setHeader('Content-Type', 'application/json;charset=utf8')
            res.end(JSON.stringify(books.reverse()))
          })
        }
        break
      case 'POST':
        let str1 = ''
        req.on('data', chunk => {
          str1 += chunk
        })
        req.on('end', () => {
          let book = JSON.parse(str1)
          res.setHeader('Content-Type', 'application/json;charset=utf8')
          readBook(function (books) {
            book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1
            books.push(book)
            writeFs(books, function () {
              res.end(JSON.stringify(book))
            })
          })
        })
        break
      case 'DELETE':
      // 加true获取对象  不加获取字符串
        // let idNew = url.parse(req.url, true).query
        console.log(parseInt(oldid.id) + ':' + req.url)
        readBook(function (books) {
          books = books.filter(item => item.bookId !== parseInt(oldid.id))
          console.log(books)
          res.setHeader('Content-Type', 'application/json;charset=utf8')
          writeFs(books, function () {
            res.end(JSON.stringify({}))
          })
        })
        break
      case 'PUT':
      // console.log(parseInt(oldid.id))
        if (parseInt(oldid.id)) {
          let str = ''
          req.on('data', chunk => {
            str += chunk
          })
          req.on('end', () => {
            let book = JSON.parse(str)
            // console.log(book)
            res.setHeader('Content-Type', 'application/json;charset=utf8')
            readBook(function (books) {
              books = books.map(item => {
                if (item.bookId === parseInt(oldid.id)) {
                  return book
                }
                return item // 返回其他正常
              })
              writeFs(books, function () {
                console.log(books)
                res.end(JSON.stringify(book))
              })
            })
          })
        }
        break
    }
  }
  // fs.stat('.' + pathname, function (err, stats) {
  //   // res.setHeader('Content-Type', 'application/json;charset=utf8')
  //   if (err) {
  //     res.statusCode = 404
  //     res.end('NO FOUND')
  //     // fs.createReadStream('index.html').pipe(res)
  //   } else {
  //     if (stats.isDirectory()) {
  //       let p = require('path').join('.' + pathname, '/index.html')
  //       fs.createReadStream(p).pipe(res)
  //     } else {
  //       fs.createReadStream('.' + pathname).pipe(res)
  //     }
  //   }
  // })
}).listen(2300)
