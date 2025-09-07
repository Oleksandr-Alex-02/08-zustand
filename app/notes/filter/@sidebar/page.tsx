
import Link from 'next/link'
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
            <li>
                <Link href="/notes/action/create">Creact</Link>
            </li>
            {categories.map((tag) =>
                <li key={tag} className={css.menuItem}>
                    <a href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </a>
                </li>)}
        </ul>
    )
}