/* eslint-disable no-unused-vars */
import { Router } from "express";
import sql from 'mssql';
const router = Router();
import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';

// 设置 multer 用于文件上传
const upload = multer({ dest: 'uploads/' });

const app = express();
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const pool = req.app.locals.pool;

        const file = xlsx.readFile(req.file.path);
        const sheetName = file.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(file.Sheets[sheetName], { header: 1, skipEmpty: true });

        for (let i = 1; i < sheetData.length; i++) {

            const row = sheetData[i];
            const request = pool.request();
            request.input('ID', sql.NVarChar, row[0]);
            request.input('Semester', sql.NVarChar, row[1]);
            request.input('MainInstructorName', sql.NVarChar, row[2]);
            request.input('SubjectCode', sql.NVarChar, row[3]);
            request.input('DepartmentCode', sql.NVarChar, row[4]);

            request.input('CoreCode', sql.NVarChar, row[5]);
            request.input('SubjectGroup', sql.NVarChar, row[6]);
            request.input('Grade', sql.NVarChar, row[7]);
            request.input('ClassGroup', sql.NVarChar, row[8]);

            request.input('SubjectNameChinese', sql.NVarChar, row[9]);
            request.input('SubjectNameEnglish', sql.NVarChar, row[10]);
            request.input('InstructorName', sql.NVarChar, row[11]);
            request.input('NumberOfStudents', sql.NVarChar, row[12]);
            request.input('NumberOfMaleStudents', sql.NVarChar, row[13]);
            request.input('NumberOfFemaleStudents', sql.NVarChar, row[14]);
            request.input('Credits', sql.NVarChar, row[15]);
            request.input('WeeksOfClasses', sql.NVarChar, row[16]);
            request.input('HoursPerWeek', sql.NVarChar, row[17]);
            request.input('CourseTypeCode', sql.NVarChar, row[18]);
            request.input('CourseTypeName', sql.NVarChar, row[19]);
            request.input('Location', sql.NVarChar, row[20]);

            request.input('Weekday', sql.NVarChar, row[21]);
            request.input('ClassPeriods', sql.NVarChar, row[22]);
            request.input('TimetableNotes', sql.NVarChar, row[23]);
            request.input('CourseSummaryChinese', sql.NVarChar, row[24]);
            request.input('CourseSummaryEnglish', sql.NVarChar, row[25]);
            const academicSystem = getAcademicSystem(row[4]);
            request.input('AcademicSystem', sql.NVarChar, academicSystem);

            const query = `
                INSERT INTO Courses (
                    ID, Semester, MainInstructorName, SubjectCode, DepartmentCode, AcademicSystem, 
                    CoreCode, SubjectGroup, Grade, ClassGroup, SubjectNameChinese, SubjectNameEnglish,
                    InstructorName, NumberOfStudents, NumberOfMaleStudents, NumberOfFemaleStudents,
                    Credits, WeeksOfClasses, HoursPerWeek, CourseTypeCode, CourseTypeName,
                    Location, Weekday, ClassPeriods, TimetableNotes, CourseSummaryChinese, CourseSummaryEnglish
                ) VALUES (
                    @ID, @Semester, @MainInstructorName, @SubjectCode, @DepartmentCode, @AcademicSystem, 
                    @CoreCode, @SubjectGroup, @Grade, @ClassGroup, @SubjectNameChinese, @SubjectNameEnglish,
                    @InstructorName, @NumberOfStudents, @NumberOfMaleStudents, @NumberOfFemaleStudents,
                    @Credits, @WeeksOfClasses, @HoursPerWeek, @CourseTypeCode, @CourseTypeName,
                    @Location, @Weekday, @ClassPeriods, @TimetableNotes, @CourseSummaryChinese, @CourseSummaryEnglish
                )
            `;

            await request.query(query);
        }

        res.send('File uploaded and processed successfully');
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file');
    }
});

