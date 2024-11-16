import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSortMenuOpen = false;
  itemsPerPage = 4; 
  currentPage = 1; 
  searchQuery: string = ''; 

  selectedIndex: number | null = null;

  items = [
    {
      pk: 987,
      name: 'Laptop',
      points: 150,
      display_img_url: 'assets/laptop.jpeg',
      quantity: 14,
      category: 'Electronics',
      subcategory: 'Laptops',
      valid_until: '2024-12-31T00:00:00',
      low_quantity: 10
    },
    {
      pk: 988,
      name: 'Book',
      points: 200,
      display_img_url: 'assets/book.jpg',
      quantity: 0,
      category: 'Books',
      subcategory: 'Fiction',
      valid_until: '2024-11-30T00:00:00',
      low_quantity: 5
    },
    {
      pk: 989,
      name: 'Shoe',
      points: 120,
      display_img_url: 'assets/shoe.jpg',
      quantity: 7,
      category: 'Fashion',
      subcategory: 'Men',
      valid_until: '2024-10-15T00:00:00',
      low_quantity: 10
    },
    {
      pk: 990,
      name: 'Phone',
      points: 120,
      display_img_url: 'assets/phone.png',
      quantity: 9,
      category: 'Electronics',
      subcategory: 'Mobile Phones',
      valid_until: '2024-10-15T00:00:00',
      low_quantity: 12
    },
    {
      pk: 991,
      name: 'Tablet',
      points: 180,
      display_img_url: 'assets/tablet.jpeg',
      quantity: 6,
      category: 'Electronics',
      subcategory: 'Tablets',
      valid_until: '2024-11-15T00:00:00',
      low_quantity: 4
    },
    {
      pk: 992,
      name: 'Headphones',
      points: 80,
      display_img_url: 'assets/headphone.jpg',
      quantity: 15,
      category: 'Electronics',
      subcategory: 'Audio',
      valid_until: '2024-12-31T00:00:00',
      low_quantity: 10
    }
  ];

  categories = [
    {
      name: 'Electronics',
      subcategories: ['Laptops', 'Mobile Phones', 'Tablets', 'Headphones'],
      isOpen: false
    },
    {
      name: 'Fashion',
      subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
      isOpen: false
    },
    {
      name: 'Home Appliances',
      subcategories: ['Kitchen Appliances', 'Vacuum Cleaners', 'Air Conditioners'],
      isOpen: false
    },
    {
      name: 'Books',
      subcategories: ['Fiction', 'Non-Fiction', 'Comics', 'Academic'],
      isOpen: false
    }
  ];

  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null;
  filteredItems = [...this.items];

  constructor() {}

  ngOnInit(): void {
    this.filterItems();
  }

  toggleCategory(categoryName: string) {
    const category = this.categories.find((cat) => cat.name === categoryName);
    if (category) {
      category.isOpen = !category.isOpen;
      this.selectedCategory = category.isOpen ? categoryName : null;
      this.filterItems();
    }
  }

  selectSubcategory(subcategory: string, category: string, index: number) {
    this.selectedCategory = category;
    this.selectedSubcategory = subcategory;
    this.selectedIndex = index;
    this.filterItems();
  }

  clearFilters() {
    this.selectedCategory = null;
    this.selectedSubcategory = null;
    this.selectedIndex = null;
    this.searchQuery = '';
    this.filterItems();
  }

  filterItems() {
    this.filteredItems = this.items.filter((item) => {
      return (
        (!this.selectedCategory || item.category === this.selectedCategory) &&
        (!this.selectedSubcategory || item.subcategory === this.selectedSubcategory) &&
        (!this.searchQuery || item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    });
    this.currentPage = 1;
  }

  getPaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredItems.slice(startIndex, endIndex);
  }

  getTotalPages() {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  toggleSortMenu() {
    this.isSortMenuOpen = !this.isSortMenuOpen;
  }

  sortByName(order: string) {
    this.filteredItems.sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    this.isSortMenuOpen = false;
  }

  getItemImage(item: any) {
    return item.display_img_url;
  }

  getItemStatus(item: any) {
    return item.quantity > 0 ? 'In Stock' : 'Out of Stock';
  }
}
