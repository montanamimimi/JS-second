'use strict';

// размеры и другие опции 

class Option {
    constructor(caloric, price) {
        this.caloric = caloric;
        this.price = price;
    }
}

// В нормальном проекте конечно данные откуда-то подтягиваются 

const sizes = [];

sizes.push(new Option(20, 50));
sizes.push(new Option(40, 100));

const fillings = [];

fillings.push(new Option(20, 10));
fillings.push(new Option(5, 20));
fillings.push(new Option(10, 15));

const pepper = new Option(0, 15);
const mayones = new Option(5, 20);

// Класс для бургера

class Hamburger {
    constructor(){
        this.size = null;
        this.filling = null;
        this.pepper = null;
        this.mayones = null;
    }

    chooseSize(size) {
        this.size = size;
    }
    chooseFilling(filling) {
        this.filling = filling;
    }

    addPepper() {
        this.pepper = 1;
    }

    addMayones() {
        this.mayones = 1;
    }

    calculate() {
        let totalPrice = 0;
        let totalCalories = 0;
        
        if (this.size) {
            totalPrice += sizes[this.size].price;
            totalCalories += sizes[this.size].caloric;
        }     

        if (this.filling) {
            totalPrice += fillings[this.filling].price;
            totalCalories += fillings[this.filling].caloric;
        }

        if (this.pepper) {
            totalPrice += pepper.price;
            totalCalories += pepper.caloric;
        }
        if (this.mayones) {
            totalPrice += mayones.price;
            totalCalories += mayones.caloric;
        }

        return `Total burger prise is $${totalPrice} and you will be fatter for ${totalCalories} calories`;
    }
}

// создаем пустой бургер 

const myBurger = new Hamburger(); 

// Ссылка на текст в корзине

let basket = document.querySelector('.basket').querySelector('h3');

// обрабатываем событие клика по бургеру 

let burgersDiv = document.querySelector('.burgers');
let burgers = document.querySelectorAll('.burger');

burgers.forEach(function(burger){
    burger.addEventListener('click', chooseBurger);
})

function chooseBurger(){
    burgersDiv.innerHTML = "";
    burgersDiv.appendChild(event.currentTarget);
    myBurger.chooseSize(event.currentTarget.dataset.size);
    basket.innerText = myBurger.calculate();
}

// обрабатываем событие клика по начинке 

let stuffingsDiv = document.querySelector('.fillings');
let stuffings = document.querySelectorAll('.filling');

stuffings.forEach(function(stuf){
    stuf.addEventListener('click', chooseFilling);
})

function chooseFilling(){
    stuffingsDiv.innerHTML = "";
    stuffingsDiv.appendChild(event.currentTarget);
    myBurger.chooseFilling(event.currentTarget.dataset.filling);
    basket.innerText = myBurger.calculate();
}

// добавляем ништяки

let mazik = document.querySelector('.mayones');

mazik.addEventListener('click', addMazik);

function addMazik() {
    let clicked = event.currentTarget;
    clicked.querySelector('.addon').classList.add("checked");    
    clicked.querySelector('.plus').style.display = "none";
    myBurger.addMayones();
    basket.innerText = myBurger.calculate();
}

let spicy = document.querySelector('.pepper');

spicy.addEventListener('click', addSpicy);

function addSpicy() {
    let clicked = event.currentTarget;
    clicked.querySelector('.addon').classList.add("checked");    
    clicked.querySelector('.plus').style.display = "none";
    myBurger.addPepper();
    basket.innerText = myBurger.calculate();
}


