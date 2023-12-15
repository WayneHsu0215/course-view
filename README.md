# Course-View
* 此專案回繼承學長意志的課程查詢系統

## 執行
1. 安裝MS-SQL
 - 設定MS-SQL登入帳號與密碼，請至`app/server.js`設定

 ```js
const config = {
 user: 'SA',
 password: '<YourStrong@Passw0rd>',
 server: 'localhost',
 database: 'Courses',
 options: {
  encrypt: true, // 使用 SSL
  trustServerCertificate: true // 信任自簽名憑證
 }
};

 ```
 - 安裝完後請設定防火牆以及開啟MS-SQL認證
 - 確認MS-SQL連線是否正確
 -執行`Base.sql`初始化資料庫

2. 下載node.js，此使用版本為 v10.15.1
3. clone source & 初始化程式
```
git clone https://github.com/WayneHsu0215/course-view.git
npm install

```

4.  執行
 - (1) 使用nod.js開啟
```
cd/app
node server.js
```


5. 開啟網頁
```
http://localhost:{port}
```
 - 登入帳號&密碼: ntunhsEmp/ntunhsEmp (請參考`Base.sql`)
