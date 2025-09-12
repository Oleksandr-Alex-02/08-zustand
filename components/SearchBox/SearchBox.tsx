
import css from "./SearchBox.module.css";

interface SearchBoxProps {
    onChange: (query: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const query = e.target.value.trim();
        onChange(query);
    }

    return (
        <input
            onChange={handleChange}
            className={css.input}
            type="text"
            placeholder="Search notes"
        />
    );
}