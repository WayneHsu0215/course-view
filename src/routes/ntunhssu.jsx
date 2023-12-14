import {Helmet} from 'react-helmet';
import React, {useEffect, useState, useRef} from 'react';
import {Icon} from '@iconify/react';
import Modal from "./Modal.jsx";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {Link} from 'react-router-dom';

const daysOfWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

const timeSlots = [
    '第1節',
    '第2節',
    '第3節',
    '第4節',
    '第5節',
    '第6節',
    '第7節',
    '第8節',
    '第9節',
    '第10節',
];


const initialSchedule = daysOfWeek.reduce((schedule, day) => {
    schedule[day] = timeSlots.map(() => ({course: "", credits: ""}));
    return schedule;
}, {});

const departmentMapping = {
    '11120': '二年制護理系',
    '11140': '四年制護理系',
    '11161': '護理系碩士班護研成人組',
    '11162': '護理系碩士班護研老人組',
    '11163': '護理系碩士班護研婦女組',
    '11164': '護理系碩士班護研精神組',
    '11165': '護理系碩士班護研社區組',
    '11166': '護理系碩士班護研兒童組',
    '11167': '護理系碩士班護研資訊組',
    '11168': '護理系碩士班護研成人專科組',
    '11169': '護理系中西醫結合護理碩士班',
    '11170': '護理系博士班',
    '11190': '護理系學士後學士班(學士後護理系)',
    '11230': '二年制進修部護理系(日間班)',
    '11330': '二年制進修部護理系(夜間班)',
    '11461': '護理系碩士在職專班護專成人組',
    '11462': '護理系碩士在職專班護專老人組',
    '11463': '護理系碩士在職專班護專婦女組',
    '11464': '護理系碩士在職專班護專精神組',
    '11465': '護理系碩士在職專班護專社區組',
    '11466': '護理系碩士在職專班護專兒童組',
    '11467': '護理系碩士在職專班護專資訊組',
    '11468': '護理系碩士在職專班護專成人專科組',
    '11860': '國際護理碩士班',
    '11870': '國際護理博士班',
    '13140': '四年制高齡健康照護系',
    '1C120': '二年制護理助產及婦女健康系',
    '1C330': '二年制進修部護理助產及婦女健康系',
    '1C160': '護理助產及婦女健康系護理助產碩士班',
    '1C860': '國際護理助產碩士班',
    '1D160': '醫護教育暨數位學習系碩士班',
    '1D120': '二年制醫護教育暨數位學習系',
    '20160': '健康科技學院碩士班',
    '21120': '二年制健康事業管理系',
    '21140': '四年制健康事業管理系',
    '21160': '健康事業管理系碩士班',
    '21330': '二年制進修部健康事業管理系',
    '21460': '健康事業管理系碩士在職專班',
    '22140': '四年制資訊管理系',
    '22160': '資訊管理系碩士班',
    '23140': '四年制休閒產業與健康促進系',
    '23160': '休閒產業與健康促進系旅遊健康碩士班',
    '23460': '休閒產業與健康促進系碩士在職專班',
    '24120': '二年制長期照護系',
    '24150': '長期照護系學士後多元專長培力課程專班',
    '24160': '長期照護系碩士班',
    '25140': '四年制語言治療與聽力學系',
    '25161': '語言治療與聽力學系碩士班語言治療組',
    '25162': '語言治療與聽力學系碩士班聽力組',
    '25460': '語言治療與聽力學系在職專班',
    '26860': '國際健康科技碩士學位學程國際生碩士班',
    '30860': '國際運動科學外國學生專班',
    '31120': '二年制嬰幼兒保育系',
    '31140': '四年制嬰幼兒保育系',
    '31181': '嬰幼兒保育系學士後學位學程教保員專班春季班',
    '31160': '嬰幼兒保育系碩士班',
    '31860': '國際蒙特梭利碩士專班',
    '32140': '四年制運動保健系',
    '32160': '運動保健系碩士班',
    '32460': '運動保健系碩士在職專班',
    '33140': '四年制生死與健康心理諮商系',
    '33161': '生死與健康心理諮商系碩士班生死學組',
    '33162': '生死與健康心理諮商系碩士班諮商心理組',
    '41140': '高齡健康暨運動保健技優專班',
    '42140': '智慧健康科技技優專班',
};

