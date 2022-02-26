SELECT employee.*
FROM employee
    inner join employee manager on employee.manager_id = manager.id
    