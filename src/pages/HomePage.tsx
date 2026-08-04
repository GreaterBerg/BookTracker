import fetchFn from '../components/fetchFn'
import { useQuery } from '@tanstack/react-query'

const HomePage = () => {

    const { data: books, isLoading, isError } = useQuery({
        queryKey: ['books'],
        queryFn: () => fetchFn('https://openlibrary.org/search/authors.json?q=j%20k%20rowling')
    })

    return (
        <>
            <h1>HomePage</h1>
            {isLoading ? (
                <p className="loading">Loading...</p>
            ) : isError ? (
                <p className="error">Error fetching data</p>
            ) : (
                <ul>
                    {books?.docs.map((book: any) => (
                        <li key={book.key}>{book.name}</li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default HomePage