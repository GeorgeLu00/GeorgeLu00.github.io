$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Software Engineer", "Fullstack Engineer", "AI/ML Engineer", "Data Scientist"],
        typeSpeed: 80,
        backSpeed: 20,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Software Engineer", "Fullstack Engineer", "AI/ML Engineer", "Data Scientist"],
        typeSpeed: 80,
        backSpeed: 20,
        loop: true
    });
});

var descriptionTextArray = ["Dexter is an desktop application that allows users to customize voice commands and hand gestures to their specific needs. This was a group based project where it had a front end application in electron and backend are the ai models in python. I was responsible for creating and training both the voice command intent classifier (bag of words model) and the hand gesture model classifier (mediapipe hand position data into a feed forward neural network).",
                            "A task management system that implements a kanban board which is a system consisting of boards, lists, and cards. Users will beable to perform crud operations on these objects. I created all the front end pages and implemented the drag and drop functionality. For backend I set up a nodejs express server to handle api calls relating to users and objects in the kanban board.For the database I created the schemea along with creating and maintaing the database. I served this website on a ec2 instance on aws.",
                            "Identifying user's age, gender, and ethnicity is really important in todays age because we could use it to help provide better customer service, survalence, and tracking missing people. Dataset is from the UTK dataset of people's faces.Perform data analysis and created visualise on the variation of different classes in the dataset.I created and trained 3 CNN models each predicting a different task. The models predict age, gender, and ethnicity.",
                            "The dataset is a list of transaction either being fradulent or not. I did some preprocessing such as removing rows that didn't have complete data, dimensionality reduction, one hot encoding categorical features. Then I created some visualise to see if there are any correlation betweenany features and if it was fradulent. I created and trained mutiple machine learning models from scikit learn such as Logistic Regression, KNN, Random Forest, XGBoost, SVM, Naive Bayes, and Adaboost."];
var categoryArray = [ "Artificial Intelligence", "Web Development", "Artificial Intelligence", "Data Science"]
var techUsedTextArray = [
                        [["Frontend","HTML, CSS, Javascript, Electron"],["Backend","Python"],["AI Model","Pytorch"]],
                        [["Frontend","HTML, CSS, Javascript, React, Bootstrap, Jquery"],["Backend","NodeJS, Express"],["Database","MongoDB"],["Web Server","Nginx"],["Hosting","Amazon Web Services"]],
                        [["AI Model","Pytorch"]],
                        [["Data Analysis","Python"],["Machine Learning","Scikit-Learn"],["Data Visualization","Matplotlib"]]
                        ];
var website_links = [
    ["","youtube.com/watch?v=QzbB6AdVfhw&list=PLQD3YRi5R6cP3HPfPmzogLCH4GMz0YRb5&index=1&ab_channel=NickSpeer",""],
    ["","","github.com/GeorgeLuDev/DefinitelyNotTrello"],
    ["","","github.com/GeorgeLuDev/Predicting-Age-Gender-and-Ethnicity"],
    ["","","colab.research.google.com/drive/1yTbhfgLgntSTEReLU3uWe9aYWyy3iNNJ?usp=sharing"]
]
var website_name = ["Website","Video Demo","Code"]
var imageFolderPath = ["dexter","dnt","age","fraud"];
var imageFolderLength = [4,3,4,5];
var activeProject;
var activeImageIndex;
var gallary;

// handle opening model
Array.from(document.getElementsByClassName("projects")[0].getElementsByClassName("text-over-image")).forEach((item,index) => {
    item.addEventListener('click', event =>{
        activeProject = index;
        activeImageIndex = 0;
        const techList = document.getElementById("techList");
        const links = document.getElementById("links");
        techList.innerHTML = "";
        links.innerHTML = "";
        for (var i = 0; i<techUsedTextArray[index].length;i++){
            techList.innerHTML += 
            `<div class="row">
                <div class="category-name">
                    ${techUsedTextArray[index][i][0]}:
                </div>
                <div class="category-list">
                    ${techUsedTextArray[index][i][1]}
                </div>
            </div>`;
        }
        for (var i = 0; i < 3; i++){
            if (website_links[index][i] != ""){
                links.innerHTML += 
                ` 
                    <a class="link" href="https://${website_links[index][i]}" target="_blank">${website_name[i]}</a>
                `
            }
        }
        document.getElementById("descriptionText").innerText = descriptionTextArray[index];
        document.getElementById("myModal").style.display = "block";
    })
});

// handle closing model
[document.getElementById("myModal") , document.getElementById("closeIcon")].forEach(item => {
    item.addEventListener('click', event =>{
        if (event.target.id == "myModal" || event.target.id == "closeIcon"){
            document.getElementById("myModal").style.display = "none";
        }
    })
});

// handle previous image
document.getElementsByClassName("prev")[0].addEventListener('click', event =>{
    activeImageIndex--;
    if (activeImageIndex < 0){
        activeImageIndex = imageFolderLength[activeProject] - 1;
    }
    document.getElementById("gallaryImage").src= "images/project/" + imageFolderPath[activeProject] + "/" + activeImageIndex +".jpg";
    console.log(activeImageIndex);
})

// handle next image
document.getElementsByClassName("next")[0].addEventListener('click', event =>{
    activeImageIndex++;
    if (activeImageIndex >= imageFolderLength[activeProject]){
        activeImageIndex = 0;
    }
    document.getElementById("gallaryImage").src= "images/project/" + imageFolderPath[activeProject] + "/" + activeImageIndex.toString() +".jpg";
    console.log(activeImageIndex);
})

// handle contact email
emailjs.init("user_ciEPm7BoMDiT6ShgA5Ah1");
document.getElementById("emailButtom").addEventListener('click', event =>{
    // console.log(validateEmail(document.getElementById("email").value));

    if (validateEmail(document.getElementById("email").value)){
        var tempParams = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        }
        // console.log(tempParams);
        emailjs.send("service_ajxr96c","template_9fujdxh",tempParams)
        .then(function(res){
            if (res.status == 200){
                document.getElementById("emailSent").style.display = "block";
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("subject").value = "";
                document.getElementById("message").value = "";
            }
        })
    }
    event.preventDefault();
})


function validateEmail(email){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) return true;
    else return false;
}

// Get the container element
var btnContainer = document.getElementById("filterButtons");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn");
var projects = document.getElementById("projects").getElementsByClassName("card");

// Filter Projects based on active class
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("btn active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    active_filter = current[0].innerText;

    for (var j = 0; j<categoryArray.length; j++){
        if (categoryArray[j] == active_filter || active_filter == "All"){
            projects[j].style.display = "block"
        }
        else{
            projects[j].style.display = "none"
        }
    }
  });
}