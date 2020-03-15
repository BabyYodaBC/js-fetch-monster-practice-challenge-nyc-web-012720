let page = 1
document.addEventListener("DOMContentLoaded", function() {
    fetchMonsters(page)
    addMonster()
    pageButtons(page)
})

function fetchMonsters(page) {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(json => renderMonsters(json))
    
}
function renderMonsters(json) {
    const monsterCon = document.getElementById("monster-container")
    json.forEach(monster => {
        const monsterDiv = document.createElement("div")
        monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
        `
        monsterCon.appendChild(monsterDiv)
    })
}

function addMonster() {
    const createContainer = document.getElementById("create-monster")
    const newMonsterForm = document.createElement("form")
    newMonsterForm.className = "new-monster"
    newMonsterForm.innerHTML += `
    <input type="text" name="name" placeholder="Mike Wazowski"/>
    <input type="number" name="age" placeholder="30"/>
    <input type="text" name="description" placeholder="Always watching you"/>
    <input type="submit" value="Create"/>
    `
    newMonsterForm.addEventListener("submit", function(event){
        event.preventDefault()
        let userInput = document.getElementsByClassName("new-monster")[0]
        fetch(`http://localhost:3000/monsters`,
        {
            method: "POST",
            headers: 
                {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
            body: JSON.stringify({
                    "name": `${userInput[0].value}`,
                    "age": `${userInput[1].value}`,
                    "description": `${userInput[2].value}`,
                    })       
        })
        newMonsterForm.reset()     
    })
    createContainer.appendChild(newMonsterForm)
    
}

function pageButtons(page) {
    const monsterCon = document.getElementById("monster-container")
    const back = document.getElementById("back")
    const forward = document.getElementById("forward")

    back.addEventListener("click", function(event) {
        if (page < 1){
            alert("not today buster")
            page = 1
        }
        monsterCon.innerHTML = ""
        page --
        fetchMonsters(page)
    })
    forward.addEventListener("click", function(event) {
        monsterCon.innerHTML = ""
        page ++
        fetchMonsters(page)
    })
}


    


