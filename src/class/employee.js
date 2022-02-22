const Department = require('./department')
const Role = require('./role')

class Employee extends Role extends Department {
    constructor(firstName, lastName, manager, role, salary, department) {
        super(role, salary, department)
        this.firstName = firstName,
        this.lastName = lastName,
        this.manager = manager
    }
    getFirstName() {
        return this.firstName
    }
    getLastName() {
        return this.lastName
    }
    getManager() {
        return this.manager
    }
}

module.exports = Employee