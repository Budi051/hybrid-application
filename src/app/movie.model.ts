export class MovieModel { 
  constructor(public judul: string,
  public tanggalTayang: Date,
  public pemain: string,
  public sinopsis:string,
  public iduserYangPosting:string,
  public genre:Array<string>) {}
}