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
            const query = `
                INSERT INTO Courses (
                    ID, Semester, MainInstructorName, SubjectCode, DepartmentCode, CoreCode,
                    SubjectGroup, Grade, ClassGroup, SubjectNameChinese, SubjectNameEnglish,
                    InstructorName, NumberOfStudents, NumberOfMaleStudents, NumberOfFemaleStudents,
                    Credits, WeeksOfClasses, HoursPerWeek, CourseTypeCode, CourseTypeName,
                    Location, Weekday, ClassPeriods, TimetableNotes, CourseSummaryChinese, CourseSummaryEnglish
                ) VALUES (
                    @ID, @Semester, @MainInstructorName, @SubjectCode, @DepartmentCode, @CoreCode,
                    @SubjectGroup, @Grade, @ClassGroup, @SubjectNameChinese, @SubjectNameEnglish,
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
        const { Semester, MainInstructorName, SubjectCode, DepartmentCode, CoreCode, CourseTypeName ,Weekday,ClassPeriods} = req.query;

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


export default router;




