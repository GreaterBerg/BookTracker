import fetchFn  from '../fetchFn'
import { useQuery } from '@tanstack/react-query'
import Navbar from '../components/NavBar'

const HomePage = () => {

    const { data: books, isLoading, isError } = useQuery({
        queryKey: ['books'],
        queryFn: () => fetchFn('https://openlibrary.org/search/authors.json?q=j%20k%20rowling')
    })

    return (
        <>
            <Navbar />
            <h1>HomePage</h1>
        </>
    )
}

export default HomePage