const logo = document.querySelector("h1");
const options = document.querySelectorAll("header li");
const isTriangleBtn = document.querySelector("#isTriangle button");
const quizBtn = document.querySelector("#quiz button");
const hypotenuseBtn = document.querySelector("#hypotenuse button");
const areaBtn = document.querySelector("#area button");
const sections = document.querySelectorAll("section");
const isTriangleInput = document.querySelectorAll("#isTriangle input");
const hypotenuseInput = document.querySelectorAll("#hypotenuse input");
const areaInput = document.querySelectorAll("#area input");
const quizInput = document.querySelector("#quiz form");

function displaySection(indx){
    sections.forEach((section,i) => (i == indx)?section.style.display = "flex":section.style.display = "none");
}

function checkTrianglePossibility(){
    let angleSum = 0;

    for(let i = 0; i < isTriangleInput.length; i++){
        let val = parseInt(isTriangleInput[i].value);

        if(isNaN(val)){
            sections[0].lastElementChild.innerHTML = "Please enter all 3 values!";
            return;
        }else if(val <= 0){
            sections[0].lastElementChild.innerHTML = "A triangle can'nt have a angle with negative or 0° value!";
            return;
        }
        angleSum = val + angleSum;
    }

    if(angleSum == 180){
        sections[0].lastElementChild.innerHTML = "Yayy!! Angles form a triangle";
    }else{
        sections[0].lastElementChild.innerHTML = "Oh No!! Angles doesn't form a triangle";
    }
}

function triangleQuiz(){
    let answers = ["90°", "right angled", "equilateral", "scalene", "isosceles"];
    let score = 0, index = 0;

    let formData = new FormData(quizInput);
    let submittedAnswers = formData.values();

    for (let answer of submittedAnswers){
        if (answer === answers[index])
            score++;
        index++;
    }
    sections[1].lastElementChild.innerHTML = "You have scored " + score + "/5";
}

function triangleHypotenuse(){
    let sumOfSquares = 0;
    for(let i = 0; i < hypotenuseInput.length; i++){
        let val = parseInt(hypotenuseInput[i].value);

        if(isNaN(val)){
            sections[2].lastElementChild.innerHTML = "Please enter both values!";
            return;
        }else if(val <= 0){
            sections[2].lastElementChild.innerHTML = "A triangle can'nt have any side with negative or 0 length!";
            return;
        }
        sumOfSquares = val*val + sumOfSquares;
    }

    sections[2].lastElementChild.innerHTML = "The length of hypotenuse is " + Math.sqrt(sumOfSquares).toFixed(2);
}

function triangleArea(){
    let side1 = parseInt(areaInput[0].value), side2 = parseInt(areaInput[1].value), side3 = parseInt(areaInput[2].value);
    
    if(isNaN(side1) || isNaN(side2) || isNaN(side3)){
        sections[3].lastElementChild.innerHTML = "Please enter all 3 values!";
        return;
    }else if(side1 <= 0 || side2 <= 0 || side3 <= 0){
        sections[3].lastElementChild.innerHTML = "A triangle can'nt have any side with negative or 0 length!";
        return;
    }
    
    if(side1 + side2 > side3 && side2 + side3 > side1 && side1 + side3 > side2){
        
        let sideSum = side1 + side2 + side3;
        let s = sideSum/2;
        let area = Math.sqrt(s * (s-side1) * (s-side2) * (s-side3));
        sections[3].lastElementChild.innerHTML = "Area of a triangle using heron's formula is " + area.toFixed(2) + " units."
    }else{
        sections[3].lastElementChild.innerHTML = "Enter valid sides length of the triangle";
    }
}

options.forEach((section, indx) => section.addEventListener("click",() => displaySection(indx)));
logo.addEventListener("click",() => displaySection(0));
isTriangleBtn.addEventListener("click", checkTrianglePossibility);
quizBtn.addEventListener("click", triangleQuiz);
hypotenuseBtn.addEventListener("click", triangleHypotenuse);
areaBtn.addEventListener("click", triangleArea);
logo.click();