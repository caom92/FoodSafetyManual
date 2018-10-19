import { Component, OnDestroy, OnInit } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'

import { MenuService } from '../../../services/app.menu'

export interface MenuFile {
  id: number
  name: string
  first_name: string
  last_name: string
  upload_date: string
  path: string
}

@Component({
  selector: 'document-list',
  templateUrl: 'document.list.html'
})
  
export class DocumentListComponent implements OnInit, OnDestroy {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  zoneChange: Subscription
  fileList: Array<MenuFile> = []

  constructor(private menuService: MenuService, private events: PubSubService) {

  }

  public ngOnInit(): void {
    this.zoneChange = this.events.$sub('zone:change').subscribe((message) => {
      this.onZoneChange()
    })

    this.onZoneChange()
  }

  public onZoneChange(): void {
    this.menuService.getMenuFiles().then(success => {
      this.fileList = success
    }, error => {

    })
  }

  public ngOnDestroy(): void {
    this.zoneChange.unsubscribe()
  }
}