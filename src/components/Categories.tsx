import { FC, memo } from "react";

type CategoriesPropr = {
  value: number;
  onSortCategory: (index: number) => void;
};
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const Categories: FC<CategoriesPropr> = memo(({ value, onSortCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onSortCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
