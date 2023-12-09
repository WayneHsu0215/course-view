
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
                         CourseSummaryEnglish NVARCHAR(2000)
);
GO

select * from Courses