
import Link from "next/link"
import css from "./SidebarNotes.module.css"

export const categories = [
    "All",
    "Work",
    "Personal",
    "Todo",
    "Meeting",
    "Shopping",
]

export default function SidebarNotes() {

    return (
        <div>
            <ul className={css.menuList}>
                {categories.map(category => (
                    <li key={category} className={css.menuItem}>
                        <Link
                            href={`/notes/filter/${category}`}
                            scroll={false}
                            className={css.menuLink}>
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}