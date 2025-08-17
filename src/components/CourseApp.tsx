import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./courseApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDraftingCompass,
  faBook,
  faCalendarAlt,
  faTools,
  faGraduationCap,
  faComments,
  faPen,
  faUserCheck,
  faEye,
  faBullseye,
  faBookOpen,
  faClipboardList,
  faCompass,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Course, Lesson } from "../components/types";
import { icon } from "@fortawesome/fontawesome-svg-core";

interface Props {
  course: Course;
}

const CourseApp: React.FC<Props> = ({ course }) => {
  const [activeTab, setActiveTab] = useState<
    "schedule" | "instruments" | "assessment"
  >("schedule");
  const [activeWeek, setActiveWeek] = useState<"all" | number>("all");
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const lessonRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to lesson details when a lesson is set
  useEffect(() => {
    if (lesson && lessonRef.current) {
      lessonRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [lesson]);

  return (
    <div className="container">
      {/* Header */}
      <header>
        <div className="header-title">
          <button className="back-btn" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Courses
          </button>
          <FontAwesomeIcon icon={course.icon} size="2x" color="#1a2a6c" />
          <h1>{course.name}</h1>
        </div>
        <p className="subtitle">{course.description}</p>

        <div className="summary">
          <div className="summary-item">
            <FontAwesomeIcon icon={faBook} size="2xl" />
            <div className="number">{course.stats.classes}</div>
            <div>Classes</div>
          </div>
          <div className="summary-item">
            <FontAwesomeIcon icon={faCalendarAlt} size="2xl" />
            <div className="number">{course.stats.weeks}</div>
            <div>Weeks</div>
          </div>
          <div className="summary-item">
            <FontAwesomeIcon icon={faTools} size="2xl" />
            <div className="number">{course.stats.categories}</div>
            <div>Instrument Categories</div>
          </div>
          <div className="summary-item">
            <FontAwesomeIcon icon={faGraduationCap} size="2xl" />
            <div className="number">{course.stats.exercises}</div>
            <div>Practical Exercises</div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs">
        {["schedule", "instruments", "assessment"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() =>
              setActiveTab(tab as "schedule" | "instruments" | "assessment")
            }
          >
            {tab === "schedule" && "Course Schedule"}
            {tab === "instruments" && "Instruments Overview"}
            {tab === "assessment" && "Assessment Methods"}
          </button>
        ))}
      </div>

      {/* Week Selector */}
      <div className="week-indicator">
        {["all", ...Array.from({ length: course.weeks }, (_, i) => i + 1)].map(
          (week) => (
            <button
              key={week}
              className={`week-btn ${activeWeek === week ? "active" : ""}`}
              onClick={() => setActiveWeek(week as "all" | number)}
            >
              {week === "all" ? "All" : week}
            </button>
          )
        )}
      </div>

      {/* Schedule Table */}
      {activeTab === "schedule" && (
        <div className="schedule">
          <table>
            <thead>
              <tr>
                <th>Week</th>
                <th>Class</th>
                <th>Content</th>
                <th>Assessment</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(course.lessons).map(([id, l], index) => {
                const isFirstOfWeek = index % 2 === 0;
                const weekNumber = Math.ceil((index + 1) / 2);

                return (
                  <tr key={id}>
                    {isFirstOfWeek && (
                      <td className="week-header" rowSpan={2}>
                        Week {weekNumber}
                      </td>
                    )}
                    <td>{l.title}</td>
                    <td>
                      <strong>{l.title1}</strong>
                      <div>{l.content[0]}</div>

                      {l.type === "theory" ? (
                        <span className="class-type theory">Theory</span>
                      ) : l.type === "practical" ? (
                        <span className="class-type practical">Practical</span>
                      ) : l.type === "assessment" ? (
                        <span className="class-type assessment">
                          Assessment
                        </span>
                      ) : null}
                    </td>

                    <td>
                      {l.assessments.map((assess, i) => (
                        <div className="method" key={i}>
                          <FontAwesomeIcon icon={assess.icon} /> {assess.label}
                        </div>
                      ))}
                    </td>
                    <td>
                      <button
                        className="details-btn"
                        onClick={() => setLesson(l)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Lesson Details */}
      {lesson && (
        <div className="lesson-details active" ref={lessonRef}>
          <div className="lesson-header">
            <h2>{lesson.title1}</h2>
            <button className="close-btn" onClick={() => setLesson(null)}>
              &times;
            </button>
          </div>
          <div className="content-grid">
            <div className="content-card">
              <h3>
                <FontAwesomeIcon icon={faBullseye} /> Learning Objectives
              </h3>
              <ul>
                {lesson.objectives.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
            <div className="content-card">
              <h3>
                <FontAwesomeIcon icon={faBookOpen} /> Content Covered
              </h3>
              <ul>
                {lesson.content.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="content-card">
              <h3>
                <FontAwesomeIcon icon={faTools} /> Practical Activities
              </h3>
              <p>{lesson.practical}</p>
            </div>
            <div className="content-card">
              <h3>
                <FontAwesomeIcon icon={faClipboardList} /> Assessment
              </h3>
              {lesson.assessments && lesson.assessments.length > 0 ? (
                lesson.assessments.map((assess, i) => (
                  <div
                    className="method inline-method"
                    key={i}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <FontAwesomeIcon icon={assess.icon} /> {assess.label}
                  </div>
                ))
              ) : (
                <p>No assessments available</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <p>{course.name} © 2025 | Professional Training</p>
        <p>{course.description}</p>
      </footer>
    </div>
  );
};

export default CourseApp;
