const APIlesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLesson(data));
}
APIlesson()

const displayLesson=(lessons)=>{
    console.log(lessons.data)
      let lessonContainer = document.getElementById("learn-container");
      lessonContainer.innerHTML=" "
    for (const lesson of lessons.data) {
        
          let lessonCard = document.createElement("div");
          lessonCard.innerHTML=`
          <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no} </button> 
         `
        lessonContainer.append(lessonCard);
    }

  
}