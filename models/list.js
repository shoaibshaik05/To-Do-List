const mongoose = require('mongoose');

const listSchema = new mongoose.Schema
({
    description:
    {
        type: String,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },
    dueDate:
    {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const List = mongoose.model('List', listSchema);

// The function below is just for the display purpose of the project.
// If the collection is empty in the database when the server is being started then it will add 5 dummy tasks (documents).
List.countDocuments({}, function (err, count) 
{
    if(count == 0)
    {
        const arr = [
                        { 
                            description: 'Task 1',
                            category: 'PERSONAL',
                            dueDate: '2020-12-01'

                        },
                        { 
                            description: 'Task 2',
                            category: 'WORK',
                            dueDate: '2020-12-02'

                        },
                        { 
                            description: 'Task 3',
                            category: 'SCHOOL',
                            dueDate: '2020-12-03'

                        },
                        { 
                            description: 'Task 4',
                            category: 'CLEANING',
                            dueDate: '2020-12-04'

                        },
                        { 
                            description: 'Task 5',
                            category: 'OTHER',
                            dueDate: '2020-12-05'

                        }
                    ];
            List.insertMany(arr, function(err, docs) {});
    }
});

module.exports = List;