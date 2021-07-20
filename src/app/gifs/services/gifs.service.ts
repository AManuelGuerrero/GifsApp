import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[]=[];
  private apiKey: string = 'u7OoRQ2mBM17qI6xbWOTcGi7Z5Q42H8R';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private limit: number = 10;

  public resultados: Gif[]= [];


  get historial(){
    return [...this._historial];
  }

  constructor(
      private http:HttpClient
  )
  {
    this._historial=JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados=JSON.parse( localStorage.getItem('resultados')! ) || [];
  }

  buscarGifs(query:string){

    if(query.trim().length!==0 && !this._historial.includes(query.toLowerCase())){
    
      this._historial.unshift(query.trim().toLowerCase());
      this._historial=this._historial.slice(0,9);
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    
    const params = new HttpParams().set('api_key',this.apiKey)
                                   .set('limit',this.limit.toString())
                                   .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
      .subscribe( ( res ) =>{
        this.resultados = res.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      }); 
  }
}
