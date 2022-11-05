export class TodoItem{
    
    task: string;
    complete: boolean;

    constructor(taskVal: string, completeVal: boolean = false){
        this.task = taskVal;
        this.complete = completeVal;
    }
  

}