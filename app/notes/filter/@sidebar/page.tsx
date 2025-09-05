
import css from './SidebarNotes.module.css'

export const categories = [
    "All",
    "Work",
    "Personal",
    "Todo",
    "Meeting",
    "Shopping",
]

export default function Sidebar() {
    return (
        <ul className={css.menuList}>
            {categories.map((tag) =>
                <li key={tag} className={css.menuItem}>
                    <a href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </a>
                </li>)}
        </ul>
    )
}