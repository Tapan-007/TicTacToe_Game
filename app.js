// 012, 345, 678, 036, 147, 258, 246, 048
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector(".msg-container");

let turnO = true; //PlayerX, PlayerO
let count = 0; // To track Draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msg.classList.add("hide");
    resetBtn.innerHTML = "Reset";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Only allow placing if the box is empty
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O"; // Player O's turn
                turnO = false;        // Switch turn to Player X
            } else {
                box.innerText = "X"; // Player X's turn
                turnO = true;        // Switch turn to Player O
            }
            box.disabled = true; // Disable the clicked box
            count++;             // Increase move count

            // Check for a winner
            let isWinner = checkWinner(); 

            // If count reaches 9 and no winner, it's a draw
            if (count === 9 && !isWinner) {
                gameDraw();
            }
        }
    });
});


const gameDraw = () => {
    msg.innerHTML = "Game was a Draw.";
    msg.classList.remove("hide")
    disabledBoxes();
    resetBtn.innerHTML = "New Game"
};

const disabledBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (const box of boxes) {
        box.innerHTML = "";
        box.disabled = false;
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `Congratulation, winner is ${winner}`; // Display winner
    msg.classList.remove("hide"); // Show the message container
    disabledBoxes(); // Disable all boxes after the game ends
    resetBtn.innerHTML = "New Game"; // Change Reset button text to "New Game"
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
                return true; // return True when there's a winner
            }
        }
    };
    return false; // return false if no winner
}
resetBtn.addEventListener("click", resetGame);
