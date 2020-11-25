import { Component, OnInit } from '@angular/core';
import {ContractService} from '../../services/contract.service';
import {PropertyService} from '../../services/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Contract} from '../../models/contract';
import {Property} from '../../models/property';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  contracts: any[];
  id: number;
  type: any;
  constructor(private contractDataService: ContractService,
              private propertyService: PropertyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.contracts = [];
    this.initialize();
    /*this.contracts.push({
        amount: 100,
        createdAt: new Date(),
        description: 'Having met the requirements\n' +
          'I ... Name, Surname, confirm the contract of ... Student Student Last name\n' +
          'The monthly charge will be S / XXX.XX ....\n' +
          'Additional clauses are...',
        firstNameLandlord: 'Mephisto',
        firstNameStudent: 'Samael',
        lastNameLandlord: 'Pheles',
        lastNameStudent: 'Veracruz',
        state: false,
        id: 1
    });*/
  }
  initialize(): void {
    this.id = Number(this.route.params.subscribe(params => {
      const id = params.id;
      this.type = localStorage.getItem('type');
      if (this.type === 'student') {
        this.retrieveContractsByStudentId(id);
      }
      else {
        this.retrievePropertiesByLandLordId(id);
      }
      return id;
    }));
  }
  retrieveContractsByStudentId(studentId): void {
    this.contractDataService.getContractsByStudentId(studentId)
      .subscribe((response: any) => {
        for (const resource of response.content) {
          // console.log(resource);
          this.propertyService.getPropertyById(resource.propertyId)
            .subscribe((result: any) => {
              // console.log(result);
              const data = {
                id: resource.id,
                createdAt: resource.createdAt,
                description: resource.description,
                studentFullName: resource.firstNameStudent + ' ' + resource.lastNameStudent,
                landlordFullName: result.landLordFirstName + ' ' + result.landLordLastName,
                amount: resource.amount
              };
              this.contracts.push(data);
            });

        }
        // console.log(this.contracts);
      });
  }
  retrieveContractsByPropertyId(property): void {
    console.log(property);
    this.contractDataService.getContractsByPropertyId(property.id)
      .subscribe((response: any) => {
        for (const resource of response.content) {
          const data = {
            id: resource.id,
            createdAt: resource.createdAt,
            description: resource.description,
            studentFullName: resource.firstNameStudent + ' ' + resource.lastNameStudent,
            landlordFullName: property.landLordFirstName + ' ' + property.landLordLastName,
            amount: resource.amount
          };
          this.contracts.push(data);
        }
        // console.log(this.contracts);
      });
  }
  retrievePropertiesByLandLordId(landlordId): void {
    this.propertyService.getPropertiesByLandlordId(landlordId)
      .subscribe((response: any) => {
        const properties = response.content;
        for (const property of properties) {
          this.retrieveContractsByPropertyId(property);
        }
      });
  }
  concludeContract(contractId, contract): void {
    this.contractDataService.updateContract(contractId, contract)
      .subscribe((response: any) => {
        const index = this.contracts.indexOf(contract);
        this.contracts[index] = response;
      });
  }
  addPayment(contractId): void {
    return;
  }
}