function getAcademicSystem(departmentCode) {
    // Map DepartmentCode to AcademicSystem
    const mapping = {
        '11120': '二技',
        '11140': '四技',
        '11161': '碩士班',
        '11162': '碩士班',
        '11163': '碩士班',
        '11164': '碩士班',
        '11165': '碩士班',
        '11166': '碩士班',
        '11167': '碩士班',
        '11168': '碩士班',
        '11169': '碩士班',
        '11170': '博士班',
        '11190': '學士後系',
        '11230': '二技(三年)',
        '11330': '二技(三年)',
        '11461': '碩士班',
        '11462': '碩士班',
        '11463': '碩士班',
        '11464': '碩士班',
        '11465': '碩士班',
        '11466': '碩士班',
        '11467': '碩士班',
        '11468': '碩士班',
        '11860': '碩士班',
        '11870': '博士班',
        '13140': '四技',
        '1C120': '二技',
        '1C330': '二技(三年)',
        '1C160': '碩士班',
        '1C860': '碩士班',
        '1D160': '碩士班',
        '1D120': '二技',
        '20160': '碩士班',
        '21120': '二技',
        '21140': '四技',
        '21160': '碩士班',
        '21330': '二技(三年)',
        '21460': '碩士班',
        '22140': '四技',
        '22160': '碩士班',
        '23140': '四技',
        '23160': '碩士班',
        '23460': '碩士班',
        '24120': '二技',
        '24150': '學士後多元專長',
        '24160': '碩士班',
        '25140': '四技',
        '25161': '碩士班',
        '25162': '碩士班',
        '25460': '碩士班',
        '26860': '碩士班',
        '30860': '碩士班',
        '31120': '二技',
        '31140': '四技',
        '31181': '學士後學位學程',
        '31160': '碩士班',
        '31860': '碩士班',
        '32140': '四技',
        '32160': '碩士班',
        '32460': '碩士班',
        '33140': '四技',
        '33161': '碩士班',
        '33162': '碩士班',
        '41140': '四技',
        '42140': '四技'
    };

    return mapping[departmentCode] || '未找到該學制';
}



