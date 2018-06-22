import { Component,OnInit } from '@angular/core'
import { PapaParseService } from 'ngx-papaparse'

@Component({
  selector: 'product-data-viewer',
  templateUrl: 'product.data.viewer.component.html'
})

export class ProductDataViewerComponent implements OnInit {
  private data: Array<any> = []
  private filteredData: Array<any> = []
  private currentData: Array<any> = []

  private allLots: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }
  private autocompleteLots: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }

  private allProducts: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }
  private autocompleteProducts: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }

  private allVarieties: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }
  private autocompleteVarieties: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }

  private allBatches: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }
  private autocompleteBatches: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }

  private allTraceability: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }
  private autocompleteTraceability: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }

  private allParcels: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }
  private autocompleteParcels: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }

  private allZones: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }
  private autocompleteZones: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }

  private allKeys: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }
  private autocompleteKeys: { data: { [key: string]: string }, limit: number, current: string, count: number } = { data: {}, limit: 5, current: null, count: 0 }
  
  private readonly pageSize: number = 50
  private currentPage: number = 0
  private totalReceived: number = 0
  private totalPacked: number = 0

  constructor(private csvParse: PapaParseService) {
    
  }

  public ngOnInit(): void {
    console.log('init')
    console.log(localStorage.zone_name)
    this.allKeys.current = localStorage.zone_name
    //this.allKeys.current = null
    let csvData = `Semana,Id,Fecha,Envio,Batch,Clave,Producto,Recibo,Emp,Kilos,Variedad,Color,Lote,Parcela,TemP,Caja,Zona,Clave,Productor,Trazabilidad\n43,281834,Oct 27 2017,x,,BMMP,SWEET PETITE PEPPER DE CAMPO,9,,54,MMP Red 9277,0,60,Z02,61.5,MoreliaChiles,BCN,ZGS,GODSOL S DE RL DE CV,595181\n43,282140,Oct 28 2017,E908,521496,MBF12,MBF12 - SWEET PEPPER MEDLEY 12CT 16OZ BAG FAIRTRADE,,2,13,MMP Red 9277,0,60,Z02,53,BXLB24,BCN,ZGS,GODSOL S DE RL DE CV,595181\n43,281834,Oct 27 2017,x,,BMMP,SWEET PETITE PEPPER DE CAMPO,13,,78,MMP Tangerine 9076,0,60,Z02,61.5,MoreliaChiles,BCN,ZGS,GODSOL S DE RL DE CV,595182\n35,273247,Sep 1 2017,x,,BMMP,SWEET PETITE PEPPER DE CAMPO,164,,984,MMP Yellow 2389,0,18,N02,66,MoreliaChiles,BCN,OAP,Ojos Negros Parcela,575947\n35,273247,Sep 1 2017,x,,BZUC,ZUCHINI DE CAMPO,73,,657,Prestige,0,22,N02,66,MoreliaCalabazas,BCN,OAP,Ojos Negros Parcela,575948\n35,273415,Sep 2 2017,E778,514510,ZGM,ZGM - GENERIC ZUCCHINI MEDIUM,,5,50,Prestige,0,22,N02,51,BXZUC,BCN,OAP,Ojos Negros Parcela,575948`
    this.csvParse.parse(`http://localhost/espresso/source/server/bcn_database.php`, {
      complete: (results, file) => {
        this.data = results.data

        this.filter()

        //this.autocomplete.data = this.allLots
        //this.autocomplete.limit = 5
        /*this.autocomplete = {
          data: this.allBatches,
          limit: 5
        }*/
        //console.log(this.data)
        //console.log(this.filteredData)
        //console.log(this.allProducts)
        //console.log(this.autocomplete)
        console.log('total keys of lots', Object.keys(this.allLots.data).length)
        console.log('total keys of prod', Object.keys(this.allProducts.data).length)
        console.log('total keys of vari', Object.keys(this.allVarieties.data).length)
        console.log('total keys of batc', Object.keys(this.allBatches.data).length)
        console.log('total keys of trac', Object.keys(this.allTraceability.data).length)
        console.log('total keys of parc', Object.keys(this.allParcels.data).length)
        console.log('total keys of zone', Object.keys(this.allZones.data).length)
        console.log('total keys of keys', Object.keys(this.allKeys.data).length)
        console.log(this.allProducts)
        console.log('complete')
        this.autocompleteLots = this.allLots
        this.autocompleteProducts = this.allProducts
        this.autocompleteVarieties = this.allVarieties
        this.autocompleteBatches = this.allBatches
        this.autocompleteTraceability = this.allTraceability
        this.autocompleteParcels = this.allParcels
        this.autocompleteZones = this.allZones
        this.autocompleteKeys = this.allKeys
      },
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    })
  }

  public onAutocompleteChange(event: any, autocomplete: any): void {
    if (autocomplete.data[event.target.value] === undefined) {
      event.target.value = ""
    }
    
    autocomplete.current = event.target.value

    this.filter()
  
    console.log("target: ", event.target.value)
    console.log("autocomplete: ", autocomplete.current)
    //this.filter()
  }

  public nextPage(): void {
    if((this.currentPage + 1) * this.pageSize < this.filteredData.length) {
      this.currentPage++
      this.currentData = []
      for (let i = this.currentPage * this.pageSize; i < (this.currentPage + 1) * this.pageSize && i < this.filteredData.length; i++) {
        this.currentData.push(this.filteredData[i])
      }
      console.log(this.currentData)
    }

    console.log('next page', this.currentPage)
    console.log(this.allProducts.current)
  }

  public prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--
      this.currentData = []
      for (let i = this.currentPage * this.pageSize; i < (this.currentPage + 1) * this.pageSize && i < this.filteredData.length; i++) {
        this.currentData.push(this.filteredData[i])
      }
      console.log(this.currentData)
    }
    
    console.log('prev page', this.currentPage)
  }

  public goToFirst(): void {
    this.currentPage = 0
    this.currentData = []
    for (let i = this.currentPage * this.pageSize; i < (this.currentPage + 1) * this.pageSize && i < this.filteredData.length; i++) {
      this.currentData.push(this.filteredData[i])
    }
    console.log(this.currentData)
  }

  public goToLast(): void {
    this.currentPage = Math.ceil(this.filteredData.length / this.pageSize) - 1
    this.currentData = []
    for (let i = this.currentPage * this.pageSize; i < (this.currentPage + 1) * this.pageSize && i < this.filteredData.length; i++) {
      this.currentData.push(this.filteredData[i])
    }
    console.log(this.currentData)
  }

  public filter(): void {
    console.log('filter called')

    this.filteredData = []

    this.totalPacked = 0
    this.totalReceived = 0

    this.currentPage = 0

    for (var key in this.allLots.data) {
      if (this.allLots.data.hasOwnProperty(key)) {
        delete this.allLots.data[key];
      }
    }
    this.allLots.count = 0

    for (var key in this.allProducts.data) {
      if (this.allProducts.data.hasOwnProperty(key)) {
        delete this.allProducts.data[key];
      }
    }
    this.allProducts.count = 0

    for (var key in this.allVarieties.data) {
      if (this.allVarieties.data.hasOwnProperty(key)) {
        delete this.allVarieties.data[key];
      }
    }
    this.allVarieties.count = 0

    for (var key in this.allBatches.data) {
      if (this.allBatches.data.hasOwnProperty(key)) {
        delete this.allBatches.data[key];
      }
    }
    this.allBatches.count = 0

    for (var key in this.allTraceability.data) {
      if (this.allTraceability.data.hasOwnProperty(key)) {
        delete this.allTraceability.data[key];
      }
    }
    this.allTraceability.count = 0

    for (var key in this.allParcels.data) {
      if (this.allParcels.data.hasOwnProperty(key)) {
        delete this.allParcels.data[key];
      }
    }
    this.allParcels.count = 0

    for (var key in this.allZones.data) {
      if (this.allZones.data.hasOwnProperty(key)) {
        delete this.allZones.data[key];
      }
    }
    this.allZones.count = 0

    for (var key in this.allKeys.data) {
      if (this.allKeys.data.hasOwnProperty(key)) {
        delete this.allKeys.data[key];
      }
    }
    this.allKeys.count = 0
    
    for (let d of this.data) {
      //if (d['Zona'] == 'BCN' && d['Clave'] == 'TJC' && d['Caja'] == 'BXZUC') {
      if ((this.allKeys.current == null || d['Clave'] == this.allKeys.current || this.allKeys.current == '') &&
        (this.allProducts.current == null || d['Producto'] == this.allProducts.current || this.allProducts.current == '') &&
        (this.allLots.current == null || d['Lote'] == this.allLots.current || this.allLots.current == '') &&
        (this.allVarieties.current == null || d['Variedad'] == this.allVarieties.current || this.allVarieties.current == '') &&
        (this.allBatches.current == null || d['Batch'] == this.allBatches.current || this.allBatches.current == '') &&
        (this.allTraceability.current == null || d['Trazabilidad'] == this.allTraceability.current || this.allTraceability.current == '') &&
        (this.allParcels.current == null || d['Parcela'] == this.allParcels.current || this.allParcels.current == '') &&
        (this.allZones.current == null || d['Zona'] == this.allZones.current || this.allZones.current == '')) {
        this.filteredData.push(d)
        if (d['Emp'] === Number(d['Emp'])) {
          this.totalPacked += d['Emp']
        }
        if (d['Recibo'] === Number(d['Recibo'])) {
          this.totalReceived += d['Recibo']
        }
      }

      this.currentData = []
      for (let i = this.currentPage * this.pageSize; i < (this.currentPage + 1) * this.pageSize && i < this.filteredData.length; i++) {
        this.currentData.push(this.filteredData[i])
      }
    }

    for (let f of this.filteredData) {
      if (this.allLots.data[f['Lote']] === undefined) {
        this.allLots.data[f['Lote']] = null
        this.allLots.count++
      }

      if (this.allProducts.data[f['Producto']] === undefined) {
        this.allProducts.data[f['Producto']] = null
        this.allProducts.count++
      }

      if (this.allVarieties.data[f['Variedad']] === undefined) {
        this.allVarieties.data[f['Variedad']] = null
        this.allVarieties.count++
      }

      if (this.allBatches.data[f['Batch']] === undefined) {
        this.allBatches.data[f['Batch']] = null
        this.allBatches.count++
      }

      if (this.allTraceability.data[f['Trazabilidad']] === undefined) {
        this.allTraceability.data[f['Trazabilidad']] = null
        this.allTraceability.count++
      }

      if (this.allParcels.data[f['Parcela']] === undefined) {
        this.allParcels.data[f['Parcela']] = null
        this.allParcels.count++
      }

      if (this.allZones.data[f['Zona']] === undefined) {
        this.allZones.data[f['Zona']] = null
        this.allZones.count++
      }

      if (this.allKeys.data[f['Clave']] === undefined) {
        this.allKeys.data[f['Clave']] = null
        this.allKeys.count++
      }
    }

    this.autocompleteProducts = this.allProducts

    console.log('total keys of lots', Object.keys(this.allLots.data).length)
    console.log('total keys of prod', Object.keys(this.allProducts.data).length)
    console.log('total keys of vari', Object.keys(this.allVarieties.data).length)
    console.log('total keys of batc', Object.keys(this.allBatches.data).length)
    console.log('total keys of trac', Object.keys(this.allTraceability.data).length)
    console.log('total keys of parc', Object.keys(this.allParcels.data).length)
    console.log('total keys of zone', Object.keys(this.allZones.data).length)
    console.log('total keys of keys', Object.keys(this.allKeys.data).length)

    console.log(this.autocompleteProducts)
  }
}