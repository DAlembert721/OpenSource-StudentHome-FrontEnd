import {Component, OnInit, ViewChild} from '@angular/core';
import {Property} from '../../models/property';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDatepicker} from '@angular/material/datepicker';

@Component({
  selector: 'app-rent-history',
  templateUrl: './rent-history.component.html',
  styleUrls: ['./rent-history.component.css']
})
export class RentHistoryComponent implements OnInit {

  type: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [ 'image', 'id', 'contract', 'amount', 'comment', 'createdAt', 'updatedAt', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

  constructor(
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllPPayments();
    this.type = localStorage.getItem('type');
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  navigateToPayment(element): void{
      this.router.navigate([`/contracts/${element.contract}/payments/${element.id}`]).then(() => null);
  }
  getAllPPayments(): void {
    this.dataSource.data = [
      {id: 1, contract: 'c1', amount: '1000', comment: 'Quiet student' , createdAt: 'xx/xx/xx',
        image: 'https://source.unsplash.com/1600x900/?receipt,1', updatedAt: 'xx/xx/xx xx:xx'},
      {id: 2, contract: 'c1', amount: '1000', comment: 'Did not pay in time, but say sorry ' , createdAt: 'xx/xx/xx',
        image: 'https://source.unsplash.com/1600x900/?receipt,2', updatedAt: 'xx/xx/xx xx:xx'},
      {id: 3, contract: 'c2', amount: '1000', comment: '' , createdAt: 'xx/xx/xx',
        image: 'https://source.unsplash.com/1600x900/?receipt,3', updatedAt: 'xx/xx/xx xx:xx'},
      {id: 4, contract: 'c2', amount: '1000', comment: 'Is going to travel next month' , createdAt: 'xx/xx/xx',
        image: 'https://source.unsplash.com/1600x900/?receipt,4', updatedAt: 'xx/xx/xx xx:xx'},
      {id: 5, contract: 'c3', amount: '1000', comment: 'Quiet student' , createdAt: 'xx/xx/xx',
        image: 'https://source.unsplash.com/1600x900/?receipt,5', updatedAt: 'xx/xx/xx xx:xx'},
      {id: 6, contract: 'c3', amount: '1000', comment: 'Quiet student' , createdAt: 'xx/xx/xx',
        image: 'https://source.unsplash.com/1600x900/?receipt,6', updatedAt: 'xx/xx/xx xx:xx'}];
  }
}
