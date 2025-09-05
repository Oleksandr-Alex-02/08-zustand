"use client"

import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";

export const Tags = [
    "All",
    "Todo",
    "Work",
    "Meeting",
    "Personal",
    "Shopping",
]

export default function TagsMenu() {
    const [toggle, setToggle] = useState<boolean>(false)
    return (
        <div className={css.menuContainer}>
            <button onClick={() => setToggle(!toggle)} className={css.menuButton}>
                Notes ▾
            </button>
            {toggle &&
                <ul className={css.menuList}>
                    {Tags.map((tag) =>
                        <li key={tag} onClick={() => setToggle(!toggle)} className={css.menuItem}>
                            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                                {tag}
                            </Link>
                        </li>)}
                </ul>}
        </div>
    )
}