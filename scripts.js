const container = document.getElementById('container');
const allBots = [];

class bot {
    constructor(botName, botType, assignedTasks, completeTime) {
        this.botName = botName;
        this.botType = botType;
        this.assignedTasks = assignedTasks;
        this.completeTime = completeTime;
    }
}

class task {
    constructor(taskName, eta) {
        this.taskName = taskName;
        this.eta = eta + Math.floor(Math.random() * 500)
    }
}

//Function called after button "Create Bot" is pressed
function getInputValue(){
    const botName = document.getElementById("botName").value;
    const elem = document.getElementById("botTypeSelector");
    const botType = elem.options[elem.selectedIndex].value;

    //Clear name input field
    document.getElementById("botName").value = "";

    //Check if Name for the bot was provided
    if(botName.length === 0){
        alert("Please Provide Name For The Bot");
        return 0;
    }

    //Check if name was already used since i'll be using the names as ID
    for(let i=0; i<allBots.length; i++){
        if(allBots[i].botName === botName){
            alert("Name Already Taken! Please Choose A New Name.");
            return 0;
        }
    }

    //Get the 5 random tasks from the "getTasks()" function
    const assignedTasks = getTasks();

    //Instantiate new bot
    const newBot = new bot(botName, botType, assignedTasks, 0);
    allBots.push(newBot);

    showBot(newBot);
}

//Function responsible for the assignment of 5 random tasks to each bot created
function getTasks(){
    const allTasks = ['do the dishes', 'sweep the house', 'do the laundry', 'take out the recycling', 'make a sammich', 
    'mow the lawn', 'rake the leaves', 'give the dog a bath', 'bake some cookies', 'wash the car'];
    const allETA = [1000, 3000, 10000, 4000, 7000, 20000, 18000, 14500, 8000, 20000]
    let assignedTasks = [];

    //Adds a random task to the list as well as the four tasks that follow.
    const randVal = Math.floor(Math.random() * allTasks.length);
    for(let i=randVal; i<randVal+5; i++){
        let index = i % allTasks.length;
        const newTask = new task(allTasks[index], allETA[index]);
        assignedTasks.push(newTask);
    }
    return assignedTasks;
}

//Function responsible for handling the tasks assigned to each bot
function startTasks(str){

    //Disable activate button after pressing 
    document.getElementById(str).disabled = true;
    document.getElementById("addButton").disabled = true;

    //Display loading animation
    let currID = str + "footer";
    let footer = document.getElementById(currID);
    footer.classList.add("loader");

    //Find which bot was activated
    for(let i=0; i<allBots.length; i++){
        if(allBots[i].botName === str){
            var currentBot = allBots[i];
        }
    }
    var completeTime = 0;
    for(let i=0; i<5; i++){
        let taskTime = currentBot.assignedTasks[i].eta;
        completeTime += taskTime;
        // console.log(currentBot.assignedTasks[i].taskName + " " + taskTime);
        setTimeout(taskDone, completeTime);
        function taskDone(){
            let elemID = currentBot.botName + i;
            let elem = document.getElementById(elemID);
            elem.classList.add("taskDone");
            // console.log("Deleted Task: " + currentBot.assignedTasks[i].taskName);
        }
    }
    currentBot.completeTime = completeTime;
    setTimeout(finished, completeTime);
    function finished(){
        footer.classList.remove("loader");
        const newContent = document.createTextNode("Completed all tasks in " + completeTime/1000 + "s");
        footer.appendChild(newContent);
        document.getElementById("addButton").disabled = false;
        setLeaderBoard(currentBot);
    }
}

//Update leaderboard, runs in O(1) constant time
function setLeaderBoard(currentBot){
    let leader1Name = document.getElementById("leader1Name");
    let leader2Name = document.getElementById("leader2Name");
    let leader3Name = document.getElementById("leader3Name");

    let leader1Time = document.getElementById("leader1Time");
    let leader2Time = document.getElementById("leader2Time");
    let leader3Time = document.getElementById("leader3Time");

    if(leader1Time.innerHTML.length < 1){
        leader1Name.innerHTML = currentBot.botName;
        leader1Time.innerHTML = currentBot.completeTime;
    }
    else if(currentBot.completeTime < parseInt(leader1Time.innerHTML)){
        leader3Name.innerHTML = leader2Name.innerHTML;
        leader3Time.innerHTML = leader2Time.innerHTML;

        leader2Name.innerHTML = leader1Name.innerHTML;
        leader2Time.innerHTML = leader1Time.innerHTML;

        leader1Name.innerHTML = currentBot.botName;
        leader1Time.innerHTML = currentBot.completeTime;
    }

    else if(leader2Time.innerHTML.length < 1){
        leader2Name.innerHTML = currentBot.botName;
        leader2Time.innerHTML = currentBot.completeTime;
    }

    else if(currentBot.completeTime < parseInt(leader2Time.innerHTML)){
        leader3Name.innerHTML = leader2Name.innerHTML;
        leader3Time.innerHTML = leader2Time.innerHTML;

        leader2Name.innerHTML = currentBot.botName;
        leader2Time.innerHTML = currentBot.completeTime;
    }

    else if(leader3Time.innerHTML.length < 1 || currentBot.completeTime < parseInt(leader3Time.innerHTML)){
        leader3Name.innerHTML = currentBot.botName;
        leader3Time.innerHTML = currentBot.completeTime;
    }
}

// Shows the bot with all the information inside a card
function showBot(bot){
    const card = document.createElement('div');
    card.classList = 'card-body';
    // Construct Bot
    const content = `
        <div class="card">
            <img class="card-img-top" src="images/${bot.botType}.png" alt="Card image" style="width:100%">
            <div class="card-body" style="text-align:center;">
                <h4 class="card-title title">${bot.botName}</h4>
                <h6 class="card-title">${bot.botType}</h6>
                <button type="button" class="btn btn-primary cardButton" id="${bot.botName}" onclick="startTasks(this.id);">Activate</button>
                <h5 id="${bot.botName}0" class="task">${bot.assignedTasks[0].taskName}</h5>
                <h5 id="${bot.botName}1" class="task">${bot.assignedTasks[1].taskName}</h5>
                <h5 id="${bot.botName}2" class="task">${bot.assignedTasks[2].taskName}</h5>
                <h5 id="${bot.botName}3" class="task">${bot.assignedTasks[3].taskName}</h5>
                <h5 id="${bot.botName}4" class="task">${bot.assignedTasks[4].taskName}</h5>
                <div id="${bot.botName}footer"></div>
            </div>
        </div>
        `;

    // Append newyly created Bot to the container
    container.innerHTML += content;
}
