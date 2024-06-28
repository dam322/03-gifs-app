import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, GifData } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: GifData[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'Au7Fgebov4Pq2Y2CuTT2Q1itMOvT3FP7';
  private url: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Initialized on local storage');
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeTagsHistory(newTag: string): void {
    newTag = newTag.trim().toLowerCase();

    if (this._tagsHistory.includes(newTag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== newTag);
    }

    this._tagsHistory.unshift(newTag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const tags = localStorage.getItem('tagsHistory');
    if (!tags) return
    this._tagsHistory = JSON.parse(tags);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.trim().length === 0) return;
    this.organizeTagsHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.url}/search`, { params })
      .subscribe((response) => {
        this.gifList = response.data;
      });
  }
}
