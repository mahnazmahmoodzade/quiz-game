import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CategoryModel } from "@models/category/category.model";

@Component({
  selector: "app-category-item",
  standalone: true,
  imports: [MatCardModule],
  templateUrl: "./category-item.component.html",
  styleUrl: "./category-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItemComponent {
  category = input.required<CategoryModel>();
  isSelected = input.required<boolean>();

  select = output<CategoryModel>();

  handleSelect() {
    this.select.emit(this.category());
  }
}
