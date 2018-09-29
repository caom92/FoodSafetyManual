import { Component, OnInit, OnDestroy } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DefaultLocale, Language } from 'angular-l10n'
import { MenuService } from '../../services/app.menu'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'

export interface UserForMenu {
  id: number
  first_name: string
  last_name: string
  role_name: string
  has_menu: number
}

@Component({
  templateUrl: './menu-audit-list.component.html',
  selector: 'menu-audit-list'
})

export class MenuAuditListComponent implements OnInit, OnDestroy {
  @Language() lang
  zoneChange: Subscription
  userList: Array<UserForMenu> = []

  constructor(private events: PubSubService, private menuService: MenuService) {

  }

  public ngOnInit(): void {    
    this.zoneChange = this.events.$sub('zone:change').subscribe((message) => {
      this.onZoneChange()
    })

    this.onZoneChange()
  }

  public onZoneChange(): void {
    this.menuService.getMenuUsers().then(success => {
      this.userList = success
    }, error => {
      
    })
  }

  public ngOnDestroy(): void {
    this.zoneChange.unsubscribe()
  }
}