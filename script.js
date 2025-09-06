let displaySynonym =(arr)=>{
    let synonymall = arr.map(el=>
       ` <span class="btn bg-[#1A91FF]/15">${el}</span>`);

        return synonymall.join(" ");

}
const APIlesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLesson(data));
}
APIlesson()

let wordDetail= (id)=>{
    let url= `https://openapi.programming-hero.com/api/word/${id}`
    console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayWordDetail(data.data));
}

let displayWordDetail=(details)=>{
    let detailsContainer= document.getElementById("details-container");
    detailsContainer.innerHTML=`
       <div class="details-card p-6">
            <h2 class="font-semibold text-4xl">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:<span class="hind-siliguri-regular"> ${details.pronunciation} </span>)</h2>
            <div class="meaning mt-8">
            <p class="font-semibold text-2xl">Meaning</p>
            <p class="hind-siliguri-regular font-medium text-2xl mt-2">${details.meaning}</p>
            </div>
            <div class="example my-8">
            <p class="font-semibold text-2xl">Example</p>
            <p class="text-2xl mt-2">${details.sentence}</p>
            </div>
            <p class="hind-siliguri-regular font-medium text-2xl mb-3">সমার্থক শব্দ গুলো</p>
            <div class="text-2xl flex justify-start gap-5 mb-6"> 
                   ${ displaySynonym(details.synonyms) } </div>
        </div>
    `
    document.getElementById("my_modal_5").showModal()
   
}

let lessonWord = (id)=>{
    let url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let lessonBtn =document.getElementById(`lesson-btn-${id}`);
        lessonRemove();
        lessonBtn.classList.add("active");
        console.log(lessonBtn);
        lessoncard(data.data);
        
    } );
}
let lessonRemove = ()=>{
    let removeBtn= document.querySelectorAll(".lesson-btn");
    removeBtn.forEach(rem => {
        rem.classList.remove("active");
    });
}

let lessoncard = (words)=>{
    let LessonCardContainer = document.getElementById("Lessoncard-container")
    LessonCardContainer.innerHTML=" ";
    if(words.length == 0){
        LessonCardContainer.innerHTML=`
        <div class="selectLesson-container text-center col-span-full py-10">
               <div class="flex justify-center mb-5">
               <img src="./assets/alert-error.png" alt="" >
                </div>
        
                <p class="text-[#79716B] hind-siliguri-regular text-sm mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                
                <h2 class="font-medium text-3xl text-[#292524] hind-siliguri-regular">নেক্সট Lesson এ যান</h2>
              </div>
        `
        return;
    }

    words.forEach(word=> {
        let cardDiv= document.createElement("div");
        cardDiv.innerHTML=`
        <div class=" bg-white rounded-xl text-center p-10">
            <h2 class="font-bold text-3xl">${word.word? word.word:"word is not found"}</h2>
            <p class="text-xl font-medium my-6">Meaning /Pronounciation</p>
            <p class="hind-siliguri-regular font-semibold text-3xl text-[#18181B]">${word.meaning?word.meaning:"meaning is not found"} / ${word.pronunciation?word.pronunciation:"pronunciation is not found"}</p>
            <div class="icon flex justify-between mt-5">

                   <button onclick="wordDetail(${word.id})" class="btn bg-[#1A91FF]/10">
                    <i class="fa-solid fa-circle-info"></i>
                     </button>

                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF]/10">
                    <i class="fa-solid fa-volume-low"></i>
                     </button>
            </div>
          </div>
        `
        LessonCardContainer.append(cardDiv);
    });
}

const displayLesson=(lessons)=>{
      let lessonContainer = document.getElementById("learn-container");
      lessonContainer.innerHTML=" ";
    for (const lesson of lessons.data) {
        
          let lessonCard = document.createElement("div");
          lessonCard.innerHTML=`
          <button id="lesson-btn-${lesson.level_no}" onclick="lessonWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no} </button> 
         `
        lessonContainer.append(lessonCard);
    }

  
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

document.getElementById("search-btn").addEventListener("click",function(){
     let input = document.getElementById("search-input");
     let inputvalue = input.value.trim().toLowerCase();
     input.value=" ";
     fetch("https://openapi.programming-hero.com/api/words/all")
     .then(res => res.json())
     .then(data=>{
        let allWords=data.data
        let filterWords=allWords.filter(word => word.word.toLowerCase().includes(inputvalue )
        )
        lessoncard(filterWords);
         lessonRemove();
    });

     
})