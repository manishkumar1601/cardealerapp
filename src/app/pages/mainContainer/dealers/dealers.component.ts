import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/interfaces/user';
import { ManageDealerComponent } from 'src/app/modals/manage-dealer/manage-dealer.component';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss'],
})
export class DealersComponent implements OnInit {
  dealers: IUser[];
  dealerErrorMessage: boolean;
  isEdit: boolean;
  showDiv: boolean = true;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    const dealers: any = await this.userService.getUsers();
    if (dealers?.rows?.length > 0) {
      this.dealers = dealers?.rows;
      this.dealerErrorMessage = false;
    } else {
      this.dealerErrorMessage = true;
    }
  }

  toggleDiv(){
    this.showDiv = !this.showDiv;
  }

  open(isEdit: boolean, data?: IUser) {
    this.isEdit = isEdit;
    const modalRefer = this.modalService.open(ManageDealerComponent, {
      size: 'md',
    });
    modalRefer.componentInstance.dealerEditData = data;
    modalRefer.componentInstance.isEdit = isEdit;
    modalRefer.result.then(
      () => {
          this.getUsers();
      },
      () => {}
    );
  }

  async deleteDealer(dealer: any){
    Swal.fire({
      title: `Are you sure to delete ${dealer.name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.userService.deleteDealer(dealer.id);
        this.getUsers();
        Swal.fire('Deleted!', 'USer has been deleted.', 'success');
      }
    });
  }


}
