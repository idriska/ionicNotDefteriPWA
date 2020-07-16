import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NoteService, Note } from '../services/note.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.page.html',
  styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage implements OnInit {

  public date = new Date(Date.now());

  note: Note = {
    title: '',
    notes: '',
    date: this.date,
  };

  constructor(
    public modalController: ModalController, 
    private noteService: NoteService,
    private toastCtrl: ToastController, 
    private navParams: NavParams) { }

  async close() {
    await this.modalController.dismiss();
  }

  ngOnInit() {
    let id = this.navParams.get('id')
    if (id) {
      this.noteService.getNote(id).subscribe(note => {
        this.note = note;
      });
    }
  }

  public disabled = true;

  inputChange(value) {
    value != '' ? this.disabled = false : this.disabled = true;
  }

  addNote() {
    this.noteService.addNote(this.note).then(() => {
      this.modalController.dismiss();
      this.showToast('Not Eklendi');
    }, err => {
      this.showToast('Bir sorun yaşandı');
    });
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id).then(() => {
      this.modalController.dismiss();
      this.showToast('Not Silindi');
    }, err => {
      this.showToast('Bir sorun yaşandı');
    });
  }

  updateNote() {
    this.noteService.updateNote(this.note).then(() => {
      this.modalController.dismiss();
      this.showToast('Not Güncellendi');
    }, err => {
      this.showToast('Bir sorun yaşandı');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
