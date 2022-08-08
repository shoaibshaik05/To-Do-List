const List = require('../models/list');

// to display the task list
module.exports.home = function(req, res)
{
    List.find({}, function(err, list)
    {
        if(err)
        {
            console.log("Error in fetching list from DB.");
            return;
        }
        return res.render('index', 
        {
            title: "TODO App",
            task_list: list
        });
    });
}

// to add task
module.exports.addTask = function(req, res)
{
    List.create(req.body, function(err, task)
    {
        if(err)
        {
            console.log(`Error in adding task ${err}`); 
            return;
        } 

        return res.redirect('back');
    })
}

// to delete tasks
module.exports.deleteTask = function(req, res)
{
    // conditionals because when task_ids has 1 id then it is of type string and when it has multiple ids it is of object (array) type 
    var tasks = req.body.task_ids;
    if(typeof(tasks) == 'string')
    {
        List.findByIdAndRemove(tasks, function(err)
        {
            console.log('Deleted a task');
            return res.redirect('back');
        });
    }
    else
    {
        for(taskid of tasks)
        {
            List.findByIdAndRemove(taskid, function(err){});
        }
        // To print in console that how many tasks have been deleted by use
        console.log(`Deleted ${tasks.length} tasks`);
        return res.redirect('back');
    }
}