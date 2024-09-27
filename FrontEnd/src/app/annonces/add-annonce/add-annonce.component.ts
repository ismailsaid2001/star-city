import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AnnoncesService } from '../annonces.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Annonce } from '../annonces.interface';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent {

  isAddForm!: boolean
  addAnnonceForm!: FormGroup;
  updateAnnonceData!: Annonce; 
  optionsCategories = [ 
    { value: 'covoiturage', label: 'Covoiturage' },
    { value: 'service', label: 'Service' },
    { value: 'vente', label: 'Vente' },
    { value: 'autre', label: 'Autre' },
  ];
  selectedOption!: string 
  userId!: number

  constructor(  
    private msg: NzMessageService,
    private annonceService: AnnoncesService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
    ) {
    
    }

  ngOnInit(): void {
    this.isAddForm = this.router.url.includes('add') 
    const token: string | null = this.authService.getToken()
    if(token) {this.userId = this.authService.decodeToken(token).id}
    if(this.isAddForm) { 
      this.addAnnonceForm = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        categorie: ['', [Validators.required]],
        date: [null],
        image: [null],
        user: [this.userId] 
      });
    } else { 
      this.updateAnnonceData = this.annonceService.annonceToUpdate
      this.selectedOption = this.annonceService.annonceToUpdate.categorie
  
      this.addAnnonceForm = this.fb.group({
        title: [this.updateAnnonceData.title, [Validators.required]],
        description: [this.updateAnnonceData.description, [Validators.required]],
        categorie: [this.selectedOption, [Validators.required]],
        date: [this.updateAnnonceData.date],
        image: [this.updateAnnonceData.image],
        user: [this.userId],
        id: [this.updateAnnonceData.id] 
      });
    }

  }

  submitForm(): void {
    if (this.isAddForm) { 
      if (this.addAnnonceForm.valid) {
     
        if (!this.addAnnonceForm.value.image) { 
          this.addAnnonceForm.value.image = "annonce-sans-image.png"
        }
        if (this.addAnnonceForm.value.categorie == "covoiturage") { 
          this.addAnnonceForm.value.image = "covoit2.jpg"
        }
        this.annonceService.addAnnonce(this.addAnnonceForm.value)
        .subscribe((response) => {
          if (response) {
            this.msg.success(`Publication de l'annonce réussie !`);
            this.router.navigate(['/annonces']) 
          } else {
            this.msg.error(`La publication de l'annonce a échouée...`);
          }
        })
    }
    } else {  
      if (this.addAnnonceForm.valid) {
        
        this.annonceService.updateAnnonce(this.addAnnonceForm.value)
        .subscribe((response) => {
          if (response) {
            this.msg.success(`Mise à jour de l'annonce réussie !`);
            this.router.navigate(['/annonces']) 
          } else {
            this.msg.error(`La mise à jour à échouée...`);
          }
        })
      }
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addAnnonceForm.reset();
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`Chargement de ${info.file.name} réussi !`);
    } else if (info.file.status === 'error') {
      this.msg.error(`Chargement de ${info.file.name} échoué...`);
    }
    this.addAnnonceForm.value.image = info.file.name 
  }

  onCategoryChange(value: string): void {
    if (value != 'covoiturage')
    this.addAnnonceForm.get('date')!.setValue(null)
  }




}
