let awnserBox = document.querySelector(".question-awnser-box");
const fetchData = async (URL) =>{
    let response = await fetch(URL);
    let json = await response.json();
    return json;
}

let getChar = async() =>{ 
    //get gropdowns
    let drop1 = document.querySelector("select[name='drop1']");
    let drop2 = document.querySelector("select[name='drop2']");
    
    let person1 = await fetchData(`https://swapi.dev/api/people/${drop1.value[0]}/`);
    let person2 = await fetchData(`https://swapi.dev/api/people/${drop2.value[0]}/`);
    
    let purl1 = drop1.value.slice(1);
    let purl2 = drop2.value.slice(1);
   let character1 = new Character(person1.name, person1.gender, person1.height, person1.mass, person1.hair_color, purl1)
   let character2 = new Character(person2.name, person2.gender, person2.height, person2.mass, person2.hair_color, purl2)

    if(character1.hair_color ==="n/a"){character1.hair_color = "none"}
   if(character2.hair_color ==="n/a"){character2.hair_color = "none"}
    if(character1.gender ==="n/a"){character1.gender = "none"}
   if(character2.gender==="n/a"){character2.gender = "none"}

    //PRINT CHARACTER1 TO DOM
   let p1 = document.createElement("p");
   p1.innerHTML = `<h2>${character1.name}</h2> <br>
        <img src="${character1.pictureUrl}" alt="${character1.name}" class="character-pic"> <br>
        <div class="btn-div">
        <button class="character1-btn" id="weight${character1.name}">check weight</button>    <button class="character1-btn" id="height${character1.name}">check height</button> <br>
        <button class="character1-btn" id="hair${character1.name}">check hair</button>    <button class="character1-btn" id="gender${character1.name}">check gender</button>
        </div>
        <div id="charText1" class="char-text"></div>
        `
    //PRINT CHARACTER2 TO DOM
   let p2 = document.createElement("p");
   p2.innerHTML = `<h2>${character2.name}</h2> <br>
        <img src="${character2.pictureUrl}" alt="${character2.name}" class="character-pic"> <br>
        <div class="btn-div">
        <button class="character2-btn" id="weight2${character2.name}">check weight</button>    <button class="character2-btn" id="height2${character2.name}">check height</button> <br>
        <button class="character2-btn" id="hair2${character2.name}">check hair</button>    <button class="character2-btn" id="gender2${character2.name}">check gender</button>
        </div>
        <div id="charText2" class="char-text"></div>
        `
    let charDiv1 = document.getElementById("charDiv1")
    let charDiv2 = document.getElementById("charDiv2")
    //create parent div and append each div with character in them
    document.getElementById("characterCointainer").append(charDiv1, charDiv2)
    charDiv1.classList.add("charDiv");
    charDiv2.classList.add("charDiv");
    charDiv1.innerHTML = p1.innerHTML;
    charDiv2.innerHTML = p2.innerHTML;

    let charText1 = document.querySelector("#charText1")
    let charText2 = document.querySelector("#charText2")

  document.querySelectorAll(".character1-btn").forEach(b => {
      b.addEventListener("click", (e) => {
        if(e.target.id === `weight${character1.name}`){
            character1.compareWeight(character2, character1, charText1)
        }
        else if(e.target.id === `height${character1.name}`){
            character1.compareHeight(character2, character1, charText1)
        }
        else if(e.target.id === `hair${character1.name}`){
            character1.compareHair(character2, character1, charText1)
        }
        else if(e.target.id === `gender${character1.name}`){
            character1.compareGender(character2, character1, charText1)
        }     
    })
  });
  document.querySelectorAll(".character2-btn").forEach(b => {
      b.addEventListener("click", (e) => {
        if(e.target.id === `weight2${character2.name}`){
            character2.compareWeight(character1, character2, charText2)
        }
        else if(e.target.id === `height2${character2.name}`){
            character2.compareHeight(character1, character2, charText2)
        }
        else if(e.target.id === `hair2${character2.name}`){
            character2.compareHair(character1, character2, charText2)
        }
        else if(e.target.id === `gender2${character2.name}`){
            character2.compareGender(character1, character2, charText2)
        }   
    })
  });
} 


class Character{
    constructor(name, gender, height, mass, hair_color, pictureUrl){
        this.name = name;
        this.gender = gender;
        this.height = +height;
        this.mass = +mass;
        this.hair_color = hair_color;
        this.pictureUrl = pictureUrl;
    }
    compareWeight = (otherCharacter, thisCharacter, textHolder) =>{
        let weightDifference = otherCharacter.mass - thisCharacter.mass;
         let weight = weightDifference.toString()
        if(otherCharacter.mass > thisCharacter.mass){textHolder.innerHTML = `<p>${otherCharacter.name} weights ${otherCharacter.mass}kg, that is ${weightDifference}kg more than me</p>`}
        else if(otherCharacter.mass < thisCharacter.mass){textHolder.innerHTML = `<p>${otherCharacter.name} weights ${otherCharacter.mass}kg, that is ${weightDifference < 0 ? weight.slice(1) : weightDifference}kg less than me</p>`}
         else{textHolder.innerHTML = `<p>we the same weight! ${thisCharacter.mass}kg</p>`}
    }

    compareHeight = (otherCharacter, thisCharacter, textHolder) =>{
        let heightDifference = otherCharacter.height - thisCharacter.height;
         let height = heightDifference.toString()
        if(otherCharacter.height > thisCharacter.height){textHolder.innerHTML = `<p>${otherCharacter.name} is ${otherCharacter.height}cm tall, that is ${heightDifference}cm more than me</p>`}
        else if(otherCharacter.height < thisCharacter.height){textHolder.innerHTML = `<p>${otherCharacter.name} is ${otherCharacter.height}cm tall, that is ${heightDifference < 0 ? height.slice(1) : heightDifference}cm less than me</p>`}
         else{textHolder.innerHTML = `<p>we the same height! ${thisCharacter.height}cm</p>`}
    } 

    compareHair = (otherCharacter, thisCharacter, textHolder) =>{
        if(otherCharacter.hair_color === "none" && thisCharacter.hair_color === "none"){textHolder.innerHTML = `<p>${otherCharacter.name} has no hair, that is same as me</p>`}
        else if(otherCharacter.hair_color === "none"){textHolder.innerHTML = `<p>i have ${thisCharacter.hair_color} hair and ${otherCharacter.name} does not have any.</p>`}
       else if(otherCharacter.hair_color === thisCharacter.hair_color){textHolder.innerHTML = `<p>${otherCharacter.name} hair is ${otherCharacter.hair_color}, that is same as me</p>`}
         else{textHolder.innerHTML = `<p>${otherCharacter.name}s hair is ${otherCharacter.hair_color}, that is not same as my hair, wihch is ${thisCharacter.hair_color}</p>`}
    }

    compareGender = (otherCharacter, thisCharacter, textHolder) =>{
        if(otherCharacter.gender === "none" && thisCharacter.gender === "none"){textHolder.innerHTML = `<p>${otherCharacter.name} has no gender, that is same as me</p>`}
        else if(otherCharacter.gender === "none"){textHolder.innerHTML = `<p>i am a ${thisCharacter.gender} and ${otherCharacter.name} does not have any gender.</p>`}
       else if(otherCharacter.gender === thisCharacter.gender){textHolder.innerHTML = `<p>${otherCharacter.name} is a ${otherCharacter.gender}, that is same as me</p>`}
         else{textHolder.innerHTML = `<p>${otherCharacter.name}s gender is ${otherCharacter.gender}, that is not same as my gender, wihch is ${thisCharacter.gender}</p>`}
    } 
} 