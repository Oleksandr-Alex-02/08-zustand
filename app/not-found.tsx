
import { Metadata } from 'next';
import Page404 from '../components/NoPage/404';
import css from './page.module.css';

export const metadata: Metadata = {
    title: 'NOTEHUB-404',
    description: 'Sorry, such page does not exist.',
};

export default function NotFound() {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
            <Page404 />
        </div>
    );
}