const Ntunhssu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const SESSIONS = Object.freeze({
        1: {name: '1', time: ['08:10', '09:00']},
        2: {name: '2', time: ['09:10', '10:00']},
        3: {name: '3', time: ['10:10', '11:00']},
        4: {name: '4', time: ['11:10', '12:00']},
        5: {name: '5', time: ['12:40', '13:30']},
        6: {name: '6', time: ['13:40', '14:30']},
        7: {name: '7', time: ['14:40', '15:30']},
        8: {name: '8', time: ['15:40', '16:30']},
        9: {name: '9', time: ['16:40', '17:30']},
        A: {name: '10', time: ['17:40', '18:30']},
        B: {name: '11', time: ['18:35', '19:25']},
        C: {name: '12', time: ['19:30', '20:20']},
        D: {name: '13', time: ['20:25', '21:15']},
        E: {name: '14', time: ['21:20', '22:10']},
    });

    const weekdays = [
        {value: "1", name: "星期一"},
        {value: "2", name: "星期二"},
        {value: "3", name: "星期三"},
        {value: "4", name: "星期四"},
        {value: "5", name: "星期五"},
        {value: "6", name: "星期六"},
        {value: "7", name: "星期日"},
    ];

    const grades = [
        {value: "1", name: "一年級"},
        {value: "2", name: "二年級"},
        {value: "3", name: "三年級"},
        {value: "4", name: "四年級"},
        {value: "5", name: "五年級"},
    ];
    ;


    const [schedule, setSchedule] = useState(initialSchedule);


    const courseCategories = [
        '跨校', '跨域課程', '全英語授課', 'EMI全英語授課', '同步遠距教學',
        '非同步遠距教學', '混合式遠距教學', '遠距教學課程', '遠距輔助課程'
    ];

    const systems = ['二技', '二技(三年)', '四技', '學士後多元專長', '碩士班', '博士班', '學士後學位學程', '學士後系'];
    const [selectedSystems, setSelectedSystems] = useState([]);


    const [isOpen, setIsOpen] = useState({
        semester: false,
        system: false,
        departmentGradeType: false,
        weekday: false,
        period: false,
        courseCategory: false,
        teacherCourse: false
    });
    const toggleAllDropdowns = (value) => {
        setIsOpen(prevState => ({
            semester: value,
            system: value,
            departmentGradeType: value,
            weekday: value,
            period: value,
            courseCategory: value,
            teacherCourse: value
        }));
    }


    const [searchResults, setSearchResults] = useState([]);
    const [Semester, setSemester] = useState(''); // 新增的回覆ID搜索状态
    const [MainInstructorName, setMainInstructorName] = useState('');
    const [SubjectCode, setSubjectCode] = useState('');
    const [DepartmentCode, setDepartmentCode] = useState('');
    const [CoreCode, setCoreCode] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');


    const handleSearch = async () => {


        try {
            const response = await fetch(`/api/search?Semester=${Semester}&MainInstructorName=${MainInstructorName}&SubjectCode=${SubjectCode}&DepartmentCode=${DepartmentCode}&CoreCode=${CoreCode}`);

            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setSearchResults(data); // Set the search results directly

                } else {
                    // If no data is found, display an error message
                    toast.error('未查詢符合資料', {
                        className: "font-semibold",
                    });
                }
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Server error', error);
        } finally {
            setSemester(''); // Clear the input field
            setMainInstructorName(''); // Clear the input field
            setSubjectCode(''); // Clear the input field
            setDepartmentCode(''); // Clear the input field
            setCoreCode(''); // Clear the input field
        }
    };
    const toggleDropdown = (section) => {
        setIsOpen(prevState => ({...prevState, [section]: !prevState[section]}));
    }

    const [uploadProgress, setUploadProgress] = useState(0);

    const [selectedDepartment, setSelectedDepartment] = useState('');

    // 處理下拉選單改變
    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            if (response.ok) {
                console.log('File uploaded successfully');
                setUploadProgress(0); // Reset progress after successful upload
            } else {
                throw new Error('File upload failed');
            }
        } catch (error) {
            console.error('Error during file upload:', error);
        }
    };

    const weekdayMap = {
        '1': '星期一',
        '2': '星期二',
        '3': '星期三',
        '4': '星期四',
        '5': '星期五',
        '6': '星期六',
        '7': '星期日',
    };
    const [totalCredits, setTotalCredits] = useState(0);

    const handleSelectCourse = (course) => {
        const classPeriodsArray = course.ClassPeriods.split(',').map(period => parseInt(period.trim(), 10));
        const weekdayString = weekdayMap[course.Weekday.toString()];

        // Check for conflicts
        const isConflict = classPeriodsArray.some(period => {
            const periodIndex = period - 1;
            return schedule[weekdayString][periodIndex].course !== "";
        });

        if (isConflict) {
            toast.error('時間衝突，無法選擇此課程！');
            return;
        }

        setSchedule(prevSchedule => {
            const newSchedule = {...prevSchedule};

            classPeriodsArray.forEach(period => {
                const periodIndex = period - 1;
                newSchedule[weekdayString][periodIndex] = {course: course.SubjectNameChinese, credits: course.Credits};
            });

            return newSchedule;
        });

        // 更新學分總計
        setTotalCredits(prevCredits => prevCredits + Number(course.Credits));
        toast(`已選擇課程：${course.SubjectNameChinese}`);
    };


    const [selectedWeekdays, setSelectedWeekdays] = useState([]);
    const [selectedPeriods, setSelectedPeriods] = useState([]);

