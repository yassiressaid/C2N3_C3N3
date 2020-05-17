

       
// Switch btw Arabic & Francais
            let btn_1 = document.querySelector("#btn_1");
            let preamble = document.querySelector("#preambule");
            let quest1 = document.querySelector("#question_1");
            
          btn_1.addEventListener("click", function () {
           preamble.style.display = "none";
          quest1.style.display = "block";
          document.querySelector(".active1").style.background = "gold";

        });

// questions

/*niv :
   si nv=0 : Facteur pronostique
   si nv=1 : Facteur Symptômes 
 / si nv=2 : Facteurs de gravité mineurs 
 / si nv=3 : Facteurs de gravité majeurs
*/

        (function() {
  var questions = [{
    question: " Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique",
    choices: ["age"],
    type : 1,
    niv : 3,
    
  },{
    question: " Pensez-vous avoir eu de la fièvre ces derniers jours (frissons, sueurs) ?  ",
    choices: [""],
    type :3,
    niv : 1,

  }, {
    question: " quelle est votre température ?",
    choices: ["degrée"],
    type : 1,
    niv : 3,
  },{
    question: "Avez-vous une toux ou une augmentation de votre toux habituelle ces derniers jours ?",
    choices: [""],
    type : 3,
    niv :1,
  },  {
    question: "Avez-vous des douleurs musculaires ou des courbatures inhabituelles ces derniers jours ?",
    choices: [""],
    type : 3,
  }, {
    question: "Avez-vous un mal de gorge apparu ces derniers jours es derniers jours, avez-vous noté une forte diminution ou perte de votre goût ou de votre odorat ?",
    choices: [""],
    type : 3,
  }, {
    question: "Avez-vous de la diarrhée ces dernières 24 heures(au moins 3 selles molles)?",
    choices: [""],
    type : 3,
  }, {
    question: "Avez-vous une fatigue inhabituelle ces derniers jours ?",
    choices: [""],
    type : 3,
  }, {
    question: " cette fatigue vous oblige-t-elle à vous reposer plus de la moitié de la journée ?",
    choices: [""],
    type : 3,
    niv : 2,
  }, {
    question: "Avez-vous des difficultés importantes pour vous alimenter ou boire depuis plus de 24h ?",
    choices: [""],
    type : 3,
    niv : 3,
  }, {
    question: "Avez-vous vu apparaître une gêne respiratoire ou une augmentation de votre gêne respiratoire habituelle ?",
    choices: [""],
    type : 3,
    niv : 3,
  }, {
    question: "Comment vous sentez-vous ?",
    choices: ["Bien","Assez bien","mal","/très mal"],
    type : 2,
  }, {
    question: "Quel est votre poids ? Quelle est votre taille ",
    choices: ["kg" ,"cm"],
    type : 1,
  }, {
    question: "Avez-vous de l’hypertension artérielle ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ?",
    choices: [""],
    type : 3,
  }, {
    question: "Êtes-vous diabétique ?",
    choices: [""],
    type : 3,
  },  {
    question: "Avez-vous ou avez-vous eu un cancer ces trois dernières années ?",
    choices: [""],
    type : 3,
  },  {
    question: "Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?`",
    choices: [""],
    type : 3,
  },  {
    question: "Avez-vous une insuffisance rénale chronique dialysée ?",
    choices: [""],
    type : 3,
  },{
    question: "Avez-vous une maladie chronique du foie ?",
    choices: [""],
    type : 3,
  },{
    question: "Êtes-vous enceinte ?",
    choices: [""],
    type : 3,
  },{
    question: "Avez-vous une maladie connue pour diminuer vos défenses immunitaires?",
    choices: [""],
    type : 3,
  },{
    question: "Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate,ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).?",
    choices: [""],
    type : 3,
  }, ];


  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var FGMJ=0;    //Tracks Facteurs de gravité majeurs  
  var FGMN = 0; //Tracks Facteurs de gravité  mineurs
  var FP = 0; //Tracks  facteur pronostique
  var FS = 0; //Tracks  facteur Symptômes
  var quiz = $('#quiz'); //Quiz div object 

  
  // Display initial question
  displayNext();

 
  
  
  // Click handler for the 'next' button
  $('.btn2_next').on('click', function (e) {
    e.preventDefault();
    

    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    algo();
    
    // If no user selection, progress is stopped
    if ((isNaN(selections[questionCounter])) || ( questions[questionCounter].type=== 1 && selections[questionCounter]=== 0)) {
      alert('Please make a selection!');
    } else {

        if ( (selections[1] === 1) && (questionCounter === 1)  || (selections[7] === 1)&&(questionCounter === 7) ){  
            questionCounter++;
            
          }
        else if  (FGMJ >=1){  
           questionCounter = 21;}

           setTimeout() ;
            questionCounter++;  
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('.btn-return').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    if ( (selections[1] ===1) && (questionCounter === 3 )|| (selections[7] === 1)&&(questionCounter === 9)){  
      questionCounter = 1;
      
    }
  
      else{
        questionCounter--;
      }

      setTimeout()
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    // if(quiz.is(':animated')) {
    //   return false;
    // }
    questionCounter = 0; FGMJ=0; FGMN = 0; FS = 0; PRG=0;
    selections = [];
    setTimeout()
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');

      if(questions[index].type=== 1){
        input = '<input type="number" name="answer" value=' + i + ' />';
        } else if (questions[index].type=== 3){

            questions[index].choices= ["oui", "non"],
            input = '<input type="radio" name="answer" value=' + i + ' />';
        }
        else{
          
            input = '<input type="radio" name="answer" value=' + i + ' />';
        }
        

     
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);

      
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {

if(questions[questionCounter].type=== 1){
        selections[questionCounter] = +$('input[name="answer"]').val();
        } else {
          
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
        }

        console.table(selections);
         console.table(questionCounter);
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
    
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true );
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('.btn-return').show(); 
          $('.consei').hide();
        } else if(questionCounter === 0){
            $('.consei').show();
          $('.btn-return').hide();
          $('.btn2_next').show();
          $('#start').hide();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('.btn2_next').hide();
        $('.btn-return').hide();
        $('#start').show();
        $('.consei').hide();
     
     
      }

      
      


    });
  }

// algo
function algo() {
  
  if ( (selections[0] <=15 ) || (selections[2] <=35 )||  (questions[questionCounter].niv=== 3 && selections[questionCounter] ===0)){  FGMJ++ ; }
 
 
  else if ((questions[questionCounter].niv=== 2 && selections[questionCounter] ===0) || (selections[2] >=39 )){
    FGMN++;
  }
  else if (questions[questionCounter].niv=== 0 && selections[questionCounter] ===0){
    FP++;
  }
  else if (questions[questionCounter].niv=== 1 && selections[questionCounter] ===0){
    FS++;
  }



};

//  progress bar

let progress = document.querySelector('.progress-done');
var PRG ;//Tracks  Progress


function setTimeout()  {
  progress.style.opacity = 1;
  PRG = (100/23)*(questionCounter +2 ); //Tracks  Progress
  document.querySelector(".progress-done").style.width = PRG + '%';

  
}


  //  display  result
  function displayScore() {
    document.querySelector(".active2").style.background = "gold";

    var score = $('<p>',{id: 'question'});
    if (selections[0] <=15){  
      score.append(' Prenez contact avec votre médecin généraliste au moindre doute. Cette application n’est pour l’instant pas adaptée aux personnes de moins de 15 ans. En cas d’urgence, appeler le 15.');
    }

    else if  (FGMJ >=1){ 

      score.append('appel 141');
     
    }

      

      else if  ( ((selections[1] ===0 ) || (selections[3] ===0 )) && ((selections[5] ===0 ) || (selections[3] ===0 )) && ((selections[3] ===0 ) || (selections[4] ===0 ))&& ((selections[1] ===0 ) || (selections[6] ===0 ))   ){ 

       if  (   FP ===0){

        if  ( (FGMN ===0) && (selections[0] <=50 ) ){  
          score.append('  nous vous conseillons de rester à votre domicile et de contacter votre médecin en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouveau l’application pour réévaluer vos symptômes')}
          
          else if (FGMN >=1  ){
            score.append(' téléconsultation ou médecin généraliste ou visite à domicile')}

       }

      else if  (FP >=1){  
           if  (FGMN ===0 ){  
            score.append(' téléconsultation ou médecin généraliste ou visite à domicile')}
            
            else if (FGMN ===1){score.append(' téléconsultation ou médecin généraliste ou visite à domicile')}

            else if (FGMN >1){score.append(' appel 141')};  
      }
     
    }
         
    
    else if  ((selections[1] ===0 ) && (selections[3] ===0 )){ 

      if  ( FP ===0){

        if  ( FGMN <=1 ){  
          score.append('téléconsultation ou médecin généraliste ou visite à domicile')
        }  
       }

       else if  ( FP >=1){

        if  ( FGMN ===0 ){  
          score.append('téléconsultation ou médecin généraliste ou visite à domicile')
        }  
        else if  ( FGMN ===1 ){  
          score.append('téléconsultation ou médecin généraliste ou visite à domicile')
        }  

        else if  ( FGMN >1 ){  
          score.append('appel 141')
        }  


       }
       else if  (FGMJ >=1){ 

        score.append('appel 141');
       
      }
     
    }
    else if  ((selections[1] * selections[3] * selections[5] * selections[4] ===0 )){ 
      if  ( FGMN ===0 ){  
        score.append('Votre situation ne relève probablement pas du Covid-19. Consultez votre médecin au moindre doute')
      } 
      else if  ( FGMN >=1 ){  
        score.append('Votre situation ne relève probablement pas du Covid-19. Un avis médical est recommandé. Au moindre doute, appelez le 141.')
      } 

    }
     
      else if  ( FS ===0 ){
        score.append(' Votre situation ne relève probablement pas du Covid-19. N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation. Pour toute information concernant le Covid-19 allez vers la page d’accueil.');
      }

      else {
        score.append('Restez chez vous au maximum en attendant que les symptômes disparaissent.  Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.');
      }
    
        return score;
    }
  
  
}
)();


       
        ;
       
