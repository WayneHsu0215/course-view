
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
                         InstructorName NVARCHAR(100),
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

CREATE TABLE AcademicDepartments (
                                     AcademicSystem NVARCHAR(255),
                                     DepartmentName NVARCHAR(255)
);

INSERT INTO AcademicDepartments (AcademicSystem, DepartmentName)
VALUES
    ('學制', '名稱'),
    ('二技', '二年制護理系'),
    ('四技', '四年制護理系'),
    ('碩士班', '護理系碩士班護研成人組'),
    ('碩士班', '護理系碩士班護研老人組'),
    ('碩士班', '護理系碩士班護研婦女組'),
    ('碩士班', '護理系碩士班護研精神組'),
    ('碩士班', '護理系碩士班護研社區組'),
    ('碩士班', '護理系碩士班護研兒童組'),
    ('碩士班', '護理系碩士班護研資訊組'),
    ('碩士班', '護理系碩士班護研成人專科組'),
    ('碩士班', '護理系中西醫結合護理碩士班'),
    ('博士班', '護理系博士班'),
    ('學士後系', '護理系學士後學士班(學士後護理系)'),
    ('二技(三年)', '二年制進修部護理系(日間班)'),
    ('二技(三年)', '二年制進修部護理系(夜間班)'),
    ('碩士班', '護理系碩士在職專班護專成人組'),
    ('碩士班', '護理系碩士在職專班護專老人組'),
    ('碩士班', '護理系碩士在職專班護專婦女組'),
    ('碩士班', '護理系碩士在職專班護專精神組'),
    ('碩士班', '護理系碩士在職專班護專社區組'),
    ('碩士班', '護理系碩士在職專班護專兒童組'),
    ('碩士班', '護理系碩士在職專班護專資訊組'),
    ('碩士班', '護理系碩士在職專班護專成人專科組'),
    ('碩士班', '國際護理碩士班'),
    ('博士班', '國際護理博士班'),
    ('四技', '四年制高齡健康照護系'),
    ('碩士班', '高齡健康照護系碩士班'),
    ('二技', '二年制護理助產及婦女健康系'),
    ('二技(三年)', '二年制進修部護理助產及婦女健康系'),
    ('碩士班', '護理助產及婦女健康系護理助產碩士班'),
    ('碩士班', '國際護理助產碩士班'),
    ('碩士班', '醫護教育暨數位學習系碩士班'),
    ('二技', '二年制醫護教育暨數位學習系'),
    ('碩士班', '健康科技學院碩士班'),
    ('二技', '二年制健康事業管理系'),
    ('四技', '四年制健康事業管理系'),
    ('碩士班', '健康事業管理系碩士班'),
    ('二技(三年)', '二年制進修部健康事業管理系'),
    ('碩士班', '健康事業管理系碩士在職專班'),
    ('四技', '四年制資訊管理系'),
    ('碩士班', '資訊管理系碩士班'),
    ('四技', '四年制休閒產業與健康促進系'),
    ('碩士班', '休閒產業與健康促進系旅遊健康碩士班'),
    ('碩士班', '休閒產業與健康促進系碩士在職專班'),
    ('二技', '二年制長期照護系'),
    ('學士後多元專長', '長期照護系學士後多元專長培力課程專班'),
    ('碩士班', '長期照護系碩士班'),
    ('四技', '四年制語言治療與聽力學系'),
    ('碩士班', '語言治療與聽力學系碩士班語言治療組'),
    ('碩士班', '語言治療與聽力學系碩士班聽力組'),
    ('碩士班', '語言治療與聽力學系在職專班'),
    ('碩士班', '國際健康科技碩士學位學程國際生碩士班'),
    ('碩士班', '國際運動科學外國學生專班'),
    ('二技', '二年制嬰幼兒保育系'),
    ('四技', '四年制嬰幼兒保育系'),
    ('學士後學位學程', '嬰幼兒保育系學士後學位學程教保員專班春季班'),
    ('碩士班', '嬰幼兒保育系碩士班'),
    ('碩士班', '國際蒙特梭利碩士專班'),
    ('四技', '四年制運動保健系'),
    ('碩士班', '運動保健系碩士班'),
    ('碩士班', '運動保健系碩士在職專班'),
    ('四技', '四年制生死與健康心理諮商系'),
    ('碩士班', '生死與健康心理諮商系碩士班生死學組'),
    ('碩士班', '生死與健康心理諮商系碩士班諮商心理組'),
    ('四技', '高齡運動健康暨嬰幼兒保育技優專班'),
    ('四技', '智慧健康科技技優專班');
