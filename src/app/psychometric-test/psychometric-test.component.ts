import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

// Define the Question interface
interface Question {
  questionText: string;
  options: string[];
  selectedOption: string;
}

@Component({
  selector: 'app-psychometric-test',
  templateUrl: './psychometric-test.component.html',
  styleUrls: ['./psychometric-test.component.css']
})
export class PsychometricTestComponent {

  // Create an array of 20 sample questions
  questions: Question[] = Array(20).fill(null).map((_, index) => ({
    questionText: `Sample Question ${index + 1}?`,
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOption: ''
  }));

  currentPage = 1;

  constructor(private messageService: MessageService) { }

  // Get the questions for the current page
  getCurrentPageQuestions(): Question[] {
    const startIndex = (this.currentPage - 1) * 5;
    return this.questions.slice(startIndex, startIndex + 5);
  }

  selectOption(question: Question, option: string) {
    question.selectedOption = option;
  }

  nextPage() {
    const currentPageQuestions = this.getCurrentPageQuestions();
    const allAnswered = currentPageQuestions.every(q => q.selectedOption);

    if (!allAnswered) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Answer all the questions before proceeding!' });
      return;
    }

    if (this.currentPage < 4) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Calculate the percentage of questions answered
  calculateProgressPercentage(): number {
    const answeredQuestions = this.questions.filter(q => q.selectedOption).length;
    return (answeredQuestions / this.questions.length) * 100;
  }
}
