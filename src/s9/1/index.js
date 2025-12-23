const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./sequelize");

const Student = require("./models/student");
const University = require("./models/university");
const Course = require("./models/course");

app.use(express.json());

//define entities relationship
University.hasMany(Student);
University.hasMany(Course);
Student.belongsToMany(Course, { through: "enrollements" });
Course.belongsToMany(Student, { through: "enrollements" });

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});

app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  res.status(500).send({ message: "Internal Server Error" });
});

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database createed with the models" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all the universities from the database.
 */
app.get("/universities", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    res.status(200).json(universities);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new university to the database.
 */
app.post("/university", async (req, res, next) => {
  try {
    await University.create(req.body);
    res.status(201).json({ message: "University created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all students.
 */
app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new student into a university.
 */
app.post("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const student = new Student(req.body);
      student.universityId = university.id;
      await student.save();
      res.status(201).json({ message: "Student created!" });
    } else {
      res.status(404).json({ message: "404 - University not found!" });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET all the students from a specific university using include.
 */
app.get("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId, {
      include: [Student],
    });
    if (university) {
      res.status(200).json(university.students);
    } else {
      res.status(200).json({ message: 404 - "University not found!" });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET a student from a specific university using include.
 */
app.get(
  "/universities/:universityId/students/:studentId",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);

      if (!university) {
        return res.status(404).json({ message: "404-University not found" });
      }
      const students = await university.getStudents({
        where: { id: req.params.studentId },
      });

      const student = students.shift();
      if (!student) {
        return res.status(404).json({ message: "404- Student not found" });
      }
      res.status(200).json(student);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PUT in order to update a student from a university.
 */
app.put(
  "/universities/:universityId/students/:studentId",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);
      if (university) {
        const students = await university.getStudents({
          id: req.params.studentId,
        });
        const student = students.shift();
        if (student) {
          student.studentFullName = req.body.fullName;
          student.studentStatus = req.body.status;
          await student.save();
          res.status(202).json({ message: "Student updated!" });
        } else {
          res.status(404).json({ message: "404 Student not found!" });
        }
      } else {
        res.status(404).json({ message: "404 University  not found!" });
      }
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  "/universities/:universityId/students/:studentId",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);
      if (!university) {
        return res.status(404).json({ message: "404 - University not found!" });
      }
      const students = await university.getStudents({
        where: { id: req.params.studentId },
      });
      const student = students.shift();

      if (!student) {
        return res.status(404).json({ message: "404 - Student not found" });
      }

      await student.destroy();

      res.status(200).json({ message: "Student deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/universities/:universityId/courses/:courseId/enrollements/:studentId",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);
      if (university) {
        const courses = await university.getCourses({
          id: req.params.courseId,
        });
        const course = courses.shift();

        if (course) {
          const students = await course.getStudents({ attributes: ["id"] });
          if (students.length > 0) {
            res.status(200).json(students);
          } else {
            res
              .status(204)
              .json({ message: "No students enrolled in this course." });
          }
        } else {
          res.status(404).json({ message: "404 - Course not found!" });
        }
      } else {
        res.status(404).json({ message: "404 - University not found!" });
      }
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  "/universities/:universityId/courses/:courseId/enrollements",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);
      if (university) {
        const courses = await university.getCourses({
          id: req.params.courseId,
        });
        const course = courses.shift();
        const students = await university.getStudents({
          id: req.params.studentId,
        });
        const student = students.shift();

        if (course && student) {
          course.addStudent(student);
          await course.save();
          res.sendStatus(204);
        } else {
          res.status(404);
        }
      } else {
        res.status(404);
      }
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  "/universities/:universityId/courses/:courseId/enrollements",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);
      if (university) {
        const courses = await university.getCourses({
          id: req.params.courseId,
        });
        const course = courses.shift();
        const students = await university.getStudents({
          id: req.params.studentId,
        });
        const student = students.shift();

        if (course && student) {
          course.removeStudent(student);
          await course.save();
          res.sendStatus(204);
        } else {
          res.status(404);
        }
      } else {
        res.status(404);
      }
    } catch (err) {
      next(err);
    }
  }
);
/**
 * GET all courses a student is enrolled in.
 */

app.get(
  "/universities/universityId/students/:studentId/enrollments",
  async (req, res, next) => {
    try {
      const { universityId, studentId } = req.params;

      const university = await University.findByPk(universityId);
      if (!university) {
        return res.status(404).json({ message: "404 - not found" });
      }
      const students = await university.getStudents({
        where: { id: studentId },
      });
      const student = students.shift();

      if (!students) {
        return res.status(404).json({ message: "404 - Student not found" });
      }

      const courses = await student.getCourses();

      if (courses.length === 0) {
        return res
          .status(204)
          .json({ message: "Student is not enrolled in any courses" });
      }
      res.status(200).json(courses);
    } catch (err) {
      next(err);
    }
  }
);

app.post("/", async (req, res, next) => {
  try {
    const registry = {};
    for (let u of request.body) {
      const university = await University.create(u);
      for (let s of u.students) {
        const student = await Student.create(s);
        registry[s.key] = student;
        university.addStudent(student);
      }
      for (let c of u.courses) {
        const courses = await Course.create(c);
        registry[c.key] = course;
        university.addCourse(course);
      }
      for (let e of u.enrollments) {
        registry[e.courseKey].addStudent(registry[e.studentKey]);
        await registry[e.courseKey].save();
      }
      await university.save();
    }
    response.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//export
app.get("/", async (req, res, next) => {
  try {
    const universities = await University.findAll({
      include: [{ model: Student }, { model: Course }],
    });

    const result = [];
    for (const university of universities) {
      const enrollments = [];
      for (const course of university.courses) {
        const students = await course.getStudents({
          attributes: ["id"],
        });
        for (const student of students) {
          enrollments.push({
            studentId: student.id,
            courseId: course.id,
          });
        }
      }

      result.push({
        id: university.id,
        name: university.name,
        students: university.students,
        courses: university.courses,
        enrollments,
      });
    }
  } catch (err) {
    next(err);
  }
});
