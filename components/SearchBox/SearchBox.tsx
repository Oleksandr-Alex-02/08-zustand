
import css from './SearchBox.module.css'

interface SearchBoxProps {
    text: string,
    onChange: (value: string) => void,
}

export default function SearchBox({ text, onChange }: SearchBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <>
            <input
                onChange={handleChange}
                className={css.input}
                type="text"
                defaultValue={text}
                placeholder="Search notes"
            />
        </>
    )
}