// Function to handle checkbox change
    const handleCheckboxChange = (e) => {
        const {value} = e.target;
        // Check if the value is already in the selectedWeekdays array
        if (selectedWeekdays.includes(value)) {
            // If it is, remove it
            setSelectedWeekdays(selectedWeekdays.filter(day => day !== value));
        } else {
            // If it's not, add it
            setSelectedWeekdays([...selectedWeekdays, value]);
        }
    };
    const handlePeriodCheckboxChange = (e) => {
        const {value} = e.target;
        // Check if the value is already in the selectedPeriods array
        if (selectedPeriods.includes(value)) {
            // If it is, remove it
            setSelectedPeriods(selectedPeriods.filter(period => period !== value));
        } else {
            // If it's not, add it
            setSelectedPeriods([...selectedPeriods, value]);
        }
    };


    const [departments, setDepartments] = useState([]);


    const weekdayChineseMap = {
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '日',
    };

    const onSystemCheckboxChange = async (e) => {
        const selectedSystem = e.target.value;
        // 更新所選學制的狀態
        setSelectedSystems(prev => {
            // 如果选中，则添加到数组
            if (e.target.checked) {
                return [...prev, selectedSystem];
            } else {
                // 如果取消选中，则从数组移除
                return prev.filter(system => system !== selectedSystem);
            }
        });

        // 如果选中，则获取该学制的系所数据
        if (e.target.checked) {
            try {
                const response = await fetch(`/api/departments?academicSystem=${selectedSystem}`);
                if (response.ok) {
                    const data = await response.json();
                    setDepartments(prevDepartments => {
                        // 将新获取的系所数据与当前数据合并
                        return [...prevDepartments, ...data];
                    });
                } else {
                    toast.error('无法获取系所数据');
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
                toast.error('服务器错误');
            }
        } else {
            // 如果取消选中，可以选择清空系所数据或保留不变
            // 这里选择清空：
            setDepartments([]);
        }
    };

    const handleSearch1 = async () => {
        try {
            setSearchResults([]);

            // Get values from the dropdowns and input fields
            const courseType = document.getElementById('courseType')?.value;
            const SubjectCode = document.getElementById('course')?.value;
            const Semester = document.getElementById('semester')?.value; // Get the selected semester value

            // Construct the query parameters based on the selected checkboxes and input values
            const weekdayQueryParam = selectedWeekdays.length > 0 ? selectedWeekdays.map(day => `Weekday=${day}`).join('&') : '';
            const classPeriodsQueryParam = selectedPeriods.length > 0 ? selectedPeriods.map(period => `ClassPeriods=${period}`).join('&') : '';
            const courseTypeQueryParam = courseType ? `CourseTypeName=${courseType}` : '';
            const subjectCodeQueryParam = SubjectCode ? `SubjectCode=${SubjectCode}` : '';
            const systemsQueryParam = selectedSystems.map(system => `AcademicSystem=${system}`).join('&');
            const gradeQueryParam = selectedGrade ? `Grade=${selectedGrade}` : '';
            const selectedDepartment = document.getElementById('department')?.value;
            const departmentCodeQueryParam = selectedDepartment ? `DepartmentCode=${selectedDepartment}` : '';
            const classroomCode = document.getElementById('classroom')?.value;
            const classroomCodeQueryParam = classroomCode ? `Location=${classroomCode}` : '';
            const semesterQueryParam = Semester ? `Semester=${Semester}` : '';
            const courseCategoriesQueryParam = selectedCourseCategories.map(category => `TimetableNotes=${encodeURIComponent(category)}`).join('&');


            // Combine all query parameters
            let queryParams = [semesterQueryParam, courseCategoriesQueryParam, classroomCodeQueryParam, departmentCodeQueryParam, weekdayQueryParam, classPeriodsQueryParam, courseTypeQueryParam, subjectCodeQueryParam, systemsQueryParam, gradeQueryParam,]
                .filter(param => param) // Remove empty strings
                .join('&');

            if (!queryParams) {
                toast.error('請至少選擇一種搜尋條件', {className: "font-semibold"});
                return;
            }

            const response = await fetch(`/api/search1?${queryParams}`);

            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setSearchResults(data);
                    toast(`已查詢符合資料${data.length}筆`, {className: "font-semibold"})
                } else {
                    toast.error('未查詢符合資料', {className: "font-semibold"});
                }
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error searching courses:', error);
        } finally {
            // Clear the input fields
            if (document.getElementById('course')) {
                document.getElementById('course').value = '';
            }
            if (document.getElementById('courseType')) {
                document.getElementById('courseType').value = '';
            }
            // Add any other finalization logic here
        }
    };

    const handleSystemCheckboxChange = (e) => {
        const {value, checked} = e.target;
        setSelectedSystems(prev => {
            // 如果选中，则添加到数组
            if (checked) {
                return [...prev, value];
            } else {
                // 如果取消选中，则从数组移除
                return prev.filter(system => system !== value);
            }
        });
    };
    useEffect(() => {
        const fetchDepartments = async (url) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setDepartments(data);
                } else {
                    toast.error('无法获取系所数据');
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
                toast.error('服务器错误');
            }
        };

        if (selectedSystems.length > 0) {
            // 有選擇學制時，添加學制到查詢參數並發送請求
            const queryParams = new URLSearchParams({academicSystem: selectedSystems.join(',')}).toString();
            fetchDepartments(`/api/departments?${queryParams}`);
        } else {
            // 沒有選擇學制時，發送請求獲取所有系所
            fetchDepartments('/api/AllDepartments');
        }
    }, [selectedSystems]);


    const [isExportModalOpen, setIsExportModalOpen] = useState(false); // 用于控制导出 Modal 的打开和关闭
    const handleCloseExportModal = () => {
        setIsExportModalOpen(false); // 关闭导出 Modal
    };
    const handleExportModalOpen = () => {
        setIsExportModalOpen(true); // 打開匯出 Modal
    };


    const contentRef = useRef(null);

    const generatePDF = () => {
        const content = contentRef.current;
        if (content) {
            html2canvas(content).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('課程查詢系統課表匯出.pdf');
            });
        }
    };


    const [selectedSemester, setSelectedSemester] = useState('');

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };


    const [selectedTeacher, setSelectedTeacher] = useState('');

    const handleSelectTeacher = (teacherName) => {
        setSelectedTeacher(teacherName);
        setIsModalOpen1(true);
    };


    const [selectedLocation, setSelectedLocation] = useState('');
    const [locationImage, setLocationImage] = useState('');

