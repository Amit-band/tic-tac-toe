let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");
var countbox = 0;
let turnO = true; //frist turn of player 0
let winpattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetgame = () =>{
    turnO = true;
    countbox = 0;
    enableboxes();
}
boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText = "O";
            turnO = false;
            countbox++
        }else{
            box.innerText = "X";
            turnO = true
            countbox++
        }
        box.disabled = true
        checkWinner()
    })
});

const disableboxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableboxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        msgcontainer.classList.add("hide")
    }
}

const showWninner = (winner)=>{
    msg.innerText =`🎉Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide")
    disableboxes()
}

const checkWinner = ()=>{
    let winnerfouund = false;
    for(pattern of winpattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val !="" && pos2val!="" && pos3val!=""){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("winner", pos1val)
                showWninner(pos1val);
                winnerfouund = true;
            }
        }
        }
        if(!winnerfouund && countbox == 9){
            msg.innerText = " 😐 Game Draw, Please Reset"
            msgcontainer.classList.remove("hide")
            disableboxes()
        }
    };

newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);


const modeBtn = document.querySelector("#mode-toggle");

// Load saved theme from localStorage
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    modeBtn.innerText = "☀️ Light Mode";
}

modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save theme in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        modeBtn.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        modeBtn.innerText = "🌙 Dark Mode";
    }
});

