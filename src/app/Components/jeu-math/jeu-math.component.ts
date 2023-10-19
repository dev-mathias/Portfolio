// Je viens d'apprendre qu'utiliser ElementRef était risqué. Il faut les supprimer et s'amuser avec un formGroup

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators  ,ReactiveFormsModule, FormControl, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import * as math from 'mathjs';
import { JeuMathService } from 'src/app/Services/jeuMath.service';
@Component({
  selector: 'app-jeu-math',
  templateUrl: './jeu-math.component.html',
  styleUrls: ['./jeu-math.component.css']
})



export class JeuMathComponent implements OnInit, AfterViewInit {

  @ViewChildren('draggable', { read: ElementRef }) inputElements!: QueryList<ElementRef>;
  @ViewChildren('inputs') expressionElements!:QueryList<ElementRef>;
  draggedElem: HTMLInputElement | null = null;
  somme!:number;
  fullExpression:boolean=false;
  form!:FormGroup;
  opeForm!:FormGroup;
  operateur:string[]=["+","/","x","-"];
  expressions:string[]=[];
  expression:string="";
  showEndGameModal:boolean=false;
  showHelpModal:boolean=false;

  constructor(private elRef: ElementRef, private builder:FormBuilder, private service:JeuMathService, private router:Router) {
    this.form = this.builder.group({
      one: ['', Validators.required],
      two: ['', Validators.required],
      three: ['', Validators.required],
      four: ['', Validators.required],
      five: ['', Validators.required],
      six: ['', Validators.required],
      seven: ['', Validators.required],
      moins:['-'],
      plus:['+'],
      mult:['x'],
      div:['/'],
    });
    // this.opeForm=this.builder.group({
      
    // });
  }
  ngAfterViewInit() {  
    this.inputElements.forEach((inputElementRef: ElementRef) => { // On met des listeners sur les inputs pour les event de drag
      const inputElement = inputElementRef.nativeElement;
      inputElement.addEventListener('dragstart', (e:DragEvent)=>{
        this.draggedElem = e.target as HTMLInputElement;
        this.focusInput(e.target as HTMLInputElement);
      });
      inputElement.addEventListener('dragover',(e:DragEvent)=>{
        e.preventDefault();
      });
      inputElement.addEventListener('drop',(e:DragEvent)=>{
        e.preventDefault();
        const targetControlName = (e.target as HTMLInputElement).getAttribute('formControlName');
        const draggedControlName = (this.draggedElem as HTMLInputElement).getAttribute('formControlName');
        this.swapValues(targetControlName!, draggedControlName!);
      });
      inputElement.addEventListener('dragend',(e:DragEvent)=>{
        e.preventDefault();
        this.noFocusInput();
      });
    });
    this.hideEmptyInputs;
    this.checkInput();
    
    
  }
  ngOnInit(): void {
    this.service.getExpressions().subscribe(data=>{
      this.expressions=data.split("\n");
      this.getRandomExpression();
      this.fillInputWithExpression();
    });
    window.scrollTo(0,0);
    
    
  }
  fillInputWithExpression(){    
    let expressionCharArray=Array.from(this.expression)
    this.form.patchValue({
      one:expressionCharArray[0],
      three:expressionCharArray[1],
      five:expressionCharArray[2],
      seven:expressionCharArray[3]
    });
    
  }
  getRandomExpression(){
    let rdm=Math.floor(Math.random()*(this.expressions.length));
    this.expression=this.expressions[rdm];

  }
  swapValues(targetControlName: string, draggedControlName: string) {
    const targetControl = this.form.get(targetControlName);
    const draggedControl =this.form.get(draggedControlName); 
    if (draggedControl && targetControl) {
      const draggedValue = draggedControl.value;
      const targetValue = targetControl.value;
      if(this.operateur.includes(draggedValue)) // Si le dragged est un opérateur
      {
        if(isNaN(targetValue)|| targetValue=="") // Si le target n'est pas un chiffre
        { 
          let name=this.getControlName(targetControl,this.form);
          if(!["plus","moins","mult","div"].includes(name!)){  // on vérifie si le nom du target fait partie du form, si c'est le cas on fait rien
            targetControl.setValue(draggedValue);
          }
        }              
      }
      else{ // si le dragged est un chiffre
        if(!this.operateur.includes(targetValue) && targetValue!=""){
          targetControl!.setValue(draggedValue);
          draggedControl!.setValue(targetValue);
        }
      }
    }
  }
  getControlName(control: AbstractControl, parentGroup: FormGroup): string | null {
    const controls = parentGroup.controls;
    for (const name in controls) {
      if (controls[name] === control) {
          return name;
      }
    }
    return null;
  }
  noFocusInput(){
    this.expressionElements.forEach(el=>{
      el.nativeElement.classList.remove('highlighted')
    })
  }
  focusInput(input:HTMLInputElement){
    if(!isNaN(Number(input.value))){ // Si c'est un chiffre
      const idsRecherches = ['one', 'three', 'five', 'seven'];
      const inputsToFocus=this.expressionElements.filter(el=>
        idsRecherches.includes(el.nativeElement.id)
      );
      inputsToFocus.forEach(el=>{
        el.nativeElement.classList.add('highlighted');
      })
    }else if (this.operateur.includes(input.value)){
      const idsRecherches=['two','four','six'];
      const inputsToFocus=this.expressionElements.filter(el=>
        idsRecherches.includes(el.nativeElement.id)
      );
      inputsToFocus.forEach(el=>{
        el.nativeElement.classList.remove('hidden');
        el.nativeElement.classList.add('highlighted');
      })
    }
  }
  hideEmptyInputs(){
    const inputsToHide=this.expressionElements.filter(el=> el.nativeElement.value=="");
    inputsToHide.forEach(el=>{
      el.nativeElement.classList.add('hidden');
    })
  }
  checkInput() { // abonnement aux inputs
    this.form.valueChanges.subscribe(values => { // On s'abonne au changement 
      if (Object.values(values).every(value=> value !== null && value !== '' )) {
        this.expressionToNumber();
      }
      else this.fullExpression=false;
    });
  }
  expressionToNumber(){
    this.fullExpression=false;
    const expressionElement=[
      this.form.get("one")!.value,
      this.form.get("two")!.value,
      this.form.get("three")!.value,
      this.form.get("four")!.value,
      this.form.get("five")!.value,
      this.form.get("six")!.value,
      this.form.get("seven")!.value,
    ];
    let stringExpression:string="";
    expressionElement.forEach((element )=>{
      stringExpression+= element;
    });
    stringExpression=stringExpression.replace(/x/g,"*");
    try {
      this.somme=math.evaluate(stringExpression);
      if(this.somme){
        this.fullExpression=true;
        if(this.somme==10){
          setTimeout(() => {
            this.showEndGameModal=true;
          }, 1500);
        }
      } 
      else this.fullExpression=false;
    } catch (e) {
      console.error("Expression invalide");
    }
  }
  openHelpModal(){
    this.showHelpModal=true;
  }
  closeHelpModal(){
    this.showHelpModal=false;
  }
  closeEndModal(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
  newGame(){
    let expressionCharArray=Array.from(this.expression)
    this.form.patchValue({
      one:expressionCharArray[0],
      two:'',
      three:expressionCharArray[1],
      four:'',
      five:expressionCharArray[2],
      six:'',
      seven:expressionCharArray[3]
    });
  }
}


