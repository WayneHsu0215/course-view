import {Helmet} from 'react-helmet';
import React, {useEffect, useState} from 'react';
import {Icon} from '@iconify/react';
import Modal from "./Modal.jsx";
import {toast} from "react-toastify";



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


// 初始化课程表
const initialSchedule = daysOfWeek.reduce((schedule, day) => {
    schedule[day] = timeSlots.map(() => "");
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
    const grades = ["一年級", "二年級", "三年級", "四年級", "五年級"];

    const weekdays = [
        { value: "1", name: "星期一" },
        { value: "2", name: "星期二" },
        { value: "3", name: "星期三" },
        { value: "4", name: "星期四" },
        { value: "5", name: "星期五" },
        { value: "6", name: "星期六" },
        { value: "7", name: "星期日" },
    ];
    const [schedule, setSchedule] = useState(initialSchedule);


    const courseCategories = [
        '跨校', '跨域課程', '全英語授課', 'EMI全英語授課', '同步遠距教學',
        '非同步遠距教學', '混合式遠距教學', '遠距教學課程', '遠距輔助課程'
    ];

    const systems = ['二技', '二技(三年)', '四技', '學士後多元專長', '碩士班', '博士班', '學士後學位學程', '學士後系'];



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

    const handleSelectCourse = (course) => {
        let classPeriodsArray = course.ClassPeriods.split(',').map(period => parseInt(period.trim(), 10));

        if (!Array.isArray(classPeriodsArray) || classPeriodsArray.some(isNaN)) {
            console.error('ClassPeriods is not a valid array');
            return;
        }

        const weekdayMap = {
            '1': '星期一',
            '2': '星期二',
            '3': '星期三',
            '4': '星期四',
            '5': '星期五',
            '6': '星期六',
            '7': '星期日',
        };

        const weekdayString = weekdayMap[course.Weekday.toString()];

        if (!daysOfWeek.includes(weekdayString)) {
            console.error('Invalid Weekday value');
            return;
        }

        setSchedule((prevSchedule) => {
            const newSchedule = { ...prevSchedule };

            classPeriodsArray.forEach((period) => {
                const periodIndex = period - 1;
                // Update the schedule with the course code
                newSchedule[weekdayString][periodIndex] = course.SubjectNameChinese;
            });

            return newSchedule;
        });
    };

    const [selectedWeekdays, setSelectedWeekdays] = useState([]);
    const [selectedPeriods, setSelectedPeriods] = useState([]);

// Function to handle checkbox change
    const handleCheckboxChange = (e) => {
        const { value } = e.target;
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
        const { value } = e.target;
        // Check if the value is already in the selectedPeriods array
        if (selectedPeriods.includes(value)) {
            // If it is, remove it
            setSelectedPeriods(selectedPeriods.filter(period => period !== value));
        } else {
            // If it's not, add it
            setSelectedPeriods([...selectedPeriods, value]);
        }
    };


    //以必選修搜尋
    // const handleSearch1 = async () => {
    //     try {
    //         const courseType = document.getElementById('courseType').value; // Get the selected course type from the dropdown
    //         const response = await fetch(`/api/search1?CourseTypeName=${courseType}`);
    //         const data = await response.json();
    //         // Process the data as needed
    //         console.log(data);
    //         setSearchResults(data);
    //     } catch (error) {
    //         console.error('Error searching courses:', error);
    //     }
    // };




    //以星期和節次搜尋
    // const handleSearch1 = async () => {
    //     try {
    //         const weekdayQueryParam = selectedWeekdays.map(day => `Weekday=${day}`).join('&');
    //         const classPeriodsQueryParam = selectedPeriods.map(period => `ClassPeriods=${period}`).join('&');
    //
    //         const response = await fetch(`/api/search1?${weekdayQueryParam}&${classPeriodsQueryParam}`);
    //         const data = await response.json();
    //
    //         // Process the data as needed
    //         console.log(data);
    //         setSearchResults(data);
    //     } catch (error) {
    //         console.error('Error searching courses:', error);
    //     }
    // };


    //以課程代碼輸入搜尋
    // const handleSearch1 = async () => {
    //     try {
    //         // Retrieve values from input fields and dropdowns
    //
    //         const SubjectCode = document.getElementById('course').value;
    //
    //
    //         const response = await fetch(`/api/search1?SubjectCode=${SubjectCode}`);
    //
    //         if (response.ok) {
    //             const data = await response.json();
    //             if (data.length > 0) {
    //                 setSearchResults(data); // Set the search results directly
    //             } else {
    //                 // If no data is found, display an error message
    //                 toast.error('未查詢符合資料', {
    //                     className: "font-semibold",
    //                 });
    //             }
    //         } else {
    //             console.error('Failed to fetch data');
    //         }
    //     } catch (error) {
    //         console.error('Server error', error);
    //     } finally {
    //         // Clear the input fields
    //
    //         document.getElementById('course').value = '';
    //
    //     }
    // };

    const handleSearch1 = async () => {
        try {
            // Get values from the dropdowns and input fields
            const courseType = document.getElementById('courseType')?.value;
            const SubjectCode = document.getElementById('course')?.value;

            // Construct the query parameters based on the selected checkboxes and input values
            const weekdayQueryParam = selectedWeekdays.length > 0 ? selectedWeekdays.map(day => `Weekday=${day}`).join('&') : '';
            const classPeriodsQueryParam = selectedPeriods.length > 0 ? selectedPeriods.map(period => `ClassPeriods=${period}`).join('&') : '';
            const courseTypeQueryParam = courseType ? `CourseTypeName=${courseType}` : '';
            const subjectCodeQueryParam = SubjectCode ? `SubjectCode=${SubjectCode}` : '';

            // Combine all query parameters
            let queryParams = [weekdayQueryParam, classPeriodsQueryParam, courseTypeQueryParam, subjectCodeQueryParam]
                .filter(param => param) // Remove empty strings
                .join('&');

            if (!queryParams) {
                toast.error('請至少選擇一種搜尋條件', { className: "font-semibold" });
                return;
            }

            const response = await fetch(`/api/search1?${queryParams}`);

            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setSearchResults(data);

                } else {
                    toast.error('未查詢符合資料', { className: "font-semibold" });
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





    return (
        <div className="bg-gray-100 min-h-screen ">
            <Helmet>
                <title>課程查詢系統</title>
            </Helmet>
            <div>
                匯入Excel
                <input type="file" onChange={handleFileUpload} />
                {uploadProgress > 0 && (
                    <div style={{ width: '100%', backgroundColor: '#ddd' }}>
                        <div style={{ height: '10px', width: `${uploadProgress}%`, backgroundColor: 'green' }}></div>
                    </div>
                )}
            </div>
            <div className="flex">
                <div className=" p-6 rounded  w-11/12 mx-auto">
                    <ul className="flex  mb-3 ">
                        <li className="-mb-px mr-1">
                            <a className="bg-white inline-block border-l border-t border-r rounded-t py-1 px-2 text-green-500 font-semibold"
                               href="/"><Icon className="inline mx-2 text-2xl " icon="line-md:cloud-print-outline-loop" />課程查詢系統</a>
                        </li>
                        <li className="mr-1">
                            <a
                                className="bg-gray-100 inline-block py-1 px-2 text-green-500 hover:text-green-800 font-semibold"
                                href="https://system8.ntunhs.edu.tw/myNTUNHS_student/Modules/Main/Index_student.aspx?first=true"
                                target="_blank"
                                rel="noopener noreferrer">e-protfolio 學習歷程<Icon className="inline mx-2 text-2xl "
                                                                                    icon="line-md:person-search-twotone" />
                            </a>
                        </li>
                        <li className="mr-1">
                            <a
                                className="bg-gray-100 inline-block py-1 px-2 text-green-500 hover:text-green-800 font-semibold"
                                href="https://system16.ntunhs.edu.tw/myNTUNHS_coc/Modules/Main/Index_COC.aspx"
                                target="_blank"
                                rel="noopener noreferrer">選課系統</a>
                        </li>
                    </ul>
                    <div className="flex">
                        <h1 className="text-2xl font-bold mb-4">國立臺北護理健康大學 課程查詢系統<Icon
                            className="inline mx-2 text-2xl " icon="line-md:text-box" /></h1>

                        <button type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="ml-auto  hover:bg-red-500/50  border w-32 p-2 rounded-lg font-bold bg-red-300/50 text-gray-700  border-red-600/50 border-2 items-center"><Icon
                            className="inline mx-2 text-2xl " icon="line-md:question-circle" />注意事項</button>
                    </div>


                </div>
            </div>





            <div className="flex bg-white p-6 rounded shadow-md w-11/12 mx-auto ">
                {/* Left Column */}
                <div className="flex flex-col  pr-4">


                    <form className="space-y-4">
                        <div className="w-2/5">
                            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">學期：</label>
                            <select id="semester" className="mt-1 block w-full py-2 px-3 border rounded-md">
                                <option value="112上">112學年度上學期</option>
                                <option value="111下">111學年度下學期</option>
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
                                <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop" /> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop" />}
                            </button>
                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.weekday ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('weekday')}>
                                星期 {isOpen.weekday ? <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop" /> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop" />}
                            </button>
                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.system ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('system')}>
                                學制 {isOpen.system ? <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop" /> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop" />}
                            </button>
                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.period ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('period')}>
                                節次 {isOpen.period ? <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop" /> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop" />}
                            </button>

                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.courseCategory ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('courseCategory')}>
                                課程內容分類 {isOpen.courseCategory ?
                                <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop" /> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop" />}
                            </button>

                            <button
                                className={`m-2 text-white px-4 py-2 rounded ${isOpen.teacherCourse ? 'bg-green-700 hover:bg-green-900' : 'bg-green-500 hover:bg-green-700'}`}
                                type="button" onClick={() => toggleDropdown('teacherCourse')}>
                                教師/課程 {isOpen.teacherCourse ?
                                <Icon className="inline text-2xl mx-1" icon="line-md:upload-loop" /> :
                                <Icon className="inline text-2xl mx-1" icon="line-md:download-loop" />}
                            </button>
                        </div>
                        <div>

                            {isOpen.system && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">學制：</label>

                                    <div className="border rounded-l p-4 grid grid-cols-4 gap-4">

                                        {systems.map(system => (
                                            <label key={system} className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="system" value={system} />
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
                                                    className=" mt-1 block w-full py-2 px-3 border rounded-md">
                                                <option value="">請選擇</option>
                                                <option value="護理系">護理系</option>
                                                <option value="高齡健康照護系">高齡健康照護系</option>
                                            </select>
                                        </div>

                                        <div className="w-3/4 mx-4">
                                            <label htmlFor="grade"
                                                   className="block text-sm font-medium text-gray-700">年級：</label>
                                            <select id="grade" className="mt-1 block w-full py-2 px-3 border rounded-md">
                                                <option value="">請選擇</option>

                                                {grades.map((grade, index) => (

                                                    <option key={index} value={index + 1}>{grade}</option>
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
                                        {courseCategories.map(category => (
                                            <label key={category} className="inline-flex items-center">
                                                <input type="checkbox" className="form-checkbox" name="courseCategory" value={category} />
                                                <span className="ml-2">{category}</span>
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
                                        <label htmlFor="teacher"
                                               className="block text-sm font-medium text-gray-700">教師：</label>
                                        <input type="text" id="teacher"
                                               className="mt-1 block w-full py-2 px-3 border rounded-md"
                                               placeholder="教師代碼"/>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="course"
                                               className="block text-sm font-medium text-gray-700">課程：</label>
                                        <input type="text" id="course"
                                               className="mt-1 block w-full py-2 px-3 border rounded-md"
                                               placeholder="課程代碼"/>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="class"
                                               className="block text-sm font-medium text-gray-700">班級：</label>
                                        <input type="text" id="class"
                                               className="mt-1 block w-full py-2 px-3 border rounded-md"
                                               placeholder="班級名稱"/>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="classroom"
                                               className="block text-sm font-medium text-gray-700">教室：</label>
                                        <input type="text" id="classroom"
                                               className="mt-1 block w-full py-2 px-3 border rounded-md"
                                               placeholder="教室代號"/>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="number"
                                               className="block text-sm font-medium text-gray-700">人數：</label>
                                        <select id="number" className="mt-1 block w-full py-2 px-3 border rounded-md">
                                            <option value="=">=</option>
                                            <option value="<">{"<"}</option>
                                            <option value=">">{">"}</option>
                                            <option value="<">{"<="}</option>
                                            <option value=">=">{">="}</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button type="button" onClick={handleSearch1} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            <Icon className="inline text-2xl mx-1" icon="line-md:search-filled"/>查詢
                        </button>
                        <div className="mt-4">
                            <div className="bg-gray-200/80 p-4 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">多條件查詢</h2>
                                <div className="flex mb-4">
                                    <input
                                        type="text"
                                        placeholder="輸入學年度"
                                        value={Semester}
                                        onChange={(e) => setSemester(e.target.value)}
                                        className="px-2 py-1 mr-4 w-28 rounded-lg border-2 border-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="MainInstructorName"
                                        value={MainInstructorName}
                                        onChange={(e) => setMainInstructorName(e.target.value)}
                                        className="px-2 py-1 mr-4 w-28 rounded-lg border-2 border-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="SubjectCode"
                                        value={SubjectCode}
                                        onChange={(e) => setSubjectCode(e.target.value)}
                                        className="px-2 py-1 mr-4 w-28 rounded-lg border-2 border-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="DepartmentCode"
                                        value={DepartmentCode}
                                        onChange={(e) => setDepartmentCode(e.target.value)}
                                        className="px-2 py-1 mr-4 w-28 rounded-lg border-2 border-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CoreCode"
                                        value={CoreCode}
                                        onChange={(e) => setCoreCode(e.target.value)}
                                        className="px-2 py-1 mr-4 w-28 rounded-lg border-2 border-gray-400"
                                    />
                                    <button type="button" onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                        <Icon className="inline text-2xl mx-1" icon="line-md:search-filled"/>查詢
                                    </button>
                                </div>
                            </div>
                            <div>
                                {/* 這裡顯示查詢結果 */}
                                {searchResults.length > 0 ? (
                                    <table className="min-w-full bg-white border border-gray-300 rounded-lg divide-y divide-gray-300 table-auto">
                                        <thead>
                                        <tr>
                                            {/* 根據您的數據結構調整表頭 */}
                                            <th className="py-2 px-4 border-b border-gray-300">學年度</th>
                                            <th className="py-2 px-4 border-b border-gray-300">教授老師</th>
                                            <th className="py-2 px-4 border-b border-gray-300">課別</th>
                                            <th className="py-2 px-4 border-b border-gray-300">課程名稱</th>
                                            <th className="py-2 px-4 border-b border-gray-300">學分</th>
                                            <th className="py-2 px-4 border-b border-gray-300">教室</th>
                                            <th className="py-2 px-4 border-b border-gray-300">星期</th>
                                            <th className="py-2 px-4 border-b border-gray-300">節次</th>
                                            <th className="py-2 px-4 border-b border-gray-300">系所</th>
                                            <th className="py-2 px-4 border-b border-gray-300">操作</th>


                                        </tr>
                                        </thead>
                                        <tbody>
                                        {searchResults.map((result, index) => (
                                            <tr className="text-center" key={index}>
                                                {/* 根據您的數據結構調整顯示的字段 */}
                                                <td className="py-2 px-4">{result.Semester}</td>
                                                <td className="py-2 px-4">{result.InstructorName}</td>
                                                <td className="py-2 px-4">{result.CourseTypeName}</td>
                                                <td className="py-2 px-4">{result.SubjectNameChinese}</td>
                                                <td className="py-2 px-4">{result.Credits}</td>
                                                <td className="py-2 px-4">{result.Location}</td>
                                                <td className="py-2 px-4">{result.Weekday}</td>
                                                <td className="py-2 px-4">{result.ClassPeriods}</td>
                                                <td className="py-2 px-4">{departmentMapping[result.DepartmentCode] || result.DepartmentCode}</td>
                                                <td className="py-2 px-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSelectCourse(result);
                                                    }} className="text-blue-500 hover:text-blue-800">選擇課程</button>
                                                </td>
                                            </tr>

                                        ))}
                                        </tbody>
                                    </table>


                                ) : (
                                    <p>No results found</p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Column */}
                <div className="w-full flex justify-center mt-4 overflow-x-auto">
                    <section className="w-full flex flex-col items-center mt-4">
                        <header className="text-3xl font-bold text-center mb-4">課表預覽</header>
                        <article className="w-full mx-auto border border-gray-300 rounded-lg overflow-hidden text-center">
                            <header className="flex bg-gray-200">
                                <p className="w-1/4 py-2 px-4 border-r"></p>
                                {daysOfWeek.map((day) => (
                                    <p key={day} className="w-1/4 py-2 px-5 border-r text-center">{day}</p>
                                ))}
                            </header>
                            {timeSlots.map((timeSlot, index) => (
                                <section key={index} className="flex text-center">
                                    <p className="w-1/4 py-2 px-4 border-r text-center">{timeSlot}</p>
                                    {daysOfWeek.map((day) => (
                                        <p key={day} className="w-1/4 py-2 px-4 border-r text-center    ">
                                            <span className="rounded-lg p-2"><p className="bg-amber-100 rounded-lg">{schedule[day][index]}</p></span>
                                        </p>
                                    ))}
                                </section>
                            ))}
                        </article>
                    </section>
                </div>


            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">注意事項<Icon
                        className="inline mx-2 text-2xl " icon="svg-spinners:blocks-shuffle-3" /></h1>

                    <div>

                        <p className="text-lg text-red-600 font-bold mb-4">※本查詢執行速度比舊的快，別用舊系統了 。</p>
                        <p className="text-lg font-bold mb-4">※所有欄位皆提供模糊查詢，請安心使用。</p>
                        <p className="text-lg font-bold mb-4">※選課日程及注意事項等請詳閱教務處網站選課公告</p>
                        <p className="text-lg font-bold mb-4 flex justify-center">&#8203;``【oaicite:0】``&#8203;</p>
                    </div>
                </div>
            </Modal>
        </div>


    );
};

export default Ntunhssu;