router.get('/search', async (req, res) => {
    try {
        // 假設連接池在 app.locals.pool 中可用
        const pool = req.app.locals.pool;

        // 获取查询字符串参数
        const {  Semester,MainInstructorName,SubjectCode,DepartmentCode,CoreCode,CourseTypeName} = req.query;

        // 构建 SQL 查询字符串
        let queryString = 'SELECT * FROM Courses ';

        // 构建查询条件
        const conditions = [];
        if (Semester) {
            conditions.push(`Semester LIKE '%${Semester}%'`);
        }
        if (MainInstructorName) {
            conditions.push(`MainInstructorName LIKE '%${MainInstructorName}%'`);
        }
        if (SubjectCode) {
            conditions.push(`SubjectCode LIKE '%${SubjectCode}%'`);
        }
        if (DepartmentCode) {
            conditions.push(`DepartmentCode LIKE '%${DepartmentCode}%'`);
        }
        if (CoreCode) {
            conditions.push(`CoreCode LIKE '%${CoreCode}%'`);
        }
        if (CourseTypeName) {
            conditions.push(`CourseTypeName LIKE '%${CourseTypeName}%'`);
        }if (Location) {
            conditions.push(`Location LIKE '%${Location}%'`);
        }


        // 如果有条件，将它们添加到查询中
        if (conditions.length > 0) {
            queryString += ' WHERE ' + conditions.join(' AND ');
        }

        // 执行查询
        const result = await pool.request().query(queryString);

        // 在控制台中打印结果
        console.log(result);

        // 也可以将结果发送到客户端
        res.json(result.recordset);
    } catch (err) {
        console.error('Error querying patient table', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/search1', async (req, res) => {
    try {
        // Assuming the connection pool is available in app.locals.pool
        const pool = req.app.locals.pool;

        // Get query string parameters
        const { Location,Semester, MainInstructorName, SubjectCode, DepartmentCode,Grade, CoreCode, CourseTypeName,AcademicSystem ,Weekday,ClassPeriods} = req.query;

        // Build SQL query string
        let queryString = 'SELECT * FROM Courses ';

        // Build query conditions
        const conditions = [];
        if (Semester) {
            conditions.push(`Semester LIKE '%${Semester}%'`);
        }
        if (MainInstructorName) {
            const MainInstructorNames = Array.isArray(MainInstructorName) ? MainInstructorName : [MainInstructorName];
            conditions.push(`MainInstructorName IN ('${MainInstructorNames.join("','")}')`);
        }
        if (SubjectCode) {
            conditions.push(`SubjectCode LIKE '%${SubjectCode}%'`);
        }
        if (DepartmentCode) {
            conditions.push(`DepartmentCode LIKE '%${DepartmentCode}%'`);
        }
        if (Grade) {
            conditions.push(`Grade LIKE '%${Grade}%'`);
        }if (Location) {
            conditions.push(`Location LIKE '%${Location}%'`);
        }

        if (CoreCode) {
            conditions.push(`CoreCode LIKE '%${CoreCode}%'`);
        }
        if (Weekday) {
            // Support multiple values for SubjectCode
            const Weekdays = Array.isArray(Weekday) ? Weekday : [Weekday];
            conditions.push(`Weekday IN ('${Weekdays.join("','")}')`);
        }
        if (CourseTypeName) {
            // Support multiple values for SubjectCode
            const CourseTypeNames = Array.isArray(CourseTypeName) ? CourseTypeName : [CourseTypeName];
            conditions.push(`CourseTypeName IN ('${CourseTypeNames.join("','")}')`);
        }
        if (ClassPeriods) {
            const classPeriodsArray = Array.isArray(ClassPeriods) ? ClassPeriods : [ClassPeriods];

            // Support multiple values for ClassPeriods with fuzzy matching
            const fuzzyConditions = classPeriodsArray.map(period => `ClassPeriods LIKE '%${period}%'`);
            conditions.push(`(${fuzzyConditions.join(' OR ')})`);
        }
        if (AcademicSystem) {
            const AcademicSystemsArray = Array.isArray(AcademicSystem) ? AcademicSystem : [AcademicSystem];

            // Support multiple values for ClassPeriods with fuzzy matching
            const fuzzyConditions = AcademicSystemsArray.map(System => `AcademicSystem LIKE '%${System}%'`);
            conditions.push(`(${fuzzyConditions.join(' OR ')})`);
        }


        // If there are conditions, add them to the query
        if (conditions.length > 0) {
            queryString += ' WHERE ' + conditions.join(' AND ');
        }

        // Execute the query
        const result = await pool.request().query(queryString);

        // Log the result to the console
        console.log(result);

        // Send the result to the client
        res.json(result.recordset);
    } catch (err) {
        console.error('Error querying the Courses table', err);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/Courses', async (req, res) => {
    try {
        const pool = req.app.locals.pool;

        const result = await pool.request().query('SELECT * FROM Courses ');

        console.log(result);

        res.json(result.recordset);
    } catch (err) {
        console.error('Error querying Reply table', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/departments', async (req, res) => {
    try {
        const pool = req.app.locals.pool;

        // 将查询参数分割成数组
        const academicSystems = req.query.academicSystem.split(',');

        // 动态构建参数列表和查询字符串
        const params = academicSystems.map((system, index) => `@system${index}`);
        let query = `SELECT DepartmentName,AcademicSystemCode FROM AcademicDepartments WHERE AcademicSystem IN (${params.join(', ')})`;

        const request = pool.request();

        // 为每个参数赋值
        academicSystems.forEach((system, index) => {
            request.input(`system${index}`, sql.NVarChar, system);
        });

        let result = await request.query(query);

        res.json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Server Error');
    }
});

router.get('/AllDepartments', async (req, res) => {

    try {
        const pool = req.app.locals.pool;

        const result = await pool.request().query('SELECT * FROM AcademicDepartments');

        console.log(result);

        res.json(result.recordset);

    }
    catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Server Error');
    }
});
export default router;




