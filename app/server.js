import express from 'express';
import sql from 'mssql';
import controllers from '../controllers/index.js';
import viteExpress from 'vite-express';
import session from 'express-session';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use('/documents', express.static(path.join(__dirname, 'documents')));
app.get('/documents/B12.docx', (req, res) => {
    // 使用 path.join 確保路徑正確
    res.sendFile(path.join(__dirname, '../documents/B12.docx'));
});


app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // 改成 true 如果你使用 HTTPS
        httpOnly: true,
        maxAge: 6000000 // 1 minute
    }
}));

const config = {
    // user: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    // server: process.env.DATABASE_SERVER,
    // database: process.env.DATABASE_NAME,
    user: 'SA',
    password: '<YourStrong@Passw0rd>',
    server: 'localhost',
    database: 'Courses',
    options: {
        encrypt: true, // 使用 SSL
        trustServerCertificate: true // 信任自簽名憑證
    }
};

// 連接資料庫
sql.connect(config).then(pool => {
    console.log('Connected to the database.');

    // 將資料庫 pool 傳遞給你的控制器，如果需要的話
    app.locals.pool = pool;

    // 使用你的控制器
    app.use('/api', controllers);

    const server = app.listen(3251, () => {
        console.log('Server is running on port 3251');
    });

    viteExpress.bind(app, server);

}).catch(err => {
    console.error('Database connection failed!', err);
});
