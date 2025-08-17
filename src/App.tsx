import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDraftingCompass,
  faBook,
  faClock,
  faTools,
  faGraduationCap,
  faGavel,
  faCompass,
  faMap,
  faMountain,
  faSearch,
  faArrowRight,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import CourseApp from "./components/CourseApp";
import { surveyingCourse } from "./components/courses/surveyingInstruments";
import "./App.css";
import { cartographyCourse } from "./components/courses/cartography";
import { topocourse } from "./components/courses/topoSurvey";
import { engineeringSurveyCourse } from "./components/courses/engineeringsurvey";
import { controlSurveyCourse } from "./components/courses/controlsurvey";
import { cadastralSurveyCourse } from "./components/courses/cadastralsurvey";
import { landLawCourse } from "./components/courses/landlaw1";
import { gisCourse } from "./components/courses/gis";

type Course = {
  id: string;
  title: string;
  description: string;
  modules: number;
  hours: number;
  icon: any;
  gradient: string;
  category: string;
};

const courses: Course[] = [
  {
    id: "survey-instruments",
    title: "Survey Instruments",
    description:
      "Master the use of modern surveying equipment including total stations, GPS receivers, levels, and data collectors. Learn calibration, maintenance, and advanced measurement techniques.",
    modules: 12,
    hours: 24,
    icon: faTools,
    gradient: "linear-gradient(135deg, #3498db, #1a5276)",
    category: "Module One",
  },
  {
    id: "cartography",
    title: "Cartography",
    description:
      "Learn the art and science of map making. Course covers topographic mapping, thematic cartography, symbolization, and digital map production techniques.",
    modules: 10,
    hours: 20,
    icon: faMap,
    gradient: "linear-gradient(135deg, #e74c3c, #922b21)",
    category: "Module One",
  },
  {
    id: "topographical-survey",
    title: "Topographical Survey",
    description:
      "Techniques for mapping natural and man-made features of the land. Learn contouring, feature coding, and digital terrain modeling.",
    modules: 9,
    hours: 22,
    icon: faMountain,
    gradient: "linear-gradient(135deg, #1abc9c, #148f77)",
    category: "Module One",
  },
  {
    id: "engineering-survey-1",
    title: "Engineering Survey 1",
    description:
      "Specialized surveying for construction and engineering projects. Covers setting out, deformation monitoring, and as-built surveys.",
    modules: 8,
    hours: 18,
    icon: faGraduationCap,
    gradient: "linear-gradient(135deg, #f39c12, #b9770e)",
    category: "Module Two",
  },
  {
    id: "control-survey",
    title: "Control Survey",
    description:
      "Establishing precise horizontal and vertical control networks. Covers GPS, triangulation, and traverse methods for high-accuracy positioning.",
    modules: 7,
    hours: 16,
    icon: faDraftingCompass,
    gradient: "linear-gradient(135deg, #e67e22, #af601a)",
    category: "Module Two",
  },
  {
    id: "land-laws-1",
    title: "Land Laws 1",
    description:
      "Understand legal frameworks governing land ownership, boundaries, and surveying practices. Essential for cadastral and boundary surveyors.",
    modules: 6,
    hours: 15,
    icon: faGavel,
    gradient: "linear-gradient(135deg, #9b59b6, #6c3483)",
    category: "Module Three",
  },
  {
    id: "cadastral-survey",
    title: "Cadastral Survey",
    description:
      "Specialized training in property boundary determination, land parcel mapping, and cadastral systems for land registration.",
    modules: 11,
    hours: 25,
    icon: faPenToSquare,
    gradient: "linear-gradient(135deg, #34495e, #2c3e50)",
    category: "Module Three",
  },
  {
    id: "gis",
    title: "GIS",
    description:
      "Comprehensive training in GIS applications for surveying. Spatial analysis, database management, and geospatial technology integration.",
    modules: 14,
    hours: 30,
    icon: faCompass,
    gradient: "linear-gradient(135deg, #2ecc71, #27ae60)",
    category: "Module Four",
  },
];

const categories = [
  "All Courses",
  "Module One",
  "Module Two",
  "Module Three",
  "Module Four",
];

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCourses = courses.filter((course) => {
    const matchCategory =
      activeCategory === "All Courses" || course.category === activeCategory;
    const matchSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="container">
      <header>
        <h1>
          <FontAwesomeIcon icon={faDraftingCompass} /> Surveying Education Hub
        </h1>
        <p className="subtitle">
          Comprehensive courses for surveying professionals and students
        </p>

        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search for courses, topics, or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="stats">
        <div className="stat-item">
          <div className="number">{courses.length}+</div>
          <div>Specialized Courses</div>
        </div>
        <div className="stat-item">
          <div className="number">
            {courses.reduce((sum, course) => sum + course.modules, 0)}+
          </div>
          <div>Learning Modules</div>
        </div>
        <div className="stat-item">
          <div className="number">2,500+</div>
          <div>Students Enrolled</div>
        </div>
        <div className="stat-item">
          <div className="number">15+</div>
          <div>Expert Instructors</div>
        </div>
      </div>

      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course, idx) => (
          <div
            className="course-card"
            key={idx}
            onClick={() => navigate(`/course/${course.id}`, { state: course })}
          >
            <div
              className="course-icon"
              style={{ background: course.gradient }}
            >
              <FontAwesomeIcon icon={course.icon} size="xl" />
            </div>
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span>
                  <FontAwesomeIcon icon={faBook} /> {course.modules} Modules
                </span>
                <span>
                  <FontAwesomeIcon icon={faClock} /> {course.hours} Hours
                </span>
              </div>
              <button className="btn">
                Explore Course <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p>
          Surveying Education Hub &copy; 2023 | Comprehensive Professional
          Training
        </p>
        <p>
          Connect with us: <FontAwesomeIcon icon={faFacebook} />{" "}
          <FontAwesomeIcon icon={faTwitter} />{" "}
          <FontAwesomeIcon icon={faLinkedin} />{" "}
          <FontAwesomeIcon icon={faInstagram} />
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/course/survey-instruments"
          element={<CourseApp course={surveyingCourse} />}
        />
        <Route
          path="/course/cartography"
          element={<CourseApp course={cartographyCourse} />}
        />
        <Route
          path="/course/topographical-survey"
          element={<CourseApp course={topocourse} />}
        />
        <Route
          path="/course/engineering-survey-1"
          element={<CourseApp course={engineeringSurveyCourse} />}
        />
        <Route
          path="/course/control-survey"
          element={<CourseApp course={controlSurveyCourse} />}
        />
        <Route
          path="/course/cadastral-survey"
          element={<CourseApp course={cadastralSurveyCourse} />}
        />
        <Route
          path="/course/land-laws-1"
          element={<CourseApp course={landLawCourse} />}
        />
        <Route path="/course/gis" element={<CourseApp course={gisCourse} />} />
      </Routes>
    </Router>
  );
};

export default App;
