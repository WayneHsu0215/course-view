
USE master
-- 檢查資料庫是否存在
IF DB_ID ( 'Courses' ) IS NOT NULL
    DROP DATABASE Courses;
GO
-- 新建資料庫
CREATE DATABASE Courses
    COLLATE Chinese_PRC_CI_AS;
GO



-- 新建資料表
USE Courses;
--rt

CREATE TABLE Courses (
                         ID NVARCHAR(50),
                         Semester NVARCHAR(50),
                         MainInstructorName NVARCHAR(100),
                         SubjectCode NVARCHAR(50),
                         DepartmentCode NVARCHAR(50),
                         CoreCode NVARCHAR(50),
                         SubjectGroup NVARCHAR(50),
                         Grade  NVARCHAR(50),
                         ClassGroup NVARCHAR(50),
                         SubjectNameChinese NVARCHAR(500),
                         SubjectNameEnglish NVARCHAR(500),
                         InstructorName NVARCHAR(400),
                         NumberOfStudents  NVARCHAR(50),
                         NumberOfMaleStudents  NVARCHAR(50),
                         NumberOfFemaleStudents  NVARCHAR(50),
                         Credits  NVARCHAR(50),
                         WeeksOfClasses  NVARCHAR(50),
                         HoursPerWeek  NVARCHAR(50),
                         CourseTypeCode NVARCHAR(50),
                         CourseTypeName NVARCHAR(100),
                         Location NVARCHAR(100),
                         Weekday NVARCHAR(50),
                         ClassPeriods NVARCHAR(100),
                         TimetableNotes NVARCHAR(2000),
                         CourseSummaryChinese NVARCHAR(1000),
                         CourseSummaryEnglish NVARCHAR(2000),
                         AcademicSystem NVARCHAR(50)
);
GO



select * from Courses
-- 创建AcademicDepartments表
CREATE TABLE AcademicDepartments (
                                     AcademicSystemCode NVARCHAR(255),
                                     AcademicSystem NVARCHAR(255),
                                     DepartmentName NVARCHAR(255)
);

-- 插入数据
INSERT INTO AcademicDepartments (AcademicSystemCode, AcademicSystem, DepartmentName)
VALUES
    ('11120', '二技', '二年制護理系'),
    ('11140', '四技', '四年制護理系'),
    ('11161', '碩士班', '護理系碩士班護研成人組'),
    ('11162', '碩士班', '護理系碩士班護研老人組'),
    ('11163', '碩士班', '護理系碩士班護研婦女組'),
    ('11164', '碩士班', '護理系碩士班護研精神組'),
    ('11165', '碩士班', '護理系碩士班護研社區組'),
    ('11166', '碩士班', '護理系碩士班護研兒童組'),
    ('11167', '碩士班', '護理系碩士班護研資訊組'),
    ('11168', '碩士班', '護理系碩士班護研成人專科組'),
    ('11169', '碩士班', '護理系中西醫結合護理碩士班'),
    ('11170', '博士班', '護理系博士班'),
    ('11190', '學士後系', '護理系學士後學士班(學士後護理系)'),
    ('11230', '二技(三年)', '二年制進修部護理系(日間班)'),
    ('11330', '二技(三年)', '二年制進修部護理系(夜間班)'),
    ('11461', '碩士班', '護理系碩士在職專班護專成人組'),
    ('11462', '碩士班', '護理系碩士在職專班護專老人組'),
    ('11463', '碩士班', '護理系碩士在職專班護專婦女組'),
    ('11464', '碩士班', '護理系碩士在職專班護專精神組'),
    ('11465', '碩士班', '護理系碩士在職專班護專社區組'),
    ('11466', '碩士班', '護理系碩士在職專班護專兒童組'),
    ('11467', '碩士班', '護理系碩士在職專班護專資訊組'),
    ('11468', '碩士班', '護理系碩士在職專班護專成人專科組'),
    ('11860', '碩士班', '國際護理碩士班'),
    ('11870', '博士班', '國際護理博士班'),
    ('13140', '四技', '四年制高齡健康照護系'),
    ('1C120', '二技', '二年制護理助產及婦女健康系'),
    ('1C330', '二技(三年)', '二年制進修部護理助產及婦女健康系'),
    ('1C160', '碩士班', '護理助產及婦女健康系護理助產碩士班'),
    ('1C860', '碩士班', '國際護理助產碩士班'),
    ('1D160', '碩士班', '醫護教育暨數位學習系碩士班'),
    ('1D120', '二技', '二年制醫護教育暨數位學習系'),
    ('20160', '碩士班', '健康科技學院碩士班'),
    ('21120', '二技', '二年制健康事業管理系'),
    ('21140', '四技', '四年制健康事業管理系'),
    ('21160', '碩士班', '健康事業管理系碩士班'),
    ('21330', '二技(三年)', '二年制進修部健康事業管理系'),
    ('21460', '碩士班', '健康事業管理系碩士在職專班'),
    ('22140', '四技', '四年制資訊管理系'),
    ('22160', '碩士班', '資訊管理系碩士班'),
    ('23140', '四技', '四年制休閒產業與健康促進系'),
    ('23160', '碩士班', '休閒產業與健康促進系旅遊健康碩士班'),
    ('23460', '碩士班', '休閒產業與健康促進系碩士在職專班'),
    ('24120', '二技', '二年制長期照護系'),
    ('24150', '學士後多元專長', '長期照護系學士後多元專長培力課程專班'),
    ('24160', '碩士班', '長期照護系碩士班'),
    ('25140', '四技', '四年制語言治療與聽力學系'),
    ('25161', '碩士班', '語言治療與聽力學系碩士班語言治療組'),
    ('25162', '碩士班', '語言治療與聽力學系碩士班聽力組'),
    ('25460', '碩士班', '語言治療與聽力學系在職專班'),
    ('26860', '碩士班', '國際健康科技碩士學位學程國際生碩士班'),
    ('30860', '碩士班', '國際運動科學外國學生專班'),
    ('31120', '二技', '二年制嬰幼兒保育系'),
    ('31140', '四技', '四年制嬰幼兒保育系'),
    ('31181', '學士後學位學程', '嬰幼兒保育系學士後學位學程教保員專班春季班'),
    ('31160', '碩士班', '嬰幼兒保育系碩士班'),
    ('31860', '碩士班', '國際蒙特梭利碩士專班'),
    ('32140', '四技', '四年制運動保健系'),
    ('32160', '碩士班', '運動保健系碩士班'),
    ('32460', '碩士班', '運動保健系碩士在職專班'),
    ('33140', '四技', '四年制生死與健康心理諮商系'),
    ('33161', '碩士班', '生死與健康心理諮商系碩士班生死學組'),
    ('33162', '碩士班', '生死與健康心理諮商系碩士班諮商心理組'),
    ('41140', '四技', '高齡健康暨運動保健技優專班'),
    ('42140', '四技', '智慧健康科技技優專班');


CREATE TABLE Account
(
    ID int PRIMARY KEY,  -- 欄位id
    AccID varchar(10) UNIQUE,  -- 帳號
    Password varchar(100), -- 密碼
    AccType varchar(3), -- 帳戶類型
    UP_Date datetime,   -- 更新時間
    UP_User varchar(20) -- 更新人員
);
INSERT INTO ACCOUNT (ID,AccID, Password, AccType, UP_Date, UP_User)
VALUES
    (1,'ntunhsEmp', '$2b$10$6O3JzrnRPLej.XfqyW0O2u7rwFnra2M9jRVEU1aQL/QiReXoLI6BK', 'B01', getdate(), '0')
