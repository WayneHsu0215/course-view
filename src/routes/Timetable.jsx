import PropTypes from 'prop-types';


const Timetable = ({ selectedCourses }) => {
    const timetableGrid = {};

    selectedCourses.forEach(course => {
        // 檢查 course.ClassPeriods 是否存在且為非空字符串
        if (typeof course.ClassPeriods === 'string' && course.ClassPeriods.trim() !== '') {
            const periods = course.ClassPeriods.split(',');
            periods.forEach(period => {
                if (!timetableGrid[course.Weekday]) {
                    timetableGrid[course.Weekday] = {};
                }
                timetableGrid[course.Weekday][period] = course.name;
            });
        }
    });

    return (
        <div>
            {Object.keys(timetableGrid).map(Weekday => (
                <div key={Weekday}>
                    <h3>星期 {Weekday}</h3>
                    {Object.keys(timetableGrid[Weekday]).sort().map(ClassPeriods => (
                        <div key={ClassPeriods}>{timetableGrid[Weekday][ClassPeriods]}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

Timetable.propTypes = {
    selectedCourses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        Weekday: PropTypes.string.isRequired,
        ClassPeriods: PropTypes.string,
    })).isRequired,
};

export default Timetable;
