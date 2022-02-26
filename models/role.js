const Department = require('./department');

class Role extends Department {
    constructor(role, salary, department) {
        super(department)
        this.role = role,
        this.salary = salary
    }
    getRole() {
        return this.role
    }
    getSalary() {
        return this.salary
    }
}

module.exports = Role