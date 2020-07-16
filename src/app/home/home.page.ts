import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {NoteDetailsPage} from 'src/app/note-details/note-details.page'
import { Observable } from 'rxjs';
import {Note, NoteService} from 'src/app/services/note.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public notes: Observable<Note[]>;

  constructor(
    public modalController: ModalController,
    private noteService: NoteService
    ) {}

  ngOnInit(){
    this.notes = this.noteService.getNotes();
  }

  async showModal(id) {
    const modal = await this.modalController.create({
      component: NoteDetailsPage,
      componentProps:{
        id: id
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
