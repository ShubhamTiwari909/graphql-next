const fakeData = [
    {
        id: 101,
        name: "Utsav",
        age: 24,
        isEmployee: true,
        role: "WebDeveloper",
        friends: [
            {
                id: 102,
                name: "User 2",
                age: 21,
                isEmployee: true,
                role: "Tester"
            },
            {
                id: 103,
                name: "User 3",
                age: 20,
                isEmployee: false,
                role: "SoftwareEngineer"
            },
            {
                id: 104,
                name: "User 4",
                age: 27,
                isEmployee: true,
                role: "WebDeveloper"
            }
        ]
    },
    {
        id: 102,
        name: "Robinn",
        age: 21,
        isEmployee: true,
        role: "Tester",
        friends: [
            {
                id: 103,
                name: "User 3",
                age: 20,
                isEmployee: false,
                role: "SoftwareEngineer"
            },
            {
                id: 104,
                name: "User 4",
                age: 27,
                isEmployee: true,
                role: "WebDeveloper"
            }
        ]
    },
    {
        id: 103,
        name: "Jamin",
        age: 20,
        isEmployee: false,
        role: "SoftwareEngineer",
        friends: [
            {
                id: 104,
                name: "User 4",
                age: 27,
                isEmployee: true,
                role: "WebDeveloper"
            }
        ]
    },
    {
        id: 104,
        name: "Mukesh",
        age: 27,
        isEmployee: true,
        role: "WebDeveloper",
        friends: [
            {
                id: 103,
                name: "User 3",
                age: 20,
                isEmployee: false,
                role: "SoftwareEngineer"
            }
        ]
    },
    {
        id: 105,
        name: "Shubham",
        age: 27,
        isEmployee: true,
        role: "WebDeveloper",
        friends: [
            {
                id: 104,
                name: "User 4",
                age: 22,
                isEmployee: false,
                role: "SoftwareEngineer"
            },
            {
                id: 102,
                name: "User 2",
                age: 22,
                isEmployee: true,
                role: "SoftwareEngineer"
            }
        ]
    }
];



const skills = [
    {
        id: 101,
        type:"FrondEnd",
        languages:["HTML","CSS","JavaScript","React","NEXT JS","SASS","TailwindCSS"]
    },
    {
        id: 102,
        type:"BackEnd",
        languages:["NodeJS","ExpressJS","JavaScript","MongoDB","MySQL","GraphQL","Firebase"]
    },
    {
        id: 103,
        type:"FullStack",
        languages:["HTML","CSS","JavaScript","React","NEXT JS","SASS","TailwindCSS",
        "NodeJS","ExpressJS","JavaScript","MongoDB","MySQL","GraphQL","Firebase"]
    }
]


module.exports = { fakeData,skills }