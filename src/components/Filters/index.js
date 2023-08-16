import Card from "../../UI/Card/Card";
import SearchFilter from "./Search";
import styles from "./index.module.css"
const Search = () => {
    return (
        <Card>
            <ul className={styles.filtersWrapper}>
                <li>Catagory</li>
                <li><SearchFilter /></li>
                <li>Filters</li>
            </ul>
        </Card>)
}

export default Search;