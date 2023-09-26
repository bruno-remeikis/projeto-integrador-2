import Card from '@/components/Card/Card';
import styles from './page.module.css';

export default function HomePage()
{
    return (
        <main className={styles.homepage}>
            <h2>Home</h2>

            <div className={styles.container}>
                <Card />
                <Card />
            </div>
        </main>
    )
}