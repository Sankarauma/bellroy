import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isSortMenuOpen = false;

  items = [
    { name: 'Laptop', description: 'High performance laptop', image: 'assets/laptop.jpeg' },
    { name: 'Shoes', description: 'Stylish running shoes', image: 'assets/shoe.jpg' },
    { name: 'Book', description: 'Best-selling novel', image: 'assets/book.jpg' },
    { name: 'Phone', description: 'Latest smartphone', image: 'assets/phone.png' }
  ];

  sortedItems = [...this.items];

  
  constructor() { }

  ngOnInit(): void {
  }
  toggleSortMenu() {
    this.isSortMenuOpen = !this.isSortMenuOpen;
  }

  sortByName(order: string) {
    if (order === 'asc') {
      this.sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.sortedItems.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.toggleSortMenu();
  }
}
