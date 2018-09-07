import { DragulaService, DragulaOptions } from 'ng2-dragula'

export class DragulaInventory {
  private groupsNames: Array<string> = []
  private activeInventory: boolean = true

  constructor(protected dragulaService: DragulaService) {

  }

  public addGroup(name: string): string {
    if (name === String(name)) {
      this.groupsNames.push(name)
      console.log('deactivated inventory')
      this.activeInventory = false
      this.dragulaService.destroy(name)
      this.dragulaService.createGroup(name, (({
        moves: (el, container, handle) => {
          return handle.classList.contains('handle')
        }
      }) as DragulaOptions))
      console.log(this.dragulaService.find(name))
      setTimeout(() => {
        console.log('activated inventory after timeout')
        this.activeInventory = true
      })
      return name
    } else {
      return undefined
    }
  }

  public getGroups(): Array<string> {
    return this.groupsNames
  }

  public destroy(): void {
    for (let group of this.groupsNames) {
      this.dragulaService.destroy(group)
    }

    this.groupsNames = []
  }
}
