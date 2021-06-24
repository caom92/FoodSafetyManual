import { Component } from '@angular/core'
import { Language } from 'angular-l10n'
import { RegisterService } from '../../../services/register.service'
import { RegisterListItem } from './register-list.interface'

@Component({
  selector: 'register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})

export class RegisterListComponent {
  @Language() lang: string
  registers: Array<RegisterListItem>

  constructor(private registerService: RegisterService) { }

  public ngOnInit(): void {
    this.registerService.countPendingRegisters().then(success => {
      console.log(success)
    })

    this.registerService.list().then(success => {
      this.registers = success
    })
  }
}
