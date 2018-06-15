import { Component,OnInit } from '@angular/core'
import { PapaParseService } from 'ngx-papaparse'

@Component({
  selector: 'product-data-viewer',
  templateUrl: 'product.data.viewer.component.html'
})

export class ProductDataViewerComponent implements OnInit {
  private data: any = []
  private zone: string = null

  constructor(private csvParse: PapaParseService) {
    
  }

  public ngOnInit(): void {
    console.log('init')
    console.log(localStorage.zone_name)
    //this.zone = localStorage.zone_name
    let csvData = `Semana,Id,Fecha,Envio,Batch,Clave,Producto,Recibo,Emp,Kilos,Variedad,Color,Lote,Parcela,TemP,Caja,Zona,Clave,Productor,Trazabilidad\n43,281834,Oct 27 2017,x,,BMMP,SWEET PETITE PEPPER DE CAMPO,9,,54,MMP Red 9277,0,60,Z02,61.5,MoreliaChiles,BCN,ZGS,GODSOL S DE RL DE CV,595181\n43,282140,Oct 28 2017,E908,521496,MBF12,MBF12 - SWEET PEPPER MEDLEY 12CT 16OZ BAG FAIRTRADE,,2,13,MMP Red 9277,0,60,Z02,53,BXLB24,BCN,ZGS,GODSOL S DE RL DE CV,595181\n43,281834,Oct 27 2017,x,,BMMP,SWEET PETITE PEPPER DE CAMPO,13,,78,MMP Tangerine 9076,0,60,Z02,61.5,MoreliaChiles,BCN,ZGS,GODSOL S DE RL DE CV,595182\n35,273247,Sep 1 2017,x,,BMMP,SWEET PETITE PEPPER DE CAMPO,164,,984,MMP Yellow 2389,0,18,N02,66,MoreliaChiles,BCN,OAP,Ojos Negros Parcela,575947\n35,273247,Sep 1 2017,x,,BZUC,ZUCHINI DE CAMPO,73,,657,Prestige,0,22,N02,66,MoreliaCalabazas,BCN,OAP,Ojos Negros Parcela,575948\n35,273415,Sep 2 2017,E778,514510,ZGM,ZGM - GENERIC ZUCCHINI MEDIUM,,5,50,Prestige,0,22,N02,51,BXZUC,BCN,OAP,Ojos Negros Parcela,575948`
    this.csvParse.parse(`http://localhost/espresso/source/server/bcn_database.php`, {
      complete: (results, file) => {
        //this.data = results.data
        let limit = 101
        let i = 0
        for (let d of results.data) {
          setTimeout(() => {
            if (i <= limit) {
              this.data.push(d)
              i++
            }
          }, 100)
          /*if (i <= limit) {
            this.data.push(d)
            i++
          }*/
        }
        //console.log(results.data)
        console.log('complete')
      },
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    })
  }
}