// Mapping or function to determine the image based on location's first letter
    const [locationsWithImages, setLocationsWithImages] = useState([]);

    // Function to get image based on the location's first letter
    const getImageForLocation = (location) => {
        const firstLetter = location.charAt(0).toUpperCase();
        switch (firstLetter) {
            case 'F':
                return 'F.png'; // Replace with actual image paths
            case 'G':
                return 'G.png'; // Replace with actual image paths
            case 'B':
                return 'B.png'; // Replace with actual image paths
            case 'S':
                return 'S.png'; // Replace with actual image paths
            // Add other cases as needed
            default:
                return 'A.jpg';
        }
    };

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch('/api/search1');
            const data = await response.json();
            const locationsWithImages = data.map(item => ({
                ...item,
                image: getImageForLocation(item.Location)
            }));
            setLocationsWithImages(locationsWithImages);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelectLocation = (location) => {
        setSelectedLocation(location);
        const image = getImageForLocation(location);
        setLocationImage(image);
        setIsModalOpen2(true);
    };

    const [selectedCourseCategories, setSelectedCourseCategories] = useState([]);

    const handleCourseCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCourseCategories(prev =>
            prev.includes(value)
                ? prev.filter(category => category !== value)
                : [...prev, value]
        );
    };

    const [selectedCourses, setSelectedCourses] = useState(null);
    const [selectedAcademicSystem, setSelectedAcademicSystem] = useState(null);
    const [selectedSubjectCode, setSelectedSubjectCode] = useState(null);
    const [selectedDepartmentCode, setSelectedDepartmentCode] = useState(null);
    const [selectedCoreCode, setSelectedCoreCode] = useState(null);
    const [selectedGrade1, setSelectedGrade1] = useState(null);
    const [selectedClassGroup, setSelectedClassGroup] = useState(null);
    const [selectedSubjectNameEnglish, setSelectedSubjectNameEnglish] = useState(null);
    const [selectedInstructorName, setSelectedInstructorName] = useState(null);
    const [selectedNumberOfStudents, setSelectedNumberOfStudents] = useState(null);
    const [selectedCredits, setSelectedCredits] = useState(null);
    const [selectedWeeksOfClasses, setSelectedWeeksOfClasses] = useState(null);
    const [selectedCourseTypeName, setSelectedCourseTypeName] = useState(null);
    const [selectedWeekday, setSelectedWeekday] = useState(null);
    const [selectedClassPeriods, setSelectedClassPeriods] = useState(null);
    const [selectedTimetableNotes, setSelectedTimetableNotes] = useState(null);
    const [selectedCourseSummaryChinese, setSelectedCourseSummaryChinese] = useState(null);
    const [selectedCourseSummaryEnglish, setSelectedCourseSummaryEnglish] = useState(null);
    const [selectedMappedDepartment, setSelectedMappedDepartment] = useState(null);

    const fetchStudentDetails1 = async (Courses, teacherName, AcademicSystem, SubjectCode, DepartmentCode, CoreCode, Grade, ClassGroup, SubjectNameEnglish,
                                        InstructorName, NumberOfStudents, Credits, WeeksOfClasses, CourseTypeName, Location, Weekday, ClassPeriods, TimetableNotes
        , CourseSummaryChinese, CourseSummaryEnglish, MappedDepartment) => {
        setSelectedCourses(Courses);
        setSelectedTeacher(teacherName);
        setSelectedAcademicSystem(AcademicSystem);
        setSelectedSubjectCode(SubjectCode);
        setSelectedDepartmentCode(DepartmentCode);
        setSelectedCoreCode(CoreCode);
        setSelectedGrade1(Grade);
        setSelectedClassGroup(ClassGroup);
        setSelectedSubjectNameEnglish(SubjectNameEnglish);
        setSelectedInstructorName(InstructorName);
        setSelectedNumberOfStudents(NumberOfStudents);
        setSelectedCredits(Credits);
        setSelectedWeeksOfClasses(WeeksOfClasses);
        setSelectedCourseTypeName(CourseTypeName);
        setSelectedLocation(Location);
        setSelectedWeekday(Weekday);
        setSelectedClassPeriods(ClassPeriods);
        setSelectedTimetableNotes(TimetableNotes);
        setSelectedCourseSummaryChinese(CourseSummaryChinese);
        setSelectedCourseSummaryEnglish(CourseSummaryEnglish);
        setSelectedMappedDepartment(MappedDepartment);
        setIsModalOpen3(true);
    };

    const handleTimetableNotesChange = (e) => {
        const value = e.target.value;
        setSelectedTimetableNotes(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleDeleteCourse = (day, periodIndex) => {
        setSchedule(prevSchedule => {
            const newSchedule = {...prevSchedule};
            const courseToDelete = newSchedule[day][periodIndex].course;
            setTotalCredits(prevCredits => prevCredits - Number(newSchedule[day][periodIndex].credits));

            // Iterate through all periods of the day and remove the course
            newSchedule[day] = newSchedule[day].map(slot =>
                slot.course === courseToDelete ? {course: "", credits: ""} : slot
            );

            return newSchedule;
        });
    };




    return (
        <div className="bg-gray-100 min-h-screen ">
            <ToastContainer/>

            <Helmet>
                <title>課程查詢系統</title>
            </Helmet>
            {/*<div>*/}
            {/*    匯入Excel*/}
            {/*    <input type="file" onChange={handleFileUpload} />*/}
            {/*    {uploadProgress > 0 && (*/}
            {/*        <div style={{ width: '100%', backgroundColor: '#ddd' }}>*/}
            {/*            <div style={{ height: '10px', width: `${uploadProgress}%`, backgroundColor: 'green' }}></div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
            <div className="flex ">
                <div className=" px-6 pb-6 pt-4 rounded  w-11/12 mx-auto">

                    <ul className=" flex  mb-6 ">
                        <li className="-mb-px mr-1 ">
                            <a className=" inline-block rounded-t py-1 px-2 text-green-600/80 font-semibold text-xl"
                               href="/"><Icon className="inline mx-2 text-3xl "
                                              icon="line-md:cloud-print-outline-loop"/>課程查詢系統</a>
                        </li>

                        <li className="mr-1">
                            <a
                                className="bg-gray-100 inline-block py-1 px-2 text-green-600/80 hover:text-green-800 font-semibold text-xl "
                                href="https://system8.ntunhs.edu.tw/myNTUNHS_student/Modules/Main/Index_student.aspx?first=true"
                                target="_blank"
                                rel="noopener noreferrer"><Icon className="inline mx-2 text-3xl "
                                                                icon="line-md:person-search-twotone"/>e-protfolio 學習歷程
                            </a>
                        </li>
                        <li className="mr-1">
                            <a
                                className="bg-gray-100 inline-block py-1 px-2  text-green-600/80 hover:text-green-800 font-semibold text-xl"
                                href="https://system16.ntunhs.edu.tw/myNTUNHS_coc/Modules/Main/Index_COC.aspx"
                                target="_blank"
                                rel="noopener noreferrer"><Icon className="inline mx-2 text-3xl "
                                                                icon="bx:book"/>選課系統</a>
                        </li>
                        <li className="mr-1">
                            <a
                                className="bg-gray-100 inline-block py-1 px-2  text-green-600/80 hover:text-green-800 font-semibold text-xl"
                                href="https://system10.ntunhs.edu.tw/AcadInfoSystem/Modules/QueryCourse/CourseList.aspx"
                                target="_blank"
                                rel="noopener noreferrer"><Icon className="inline mx-2 text-3xl "
                                                                icon="ic:twotone-book"/>選課行事曆</a>
                        </li>
                        <li className="mr-1">
                            <a
                                className="bg-gray-100 inline-block py-1 px-2  text-green-600/80 hover:text-green-800 font-semibold text-xl"
                                href="https://system10.ntunhs.edu.tw/AcadInfoSystem/Modules/QueryCourse/CourseList.aspx"
                                target="_blank"
                                rel="noopener noreferrer"><Icon className="inline mx-2 text-3xl "
                                                                icon="fluent:people-chat-20-filled"/>課程科目表查詢</a>
                        </li>



                    </ul>
                    <div className="flex">
                        <h1 className="text-3xl font-bold mb-4">國立臺北護理健康大學 課程查詢系統<Icon
                            className="inline mx-2 text-2xl " icon="line-md:text-box"/></h1>

                        <button type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="ml-auto  hover:bg-red-500/50  border w-32 p-2 rounded-lg font-bold bg-red-300/50 text-gray-700  border-red-600/50 border-2 items-center">
                            <Icon
                                className="inline mx-2 text-2xl " icon="line-md:question-circle"/>注意事項
                        </button>

                    </div>


                </div>
            </div>


            <div className="flex bg-white p-6 rounded shadow-md w-11/12 mx-auto justify-center">
                {/* Left Column */}
                <div className="flex flex-col  pr-4 w-10/12">


                    <form className="space-y-4">
                        <div className="w-2/5">
                            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">學期：</label>
                            <select id="semester" className="mt-1 block w-full py-2 px-3 border rounded-md"
                            >
                                <option value="1122">112學年度下學期</option>
                                <option value="1121">112學年度上學期</option>
                                <option value="1112">111學年度下學期</option>
                            </select>
                        </div>

                        <div className="flex h-0.5 justify-center items-start text-xs text-gray-400">
                            <button
                                className="mx-8"
                                type="button"
                                onClick={() => toggleAllDropdowns(true)}>  {/* 打開所有下拉框 */}
                                展開全部{"<>"}
                            </button>

                            <button
                                className="mx-8"
                                type="button"
                                onClick={() => toggleAllDropdowns(false)}> {/* 關閉所有下拉框 */}
                                收起全部{"><"}
                            </button>
                        </div>
                        <div className="flex justify-center w-full">
                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.departmentGradeType ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('departmentGradeType')}>
                                系所/年級/課別 {isOpen.departmentGradeType ?
                                <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop"/> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop"/>}
                            </button>
                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.weekday ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('weekday')}>
                                星期 {isOpen.weekday ?
                                <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop"/> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop"/>}
                            </button>
                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.system ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('system')}>
                                學制 {isOpen.system ?
                                <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop"/> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop"/>}
                            </button>
                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.period ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('period')}>
                                節次 {isOpen.period ?
                                <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop"/> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop"/>}
                            </button>

                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.courseCategory ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('courseCategory')}>
                                課程內容分類 {isOpen.courseCategory ?
                                <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop"/> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop"/>}
                            </button>

                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.teacherCourse ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('teacherCourse')}>
                                教室/課程 {isOpen.teacherCourse ?
                                <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop"/> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop"/>}
                            </button>
                        </div>
                        <div>

                            {isOpen.system && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">學制：</label>
                                    <div className="border rounded-l p-4 grid grid-cols-4 gap-4">
                                        {systems.map(system => (
                                            <label key={system} className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox"
                                                    name="system"
                                                    value={system}
                                                    onChange={onSystemCheckboxChange} // 使用 onSystemCheckboxChange 处理变更
                                                />
                                                <span className="ml-2">{system}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>

                            <div className="flex justify-between w-full">

                                {isOpen.departmentGradeType && (

                                    <div className="w-full flex  justify-between ">

                                        <div className="w-3/4 ">
                                            <label htmlFor="department"
                                                   className="block  text-sm font-medium text-gray-700">系所：</label>
                                            <select id="department"
                                                    className="mt-1 block w-full py-2 px-3 border rounded-md"
                                                    onChange={handleDepartmentChange}>
                                                <option value="">選擇</option>
                                                {departments.map((dept, index) => (
                                                    <option key={index}
                                                            value={dept.AcademicSystemCode}>{dept.DepartmentName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="w-3/4 mx-4">
                                            <label htmlFor="grade"
                                                   className="block text-sm font-medium text-gray-700">年級：</label>
                                            <select id="grade" className="mt-1 block w-full py-2 px-3 border rounded-md"
                                                    onChange={(e) => setSelectedGrade(e.target.value)}
                                            >
                                                <option value="">請選擇</option>

                                                {grades.map((grade, index) => (

                                                    <option key={index} value={grade.value}>{grade.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="w-3/4 mx-4">
                                            <label htmlFor="courseType"
                                                   className="block text-sm font-medium text-gray-700">課別：</label>
                                            <select id="courseType"
                                                    className="mt-1 block w-full py-2 px-3 border rounded-md">
                                                <option value="">請選擇</option>

                                                <option value="通識必修(通識)">通識必修(通識)</option>
                                                <option value="通識選修(通識)">通識選修(通識)</option>
                                                <option value="專業必修(系所)">專業必修(系所)</option>
                                                <option value="專業選修(系所)">專業選修(系所)</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div>

                            {isOpen.weekday && (
                                <div className="">
                                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                                        星期：
                                    </label>
                                    <div className=" border rounded-l p-4 mt-2 space-y-2">
                                        {weekdays.map((day) => (
                                            <label key={day.value} className="mx-4 inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox"
                                                    name="weekday"
                                                    value={day.value}
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedWeekdays.includes(day.value)}
                                                />
                                                <span className="mx-1">{day.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>

                            {isOpen.period && (
                                <div className="flex flex-col items-start w-full">
                                    <label className="block text-sm font-medium text-gray-700">節次：</label>
                                    <div className="border rounded-l p-4 grid grid-cols-4 gap-4 w-full">
                                        {Object.entries(SESSIONS).map(([key, session]) => (
                                            <label key={key} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox"
                                                    name="period"
                                                    value={session.name}
                                                    onChange={handlePeriodCheckboxChange}
                                                    checked={selectedPeriods.includes(session.name)}
                                                />
                                                <span>{`第${session.name}節(${session.time[0]}~${session.time[1]})`}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                        <div>
                            {isOpen.courseCategory && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">課程內容分類：</label>
                                    <div className="border rounded-l p-4 grid grid-cols-3 gap-4">
                                        {courseCategories.map((category, index) => (
                                            <label key={index}>
                                                <input
                                                    type="checkbox"
                                                    value={category}
                                                    checked={selectedCourseCategories.includes(category)}
                                                    onChange={handleCourseCategoryChange}/>
                                                {category}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            {isOpen.teacherCourse && (
                                <div className="flex space-x-4 border rounded-l p-4">

                                    <div className="flex-1">
                                        <label htmlFor="course"
                                               className="block text-sm font-medium text-gray-700">課程：</label>
                                        <input type="text" id="course"
                                               className="mt-1 block w-full py-2 px-3 border rounded-md"
                                               placeholder="課程代碼"/>
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="classroom"
                                               className="block text-sm font-medium text-gray-700">教室：</label>
                                        <input type="text" id="classroom"
                                               className="mt-1 block w-full py-2 px-3 border rounded-md"
                                               placeholder="教室代號"/>
                                    </div>

                                </div>
                            )}
                        </div>
                        <button type="button" onClick={handleSearch1}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            <Icon className="inline text-2xl mx-1" icon="line-md:search-filled"/>查詢
                        </button>
                        <div className="mt-4 text">

                            {searchResults.length > 0 ? (
                                <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                                    <header className="text-2xl font-bold text-center mb-4">查詢結果</header>
                                    <table
                                        className="min-w-full bg-white border border-gray-300 rounded-lg divide-y divide-gray-300 table-auto">
                                        <thead className="sticky top-0 bg-gray-200">
                                        <tr>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">學年度</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">教授老師</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">課別</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">課程名稱</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">學分</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">教室</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">星期</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">節次</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">年級</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">系所</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-200">操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {searchResults.map((result, index) => (
                                            <tr className="text-center border" key={index}>
                                                <td className="py-2 px-4">{result.Semester}</td>
                                                <td className="py-2 px-4">
                                                    <button type="button"
                                                            onClick={() => handleSelectTeacher(result.MainInstructorName)}
                                                            className="text-blue-500 hover:text-blue-800">
                                                        {result.MainInstructorName}
                                                    </button>
                                                </td>
                                                <td className="py-2 px-4">{result.CourseTypeName}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => fetchStudentDetails1(result.SubjectNameChinese, result.MainInstructorName, result.AcademicSystem,
                                                            result.SubjectCode, result.DepartmentCode, result.CoreCode, result.Grade, result.ClassGroup, result.SubjectNameEnglish
                                                            , result.MainInstructorName, result.NumberOfStudents, result.Credits, result.WeeksOfClasses, result.CourseTypeName
                                                            , result.Location, result.Weekday, result.ClassPeriods, result.TimetableNotes, result.CourseSummaryChinese, result.CourseSummaryEnglish
                                                            , departmentMapping[result.DepartmentCode] || result.DepartmentCode)}
                                                        className="text-blue-500 hover:text-blue-800">
                                                        {result.SubjectNameChinese}
                                                    </button>
                                                </td>
                                                <td className="py-2 px-4">{result.Credits}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectLocation(result.Location)}
                                                        className="text-blue-500 hover:text-blue-800">
                                                        {result.Location}
                                                    </button>
                                                </td>
                                                <td className="py-2 px-4">{weekdayChineseMap[result.Weekday]}</td>
                                                <td className="py-2 px-4">{result.ClassPeriods}</td>
                                                <td className="py-2 px-4">{result.Grade}</td>
                                                <td className="py-2 px-4">{departmentMapping[result.DepartmentCode] || result.DepartmentCode}</td>
                                                <td className="py-2 px-4">
                                                    <button type="button" onClick={() => handleSelectCourse(result)}
                                                            className="text-blue-500 hover:text-blue-800">選擇課程
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>

                                </div>
                            ) : (
                                <p className="text-center text-red-600"></p>
                            )}

                        </div>
                    </form>
                    <div className="w-full flex justify-center mt-4 overflow-x-auto">
                        <section className="w-full flex flex-col items-center mt-4">
                            <header className="text-2xl font-bold text-center mb-4">課表預覽</header>
                            <article
                                className="w-full mx-auto border border-gray-300 rounded-lg overflow-hidden text-center">
                                <header className="flex bg-gray-200">
                                    <p className="w-1/4 py-2 px-4 border-r"></p>
                                    {daysOfWeek.map((day) => (
                                        <p key={day} className="w-1/4 py-2 px-5 border-r text-center">{day}</p>
                                    ))}
                                </header>
                                {timeSlots.map((timeSlot, index) => (
                                    <section key={index} className="flex text-center">
                                        <div className="w-1/4 border border-r flex items-center justify-center">
                                            {timeSlot}</div>
                                        {daysOfWeek.map((day) => {
                                            const slot = schedule[day][index];
                                            return (
                                                <p key={day}
                                                   className="py-2 px-4 w-1/4 border border-r flex items-center justify-center">
                    <span className="rounded-lg p-">
                        <p className="bg-amber-100 rounded-lg">
                            {slot.course}
                            {slot.course && <button onClick={() => handleDeleteCourse(day, index)}
                                                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">刪除</button>}
                        </p>
                    </span>
                                                </p>
                                            );
                                        })}
                                    </section>
                                ))}

                            </article>
                            <div className="flex justify-center">
                                <section className="mt-4">
                                    <p className="text-lg text-sm">學分總計: <strong>{totalCredits}</strong></p>
                                </section>
                            </div>
                            <button
                                className="ml-4 bg-green-500 mt-4 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                                onClick={handleExportModalOpen}>
                                <Icon icon="mdi:file-export" className="mr-2" width="26" height="26"/>
                                匯出
                            </button>
                        </section>
                    </div>
                </div>


            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">注意事項<Icon
                        className="inline mx-2 text-2xl " icon="svg-spinners:blocks-shuffle-3"/></h1>

                    <div>

                        <p className="text-lg text-red-600 font-bold mb-4">※本查詢執行速度比舊的快，別用舊系統了 。</p>
                        <p className="text-lg font-bold mb-4">※所有欄位皆提供模糊查詢，請安心使用。</p>
                        <p className="text-lg font-bold mb-4">※選課日程及注意事項等請詳閱教務處網站選課公告</p>

                    </div>
                </div>
            </Modal>

            <Modal isOpen={isModalOpen1} onClose={() => setIsModalOpen1(false)}>
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">教師資訊<Icon className="inline mx-2 text-2xl"
                                                                          icon="svg-spinners:blocks-shuffle-3"/></h1>
                    <div className="flex items-center">
                        {/* Image container */}
                        <div className="mr-4">
                            <img src="cy.png" alt="Teacher" style={{width: '150px', height: '200px'}}/>
                        </div>
                        {/* Text container */}
                        <div>
                            <p className="text-lg font-bold mb-4">姓名：{selectedTeacher}</p>
                            {/* You can add more details here if you have */}
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isModalOpen2} onClose={() => setIsModalOpen2(false)}>
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">教室位置</h1>
                    <div>
                        <img src={locationImage} alt="Location" style={{width: '600px', height: '450px'}}/>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isModalOpen3} onClose={() => setIsModalOpen3(false)}>
                <div>
                    <h1 className="text-2xl mb-4 text-center font-bold">課程詳細資料</h1>
                    <table className="table-auto ">
                        <tbody>
                        <tr>
                            <td className="text-lg font-bold  pl-7 bg-gray-200 border border-gray-400">課程名稱：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedCourses}</td>
                            <td className="text-lg font-bold pl-7  bg-gray-200 border border-gray-400">課程名稱(英文)：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400  ">{selectedSubjectNameEnglish}</td>
                        </tr>
                        <tr>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">系所：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedMappedDepartment}</td>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">課別名稱：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedCourseTypeName}</td>
                        </tr>
                        <tr>
                            <td className="text-lg font-bold pl-7   bg-gray-200  border border-gray-400">科目代碼：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedSubjectCode}</td>
                            <td className="text-lg font-bold pl-7   bg-gray-200  border border-gray-400">系所代碼：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedDepartmentCode}</td>
                        </tr>
                        <tr>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">核心四碼：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedCoreCode}</td>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">年級：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedGrade1}</td>
                        </tr>
                        <tr>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">上課般組：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedClassGroup}</td>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">授課教師姓名：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedInstructorName}</td>
                        </tr>
                        <tr>

                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">上課人數：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedNumberOfStudents}</td>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">學分數：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedCredits}</td>
                        </tr>
                        <tr>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">上課周次：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedWeeksOfClasses}</td>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">上課星期：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedWeekday}</td>
                        </tr>
                        <tr>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">上課地點：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedLocation}</td>
                            <td className="text-lg font-bold pl-7   bg-gray-200 border border-gray-400">上課節次：</td>
                            <td className="text-lg mb-4 pl-7 border border-gray-400">{selectedClassPeriods}</td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <div>
                                    <div className="mt-8 border border-gray-400">
                                        <p className="text-lg font-bold mb-4 pl-7 bg-gray-200 ">備註：</p>
                                        <p className="text-lg mb-4 max-w-5xl pl-7">{selectedTimetableNotes}</p>
                                    </div>

                                    <div className=" border border-gray-400">
                                        <p className="text-lg font-bold mb-4 pl-7  bg-gray-200 border border-gray-400">課程摘要：</p>
                                        <p className="text-lg mb-4 max-w-5xl pl-7">{selectedCourseSummaryChinese}</p>
                                    </div>
                                    {/*<div className="mb-8 border  border-gray-400">*/}
                                    {/*    <p className="text-lg font-bold mb-4 pl-7    bg-gray-200 border border-gray-400">課程摘要(英文)：</p>*/}
                                    {/*    <p className="text-lg mb-4 max-w-5xl pl-7">{selectedCourseSummaryEnglish}</p>*/}
                                    {/*</div>*/}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>


                </div>

            </Modal>


            <Modal isOpen={isExportModalOpen} onClose={handleCloseExportModal}>
                <div className="w-[21cm] h-[29.7cm] mx-auto h-full " style={{maxHeight: '400px', overflowY: 'auto'}}>
                    <div className="w-full flex justify-center  overflow-x-auto p-6" ref={contentRef}>
                        <section className="w-full flex flex-col items-center mt-4">
                            <p className="text-lg text-sm">學分總計: <strong>{totalCredits}</strong></p>
                            <header className="text-base font-bold text-center mb-4">課表預覽</header>
                            <article
                                className="w-full mx-auto border border-gray-300 rounded-lg  overflow-hidden text-center text-xs">
                                <header className="flex bg-gray-200">
                                    <p className="w-1/4 py-2 px-4 border-r"></p>
                                    {daysOfWeek.map((day) => (
                                        <p key={day} className="w-1/4 py-2 px-5 border-r text-center">{day}</p>
                                    ))}
                                </header>
                                {timeSlots.map((timeSlot, index) => (
                                    <section key={index} className="flex text-center">
                                        <div className="w-1/4 border border-r flex items-center justify-center">
                                            {timeSlot}</div>
                                        {daysOfWeek.map((day) => {
                                            const slot = schedule[day][index];
                                            return (
                                                <p key={day}
                                                   className=" px-4 py-5 w-1/4 border border-r flex items-center justify-center">
                    <span className="rounded-lg p-">
                        <p className="bg-amber-100  rounded-lg">
                            {slot.course}
                        </p>
                    </span>
                                                </p>
                                            );
                                        })}
                                    </section>
                                ))}

                            </article>
                        </section>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={generatePDF} style={{marginTop: '20px'}}
                                className="bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded">
                            匯出課表
                        </button>
                    </div>
                </div>
            </Modal>


            <footer className="text-center text-sm">

                <Link className="flex justify-center" to="/login">

                    <button
                        className="inline-block text-sm items-center flex justify-end hover:text-red-800 rounded-t py-1 px-2 text-red-500 font-semibold ">
                        <Icon icon="material-symbols:login" className="inline mx-2 text-3xl" width="13"
                              height="13"/>進入管理員後台系統
                    </button>

                </Link>
                製作：第6組 李瑜庭、許朝威
            </footer>
        </div>


    );
};

export default Ntunhssu;