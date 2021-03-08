import { Injectable } from '@angular/core';
import { EncriptService } from './encript.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private _encript: EncriptService) { }

  setItem(key, value){
    localStorage.setItem(key,JSON.stringify(value));
  }

  removeItem(key){
    localStorage.removeItem(key);
  }

  setItemEncripted(key, value){
    let dataEncripty = this._encript.set( JSON.stringify(value));
    localStorage.setItem(key, dataEncripty);
  }

  getItem<T>(key) : T{
    return JSON.parse(localStorage.getItem(key)) as T
  }

  getItemEncripted<T>(key) : T{
    let data = localStorage.getItem(key);
    if (data) {
      let decripted = this._encript.get(data);
      return JSON.parse(decripted) as T;
    }else{
      return null;
    }
  }
}
