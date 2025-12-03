const Employee = require("../models/employee");
const { Op } = require("sequelize");

const router = require("express").Router();

// Get all employees
router
  .route("/employees")

  .get(async (req, res) => {
    const { simplified, sortBy, direction } = req.query;
    try {
      const { minSalary, name } = req.query;
      const whereClause = {};

      if (minSalary) {
        whereClause.salary = { [Op.gt]: minSalary };
      }

      if (name) {
        whereClause[Op.or] = [
          { firstName: { [Op.like]: `%${name}%` } },
          { lastName: { [Op.like]: `%${name}%` } },
        ];
      }

      //sorting
      const orderClause = sortBy ? [[sortBy, direction || "ASC"]] : undefined;

      const employees = await Employee.findAll({
        // where: minSalary ? { salary: { [Op.gt]: minSalary } } : undefined,
        //attributes: ['firstName', 'lastName']
        //attributes: simplified ? { exclude: "id" } : undefined,
        where: Object.keys(whereClause).length ? whereClause : undefined,
        order: orderClause,
      });
      return res.status(200).json(employees);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      const newEmployee = await Employee.create(req.body);
      return res.status(200).json(newEmployee);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

router
  .route("/employees/:id")
  .get(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        return res.status(200).json(employee);
      } else {
        return res.status(404).json({
          message: "Employee with id " + req.params.id + " not found",
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .put(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        return res.status(200).json(await employee.update(req.body));
      } else {
        return res.status(404).json({
          message: "Employee with id " + req.params.id + " not found",
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await employee.destroy();
        return res
          .status(200)
          .json({ message: "Employee with id " + req.params.id + " deleted" });
      } else {
        return res.status(404).json({
          message: "Employee with id " + req.params.id + " not found",
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });
