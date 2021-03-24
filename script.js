class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question("Quelle est la date du premier mandat de Jean Jaurès comme député de Carmaux ?", ["1891", "1893", "1895", "1901"], "1893"),
    new Question("Quel est le nom du cours d'eau qui traverse Carmaux ?", ["Céret","Céroc", "Cérou", "Céoc"], "Cérou"),
    new Question("Quel est le nom du premier maire ouvrier de Carmaux ?", ["Camboulives","Calmettes", "Malroux", "Calvignac"], "Calvignac"),
    new Question("A quelle date le dernier puits pour l'extraction du charbon par le fond à fermé ?", ["1980","1985", "1987", "1990"], "1987"),
    new Question("Quel était le surnom des mineurs de fond ?", ["Gueule noire","Gueule rouge", "Gueule jaune ", "Gueule blanche"], "Gueule noire")
  ];
  
  console.log(questions);
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  // Regroup all  functions relative to the App Display
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
        <h4>Réponse question 1 : 1893 est la date du premier mandat de Jean Jaurès comme député de Carmaux</h4>
        <h4>Réponse question 2 : Le Cérou est le nom du cours d'eau qui traverse Carmaux</h4>
        <h4>Réponse question 3 : Calvignac était le premier maire ouvrier de Carmaux</h4>
        <h4>Réponse question 4 : En 1987 le dernier puits pour l'extraction du charbon par le fond à fermé </h4>
        <h4>Réponse question 5 : Gueule noire était le nom donné à tous les mineurs</h4>`;
      this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // display choices and handle guess
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices();
      display.progress();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();
  
  console.log(quiz);
  
  