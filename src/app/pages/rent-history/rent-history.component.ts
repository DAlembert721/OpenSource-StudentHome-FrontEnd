import {Component, OnInit, ViewChild} from '@angular/core';
import {Property} from '../../models/property';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-rent-history',
  templateUrl: './rent-history.component.html',
  styleUrls: ['./rent-history.component.css']
})
export class RentHistoryComponent implements OnInit {

  type: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [ 'image', 'id', 'contract', 'amount', 'comment', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
      {id: 1, contract: 'c1', amount: '1000', comment: 'Quiet student' ,
        image: 'https://source.unsplash.com/1600x900/?receipt,1'},
      {id: 2, contract: 'c1', amount: '1000', comment: 'Did not pay in time, but say sorry ',
        image: 'https://source.unsplash.com/1600x900/?receipt,2'},
      {id: 3, contract: 'c2', amount: '1000', comment: '',
        image: 'https://source.unsplash.com/1600x900/?receipt,3'},
      {id: 4, contract: 'c2', amount: '1000', comment: 'Is going to travel next month',
        image: 'https://source.unsplash.com/1600x900/?receipt,4'},
      {id: 5, contract: 'c3', amount: '1000', comment: 'Quiet student',
        image: 'https://source.unsplash.com/1600x900/?receipt,5'},
      {id: 6, contract: 'c3', amount: '1000', comment: 'Quiet student',
        image: 'https://source.unsplash.com/1600x900/?receipt,6'}];
  }
}
